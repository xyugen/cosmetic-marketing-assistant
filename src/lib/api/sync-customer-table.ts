import { count, db, gte, inArray, max, sql } from "@/server/db";
import {
  customer as customerTable,
  productTransactions,
} from "@/server/db/schema";

export const syncCustomerTable = async (lastImportDate: Date) => {
  const uniqueCustomers = await db
    .selectDistinct({ customer: productTransactions.customer })
    .from(productTransactions)
    .where(gte(productTransactions.date, lastImportDate))
    .execute();

  const updatedCustomers = await db
    .select({
      name: productTransactions.customer,
      totalTransactions: count(productTransactions.transactionNumber),
      totalQuantityPurchased: sql<number>`sum(${productTransactions.quantity})`,
      lastTransactionDate: max(productTransactions.date),
      mostPurchasedProductService: sql<string>`max(${productTransactions.productService})`,
      averageTransactionValue: sql<number>`avg(${productTransactions.amount})`,
      outstandingBalance: sql<number>`sum(${productTransactions.balance})`,
    })
    .from(productTransactions)
    .where(
      inArray(
        productTransactions.customer,
        uniqueCustomers.map((c) => c.customer),
      ),
    )
    .groupBy(productTransactions.customer);
  try {
    await Promise.all(
      updatedCustomers.map(async (customer) => {
        await db
          .insert(customerTable)
          .values({
            name: customer.name,
            totalTransactions: customer.totalTransactions,
            totalQuantityPurchased: customer.totalQuantityPurchased,
            lastTransactionDate: customer.lastTransactionDate,
            mostPurchasedProductService: customer.mostPurchasedProductService,
            averageTransactionValue: customer.averageTransactionValue,
            outstandingBalance: customer.outstandingBalance,
          })
          .onConflictDoUpdate({
            target: customerTable.name,
            set: {
              totalTransactions: customer.totalTransactions,
              totalQuantityPurchased: customer.totalQuantityPurchased,
              lastTransactionDate: customer.lastTransactionDate,
              mostPurchasedProductService: customer.mostPurchasedProductService,
              averageTransactionValue: customer.averageTransactionValue,
              outstandingBalance: customer.outstandingBalance,
            },
          });
      }),
    );
  } catch (error) {
    console.log(error);
  }

  return { message: "Transactions and customer data synced successfully!" };
};
