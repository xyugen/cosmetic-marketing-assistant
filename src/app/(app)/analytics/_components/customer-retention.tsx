import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/trpc/server";
import { Users } from "lucide-react";

const CustomerRetention = async () => {
  const customerGrowthRate = await api.analytics.getCustomerGrowthRate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Retention</CardTitle>
        <CardDescription>Current customer retention rate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {customerGrowthRate?.growthRate}%
        </div>
        <Progress value={customerGrowthRate?.growthRate} className="mt-2" />
        {/* <Alert className="mt-4">
          <Users className="h-4 w-4" />
          <AlertTitle>AI Recommendation</AlertTitle>
          <AlertDescription>
            Implement a loyalty program to improve retention rates for at-risk
            customers.
          </AlertDescription>
        </Alert> */}
      </CardContent>
    </Card>
  );
};

export default CustomerRetention;
