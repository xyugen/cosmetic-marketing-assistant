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
