import { type SalesTrend } from "@/interface/SalesTrend";
import * as ss from "simple-statistics";

export const predictFutureMonthlySales = ({
  salesTrend,
  forecastPeriods = 3,
}: {
  salesTrend: SalesTrend[];
  forecastPeriods?: number;
}) => {
  const dataPoints = salesTrend.map(({ totalSales }, index) => [
    index,
    totalSales,
  ]);

  const regression = ss.linearRegression(dataPoints);
  const regressionLine = ss.linearRegressionLine(regression);

  // Extract the last period in the salesTrend dataset
  const lastPeriod = salesTrend[salesTrend.length - 1]?.period;
  const lastDate = new Date(`${lastPeriod}-01`); // Convert to a Date object assuming YYYY-MM format

  // Generate predictions for the next periods
  const futurePredictions = Array.from({ length: forecastPeriods }, (_, i) => {
    const futureDate = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth() + i + 1, // Increment month
      1, // First day of the next month
    );
    const futurePeriod = `${futureDate.getFullYear()}-${String(
      futureDate.getMonth() + 1,
    ).padStart(2, "0")}`; // Format as YYYY-MM

    return {
      period: futurePeriod,
      predictedSales: regressionLine(dataPoints.length + i),
    };
  });

  return futurePredictions;
};

export const computeSingleMovingAverage = (data: SalesTrend[]): number => {
  if (data.length === 0) {
    throw new Error("No data available.");
  }

  const totalSales = data.reduce((acc, cur) => acc + cur.totalSales, 0);
  return totalSales / data.length;
};