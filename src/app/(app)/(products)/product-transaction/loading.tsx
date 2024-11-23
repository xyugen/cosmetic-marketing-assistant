import { DataTableSkeleton } from "@/components/tables/data-table-skeleton";

const Loading = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
        Product Transactions
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Manage your product transactions
      </p>
      <div className="mt-4">
        <DataTableSkeleton />
      </div>
    </div>
  );
};

export default Loading;
