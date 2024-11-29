"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type SalesTrend } from "@/interface/SalesTrend";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  totalSales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  totalQuantity: {
    label: "Quantity",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SalesAnalyticsChart({ data }: { data: SalesTrend[] }) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        data={data}
        margin={{ left: 12, right: 12, top: 16, bottom: 12 }}
      >
        <defs>
          <linearGradient id="fillTotalSales" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalSales)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalSales)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillTotalQuantity" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalQuantity)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalQuantity)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />

        {/* Primary Y-Axis for Total Sales */}
        <YAxis
          yAxisId="left"
          tickFormatter={(value) => `₱${value / 1000}k`}
          width={60}
          stroke="var(--color-totalSales)"
        />

        {/* Secondary Y-Axis for Quantity */}
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(value) => `${value}`}
          width={60}
          stroke="var(--color-totalQuantity)"
        />

        {/* X-Axis */}
        <XAxis
          dataKey="period"
          tickMargin={8}
          tickFormatter={(value: string) =>
            format(new Date(value), "MMM dd, ’yy")
          }
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        {/* Total Sales Area */}
        <Area
          yAxisId="left"
          dataKey="totalSales"
          type="monotone"
          fill="url(#fillTotalSales)"
          stroke="var(--color-totalSales)"
          strokeWidth={2}
        />

        {/* Total Quantity Area */}
        <Area
          yAxisId="right"
          dataKey="totalQuantity"
          type="monotone"
          fill="url(#fillTotalQuantity)"
          stroke="var(--color-totalQuantity)"
          strokeWidth={2}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
