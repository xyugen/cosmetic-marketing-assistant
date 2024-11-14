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

const SignUpForm = () => {
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
    const { data, error } = await toast.promise(authClient.signUp.email(
      {
        email,
        password,
        name: fullName,
      },
    ), {
      loading: "Creating account...",
      success: "Account created successfully!",
      error: "Failed to create account",
    });

    console.log(data, error);
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
                <FormLabel className="text-base font-medium text-gray-900">
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
                <FormLabel className="text-base font-medium text-gray-900">
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
                <FormLabel className="text-base font-medium text-gray-900">
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
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
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
