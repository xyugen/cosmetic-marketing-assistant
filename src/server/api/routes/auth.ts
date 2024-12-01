import {
  authorizeEmail,
  isEmailAuthorized,
  revokeAuthorizedEmail,
} from "@/lib/api/auth/mutation";
import { getAllAuthorizedEmails } from "@/lib/api/auth/query";
import { handleTRPCError } from "@/lib/utils";
import { z } from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

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
  getAuthorizedEmails: adminProcedure.query(async () => {
    try {
      return await getAllAuthorizedEmails();
    } catch (error) {
      throw handleTRPCError(error);
    }
  }),
  revokeAuthorizedEmail: adminProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { email } = input;
        const isAuthorized = await isEmailAuthorized({ email });
        if (!isAuthorized) {
          throw new Error("Email is already unauthorized");
        }
        await revokeAuthorizedEmail({ email });
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
  authorizeEmail: adminProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { email } = input;
        const isAuthorized = await isEmailAuthorized({ email });
        if (isAuthorized) {
          throw new Error("Email is already authorized");
        }
        return await authorizeEmail({ email });
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
});
