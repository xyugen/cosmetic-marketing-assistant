import { createProductTransactionSchema } from "@/app/(app)/transactions/create/_components/schema";
import { createProductTransaction, syncProductTable, uploadCSV } from "@/lib/api/product/mutation";
import { getAllProducts, getProductTransactions } from "@/lib/api/product/query";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getAllProducts: protectedProcedure.query(async () => {
    return await getAllProducts();
  }),
  getProductTransactions: protectedProcedure.query(async () => {
    return await getProductTransactions();
  }),
  uploadCSV: protectedProcedure
    .input(
      zfd.formData({
        file: zfd.file(),
      }),
    )
    .mutation(async ({ input }) => {
      return await uploadCSV({ file: input.file });
    }),
  createProductTransaction: protectedProcedure
    .input(createProductTransactionSchema.extend({ balance: z.number() }))
    .mutation(async ({ input }) => {
      return await createProductTransaction({ input });
    }),
  syncProducts: protectedProcedure
    .input(z.object({ date: z.date() }))
    .mutation(async ({ input }) => {
      return await syncProductTable({ lastImportDate: input.date });
    }),
});
