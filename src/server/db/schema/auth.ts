import { text, integer } from "drizzle-orm/sqlite-core";
import { createTable } from "../table";
import { sql } from "drizzle-orm";

// User Table
export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email")
    .notNull()
    .references(() => authorizedEmail.email, { onDelete: "cascade" }),
  emailVerified: integer("emailVerified", { mode: "boolean" }),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .$type<Date>(),
});

// Session Table
export const session = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
});

// Account Table
export const account = createTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  password: text("password"),
});

// Verification Table
export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
});

// Authorized Email Table - This is used to store authorized emails for a user before they can create an account
export const authorizedEmail = createTable("authorized_email", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
});
