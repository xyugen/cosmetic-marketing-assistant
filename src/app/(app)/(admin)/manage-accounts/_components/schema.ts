import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email too long" }),
});
