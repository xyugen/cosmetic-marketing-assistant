"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Users } from "lucide-react";

const NewCustomer = ({ className }: { className?: string }) => {
  const { data } = api.customer.getNewCustomers.useQuery({ months: 2 });

  const growthRate =
    (data?.at(-1)?.totalCustomers - data?.at(-2)?.totalCustomers) /
    data?.at(-2)?.totalCustomers;
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">New Customers</CardTitle>
        <Users className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.at(-1)?.totalCustomers}</div>
        <p className="text-xs text-muted-foreground">
          {growthRate * 100}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

export default NewCustomer;
