import { count, db, gte, inArray, max, sql } from "@/server/db";
import {
  product as productTable,
  productTransactions,
} from "@/server/db/schema";

export const syncProductTable = async (lastImportDate: Date) => {
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
};
