import { db } from "@/server/db";
import {
  product as productTable,
  productTransactions,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const getProductTransactions = async () => {
  try {
    const transactions = await db
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
  } catch (error) {
    if (error instanceof TRPCError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
};

export const getAllProducts = async () => {
  try {
    return await db.select().from(productTable);
  } catch (error) {
    if (error instanceof TRPCError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
};
