import { syncCustomerTable } from "@/lib/api/customer/mutation";
import { getAllCustomers } from "@/lib/api/customer/query";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const customerRouter = createTRPCRouter({
  getAllCustomers: protectedProcedure.query(async () => {
    return await getAllCustomers();
  }),
  syncCustomers: protectedProcedure
    .input(z.object({ date: z.date() }))
    .mutation(async ({ input }) => {
      return await syncCustomerTable({ lastImportDate: input.date });
    }),
});
