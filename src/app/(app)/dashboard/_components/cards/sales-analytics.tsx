import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { calculatePercentageTrend } from "@/lib/utils";
import { api } from "@/trpc/server";
import { TrendingDown, TrendingUp } from "lucide-react";
import { SalesAnalyticsChart } from "../charts/sales-analytics-chart";

const SalesAnalytics = async () => {
  const MONTHS = 12;
  
  const monthlySales = await api.analytics.getMonthlySales({
    months: MONTHS,
  });

  const percentageTrend = calculatePercentageTrend(monthlySales!);

  return (
    <Card>
      <CardHeader className="text-lg">
        <span className="font-semibold">Sales Analytics</span>
        <CardDescription>Total analytics sales</CardDescription>
      </CardHeader>
      <CardContent>
        {monthlySales && <SalesAnalyticsChart data={monthlySales} />}
      </CardContent>
      {percentageTrend && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending {percentageTrend > 0 ? "up" : "down"} by{" "}
            {Math.abs(percentageTrend).toFixed(2)}% this month{" "}
            {percentageTrend > 0 ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total sales for the last {MONTHS} months
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default SalesAnalytics;
