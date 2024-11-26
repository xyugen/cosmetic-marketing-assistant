"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const TransactionHeader = () => {
  const router = useRouter();

  const handleNewTransaction = () => {
    router.push(PageRoutes.TRANSACTION_CREATE);
  };

  return (
    <div className="flex items-baseline justify-between">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Transactions
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage your transactions
        </p>
      </div>
      <Button onClick={handleNewTransaction}>
        <Plus className="size-4" />{" "}
        <span className="hidden md:block">New Transaction</span>
      </Button>
    </div>
  );
};

export default TransactionHeader;
