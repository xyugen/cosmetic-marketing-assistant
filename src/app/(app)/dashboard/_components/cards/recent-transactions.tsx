"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";
import { format } from "date-fns";

const RecentTransactions = ({ className }: { className?: string }) => {
  const { data } = api.product.getRecentProductTransactions.useQuery({});

  return (
    <Card className={className}>
      <CardHeader className="sticky top-0 z-10 bg-gradient-to-b from-background via-background to-background/80 filter backdrop-blur-sm">
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest sales and activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="space-y-4">
            {data?.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{transaction.customer[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.customer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.productService}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">PHP {transaction.amount}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {format(transaction.date, "MM/dd/yyyy")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
