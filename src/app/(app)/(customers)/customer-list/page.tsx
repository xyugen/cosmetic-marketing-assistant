import { DataTable } from "@/components/tables/data-table";
import { DataTableSkeleton } from "@/components/tables/data-table-skeleton";
import { api } from "@/trpc/server";
import { columns } from "./_components/columns";
import CustomerListHeader from "./_components/header";

const Page = async () => {
  const data = await api.customer.getCustomers();

  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <CustomerListHeader />
      <div className="mt-4">
        {data ? (
          <DataTable
            filterColumn="name"
            filterTitle="Customer Name"
            columns={columns}
            data={data}
          />
        ) : (
          <DataTableSkeleton />
        )}
      </div>
    </div>
  );
};

export default Page;
