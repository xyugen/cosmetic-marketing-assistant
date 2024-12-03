import Header from "@/components/header";
import CustomerDataTable from "./_components/customer-data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
};

const Page = async () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <Header title="Customers" subtitle="Manage your customers" />
      <CustomerDataTable />
    </div>
  );
};

export default Page;
