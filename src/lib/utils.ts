import { type MonthlySale } from "@/interface/MonthlySale";
import { type SalesTrend } from "@/interface/SalesTrend";
import { TRPCError } from "@trpc/server";
import { type CoreMessage } from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retrieves the most recent message from a user.
 *
 * This function filters the provided array of messages to find those
 * that have been sent by users (i.e., messages with the role "user").
 * It then returns the last message in this filtered list, which represents
 * the most recent user message.
 *
 * @param messages - An array of CoreMessage objects to search through.
 * @returns The most recent CoreMessage object sent by a user, or undefined
 * if there are no user messages.
 */
export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.at(-1);
}

/**
 * Generates a random UUID (Universally Unique Identifier).
 *
 * This function creates a UUID of version 4, which is randomly generated.
 * The UUID consists of 32 hexadecimal digits displayed in 5 groups separated
 * by hyphens, in the form 8-4-4-4-12 for a total of 36 characters.
 *
 * @returns A string representing the generated UUID.
 */
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Calculates the mean of an array of numbers.
 *
 * The mean is the average value of all the numbers in the array.
 *
 * @param data - An array of numbers to calculate the mean of.
 * @returns The mean of the provided array of numbers.
 */
export const calculateMean = (data: number[]) => {
  const sum = data.reduce((sum, value) => sum + value, 0);
  return sum / data.length;
};

/**
 * Calculates the standard deviation of an array of numbers.
 *
 * Standard deviation is a measure of the amount of variation or dispersion
 * in a set of values. A low standard deviation indicates that the values
 * tend to be close to the mean, while a high standard deviation indicates
 * that the values are spread out over a wider range.
 *
 * @param data - An array of numbers for which the standard deviation is to be calculated.
 * @returns The standard deviation of the provided array of numbers.
 */
export const calculateStandardDeviation = (data: number[]) => {
  const n = data.length;

  const mean = data.reduce((sum, value) => sum + value, 0) / n;

  const variance =
    data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / n;

  const standardDeviation = Math.sqrt(variance);

  return standardDeviation;
};

/**
 * Categorizes an array of numbers into three categories: those below one
 * standard deviation from the mean, those within one standard deviation of
 * the mean, and those above one standard deviation from the mean.
 *
 * @param data - An array of numbers to be categorized.
 * @returns An object with three properties: "lows", "average", and "highs",
 * each containing an array of numbers that fall within the respective
 * category.
 */
export const categorizeByStandardDeviation = (data: number[]) => {
  const mean = calculateMean(data);
  const standardDeviation = calculateStandardDeviation(data);

  const low = mean - standardDeviation;
  const high = mean + standardDeviation;

  const lows = data.filter((num) => num < low);
  const average = data.filter((num) => num >= low && num <= high);
  const highs = data.filter((num) => num > high);

  return {
    lows,
    average,
    highs,
  };
};

/**
 * Handles an error that may be thrown by a tRPC procedure. If the error
 * is an instance of Error, it is converted to a TRPCError with the
 * code "INTERNAL_SERVER_ERROR". Otherwise, the error is returned as-is.
 *
 * @param error - The error to be handled.
 * @returns The handled error.
 */
export const handleTRPCError = (error: unknown) => {
  if (error instanceof Error) {
    return new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }

  return error;
};

export const calculatePercentageTrend = (data: SalesTrend[]): number | null => {
  if (data.length < 2) {
    return null;
  }

  // Sort data by period (assuming ISO 8601 format 'YYYY-MM')
  const sortedData = data.sort(
    (a, b) => new Date(a.period).getTime() - new Date(b.period).getTime(),
  );

  const currentPeriodSales = sortedData[sortedData.length - 1]!.totalSales;
  const previousPeriodSales = sortedData[sortedData.length - 2]!.totalSales;

  // Calculate percentage trend
  const percentageChange =
    ((currentPeriodSales - previousPeriodSales) / previousPeriodSales) * 100;

  // Format the result
  return percentageChange;
};

export const calculateMonthPercentageTrend = (
  data: MonthlySale[],
): number | null => {
  if (data.length < 2) {
    return null;
  }

  // Sort data by month (assuming ISO 8601 format 'YYYY-MM')
  const sortedData = data.sort(
    (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime(),
  );

  const currentMonthSales = sortedData[sortedData.length - 1]!.totalSales;
  const previousMonthSales = sortedData[sortedData.length - 2]!.totalSales;

  // Calculate percentage trend
  const percentageChange =
    ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;

  // Format the result
  return percentageChange;
};

export const formatNumberShorthand = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toLocaleString().replace(/\.0$/, "")}b`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toLocaleString().replace(/\.0$/, "")}m`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toLocaleString().replace(/\.0$/, "")}k`;
  }
  return num.toString();
};
