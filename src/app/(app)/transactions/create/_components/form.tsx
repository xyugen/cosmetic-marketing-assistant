"use client";

import { format } from "date-fns";
import { CalendarIcon, Equal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import CurrencyInput from "@/components/forms/currency-input";
import { api } from "@/trpc/react";
import { createProductTransactionSchema } from "./schema";
import SubmitButton from "@/components/forms/submit-button";
import toast from "react-hot-toast";

export default function CreateProductTransactionForm() {
  const form = useForm<z.infer<typeof createProductTransactionSchema>>({
    resolver: zodResolver(createProductTransactionSchema),
    defaultValues: {
      transactionNumber: "",
      customer: "",
      // type: undefined,
      description: "",
      productService: "",
      quantity: 0,
      salesPrice: 0,
      amount: 0,
    },
  });

  // Watch the values of quantity and salesPrice
  const quantity = form.watch("quantity");
  const salesPrice = form.watch("salesPrice");

  // Calculate the amount based on quantity and salesPrice
  const calculatedAmount = quantity * salesPrice;

  const productTransactionMutation =
    api.product.createProductTransaction.useMutation();

  const onSubmit = async (
    values: z.infer<typeof createProductTransactionSchema>,
  ) => {
    const toastId = toast.loading("Creating product transaction...");
    try {
      console.log("AMOUNT:", calculatedAmount);
      const response = await productTransactionMutation.mutateAsync({
        transactionNumber: values.transactionNumber,
        type: values.type,
        date: values.date,
        productService: values.productService,
        customer: values.customer,
        quantity: values.quantity,
        salesPrice: values.salesPrice,
        amount: calculatedAmount,
        balance: calculatedAmount, // Set balance to the same as amount
        description: values.description,
      });
      if (response?.id) {
        toast.success("Signed in successfully!", { id: toastId });
        form.reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Transaction</CardTitle>
        <CardDescription>
          Enter the details for the new transaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="transactionNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter transaction number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="invoice">Invoice</SelectItem>
                        <SelectItem value="return">Return</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productService"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product/Service</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product or service"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div />
              <div className="col-span-2 grid grid-cols-2 gap-6">
                <div className="relative col-span-2 grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter quantity"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <X className="absolute left-1/2 top-3/4 size-4 translate-x-[-50%] translate-y-[-50%] transform text-muted-foreground opacity-100 dark:opacity-50" />
                  <FormField
                    control={form.control}
                    name="salesPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sales Price</FormLabel>
                        <FormControl>
                          <CurrencyInput
                            {...field}
                            placeholder="Enter sales price"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2">
                  <Equal className="mt-8 size-4 min-w-8 self-center text-muted-foreground" />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <CurrencyInput
                            {...field}
                            value={calculatedAmount}
                            className="w-full"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => form.reset()}
              >
                Discard
              </Button>
              {/* @ts-expect-error no reason */}
              <SubmitButton mutation={productTransactionMutation}>
                Create Transaction
              </SubmitButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
