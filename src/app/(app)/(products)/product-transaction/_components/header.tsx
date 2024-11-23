"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ProductTransactionHeader = () => {
  const router = useRouter();

  const handleNewProductTransaction = () => {
    router.push(PageRoutes.PRODUCT_TRANSACTION_CREATE);
  };

  return (
    <div className="flex items-baseline justify-between">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Product Transactions
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage your product transactions
        </p>
      </div>
      <Button onClick={handleNewProductTransaction}>
        <Plus className="size-4" />{" "}
        <span className="hidden md:block">New Product Transaction</span>
      </Button>
    </div>
  );
};

export default ProductTransactionHeader;
