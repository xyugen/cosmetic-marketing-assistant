"use client";

import DataTableColumnHeader from "@/components/tables/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  transactionNo: string;
  transactionType: string;
  date: string; // ISO string or date object depending on format
  customer: string;
  memoDescription: string;
  quantity: number;
  salesPrice: number;
  amount: number;
  balance: number;
  productService: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transactionNo",
    header: "Transaction No.",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("transactionNo")}</div>
    ),
  },
  {
    accessorKey: "transactionType",
    header: "Transaction Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("transactionType")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-US"); // Customize date format as needed
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "productService",
    header: () => <div className="min-w-32">Product Service</div>,
    cell: ({ row }) => <div>{row.getValue("productService")}</div>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <div>{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Quantity" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "salesPrice",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Sales Price" />
      </div>
    ),
    cell: ({ row }) => {
      const salesPrice = parseFloat(row.getValue("salesPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(salesPrice);
      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Amount" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Balance" />
      </div>
    ),
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(balance);
      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "memoDescription",
    header: "Memo/Description",
    cell: ({ row }) => <div>{row.getValue("memoDescription")}</div>,
  },
];