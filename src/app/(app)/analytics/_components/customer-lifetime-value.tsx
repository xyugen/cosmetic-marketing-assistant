"use client";

import SyncButton from "@/components/forms/sync-button";
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
import toast from "react-hot-toast";
import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from "recharts";

// Define chart config
const chartConfig = {
  lifetimeValue: {
    label: "Lifetime Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomerLifetimeValue = () => {
  const { data } = api.analytics.getCustomerLifetimeValue.useQuery();
  const syncCustomerLifetimeValueTable =
    api.customer.syncCustomersLifetimeValue.useMutation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Customer Lifetime Value (CLV)</CardTitle>
          <CardDescription>Lifetime Value per Customer</CardDescription>
        </div>
        <SyncButton
          onSync={async () => {
            const toastId = toast.loading("Syncing...");
            try {
              await syncCustomerLifetimeValueTable.mutateAsync();
              toast.success("Synced successfully!", { id: toastId });
            } catch (error) {
              if (error instanceof Error) {
                toast.error(error.message, { id: toastId });
              }
            }
          }}
        />
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <ScatterChart data={data} className="h-[500px]">
              <CartesianGrid strokeDasharray={"3 3"} />
              {/* Using index for the X-Axis to avoid clutter */}
              <XAxis dataKey="customer.name" />
              <YAxis
                tickFormatter={(value) =>
                  `₱${formatNumberShorthand(Number(value))}`
                }
                width={60}
                stroke="var(--color-totalSales)"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Scatter
                dataKey="lifetimeValue"
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
            Consider using this CLV chart to target high-value customers with
            exclusive offers.
          </AlertDescription>
        </Alert> */}
      </CardContent>
    </Card>
  );
};

export default CustomerLifetimeValue;
