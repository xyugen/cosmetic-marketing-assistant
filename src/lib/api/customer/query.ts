import { db } from "@/server/db";
import { customer } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const getAllCustomers = async () => {
  try {
    return await db.select().from(customer);
  } catch (error) {
    if (error instanceof Error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
}