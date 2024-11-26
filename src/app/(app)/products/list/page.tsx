import ProductListHeader from "./_components/header";
import ProductDataTable from "./_components/product-data-table";

const Page = async () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <ProductListHeader />
      <ProductDataTable />
    </div>
  );
};

export default Page;