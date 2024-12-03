import Header from "@/components/header";
import { Metadata } from "next";
import ProductDataTable from "./_components/product-data-table";

export const metadata: Metadata = {
  title: "Products",
};

const Page = async () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <Header title="Products" subtitle="Manage your products" />
      <ProductDataTable />
    </div>
  );
};

export default Page;
