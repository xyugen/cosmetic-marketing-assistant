import Header from "@/components/header";
import ProductDataTable from "./_components/product-data-table";

const Page = async () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <Header title="Products" subtitle="Manage your products" />
      <ProductDataTable />
    </div>
  );
};

export default Page;
