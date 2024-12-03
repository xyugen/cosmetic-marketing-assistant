"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumberShorthand } from "@/lib/utils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { TrendingUp } from "lucide-react";
import { Line, LineChart, ReferenceDot, XAxis, YAxis } from "recharts";

const chartConfig = {
  totalSales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const SalesForecasting = () => {
  const { data } = api.analytics.predictSales.useQuery();

  if (!data) return null;

  const referencePoint = data[data.length - 1];
  const dataPointsLastElementIndex = data.length - 1;
  const indexToStartColouredLineFrom = dataPointsLastElementIndex - 1;
  const cutOff =
    100 -
    ((dataPointsLastElementIndex - indexToStartColouredLineFrom) /
      dataPointsLastElementIndex) *
      100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Forecasting</CardTitle>
        <CardDescription>
          Predicted sales trend for the next month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                <stop offset={`${cutOff}%`} stopColor="hsl(var(--chart-1))" />
                <stop offset={`${cutOff}%`} stopColor="#fddc00" />
                <stop offset="100%" stopColor="#fddc00" />
              </linearGradient>
            </defs>
            <YAxis
              tickFormatter={(value: number) => {
                return `PHP ${formatNumberShorthand(value)}`;
              }}
            />
            <XAxis
              dataKey="period"
              tickFormatter={(value: string) =>
                format(new Date(value), "MMM yyyy")
              }
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="url(#gradient)"
              strokeWidth={2}
              dot={false}
            />

            <ReferenceDot
              x={referencePoint?.period}
              y={referencePoint?.totalSales}
              r={3}
              fill="#fddc00"
              stroke={"#fddc00"}
            />
          </LineChart>
        </ChartContainer>
        <Alert className="mt-4">
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>AI Insight</AlertTitle>
          <AlertDescription>
            Sales are predicted to increase by 20% in the next quarter. Consider
            increasing inventory for top-selling products.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default SalesForecasting;
