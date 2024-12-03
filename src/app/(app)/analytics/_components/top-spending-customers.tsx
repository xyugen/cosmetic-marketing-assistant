import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { MoreHorizontal, Users } from "lucide-react";

const TopSpendingCustomers = () => {
  const { data } = api.analytics.getTopSpendingCustomers.useQuery({ limit: 5 });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Spending Customers</CardTitle>
        <CardDescription>Leaderboard of high-value customers</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Top</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Quantity Purchased</TableHead>
              <TableHead>Total Transactions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? (
              data.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {index < 3 ? (
                      <>
                        {
                          index === 0
                            ? "🥇" //first place
                            : index === 1
                              ? "🥈" //second place
                              : "🥉" //third place
                        }
                      </>
                    ) : (
                      <>{index + 1}</>
                    )}
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    PHP {customer.outstandingBalance.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {customer.totalQuantityPurchased.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {customer.totalTransactions.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size={"icon"}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* TODO: add generate marketing content implementation */}
                        <DropdownMenuItem>Generate Marketing Content</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </TableBody>
        </Table>
        <Alert className="mt-4">
          <Users className="h-4 w-4" />
          <AlertTitle>AI Suggestion</AlertTitle>
          <AlertDescription>
            Offer exclusive perks or early access to new products for these top
            customers to maintain their loyalty.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default TopSpendingCustomers;
