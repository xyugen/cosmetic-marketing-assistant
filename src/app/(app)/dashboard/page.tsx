import Header from "@/components/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Calendar,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import CustomerRetention from "./_components/cards/customer-retention";
import NewCustomer from "./_components/cards/new-customer";
import RecentTransactions from "./_components/cards/recent-transactions";
import SalesAnalytics from "./_components/cards/sales-analytics";
import TopCards from "./_components/cards/top-cards";
import { ChatInterface } from "../ai-assistant/_components/chat-interface";

const Page = () => {
  const lowStockItems = [
    { id: 1, name: "GLUTABERRY SULIT PACK", quantity: 5, threshold: 10 },
    { id: 2, name: "Premium Package", quantity: 3, threshold: 15 },
  ];

  const aiInsights = [
    {
      type: "marketing",
      suggestion:
        "Consider running a bundle promotion for GLUTABERRY products based on recent purchase patterns",
    },
    {
      type: "forecast",
      prediction: "Expected 30% increase in Premium Package demand next month",
    },
    {
      type: "forecast",
      prediction: "Expected 30% increase in Premium Package demand next month",
    },
    {
      type: "forecast",
      prediction: "Expected 30% increase in Premium Package demand next month",
    },
  ];

  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <Header title="Dashboard" subtitle="Manage your dashboard" />
      <main className="mt-8 h-full flex-1 space-y-6 overflow-y-auto bg-secondary/10">
        {/* Quick Actions */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 overflow-x-scroll md:flex md:flex-wrap">
              <Button>
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Button>
              <Button variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                New Order
              </Button>
              <Button variant="outline">
                <BarChart className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Event
              </Button>
            </div>
          </CardContent>
        </Card> */}

        <TopCards />

        <div className="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3">
          {/* Customer Retention Section */}
          <CustomerRetention className="col-span-1 w-full" />

          {/* Recent Transactions Section */}
          <RecentTransactions className="relative col-span-2 row-span-2 max-h-72 overflow-y-auto" />

          {/* New Customers Section */}
          <NewCustomer className="col-span-1" />
        </div>

        {/* Sales Analytics */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          <SalesAnalytics className="col-span-2" />

          {/* AI Insights & Alerts Section */}
          <Card className="col-span-1">
            <CardHeader className="bg-secondary rounded-t-xl">
              <CardTitle>AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <ChatInterface />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Page;
