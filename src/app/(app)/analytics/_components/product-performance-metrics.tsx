"use client";

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
import { MoreHorizontal } from "lucide-react";

const ProductPerformanceMetrics = () => {
  const { data } = api.analytics.getBestSellingProducts.useQuery({ limit: 5 });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Performance Metrics</CardTitle>
        <CardDescription>Key metrics for top-selling products</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Top</TableHead>
              <TableHead>Product/Service</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Quantity Sold</TableHead>
              <TableHead>Total Transactions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data ? (
              data.map((product, index) => (
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
                  <TableCell>{product.productService}</TableCell>
                  <TableCell>
                    PHP {product.totalSales.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {product.totalQuantitySold.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {product.totalTransactions.toLocaleString()}
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
                        <DropdownMenuItem>
                          Generate Marketing Content
                        </DropdownMenuItem>
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
      </CardContent>
    </Card>
  );
};

export default ProductPerformanceMetrics;
