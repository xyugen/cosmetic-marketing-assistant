import { type InferInsertModel } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../table";

export const customer = createTable("customer", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  totalTransactions: integer("total_transactions").notNull().default(0),
  totalQuantityPurchased: integer("total_quantity_purchased")
    .notNull()
    .default(0),
  lastTransactionDate: integer("last_transaction_date", { mode: "timestamp" }),
  mostPurchasedProductService: text("most_purchased_product_service"),
  averageTransactionValue: integer("average_transaction_value")
    .notNull()
    .default(0),
  outstandingBalance: integer("outstanding_balance").notNull().default(0),
  descriptionNotes: text("description_notes"),
});

export type Customer = InferInsertModel<typeof customer>;
