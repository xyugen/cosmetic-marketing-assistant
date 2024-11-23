"use client";

import { DataTable } from "@/components/tables/data-table";
import { DataTableSkeleton } from "@/components/tables/data-table-skeleton";
import { api } from "@/trpc/react";
import { useState } from "react";
import { columns } from "./_components/columns";
import ImportDialog from "./_components/import-dialog";

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
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
        Product Transactions
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Manage your product transactions
      </p>
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
