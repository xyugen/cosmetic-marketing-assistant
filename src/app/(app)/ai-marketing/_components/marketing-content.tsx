"use client";

import FacebookCard from "@/components/cards/facebook-card";
import { api } from "@/trpc/react";
import { useChatContext } from "./chat-context";
import MarketingForm from "./form";

const MarketingContent = () => {
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery();
  const { object } = useChatContext();

  return (
    <>
      <div className="mt-4">
        <MarketingForm />
      </div>
      <div className="w-full">
        {object?.productMarketing?.text &&
          (isLoading && !object.productMarketing ? (
            <div className="flex flex-col items-center justify-center p-4">
              <div className="size-16 animate-spin rounded-full border-b-2 border-gray-900" />
              <p className="mt-2">Please wait...</p>
            </div>
          ) : (
            <FacebookCard
              name={currentUser?.name ?? ""}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              description={object.productMarketing?.text ?? ""}
              hashTags={object.productMarketing?.hashtags ?? []}
              imageAlt={object.productMarketing?.imageIdea ?? ""}
              className="mx-auto my-10"
            />
          ))}
      </div>
    </>
  );
};

export default MarketingContent;
