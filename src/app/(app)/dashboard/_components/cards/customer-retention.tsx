import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/trpc/server";
import { Users } from "lucide-react";
import React from "react";

const CustomerRetention = async ({ className }: { className?: string }) => {
  const customerGrowthRate = await api.analytics.getCustomerGrowthRate();

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Customer Retention
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {customerGrowthRate.growthRate}%
        </div>
        <Progress value={customerGrowthRate.growthRate} className="mt-2" />
      </CardContent>
    </Card>
  );
};

export default CustomerRetention;
