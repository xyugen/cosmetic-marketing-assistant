import {
  getCustomerLifetimeValue,
  getCustomerSegmentation,
  getCustomersValue,
} from "@/lib/api/analytics/query";
import { getBestSellingProducts, getProduct } from "@/lib/api/product/query";
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
  getProduct: protectedProcedure
    .input(
      z.object({
        productName: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getProduct(input.productName);
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
  getBestSellingProducts: protectedProcedure
    .input(
      z
        .object({
          startDate: z.coerce.date(),
          endDate: z.coerce.date(),
          limit: z.number().optional(),
        })
        .refine(({ startDate, endDate }) => startDate <= endDate, {
          message: "Start date must be less than or equal to end date",
        }),
    )
    .query(async ({ input }) => {
      try {
        return await getBestSellingProducts(input.startDate, input.endDate, input.limit);
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
  // TODO: implement getProductTrends
  // getProductTrends: protectedProcedure
  //   .input(
  //     z.object({
        
  //     }),
  //   ).query(async ({ input }) => {
  //     try {
        
  //     } catch (error) {
  //       throw handleTRPCError(error);
  //     }
  //   }),
});
