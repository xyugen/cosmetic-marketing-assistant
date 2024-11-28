import {
  getCustomerLifetimeValue,
  getCustomerSegmentation,
  getCustomersValue,
} from "@/lib/api/analytics/query";
import { categorizeByStandardDeviation, handleTRPCError } from "@/lib/utils";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const analyticsRoute = createTRPCRouter({
  segregateData: protectedProcedure
    .input(
      z.object({
        data: z.array(z.number()),
      }),
    )
    .query(({ input }) => {
      return categorizeByStandardDeviation(input.data);
    }),
  getCustomersValue: protectedProcedure.query(async () => {
    try {
      return await getCustomersValue();
    } catch (error) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }
  }),
  getCustomerSegmentation: protectedProcedure.query(async () => {
    try {
      return await getCustomerSegmentation();
    } catch (error) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }
  }),
  getCustomerLifetimeValue: protectedProcedure.mutation(async () => {
    try {
      // await syncCustomerLifetimeValueTable();
      return await getCustomerLifetimeValue();
    } catch (error) {
      if (error instanceof Error) {
        throw handleTRPCError(error);
      }
    }
  }),
});
