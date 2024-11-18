"use client";

import FacebookCard from "@/components/cards/facebook-card";
import { api } from "@/trpc/react";
import { useState } from "react";
import MarketingForm from "./form";

const MarketingContent = () => {
  const [marketingData, setMarketingData] = useState<{
    name: string;
    description: string[] | string;
  } | null>();

  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery();

  const handleSubmit = (data: { name: string; description: string[] }) => {
    setMarketingData(data);
    // console.log("TEST", data);
    console.log("MARKETING_DATA", JSON.stringify(marketingData));
  };

  return (
    <>
      <div className="mt-4">
        <MarketingForm onSubmit={handleSubmit} />
      </div>
      <div className="w-full">
        {marketingData &&
          (isLoading && !marketingData ? (
            <div className="flex flex-col items-center justify-center p-4">
              <div className="size-16 animate-spin rounded-full border-b-2 border-gray-900" />
              <p className="mt-2">Please wait...</p>
            </div>
          ) : (
            <FacebookCard
              name={currentUser?.name ?? ""}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              description={marketingData?.description ?? ""}
              className="mx-auto my-10"
            />
          ))}
      </div>
    </>
  );
};

export default MarketingContent;
