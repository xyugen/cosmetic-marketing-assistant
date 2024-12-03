import { type DeepPartial } from "ai";
import { z } from "zod";

export const objectSchema = z.object({
  productMarketing: z
    .object({
      text: z
        .string()
        .describe(
          "A detailed and captivating description to market the product effectively",
        ),
      hashtags: z
        .array(z.string())
        .optional()
        .describe("Array of the hashtags to be used for the product marketing"),
      imageIdea: z
        .string()
        .optional()
        .describe(
          "A creative concept or suggestion for an image representation of the product",
        ),
      error: z
        .string()
        .optional()
        .describe(
          "Error message if the generation of the product marketing fails",
        ),
    })
    .describe("The product marketing object when only the product is provided")
    .optional(),
  customerMarketing: z
    .object({
      text: z
        .string()
        .describe(
          "A detailed and captivating promotional message to market the customer effectively",
        ),
      error: z
        .string()
        .optional()
        .describe(
          "Error message if the generation of the customer marketing fails",
        ),
    })
    .describe("The customer marketing object when the customer is provided")
    .optional(),
});
export type PartialObjectSchema = DeepPartial<
  typeof objectSchema
>;

export type ObjectSchema = z.infer<typeof objectSchema>;

export type PartialProductMarketing = DeepPartial<
  typeof objectSchema
>["productMarketing"];

export type ProductMarketing = z.infer<
  typeof objectSchema
>["productMarketing"];
