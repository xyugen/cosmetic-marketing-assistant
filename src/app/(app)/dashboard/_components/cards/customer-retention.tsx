"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/trpc/react";
import { Users } from "lucide-react";
import React from "react";

const CustomerRetention = ({ className }: { className?: string }) => {
  const { data } = api.analytics.getCustomerGrowthRate.useQuery();

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Customer Retention
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.growthRate}%</div>
        <Progress value={data?.growthRate} className="mt-2" />
      </CardContent>
    </Card>
  );
};

export default CustomerRetention;
