"use client";

import { DataTable } from "@/components/tables/data-table";
import { DataTableSkeleton } from "@/components/tables/data-table-skeleton";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { columns } from "./columns";

const CustomerDataTable = () => {
  const { data, isLoading, refetch } = api.customer.getAllCustomers.useQuery();

  const syncCustomersMutation = api.customer.syncCustomers.useMutation();

  const handleSync = async () => {
    try {
      // FIXME: instead of using a fixed date, find a way to get the min date
      await syncCustomersMutation.mutateAsync({ date: new Date(2001) });
      toast.success("Customers synced successfully!");
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
          filterColumn="name"
          filterTitle="Customer Name"
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

export default CustomerDataTable;
