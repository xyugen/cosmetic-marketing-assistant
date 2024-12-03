"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const TransactionHeader = () => {
  const router = useRouter();

  const handleNewTransaction = () => {
    router.push(PageRoutes.TRANSACTION_CREATE);
  };

  return (
    <Header title="Transactions" subtitle="Manage your transactions">
      <Button onClick={handleNewTransaction}>
        <Plus className="size-4" />{" "}
        <span className="hidden md:block">New Transaction</span>
      </Button>
    </Header>
  );
};

export default TransactionHeader;
