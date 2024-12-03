"use client";

import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { type ProductTransaction } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<ProductTransaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-6">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
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
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "transactionNumber",
  //   header: () => <div className="min-w-28">Transaction No.</div>,
  //   cell: ({ row }) => (
  //     <div className="lowercase">{row.getValue("transactionNumber")}</div>
  //   ),
  // },
  {
    accessorKey: "type",
    header: () => <div className="min-w-32">Transaction Type</div>,
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Date" />
      </div>
    ),
    // header: "Date",
    sortingFn: "datetime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-US"); // Customize date format as needed
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "productService",
    header: () => <div className="min-w-32">Product Service</div>,
    cell: ({ row }) => {
      const productService: string = row.getValue("productService");
      const replacedProductService = productService
        .replace("(deleted)", "")
        .trim();
      return <div>{replacedProductService}</div>;
    },
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
        currency: "PHP",
      }).format(balance);
      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Memo/Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
