"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { api } from "@/trpc/react";
import { TrendingUp } from "lucide-react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

// Chart Config
const chartConfig = {
  segment: {
    label: "Segment",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Colors for PieChart
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CustomerSegmentation = () => {
  const { data } = api.analytics.getCustomerSegmentation.useQuery();

  if (!data) {
    return <p>Loading...</p>;
  }

  // Combine data by segment
  const combinedData = data.reduce((acc: { name: string; value: number }[], item) => {
    // If the segment already exists in the accumulator, sum the frequency
    const existing = acc.find((entry) => entry.name === item.segment);
    if (existing) {
      existing.value += 1;
    } else {
      // If not, add a new entry
      acc.push({
        name: item.segment,
        value: 1,
      });
    }
    return acc;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Segmentation</CardTitle>
        <CardDescription>Distribution of customer segments</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart width={400} height={300}>
            <Pie
              data={combinedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {combinedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartContainer>
        {/* <Alert className="mt-4">
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>AI Insight</AlertTitle>
          <AlertDescription>
            Focus on upselling to Medium-Value customers to increase the
            High-Value segment.
          </AlertDescription>
        </Alert> */}
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentation;
