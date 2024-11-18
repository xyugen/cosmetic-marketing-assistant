import { z } from "zod";

export const formSchema = z.object({
  productDescription: z
    .string()
    .min(1, { message: "Product description is required" }),
  emojis: z.boolean().default(false),
  hashtags: z.boolean().default(false),
  tone: z
    .enum([
      "playful",
      "elegant",
      "confident/bold",
      "soft/romantic",
      "professional",
      "trendy/edgy",
      "natural",
    ])
    .default("natural"),
});