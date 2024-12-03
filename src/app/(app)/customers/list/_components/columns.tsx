"use client";

import { DataTableColumnHeader } from "@/components/tables/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import type { Customer } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "name",
    header: () => <div className="min-w-28">Name</div>,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "totalTransactions",
    header: () => <div className="px-2">Transactions</div>,
    cell: ({ row }) => (
      <div className="text-right capitalize">
        {row.getValue("totalTransactions")}
      </div>
    ),
  },
  {
    accessorKey: "firstTransactionDate",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="First Transaction Date" />
      </div>
    ),
    // header: "Date",
    sortingFn: "datetime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("firstTransactionDate"));
      const formattedDate = date.toLocaleDateString("en-US"); // Customize date format as needed
      return <div>{formattedDate}</div>;
    },
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
    accessorKey: "mostPurchasedProductService",
    header: () => <div className="min-w-32">Most Purchased</div>,
    cell: ({ row }) => {
      const mostPurchasedProductService: string = row.getValue(
        "mostPurchasedProductService",
      );
      const replacedmostPurchasedProductService = mostPurchasedProductService
        .replace("(deleted)", "")
        .trim();
      return <div>{replacedmostPurchasedProductService}</div>;
    },
  },
  {
    accessorKey: "totalQuantityPurchased",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader
          column={column}
          title="Total Quantity Purchased"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("totalQuantityPurchased")}</div>
    ),
  },
  {
    accessorKey: "averageTransactionValue",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader
          column={column}
          title="Average Transaction Value"
        />
      </div>
    ),
    cell: ({ row }) => {
      const averageTransactionValue = parseFloat(
        row.getValue("averageTransactionValue"),
      );
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(averageTransactionValue);
      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "outstandingBalance",
    header: ({ column }) => (
      <div className="text-right">
        <DataTableColumnHeader column={column} title="Outstanding Balance" />
      </div>
    ),
    cell: ({ row }) => {
      const outstandingBalance = parseFloat(row.getValue("outstandingBalance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(outstandingBalance);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "descriptionNotes",
    header: "Description/Notes",
    cell: ({ row }) => <div>{row.getValue("descriptionNotes")}</div>,
  },
];
