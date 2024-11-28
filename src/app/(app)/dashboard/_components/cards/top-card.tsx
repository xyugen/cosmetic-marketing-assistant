"use client";

import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { User } from "lucide-react";

const TopCard = () => {
  const { data } = api.analytics.getTopSpendingCustomers.useQuery({
    limit: 1,
  });

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="relative">
        <User className="absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground" />
        <CardHeader className="font-medium">Top Customer</CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <span>{data?.at(0)?.name}</span>
          </div>
          <small className="text-muted-foreground">
            ₱{data?.at(0)?.outstandingBalance.toLocaleString()} total spend
          </small>
        </CardContent>
      </Card>
      <Card className="relative">
        <User className="absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground" />
        <CardHeader className="font-medium">Top Customer</CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <span>{data?.at(0)?.name}</span>
          </div>
          <small className="text-muted-foreground">
            ₱{data?.at(0)?.outstandingBalance.toLocaleString()} total spend
          </small>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopCard;
