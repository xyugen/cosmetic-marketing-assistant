import CustomerDataTable from "./_components/customer-data-table";
import CustomerListHeader from "./_components/header";

const Page = async () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <CustomerListHeader />
      <CustomerDataTable />
    </div>
  );
};

export default Page;
