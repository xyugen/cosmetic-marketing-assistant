import {
  syncCustomerLifetimeValueTable,
  syncCustomerTable,
} from "@/lib/api/customer/mutation";
import { getAllCustomers } from "@/lib/api/customer/query";
import { handleTRPCError } from "@/lib/utils";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getNewCustomers } from "@/lib/api/analytics/query";

export const customerRouter = createTRPCRouter({
  getAllCustomers: protectedProcedure.query(async () => {
    try {
      return await getAllCustomers();
    } catch (error) {
      throw handleTRPCError(error);
    }
  }),
  syncCustomers: protectedProcedure
    .input(z.object({ date: z.date() }))
    .mutation(async ({ input }) => {
      try {
        return await syncCustomerTable({ lastImportDate: input.date });
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
  syncCustomersLifetimeValue: protectedProcedure.mutation(async () => {
    try {
      return await syncCustomerLifetimeValueTable();
    } catch (error) {
      throw handleTRPCError(error);
    }
  }),
  getNewCustomers: protectedProcedure
    .input(
      z.object({
        months: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { months } = input;
        return await getNewCustomers({ months });
      } catch (error) {
        throw handleTRPCError(error);
      }
    }),
});
