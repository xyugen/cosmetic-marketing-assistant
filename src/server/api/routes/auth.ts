import {
  isEmailAuthorized
} from "@/lib/api/auth/mutation";
import { handleTRPCError } from "@/lib/utils";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  isEmailAuthorized: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { email } = input;
        return await isEmailAuthorized({ email });
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
});
