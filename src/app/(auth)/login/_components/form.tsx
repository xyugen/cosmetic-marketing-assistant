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
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { formSchema } from "./schema";
import SubmitButton from "@/components/forms/submit-button";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    const { data, error } = await toast.promise(
      authClient.signIn.email({
        email,
        password,
      }),
      {
        loading: "Signing in...",
        success: "Signed in successfully!",
        error: "Failed to sign in",
      },
    );

    console.log(data, error);
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
                <FormLabel className="text-base font-medium text-gray-900">
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
                <div className="flex items-center justify-between">
                  <FormLabel
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </FormLabel>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
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
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
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
