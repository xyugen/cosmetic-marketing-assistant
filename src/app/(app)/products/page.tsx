import { DataTable } from "@/components/tables/data-table";
import { columns, type Transaction } from "./_components/columns";

async function getData(): Promise<Transaction[]> {
  // TODO: Replace with actual data
  return new Array(20).fill(null).map(() => {
    return {
      transactionNo: Math.random().toString(36).substring(2, 9),
      transactionType: "Product",
      date: new Date().toISOString(),
      customer: "John Doe",
      memoDescription: "Product purchase",
      quantity: Math.floor(Math.random() * 100),
      salesPrice: Math.floor(Math.random() * 100),
      amount: Math.floor(Math.random() * 100),
      balance: Math.floor(Math.random() * 100),
      productService: "Product A",
    };
  });
}

const Page = async () => {
  const data = await getData();

  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
        Product Inventory
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Manage your product list and inventory
      </p>
      <div className="mt-4">
        <DataTable filterColumn="productService" filterTitle="Product/Service" columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Page;
