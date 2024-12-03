"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Customer, Product } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useState } from "react";

const SegmentSelection = ({
  onSelect,
}: {
  onSelect?: (
    target: Product | Customer | null,
    targetType: "product" | "customer",
  ) => void;
}) => {
  const [selectedTarget, setSelectedTarget] = useState<
    Product | Customer | null
  >(null);
  const [targetType, setTargetType] = useState<"product" | "customer">(
    "product",
  );
  const [open, setOpen] = useState(false);

  const { data: products, isLoading: isProductsLoading } =
    api.product.getAllProducts.useQuery();
  const { data: customers, isLoading: isCustomersLoading } =
    api.customer.getAllCustomers.useQuery();

  // Helper function to handle selecting target based on targetType
  const handleSelectTarget = (item: Product | Customer) => {
    setSelectedTarget(item);
    setOpen(false);
  };

  return (
    <Tabs
      value={targetType}
      onValueChange={(value) => {
        setSelectedTarget(null);
        setTargetType(value as "product" | "customer");
        onSelect?.(null, value as "product" | "customer");
      }}
      className="space-y-4"
    >
      <TabsList>
        <TabsTrigger value="product">Products</TabsTrigger>
        <TabsTrigger value="customer">Customers</TabsTrigger>
      </TabsList>

      <TabsContent value="product" className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedTarget && "productService" in selectedTarget
                ? selectedTarget.productService
                : "Select product..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search product..." />
              <CommandEmpty className="flex items-center justify-center p-6 text-sm">
                {isProductsLoading ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  "No products found."
                )}
              </CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {products?.map((product) => (
                    <CommandItem
                      key={product.id}
                      onSelect={() => {
                        handleSelectTarget(product);
                        onSelect?.(product, "product");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTarget?.id === product.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {product.productService}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </TabsContent>

      <TabsContent value="customer" className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedTarget && "name" in selectedTarget
                ? selectedTarget.name
                : "Select customer..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search customer segment..." />
              <CommandEmpty className="flex items-center justify-center p-6 text-sm">
                {isCustomersLoading ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  "No customers found."
                )}
              </CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {customers?.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      onSelect={() => {
                        handleSelectTarget(customer);
                        onSelect?.(customer, "customer");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTarget?.id === customer.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {customer.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </TabsContent>
    </Tabs>
  );
};

export default SegmentSelection;
