"use client";

import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "productService",
    header: () => <div className="min-w-28">Product/Service</div>,
    cell: ({ row }) => {
      const productService: string = row.getValue("productService");
      const replacedProductService = productService
        .replace("(deleted)", "")
        .trim();
      return <div>{replacedProductService}</div>;
    },
  },
  {
    accessorKey: "totalTransactions",
    header: () => <div className="min-w-28">Transactions</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("totalTransactions")}</div>
    ),
  },
  {
    accessorKey: "totalSales",
    header: () => <div className="px-2">Sales</div>,
    cell: ({ row }) => (
      <div className="text-right capitalize">{row.getValue("totalSales")}</div>
    ),
  },
  {
    accessorKey: "lastTransactionDate",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Last Transaction Date" />
      </div>
    ),
    // header: "Date",
    sortingFn: "datetime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastTransactionDate"));
      const formattedDate = date.toLocaleDateString("en-US"); // Customize date format as needed
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "topCustomer",
    header: () => <div className="min-w-32">Top Customer</div>,
    cell: ({ row }) => <div>{row.getValue("topCustomer")}</div>,
  },
  {
    accessorKey: "totalQuantitySold",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Total Quantity Sold" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("totalQuantitySold")}</div>
    ),
  },
  {
    accessorKey: "averagePrice",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Average Price" />
      </div>
    ),
    cell: ({ row }) => {
      const averagePrice = parseFloat(row.getValue("averagePrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(averagePrice);
      return <div className="text-right">{formatted}</div>;
    },
  },
  // {
  //   accessorKey: "averagePrice",
  //   header: ({ column }) => (
  //     <div className="text-right">
  //       <DataTableColumnHeader column={column} title="Outstanding Balance" />
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     const outstandingBalance = parseFloat(row.getValue("outstandingBalance"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "PHP",
  //     }).format(outstandingBalance);
  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
];
