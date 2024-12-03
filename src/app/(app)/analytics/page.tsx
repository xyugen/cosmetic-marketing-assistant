import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsOverview from "./_components/products-overview";
import CustomerLifetimeValue from "./_components/customer-lifetime-value";
import CustomerRetention from "./_components/customer-retention";
import CustomerSegmentation from "./_components/customer-segmentation";
import SalesForecasting from "./_components/sales-forecasting";
import TopSpendingCustomers from "./_components/top-spending-customers";
import ProductPerformanceMetrics from "./_components/product-performance-metrics";
import { TextSummary } from "./_components/ai/text-summary";
import { ChatInterface } from "./_components/ai/chat-interface";

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
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            <SalesForecasting />
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <CustomerRetention />

              <CustomerSegmentation />
            </div>

            <CustomerLifetimeValue />

            <TopSpendingCustomers />
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <ProductsOverview />

            <ProductPerformanceMetrics />
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <TextSummary />
              <ChatInterface />
            </div>
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
