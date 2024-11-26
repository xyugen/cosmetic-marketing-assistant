"use client";

import { DataTable } from "@/components/tables/data-table";
import { DataTableSkeleton } from "@/components/tables/data-table-skeleton";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { columns } from "./columns";

const ProductDataTable = () => {
  const { data, isLoading, refetch } = api.product.getAllProducts.useQuery();

  const syncProductMutation = api.product.syncProducts.useMutation();

  const handleSync = async () => {
    try {
      // FIXME: instead of using a fixed date, find a way to get the min date
      await syncProductMutation.mutateAsync({ date: new Date(2001) });
      toast.success("Products synced successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    await refetch();
  };

  return (
    <div className="mt-4">
      {data && !isLoading ? (
        <DataTable
          filterColumn="productService"
          filterTitle="Product/Service"
          columns={columns}
          data={data}
          onSync={handleSync}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ProductDataTable;