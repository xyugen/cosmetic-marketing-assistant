import { z } from "zod";

export const formSchema = z
  .object({
    fullName: z
      .string({ message: "Full name is required" })
      .min(3, { message: "Full name must be at least 3 characters" })
      .max(255, { message: "Full name too long" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" })
      .max(255, { message: "Email too long" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(255, { message: "Password too long" }),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(6, { message: "Confirm password must be at least 6 characters" })
      .max(255, { message: "Confirm password too long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormSchema = typeof formSchema;
