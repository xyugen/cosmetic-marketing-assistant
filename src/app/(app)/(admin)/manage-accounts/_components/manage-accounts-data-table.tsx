"use client";

import { DataTable } from "@/components/tables/data-table";
import { DataTableSkeleton } from "@/components/tables/data-table-skeleton";
import { api } from "@/trpc/react";
import { columns } from "./columns";

const ManageAccountsDataTable = () => {
  const { data, isLoading } = api.auth.getAuthorizedEmails.useQuery();

  return (
    <div className="mt-4">
      {data && !isLoading ? (
        <DataTable
          filterColumn="email"
          filterTitle="Email"
          columns={columns}
          data={data}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
};

export default ManageAccountsDataTable;
