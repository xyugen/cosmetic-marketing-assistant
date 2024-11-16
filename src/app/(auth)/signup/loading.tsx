import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  console.log("LOADING");
  return (
    <section className="flex size-full flex-col items-center justify-center overflow-y-auto p-6 lg:p-12">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        {/* Skeleton for Heading */}
        <Skeleton className="w-3/4rounded-md h-8 bg-gray-300" />

        {/* Skeleton for Subtext */}
        <Skeleton className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-gray-300" />

        {/* Skeleton for Link */}
        <Skeleton className="mt-2 h-4 w-1/3 animate-pulse rounded-md bg-gray-300" />

        {/* Skeleton for Form */}
        <div className="mt-6 space-y-4">
          <Skeleton className="h-12 w-full animate-pulse rounded-md bg-gray-300" />
          <Skeleton className="h-12 w-full animate-pulse rounded-md bg-gray-300" />
          <Skeleton className="h-12 w-full animate-pulse rounded-md bg-gray-300" />
        </div>

        {/* Skeleton for Divider */}
        <Skeleton className="my-6 h-4 w-1/4 animate-pulse rounded-md bg-gray-300" />

        {/* Skeleton for Social Auth */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-full animate-pulse rounded-md bg-gray-300" />
        </div>
      </div>
    </section>
  );
};

export default Loading;
