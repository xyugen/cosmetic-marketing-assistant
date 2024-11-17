"use client";

import PasswordInput from "@/components/forms/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { formSchema } from "./schema";
import SubmitButton from "@/components/forms/submit-button";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { PageRoutes } from "@/constants/page-routes";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { fullName, email, password } = values;
    const toastId = toast.loading("Signing up...");
    try {
      const response = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        callbackURL: PageRoutes.LOGIN,
      });
      if (response.error) {
        throw new Error(response.error.message);
      } else {
        toast.success(
          () => {
            router.push(PageRoutes.LOGIN);
            return (
              <div className="flex flex-col">
                <p>Account created successfully!</p>
                <p className="m-0 text-sm text-muted-foreground">
                  Check your email to verify your account
                </p>
              </div>
            );
          },
          { id: toastId, duration: 5000 },
        );
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Email
                </FormLabel>
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
                <FormLabel className="text-base font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <SubmitButton
              formState={form.formState}
              className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7"
            >
              Create Account <User className="ml-1 size-4" />
            </SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
