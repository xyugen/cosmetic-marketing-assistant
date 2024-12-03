import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../table";
import { customer } from "./customer";

export const product = createTable("product", {
  id: integer("id").primaryKey(),
  productService: text("product_service").notNull().unique(),
  totalSales: integer("total_sales").notNull().default(0),
  totalQuantitySold: integer("total_quantity_sold").notNull().default(0),
  totalTransactions: integer("total_transactions").notNull().default(0),
  averagePrice: integer("average_price").notNull().default(0),
  lastTransactionDate: integer("last_transaction_date", { mode: "timestamp" }),
  topCustomer: text("top_customer").references(() => customer.name),
  description: text("description"),
});

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

export type Product = InferInsertModel<typeof product>;
export type ProductTransaction = InferInsertModel<typeof productTransactions>;

export type InsertProduct = InferInsertModel<typeof product>;
export type InsertProductTransaction = InferInsertModel<
  typeof productTransactions
>;
