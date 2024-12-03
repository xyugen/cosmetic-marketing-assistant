"use client";

import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { ChartNoAxesCombined, Package, User } from "lucide-react";
import OverviewCard from "./overview-card";

const TopCards = () => {
  const { data: topSpendingCustomer, isLoading: isCustomerLoading } =
    api.analytics.getTopSpendingCustomers.useQuery({
      limit: 1,
    });

  const { data: bestSellingProducts, isLoading: isProductLoading } =
    api.analytics.getBestSellingProducts.useQuery({
      limit: 1,
    });

  const { data: transactionsOverview, isLoading: isTransactionLoading } =
    api.analytics.getTransactionsOverview.useQuery();

  const cards = [
    {
      icon: User,
      title: "Top Customer",
      mainData: topSpendingCustomer?.[0]?.name ?? "",
      additionalInfo: `₱${
        topSpendingCustomer?.[0]?.outstandingBalance?.toLocaleString() ?? "0"
      } total spend`,
      isLoading: isCustomerLoading,
    },
    {
      icon: Package,
      title: "Best Selling Product",
      mainData:
        bestSellingProducts?.[0]?.productService?.replace("(deleted)", "") ??
        "",
      additionalInfo: `₱${
        bestSellingProducts?.[0]?.totalSales?.toLocaleString() ?? "0"
      } total sales`,
      isLoading: isProductLoading,
    },
    {
      icon: ChartNoAxesCombined,
      title: "Revenue",
      mainData: `₱${
        transactionsOverview?.[0]?.totalSales?.toLocaleString() ?? "0"
      }`,
      additionalInfo: `₱${
        transactionsOverview?.[0]?.averageSales?.toLocaleString() ?? "0"
      } average sales`,
      isLoading: isTransactionLoading,
    },
  ];

  return (
    <Card className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:py-4">
        {cards.map((card, index) => (
          <OverviewCard
            key={index}
            icon={card.icon}
            title={card.title}
            mainData={card.mainData}
            additionalInfo={card.additionalInfo}
            isLoading={card.isLoading}
            className={`${
              index === cards.length - 1 ? "border-b-0 lg:border-r-0" : ""
            }`} 
          />
        ))}
      </div>
    </Card>
  );
};

export default TopCards;
