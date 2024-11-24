import { customer } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { syncCustomerTable } from "@/lib/api/sync-customer-table";

export const customerRouter = createTRPCRouter({
  getCustomers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(customer);
  }),
  syncCustomers: protectedProcedure
    .input(z.object({ date: z.date() }))
    .mutation(async ({ input }) => {
      return await syncCustomerTable(input.date);
    }),
});
