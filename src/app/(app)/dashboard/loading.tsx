import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <header>
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="mt-2 h-6 w-1/2" />
      </header>

      <main className="mt-8 h-full flex-1 space-y-6 overflow-y-auto bg-secondary/10">
        {/* Quick Actions Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-1/3" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-36" />
            </div>
          </CardContent>
        </Card>

        {/* Top Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Customer Retention */}
          <Skeleton className="h-40 w-full" />

          {/* Recent Transactions */}
          <Skeleton className="col-span-2 row-span-2 h-72 w-full" />

          {/* New Customers */}
          <Skeleton className="h-40 w-full" />
        </div>

        {/* Sales Analytics & AI Insights Skeleton */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Skeleton className="col-span-2 h-48 w-full" />
          <Card className="relative max-h-fit overflow-y-auto">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Loading;
