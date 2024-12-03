import { Metadata } from "next";
import TransactionHeader from "./_components/header";
import TransactionsTable from "./_components/transactions-table";

export const metadata: Metadata = {
  title: "Transactions",
}

const Page = () => {
  return (
    <div className="mx-auto w-full px-4 lg:max-w-6xl">
      <TransactionHeader />
      <TransactionsTable />
    </div>
  );
};

export default Page;
