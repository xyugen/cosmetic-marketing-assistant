import { customer } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const customerRouter = createTRPCRouter({
  getCustomers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(customer);
  }),
});
