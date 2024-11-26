import { z } from "zod";

export const createProductTransactionSchema = z.object({
  transactionNumber: z.string().min(1, "Transaction number is required"),
  type: z.enum(["invoice", "return"], { required_error: "Type is required" }),
  date: z.date({ required_error: "Date is required" }),
  productService: z.string().min(1, "Product/Service is required"),
  customer: z.string().min(1, "Customer is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  salesPrice: z.number().min(0, "Sales price must be positive"),
  amount: z.number().min(0, "Amount must be positive"),
  description: z.string().optional(),
});
