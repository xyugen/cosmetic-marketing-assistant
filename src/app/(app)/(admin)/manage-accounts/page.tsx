import React from "react";
import ManageAccountsHeader from "./_components/header";
import ManageAccountsDataTable from "./_components/manage-accounts-data-table";
import AddEmailForm from "./_components/add-email-form";

const Page = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <ManageAccountsHeader />
      <AddEmailForm className="mt-4" />
      <ManageAccountsDataTable />
    </div>
  );
};

export default Page;
