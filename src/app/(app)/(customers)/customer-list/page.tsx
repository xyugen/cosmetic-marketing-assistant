"use client";

import ImportDialog from "@/components/dialogs/import-dialog";
import { useState } from "react";
import CustomerListHeader from "./_components/header";
import { api } from "@/trpc/react";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/tables/data-table";
import { DataTableSkeleton } from "@/components/tables/data-table-skeleton";
// import ImportDialog from "./_components/import-dialog";

const Page = () => {
  const { data, isLoading, refetch } = api.customer.getCustomers.useQuery();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const handleImport = () => {
    setIsImportDialogOpen(true);
  };

  const handleImportComplete = async () => {
    setIsImportDialogOpen(false);
    await refetch();
  };

  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <CustomerListHeader />
      <div className="mt-4">
        {data && !isLoading ? (
          <DataTable
            filterColumn="name"
            filterTitle="Customer Name"
            columns={columns}
            data={data}
            onImport={handleImport}
          />
        ) : (
          <DataTableSkeleton />
        )}
      </div>
      <ImportDialog
        isImportDialogOpen={isImportDialogOpen}
        setIsImportDialogOpen={setIsImportDialogOpen}
        handleImportComplete={handleImportComplete}
      />
    </div>
  );
};

export default Page;