import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmNewPassword: z.string().min(1, "Confirm new password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
