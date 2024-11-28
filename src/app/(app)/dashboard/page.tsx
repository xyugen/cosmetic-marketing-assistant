import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import SalesAnalytics from "./_components/cards/sales-analytics";
import TopCard from "./_components/cards/top-card";

export const LoadingCard = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Loading...</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Please wait while we fetch the latest data.</p>
      </CardContent>
    </Card>
  );
};

const Page = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
        Dashboard
      </h2>
      <Suspense fallback={<LoadingCard />}>
        <main className="h-full mt-8 flex-1 space-y-6 overflow-y-auto bg-secondary/10">
          <TopCard />
          <SalesAnalytics />
        </main>
      </Suspense>
    </div>
  );
};

export default Page;
