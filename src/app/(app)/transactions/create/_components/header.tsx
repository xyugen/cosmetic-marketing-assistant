"use client";

import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateProductTransactionHeader = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(PageRoutes.TRANSACTIONS);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={"outline"}
        size={"icon"}
        title="Go back"
        onClick={handleGoBack}
      >
        <ChevronLeft className="size-6" />
      </Button>
      <div>
        <small className="text-muted-foreground">
          Back to transactions
        </small>

        <h2 className="text-lg font-semibold leading-tight">
          Add Transactions
        </h2>
      </div>
    </div>
  );
};

export default CreateProductTransactionHeader;
