"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Interval } from "@/constants/interval";
import { calculatePercentageTrend } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Calendar, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { SalesAnalyticsChart } from "../charts/sales-analytics-chart";

const SalesAnalytics = ({ className }: { className?: string }) => {
  const [interval, setInterval] = useState<Interval>(Interval.Months);
  const [numberOfIntervals, setNumberOfIntervals] = useState<number>(12);

  const { data: salesTrend, isLoading } = api.analytics.getSalesTrend.useQuery({
    interval,
    value: numberOfIntervals,
  });

  const percentageTrend = calculatePercentageTrend(salesTrend ?? []);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between text-lg">
        <div className="w-full">
          <span className="font-semibold">Sales Analytics</span>
          <CardDescription>Total analytics sales</CardDescription>
        </div>
        <div className="flex flex-row flex-wrap gap-2 sm:flex-nowrap">
          <Input
            type="number"
            className="w-24"
            value={numberOfIntervals}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (isNaN(newValue)) return;
              setNumberOfIntervals(newValue);
            }}
          />
          <Select
            defaultValue={interval}
            onValueChange={async (value: Interval) => {
              setInterval(value);
            }}
          >
            <SelectTrigger className="w-fit space-x-2">
              <Calendar className="size-4" />
              <SelectValue placeholder="Select Interval" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Interval).map((interval) => (
                <SelectItem key={interval} value={interval}>
                  {interval.charAt(0).toUpperCase() + interval.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading || !salesTrend ? (
          <Skeleton className="h-60 w-full animate-pulse rounded-md md:h-80" />
        ) : (
          <SalesAnalyticsChart data={salesTrend} />
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {isLoading || !percentageTrend ? (
            <Skeleton className="h-6 w-56 animate-pulse rounded-md" />
          ) : (
            <>
              Trending {percentageTrend > 0 ? "up" : "down"} by{" "}
              {Math.abs(percentageTrend).toFixed(2)}% this{" "}
              {interval.slice(0, -1)}{" "}
              {percentageTrend > 0 ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {isLoading || !percentageTrend ? (
            <Skeleton className="h-4 w-64 animate-pulse rounded-md" />
          ) : (
            <>
              Showing total sales for the last {numberOfIntervals} {interval}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SalesAnalytics;
