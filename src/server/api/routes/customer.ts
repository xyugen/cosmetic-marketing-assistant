import {
  syncCustomerLifetimeValueTable,
  syncCustomerTable,
} from "@/lib/api/customer/mutation";
import { getAllCustomers } from "@/lib/api/customer/query";
import { handleTRPCError } from "@/lib/utils";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
});
