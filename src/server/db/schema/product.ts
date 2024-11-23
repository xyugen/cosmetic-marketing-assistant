import { type InferInsertModel } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../table";

export const productTransactions = createTable("product_transactions", {
  id: integer("id").primaryKey(),
  transactionNumber: text("transaction_number").notNull(),
  type: text("type"),
  date: integer("date", { mode: "timestamp" }).notNull(),
  productService: text("product_service").notNull(),
  customer: text("customer").notNull(),
  quantity: integer("quantity").notNull(),
  salesPrice: integer("sales_price").notNull(),
  amount: integer("amount").notNull(),
  balance: integer("amount").notNull(),
  description: text("description"),
});

export type ProductTransactions = InferInsertModel<typeof productTransactions>;