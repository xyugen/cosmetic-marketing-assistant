import { count, db, gte, inArray, max, sql } from "@/server/db";
import {
  type InsertProductTransaction,
  product as productTable,
  productTransactions,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { syncCustomerLifetimeValueTable, syncCustomerTable } from "../customer/mutation";
import { parseCsvAndUpdateDb } from "../parseCSV";

export const uploadCSV = async ({ file }: { file: File }) => {
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
    const invalidRows = await parseCsvAndUpdateDb(csvText, db);

    // Sync tables
    await syncProductTable({ lastImportDate: new Date() });
    await syncCustomerTable({ lastImportDate: new Date() });
    await syncCustomerLifetimeValueTable();

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
};

export const createProductTransaction = async ({
  input,
}: {
  input: InsertProductTransaction;
}) => {
  try {
    const [transactionId] = await db
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

    await syncProductTable({ lastImportDate: new Date(input.date) });
    await syncCustomerTable({ lastImportDate: new Date(input.date) });
    await syncCustomerLifetimeValueTable();

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
};

export const syncProductTable = async ({
  lastImportDate,
}: {
  lastImportDate: Date;
}) => {
  try {
    const uniqueProducts = await db
      .selectDistinct({ product: productTransactions.productService })
      .from(productTransactions)
      .where(gte(productTransactions.date, lastImportDate))
      .execute();

    const updatedProducts = await db
      .select({
        productService: productTransactions.productService,
        totalSales: sql<number>`sum(${productTransactions.balance})`,
        totalTransactions: count(productTransactions.transactionNumber),
        totalQuantitySold: sql<number>`sum(${productTransactions.quantity})`,
        lastTransactionDate: max(productTransactions.date),
        topCustomer: sql<string>`max(${productTransactions.customer})`,
        averagePrice: sql<number>`avg(${productTransactions.salesPrice})`,
      })
      .from(productTransactions)
      .where(
        inArray(
          productTransactions.productService,
          uniqueProducts.map((p) => p.product),
        ),
      )
      .groupBy(productTransactions.customer);

    try {
      await Promise.all(
        updatedProducts.map(async (product) => {
          await db
            .insert(productTable)
            .values({
              productService: product.productService,
              totalSales: product.totalSales,
              totalTransactions: product.totalTransactions,
              totalQuantitySold: product.totalQuantitySold,
              lastTransactionDate: product.lastTransactionDate,
              topCustomer: product.topCustomer,
              averagePrice: product.averagePrice,
            })
            .onConflictDoUpdate({
              target: productTable.productService,
              set: {
                totalSales: product.totalSales,
                totalTransactions: product.totalTransactions,
                totalQuantitySold: product.totalQuantitySold,
                lastTransactionDate: product.lastTransactionDate,
                topCustomer: product.topCustomer,
                averagePrice: product.averagePrice,
              },
            });
        }),
      );
    } catch (error) {
      console.log(error);
      throw new Error("Failed to sync product table");
    }

    return { message: "Transactions and customer data synced successfully!" };
  } catch (error) {
    if (error instanceof Error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
  }
};
