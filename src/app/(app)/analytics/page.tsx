"use client";

import Header from "@/components/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, TrendingUp, Users } from "lucide-react";
import { Bar, BarChart } from "recharts";
import CustomerSegmentation from "./_components/customer-segmentation";
import SalesForecasting from "./_components/sales-forecasting";
import CustomerRetention from "./_components/customer-retention";

// Mock data and functions (replace with actual API calls in a real application)
const predictSales = () => [
  { month: "Jan", sales: 1000 },
  { month: "Feb", sales: 1200 },
  { month: "Mar", sales: 900 },
  { month: "Apr", sales: 1500 },
  { month: "May", sales: 2000 },
  { month: "Jun", sales: 2200 },
];

const getCustomerRetention = () => 0.85;
const getCustomerSegmentation = () => [
  { segment: "High-Value", percentage: 20 },
  { segment: "Medium-Value", percentage: 50 },
  { segment: "Low-Value", percentage: 30 },
];

const getCustomerLifetimeValue = () => [
  { segment: "High-Value", clv: 5000 },
  { segment: "Medium-Value", clv: 2000 },
  { segment: "Low-Value", clv: 500 },
];

const getBestSellingProducts = () => [
  { name: "Product A", sales: 500 },
  { name: "Product B", sales: 400 },
  { name: "Product C", sales: 300 },
  { name: "Product D", sales: 200 },
  { name: "Product E", sales: 100 },
];

const getSalesTrend = () => [
  { month: "Jan", sales: 1000 },
  { month: "Feb", sales: 1200 },
  { month: "Mar", sales: 900 },
  { month: "Apr", sales: 1500 },
  { month: "May", sales: 2000 },
  { month: "Jun", sales: 2200 },
];

const getTopSpendingCustomers = () => [
  { name: "John Doe", spent: 5000 },
  { name: "Jane Smith", spent: 4500 },
  { name: "Bob Johnson", spent: 4000 },
  { name: "Alice Brown", spent: 3500 },
  { name: "Charlie Davis", spent: 3000 },
];
const Page = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <Header title="Analytics" subtitle="Get insights on your data" />
      <div className="container mx-auto mt-8 space-y-8">
        {/* <DatePickerWithRange date={dateRange} setDate={setDateRange} /> */}

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            <SalesForecasting />
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <CustomerRetention />

              <CustomerSegmentation />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value (CLV)</CardTitle>
                <CardDescription>
                  Average CLV by customer segment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart className="h-[300px]">
                  <Bar
                    data={getCustomerLifetimeValue()}
                    category="clv"
                    index="segment"
                    colors={["blue"]}
                    valueFormatter={(value) => `$${value}`}
                    className="h-[300px]"
                  />
                </BarChart>
                <Alert className="mt-4">
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>AI Recommendation</AlertTitle>
                  <AlertDescription>
                    Develop targeted campaigns to move Low-Value customers to
                    the Medium-Value segment.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Spending Customers</CardTitle>
                <CardDescription>
                  Leaderboard of high-value customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getTopSpendingCustomers().map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>
                          ${customer.spent.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">VIP</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Alert className="mt-4">
                  <Users className="h-4 w-4" />
                  <AlertTitle>AI Suggestion</AlertTitle>
                  <AlertDescription>
                    Offer exclusive perks or early access to new products for
                    these top customers to maintain their loyalty.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Best-Selling Products</CardTitle>
                <CardDescription>
                  Top 5 products by sales volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart className="h-[300px]">
                  <Bar
                    data={getBestSellingProducts()}
                    category="sales"
                    index="name"
                    colors={["blue"]}
                    valueFormatter={(value) => `${value} units`}
                    className="h-[300px]"
                  />
                </BarChart>
                <Alert className="mt-4">
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>AI Recommendation</AlertTitle>
                  <AlertDescription>
                    Consider bundling Product A with Product C to boost sales of
                    the lower-performing product.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Performance Metrics</CardTitle>
                <CardDescription>
                  Key metrics for top-selling products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getBestSellingProducts().map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.sales} units</TableCell>
                          <TableCell>
                            ${(product.sales * 100).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {index % 2 === 0 ? (
                              <span className="flex items-center text-green-600">
                                <ArrowUp className="mr-1 h-4 w-4" />
                                {(Math.random() * 10).toFixed(1)}%
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <ArrowDown className="mr-1 h-4 w-4" />
                                {(Math.random() * 10).toFixed(1)}%
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Business Recommendations</CardTitle>
            <CardDescription>
              Actionable insights based on your analytics data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Badge variant="outline" className="mr-2">
                  Sales
                </Badge>
                Launch a targeted email campaign for Product A to capitalize on
                its popularity.
              </li>
              <li>
                <Badge variant="outline" className="mr-2">
                  Customers
                </Badge>
                Implement a referral program to convert more Medium-Value
                customers to High-Value.
              </li>
              <li>
                <Badge variant="outline" className="mr-2">
                  Products
                </Badge>
                Consider discontinuing or revamping Product E due to
                consistently low sales.
              </li>
              <li>
                <Badge variant="outline" className="mr-2">
                  Growth
                </Badge>
                Explore expansion into new markets to sustain the current growth
                trajectory.
              </li>
            </ul>
            <Button className="mt-4">Generate Detailed Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
