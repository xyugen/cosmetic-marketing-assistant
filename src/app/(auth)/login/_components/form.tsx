"use client";

import PasswordInput from "@/components/forms/password-input";
import SubmitButton from "@/components/forms/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";
import { formSchema } from "./schema";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password, rememberMe } = values;
    const toastId = toast.loading("Signing in...");
    try {
      const response = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });
      if (response.error) {
        throw new Error(response.error.message);
      } else {
        toast.success("Signed in successfully!", { id: toastId });
        router.push(PageRoutes.DASHBOARD);
      }

      console.log(response.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password" className="text-base font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="rememberMe"
                      className="flex items-center gap-2"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="rememberMe"
                    className="select-none text-sm"
                  >
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <a
              href="#"
              title="Forgot password?"
              className="text-sm font-semibold hover:underline"
              tabIndex={-1}
            >
              Forgot password?
            </a>
          </div>

          <div>
            <SubmitButton
              formState={form.formState}
              className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7"
            >
              Sign In <Mail className="ml-1 size-4" />
            </SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
