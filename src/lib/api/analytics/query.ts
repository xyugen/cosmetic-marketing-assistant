import { Interval } from "@/constants/interval";
import type { CustomerValue } from "@/interface/CustomerValue";
import { type MonthlySale } from "@/interface/MonthlySale";
import { type SalesTrend } from "@/interface/SalesTrend";
import { categorizeByStandardDeviation } from "@/lib/utils";
import { asc, db, desc, eq, sql } from "@/server/db";
import {
  type Customer,
  customer,
  customerLifetimeValue as customerLifetimeValueTable,
  productTransactions,
} from "@/server/db/schema";

/**
 * Retrieves all customers and their associated values for customer segmentation.
 * Values include customer name, first and last transaction date, total transactions,
 * and average transaction value.
 *
 * @returns An array of CustomerValue objects, each containing the customer's
 *          id, name, lifetime in days, recency in days, frequency, and monetary.
 */
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
      return { ...customer, segment: "High-Value" };
    }

    // At-risk customers
    if (recencyInDays > AT_RISK_THRESHOLD_DAYS) {
      return { ...customer, segment: "At-Risk" };
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

export const getCustomerLifetimeValue = async ({
  page,
  limit,
  sort,
}: {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
}) => {
  const query = db
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
    );

  if (page && limit) {
    query.limit(limit).offset((page - 1) * limit);
  }
  if (sort) {
    const orderFn = sort === "asc" ? asc : desc;
    query.orderBy(orderFn(customerLifetimeValueTable.lifetimeValue));
  }

  const customerLifetimeValue = await query.execute();

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

/**
 * Returns sales trend data grouped by the specified interval
 * @param interval The interval to group the data by. Defaults to months.
 * @param value The number of intervals to retrieve. Defaults to 12.
 * @returns An array of objects containing the period, total sales, total transactions, and total quantity for each interval
 */
export const getSalesTrend = async ({
  interval = Interval.Months, // Default to months
  value = 12, // Default to last 12 intervals
}: {
  interval?: Interval;
  value?: number;
}): Promise<SalesTrend[]> => {
  // Mapping of interval to SQLite date format
  const intervalFormatMap = {
    [Interval.Days]: "%Y-%m-%d",
    [Interval.Weeks]: "%Y-%m-%d", // Year and ISO week
    [Interval.Months]: "%Y-%m",
    [Interval.Years]: "%Y",
  };

  // Select the appropriate date format based on the interval
  const dateFormat = intervalFormatMap[interval];
  // Build the date interval
  const dateInterval =
    interval === Interval.Weeks // if interval is weeks
      ? -value * 7 + " days"
      : -value + " " + interval;
  // Build the query
  const salesTrend = await db
    .select({
      period:
        sql<string>`strftime(${dateFormat}, datetime(${productTransactions.date}, 'unixepoch'))`.as(
          "period",
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
      topProduct: sql<string>`MAX(${productTransactions.productService})`.as(
        "topProduct",
      ),
    })
    .from(productTransactions)
    .where(
      sql`datetime(${productTransactions.date}, 'unixepoch') >= datetime('now', ${dateInterval})`,
    )
    .groupBy(
      sql`strftime(${dateFormat}, datetime(${productTransactions.date}, 'unixepoch'))`,
    )
    .orderBy(
      asc(
        sql`strftime(${dateFormat}, datetime(${productTransactions.date}, 'unixepoch'))`,
      ),
    );

  return salesTrend;
};

export const getMonthlySales = async ({
  months = 12,
}: {
  months?: number;
}): Promise<MonthlySale[]> => {
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
      sql`datetime(${productTransactions.date}, 'unixepoch') >= datetime('now', ${-months + " months"})`,
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

export const getTransactionsOverview = async () => {
  const transactionsOverview = await db
    .select({
      totalSales: sql<number>`SUM(${productTransactions.amount})`.as(
        "totalSales",
      ),
      averageSales: sql<number>`AVG(${productTransactions.amount})`.as(
        "averageSales",
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
    .execute();

  return transactionsOverview;
};

export const getCustomerRetention = async ({
  months = 12,
}: {
  months?: number;
}) => {
  const customerRetention = await db
    .select({
      month:
        sql<string>`strftime('%Y-%m', datetime(${productTransactions.date}, 'unixepoch'))`.as(
          "month",
        ),
      totalCustomers:
        sql<number>`COUNT(DISTINCT ${productTransactions.customer})`.as(
          "totalCustomers",
        ),
    })
    .from(productTransactions)
    .where(
      sql`datetime(${productTransactions.date}, 'unixepoch') >= datetime('now', ${-months + " months"})`,
    )
    .groupBy(
      sql`strftime('%Y-%m', datetime(${productTransactions.date}, 'unixepoch'))`,
    ) // Group by month
    .orderBy(
      asc(
        sql`strftime('%Y-%m', datetime(${productTransactions.date}, 'unixepoch'))`,
      ),
    );

  return customerRetention;
};

export const getNewCustomers = async ({ months = 12 }: { months?: number }) => {
  const newCustomers = await db
    .select({
      month:
        sql<string>`strftime('%Y-%m', datetime(${customer.firstTransactionDate}, 'unixepoch'))`.as(
          "month",
        ),
      totalCustomers: sql<number>`COUNT(DISTINCT ${customer.id})`.as(
        "totalCustomers",
      ),
    })
    .from(customer)
    .where(
      sql`datetime(${customer.firstTransactionDate}, 'unixepoch') >= datetime('now', ${-months + " months"})`,
    )
    .groupBy(
      sql`strftime('%Y-%m', datetime(${customer.firstTransactionDate}, 'unixepoch'))`,
    ) // Group by month
    .orderBy(
      asc(
        sql`strftime('%Y-%m', datetime(${customer.firstTransactionDate}, 'unixepoch'))`,
      ),
    );

  return newCustomers;
};
