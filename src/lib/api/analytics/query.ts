import { db } from "@/server/db";
import { type Customer, customer } from "@/server/db/schema";

export const getCustomersValue = async () => {
  const customers = await db
    .select({
      id: customer.id,
      name: customer.name,
      lastTransactionDate: customer.lastTransactionDate,
      totalTransactions: customer.totalTransactions,
      averageTransactionValue: customer.averageTransactionValue,
    })
    .from(customer)
    .execute();

  const customersValue = mapCustomersValue(customers);

  return customersValue;
};

export const mapCustomersValue = (customers: Customer[]) => {
  const currentDate = new Date();
  const customersValue = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    recencyInDays: Math.floor(
      (currentDate.getTime() - customer.lastTransactionDate!.getTime()) /
        (1000 * 60 * 60 * 24),
    ),
    frequency: customer.totalTransactions,
    monetary: customer.averageTransactionValue,
  }));

  return customersValue;
};
