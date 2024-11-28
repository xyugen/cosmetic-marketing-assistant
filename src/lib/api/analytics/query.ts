import type { CustomerValue } from "@/interface/CustomerValue";
import { categorizeByStandardDeviation } from "@/lib/utils";
import { asc, db, desc, eq, sql } from "@/server/db";
import {
  type Customer,
  customer,
  customerLifetimeValue as customerLifetimeValueTable,
  productTransactions,
} from "@/server/db/schema";

export const getCustomersValue = async (): Promise<CustomerValue[]> => {
  const customers = await db
    .select({
      id: customer.id,
      name: customer.name,
      firstTransactionDate: customer.firstTransactionDate,
      lastTransactionDate: customer.lastTransactionDate,
      totalTransactions: customer.totalTransactions,
      averageTransactionValue: customer.averageTransactionValue,
    })
    .from(customer)
    .execute();

  const customersValue = mapCustomersValue(customers);

  return customersValue;
};

export const getCustomerSegmentation = async () => {
  const customersValue = await getCustomersValue();

  // Categorize monetary and frequency values using standard deviation
  const {
    lows: monetaryLows,
    average: monetaryAverage,
    highs: monetaryHighs,
  } = categorizeByStandardDeviation(
    customersValue.map((customer) => customer.monetary ?? 0),
  );

  const { average: frequencyAverage, highs: frequencyHighs } =
    categorizeByStandardDeviation(
      customersValue.map((customer) => customer.frequency ?? 0),
    );

  // Define thresholds
  const AT_RISK_THRESHOLD_DAYS = 30; // Days since last transaction
  const ONE_TIME_FREQUENCY = 1;

  // Map customers to their segments
  const customerSegmentation = customersValue.map((customer: CustomerValue) => {
    const { frequency = 0, monetary = 0, recencyInDays = 0 } = customer;

    // High-value customers
    if (
      frequencyHighs.includes(frequency) &&
      monetaryHighs.includes(monetary)
    ) {
      return { ...customer, segment: "High Value" };
    }

    // At-risk customers
    if (recencyInDays > AT_RISK_THRESHOLD_DAYS) {
      return { ...customer, segment: "At Risk" };
    }

    // One-time buyers
    if (frequency === ONE_TIME_FREQUENCY) {
      return { ...customer, segment: "One-Time Buyer" };
    }

    // Potential growth: Low/average monetary value but moderate frequency
    if (
      (monetaryLows.includes(monetary) || monetaryAverage.includes(monetary)) &&
      frequencyAverage.includes(frequency)
    ) {
      return { ...customer, segment: "Potential Growth" };
    }

    // Default segment for uncategorized customers
    return { ...customer, segment: "Other" };
  });

  // Return segmented customers
  return customerSegmentation.filter(Boolean);
};

export const mapCustomersValue = (customers: Customer[]) => {
  const currentDate = new Date();
  const customersValue = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    lifetimeInDays: Math.floor(
      (currentDate.getTime() - customer.lastTransactionDate!.getTime()) /
        (1000 * 60 * 60 * 24),
    ),
    recencyInDays: Math.floor(
      (currentDate.getTime() - customer.lastTransactionDate!.getTime()) /
        (1000 * 60 * 60 * 24),
    ),
    frequency: customer.totalTransactions,
    monetary: customer.averageTransactionValue,
  }));

  return customersValue;
};

export const getCustomerLifetimeValue = async () => {
  const customerLifetimeValue = await db
    .select({
      customerId: customerLifetimeValueTable.customerId,
      lifetimeValue: customerLifetimeValueTable.lifetimeValue,
      customer: {
        name: customer.name,
        firstTransactionDate: customer.firstTransactionDate,
        lastTransactionDate: customer.lastTransactionDate,
        totalTransactions: customer.totalTransactions,
        averageTransactionValue: customer.averageTransactionValue,
      },
    })
    .from(customerLifetimeValueTable)
    .innerJoin(customer, () =>
      eq(customer.id, customerLifetimeValueTable.customerId),
    )
    .execute();

  return customerLifetimeValue;
};

export const getTopSpendingCustomers = async (limit = 10) => {
  const topSpendingCustomers = await db
    .select()
    .from(customer)
    .orderBy(desc(customer.outstandingBalance))
    .limit(limit)
    .execute();

  return topSpendingCustomers;
};

export const getMonthlySales = async () => {
  const monthlySales = await db
    .select({
      month:
        sql<string>`strftime('%Y-%m', datetime(${productTransactions.date}, 'unixepoch'))`.as(
          "month",
        ),
      totalSales: sql<number>`SUM(${productTransactions.amount})`.as(
        "totalSales",
      ),
      totalTransactions:
        sql<number>`COUNT(${productTransactions.transactionNumber})`.as(
          "totalTransactions",
        ),
      totalQuantity: sql<number>`SUM(${productTransactions.quantity})`.as(
        "totalQuantity",
      ),
    })
    .from(productTransactions)
    .where(
      sql`datetime(${productTransactions.date}, 'unixepoch') >= datetime('now', '-12 months')`,
    )
    .groupBy(
      sql`strftime('%Y-%m', datetime(${productTransactions.date}, 'unixepoch'))`,
    )
    .orderBy(
      asc(
        sql`strftime('%Y-%m', datetime(${productTransactions.date}, 'unixepoch'))`,
      ),
    );

  return monthlySales;
};
