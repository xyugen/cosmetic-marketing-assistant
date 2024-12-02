import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";
import { Users } from "lucide-react";

const NewCustomer = async ({ className }: { className?: string }) => {
  const newCustomers = await api.customer.getNewCustomers({ months: 2 });

  const growthRate =
    (newCustomers?.at(-1)?.totalCustomers ??
      0 - (newCustomers?.at(-2)?.totalCustomers ?? 0)) /
    (newCustomers?.at(-2)?.totalCustomers ?? 1);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">New Customers</CardTitle>
        <Users className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {newCustomers?.at(-1)?.totalCustomers}
        </div>
        <p className="text-xs text-muted-foreground">
          {growthRate * 100}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

export default NewCustomer;
