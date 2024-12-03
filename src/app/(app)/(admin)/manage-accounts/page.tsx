import Header from "@/components/header";
import AddEmailForm from "./_components/add-email-form";
import ManageAccountsDataTable from "./_components/manage-accounts-data-table";

const Page = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <Header
        title="Manage Accounts"
        subtitle="Manage email addresses authorized to access the system"
      />
      <AddEmailForm className="mt-4" />
      <ManageAccountsDataTable />
    </div>
  );
};

export default Page;
