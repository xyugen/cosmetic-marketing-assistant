"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { AuthorizedEmail } from "@/server/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<
  AuthorizedEmail & {
    name?: string | null;
    role?: string | null;
    emailVerified?: boolean | null;
  }
>[] = [
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
    accessorKey: "email",
    header: () => <div className="min-w-28">Email</div>,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="min-w-28">User Name</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      if (!name) {
        return <div className="text-muted-foreground">N/A</div>;
      }
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="min-w-28">User Role</div>,
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      if (!role) {
        return <div className="text-muted-foreground">N/A</div>;
      }
      return (
        <Badge
          className={cn(
            role === "admin"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: () => <div className="min-w-28">Email Verified</div>,
    cell: ({ row }) => {
      const emailVerified: boolean = row.getValue("emailVerified");
      if (emailVerified) {
        return <div className="text-green-600">Verified</div>;
      }
      return <div className="text-destructive">Not Verified</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
