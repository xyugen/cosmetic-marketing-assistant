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
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

// Define chart config
const chartConfig = {
  totalSales: {
    label: "Total Sales",
    color: "hsl(var(--chart-1))",
  },
  totalQuantitySold: {
    label: "Total Quantity Sold",
    color: "hsl(var(--chart-2))",
  },
  productService: {
    label: "Product/Service",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const ProductsOverview = () => {
  const { data } = api.product.getAllProducts.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products Overview</CardTitle>
        <CardDescription>Sales and quantities for all products</CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <ScatterChart data={data} className="h-[500px]">
              <CartesianGrid strokeDasharray={"3 3"} />
              {/* Using index for the X-Axis to avoid clutter */}
              <XAxis dataKey="productService" />
              <YAxis
                tickFormatter={(value) =>
                  `₱${formatNumberShorthand(Number(value))}`
                }
                width={60}
                stroke="var(--color-totalSales)"
              />
              <ZAxis dataKey="totalQuantitySold" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Scatter
                dataKey="totalSales"
                fill="hsl(var(--chart-1))"
                shape="circle"
                stroke="var(--color-accent)"
              />
            </ScatterChart>
          </ChartContainer>
        ) : (
          <p>No data available</p>
        )}
        {/* <Alert className="mt-4">
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>AI Recommendation</AlertTitle>
          <AlertDescription>
            Consider bundling Product A with Product C to boost sales of the
            lower-performing product.
          </AlertDescription>
        </Alert> */}
      </CardContent>
    </Card>
  );
};

export default ProductsOverview;