import { Interval } from "@/constants/interval";
import {
  getCustomerLifetimeValue,
  getCustomerRetention,
  getCustomerSegmentation,
  getCustomersValue,
  getMonthlySales,
  getSalesTrend,
  getTopSpendingCustomers,
  getTransactionsOverview,
} from "@/lib/api/analytics/query";
import {
  getBestSellingProducts,
  getBestSellingProductsBetweenDates,
  getProduct,
} from "@/lib/api/product/query";
import { categorizeByStandardDeviation, handleTRPCError } from "@/lib/utils";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { computeSingleMovingAverage } from "@/lib/api/analytics/prediction";

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
  getSalesTrend: protectedProcedure
    .input(
      z.object({
        interval: z.nativeEnum(Interval).optional(),
        value: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getSalesTrend(input);
      } catch (error) {
        if (error instanceof Error) {
          throw handleTRPCError(error);
        }
      }
    }),
  getMonthlySales: protectedProcedure
    .input(
      z.object({
        months: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { months } = input;
        return await getMonthlySales({ months });
      } catch (error) {
        if (error instanceof Error) {
          throw handleTRPCError(error);
        }
      }
    }),
  getBestSellingProducts: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getBestSellingProducts(input.limit);
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
  getBestSellingProductsBetweenDates: protectedProcedure
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
        return await getBestSellingProductsBetweenDates(
          input.startDate,
          input.endDate,
          input.limit,
        );
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
  getTopSpendingCustomers: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getTopSpendingCustomers(input.limit);
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
  getTransactionsOverview: protectedProcedure.query(async () => {
    try {
      return await getTransactionsOverview();
    } catch (error) {
      throw handleTRPCError(error);
    }
  }),
  predictSales: protectedProcedure.query(async () => {
    try {
      const salesTrend = await getSalesTrend({ value: 6 });

      const lastDate = new Date(
        salesTrend[salesTrend.length - 1]?.period ?? Date.now(),
      );
      const nextMonth = new Date(
        lastDate.setMonth(lastDate.getMonth() + 1),
      ).toLocaleString("en-CA", { year: "numeric", month: "2-digit" });

      return [
        ...salesTrend,
        {
          period: nextMonth,
          totalSales: computeSingleMovingAverage(salesTrend),
        },
      ];
    } catch (error) {
      if (error instanceof Error) throw handleTRPCError(error);
    }
  }),
  getCustomerRetention: protectedProcedure
    .input(z.object({ months: z.number().optional() }))
    .query(async ({ input }) => {
      try {
        const { months } = input;
        return await getCustomerRetention({ months });
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
  getCustomerGrowthRate: protectedProcedure.query(async () => {
    try {
      const customerRetention = await getCustomerRetention({ months: 2 });
      if (customerRetention.length < 2) {
        return { customerRetention, growthRate: 0 };
      }

      const growthRate =
        (((customerRetention?.[customerRetention.length - 1]?.totalCustomers ??
          0) -
          (customerRetention?.[0]?.totalCustomers ?? 0)) /
          (customerRetention?.[0]?.totalCustomers ?? 0)) *
        100;
      return { customerRetention, growthRate };
    } catch (error) {
      throw handleTRPCError(error);
    }
  }),
});
