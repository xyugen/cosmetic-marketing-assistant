import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { generateText, streamText } from "ai";
import { customModel } from "@/lib/ai";
import { productMarketingPrompt, systemPrompt } from "@/lib/ai/prompts";
import { TRPCError } from "@trpc/server";

export const aiRouter = createTRPCRouter({
  chat: publicProcedure
    .input(
      z.object({
        message: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const result = await generateText({
          model: customModel(),
          messages: [
            {
              role: "system",
              content: `${systemPrompt}\n\n${productMarketingPrompt}`,
            },
            {
              role: "user",
              content: input.message,
            },
          ],
        });

        return result.text;
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),
  productMarketing: publicProcedure
    .input(
      z.object({
        productName: z.string(),
        productDescription: z.string(),
        emojis: z.boolean().default(false),
        hashtags: z.boolean().default(false),
        tone: z.string(),
      }),
    )
    .mutation(async function* ({ ctx, input }) {
      try {
        const content = `
        Product Name: "${input.productName}"
        Product Description: "${input.productDescription}"
        Emojis: ${input.emojis ? '"Yes"' : '"No"'}
        Hashtags: ${input.hashtags ? '"Yes"' : '"No"'}
        Tone: "${input.tone}"
        `;

        console.log(content);
        const result = await streamText({
          model: customModel(),
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: `${systemPrompt}\n${productMarketingPrompt}`,
            },
            {
              role: "user",
              content: `${content}`,
            },
          ],
        });

        for await (const text of result.fullStream) {
          yield text;
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),
});
