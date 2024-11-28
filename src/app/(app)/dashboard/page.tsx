import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import SalesAnalytics from "./_components/cards/sales-analytics";
import TopCard from "./_components/cards/top-card";

export const LoadingCard = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="relative">
        <Skeleton className="absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground" />
        <CardHeader className="font-medium">Top Customer</CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="flex items-center gap-2 font-semibold" />
        </CardContent>
      </Card>
    </div>
  );
};

const Page = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
        Dashboard
      </h2>
      <main className="mt-8 h-full flex-1 space-y-6 overflow-y-auto bg-secondary/10">
        <Suspense fallback={<LoadingCard />}>
          <TopCard />
          <SalesAnalytics />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
