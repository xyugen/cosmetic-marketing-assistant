"use client";

import ImportDialog from "@/components/dialogs/import-dialog";
import { DataTable } from "@/components/tables/data-table";
import { DataTableSkeleton } from "@/components/tables/data-table-skeleton";
import { api } from "@/trpc/react";
import { useState } from "react";
import { columns } from "./_components/columns";
import TransactionHeader from "./_components/header";

const Page = () => {
  const { data, isLoading, refetch } =
    api.product.getProductTransactions.useQuery();
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
      <TransactionHeader />
      <div className="mt-4">
        {data && !isLoading ? (
          <DataTable
            filterColumn="productService"
            filterTitle="Product/Service"
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
