"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CustomerListHeader = () => {
  // const router = useRouter();

  // TODO: Add create customer
  // const handleNewCustomer = () => {
  //   router.push(PageRoutes);
  // };

  return (
    <div className="flex items-baseline justify-between">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Customer List
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Manage your customer list
        </p>
      </div>
      <Button>
        <Plus className="size-4" />{" "}
        <span className="hidden md:block">New Customer</span>
      </Button>
    </div>
  );
};

export default CustomerListHeader;
