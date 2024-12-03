"use client";

import FacebookCard from "@/components/cards/facebook-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Customer, Product } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { useState } from "react";
import { useChatContext } from "./chat-context";
import { ChatPreview } from "./chat-preview";
import CustomerMarketingForm from "./customer-form";
import ProductMarketingForm from "./product-form";
import SegmentSelection from "./segment-selection";

const MarketingContent = () => {
  const [target, setTarget] = useState<Product | Customer | null>(null);
  const [targetType, setTargetType] = useState<"product" | "customer">(
    "product",
  );
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery();
  const { object } = useChatContext();

  return (
    <>
      <div className="mt-4 space-y-4">
        <SegmentSelection
          onSelect={(target, targetType) => {
            setTarget(target);
            setTargetType(targetType);
          }}
        />
        {target && "productService" in target && targetType === "product" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{target.productService}</CardTitle>
                <CardDescription>Product Details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Transactions:</span>
                    <span>{target?.totalTransactions!.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span>PHP {target?.totalSales!.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sold Date:</span>
                    <span>
                      {format(target.lastTransactionDate!, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Top Customer:</span>
                    <span>{target?.topCustomer ?? "N/A"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <ProductMarketingForm product={target} />
          </>
        )}

        {target && "name" in target && targetType === "customer" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{target.name}</CardTitle>
                <CardDescription>Customer Details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-xl">
                    <span className="font-semibold">
                      Most Purchased Product:
                    </span>
                    <span className="font-medium">
                      {target.mostPurchasedProductService ?? "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Transactions:</span>
                    <span>{target?.totalTransactions!.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span>
                      PHP {target?.outstandingBalance!.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Purchase Date:</span>
                    <span>
                      {format(target.lastTransactionDate!, "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <CustomerMarketingForm customer={target} />
          </>
        )}
      </div>
      <div className="w-full">
        {object?.productMarketing?.text &&
          (isLoading && !object.productMarketing ? (
            <div className="flex flex-col items-center justify-center p-4">
              <div className="size-16 animate-spin rounded-full border-b-2 border-secondary-foreground" />
              <p className="mt-2">Please wait...</p>
            </div>
          ) : (
            target &&
            targetType === "product" && (
              <FacebookCard
                name={currentUser?.name ?? ""}
                description={object.productMarketing?.text ?? ""}
                hashTags={object.productMarketing?.hashtags ?? []}
                imageAlt={object.productMarketing?.imageIdea ?? ""}
                className="mx-auto my-10"
              />
            )
          ))}

        {object?.customerMarketing?.text &&
          (isLoading && !object.customerMarketing ? (
            <div className="flex flex-col items-center justify-center p-4">
              <div className="size-16 animate-spin rounded-full border-b-2 border-secondary-foreground" />
              <p className="mt-2">Please wait...</p>
            </div>
          ) : (
            target &&
            targetType === "customer" &&
            target &&
            targetType === "customer" && (
              <ChatPreview
                message={{
                  content: object.customerMarketing?.text ?? "",
                  timestamp: format(new Date(), "h:mm a"),
                }}
                customerName={currentUser?.name ?? ""}
              />
            )
          ))}
      </div>
    </>
  );
};

export default MarketingContent;
