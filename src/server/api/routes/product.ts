import { createProductTransactionSchema } from "@/app/(app)/transactions/create/_components/schema";
import { parseCSV as parseCsvAndUpdateDb } from "@/lib/api/parseCSV";
import { syncCustomerTable } from "@/lib/api/sync-customer-table";
import { syncProductTable } from "@/lib/api/sync-product-table";
import { product as productTable, productTransactions } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  uploadCSV: protectedProcedure
    .input(
      zfd.formData({
        file: zfd.file(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { file } = input;

      if (!file) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No file uploaded",
        });
      }

      if (!file.name.endsWith(".csv")) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File must be a CSV file. File type: " + file.type,
        });
      }

      const csvText = await file.text();

      try {
        // Execute CSV parsing
        const invalidRows = await parseCsvAndUpdateDb(csvText, ctx.db);

        // Sync tables
        await syncProductTable(new Date());
        await syncCustomerTable(new Date());

        return {
          success: true,
          message: `CSV uploaded successfully. ${invalidRows.length} invalid rows were skipped.`,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),
  getProductTransactions: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db
      .select({
        transactionNumber: productTransactions.transactionNumber,
        type: productTransactions.type,
        date: productTransactions.date,
        productService: productTransactions.productService,
        customer: productTransactions.customer,
        quantity: productTransactions.quantity,
        salesPrice: productTransactions.salesPrice,
        amount: productTransactions.amount,
        balance: productTransactions.balance,
        description: productTransactions.description,
      })
      .from(productTransactions)
      .orderBy(productTransactions.date);

    return transactions;
  }),
  createProductTransaction: protectedProcedure
    .input(createProductTransactionSchema.extend({ balance: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const [transactionId] = await ctx.db
          .insert(productTransactions)
          .values({
            transactionNumber: input.transactionNumber,
            type: input.type,
            date: input.date,
            productService: input.productService,
            customer: input.customer,
            quantity: input.quantity,
            salesPrice: input.salesPrice,
            amount: input.amount,
            balance: input.balance,
            description: input.description,
          })
          .returning({ id: productTransactions.id })
          .execute();

        await syncProductTable(new Date(input.date));
        await syncCustomerTable(new Date(input.date));

        return {
          message: "Transaction created successfully.",
          id: transactionId,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }
      }
    }),
  getProducts: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.select().from(productTable);
    } catch (error) {
      if (error instanceof TRPCError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }
  }),
  syncProducts: protectedProcedure
    .input(z.object({ date: z.date() }))
    .mutation(async ({ input }) => {
      try {
        return await syncProductTable(input.date);
      } catch (error) {
        if (error instanceof Error)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
      }
    }),
});
