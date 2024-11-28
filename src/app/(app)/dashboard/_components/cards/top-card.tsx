"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { User } from "lucide-react";
import OverviewCard from "./overview-card";

const TopCard = () => {
  const { data, isLoading } = api.analytics.getTopSpendingCustomers.useQuery({
    limit: 1,
  });

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <Card className="relative">
          <Skeleton className="absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground" />
          <CardHeader className="font-medium">Top Customer</CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="flex items-center gap-2 font-semibold" />
          </CardContent>
        </Card>
      ) : (
        <OverviewCard
          title="Top Customer"
          icon={User}
          data={`${data?.at(0)?.name}`}
          subTitle={`₱${data?.at(0)?.outstandingBalance.toLocaleString()} total spend`}
        />
      )}
      {isLoading ? (
        <Card className="relative">
          <Skeleton className="absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground" />
          <CardHeader className="font-medium">Top Customer</CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="flex items-center gap-2 font-semibold" />
          </CardContent>
        </Card>
      ) : (
        <OverviewCard
          title="Top Customer"
          icon={User}
          data={`${data?.at(0)?.name}`}
          subTitle={`₱${data?.at(0)?.outstandingBalance.toLocaleString()} total spend`}
        />
      )}
      {isLoading ? (
        <Card className="relative">
          <Skeleton className="absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground" />
          <CardHeader className="font-medium">Top Customer</CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="flex items-center gap-2 font-semibold" />
          </CardContent>
        </Card>
      ) : (
        <OverviewCard
          title="Top Customer"
          icon={User}
          data={`${data?.at(0)?.name}`}
          subTitle={`₱${data?.at(0)?.outstandingBalance.toLocaleString()} total spend`}
        />
      )}
    </div>
  );
};

export default TopCard;
