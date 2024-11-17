import { ArrowUpDown } from "lucide-react";
import { Button, type ButtonProps } from "../ui/button";
import { type Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue> extends ButtonProps {
  column: Column<TData, TValue>;
  title: string;
}

function DataTableColumnHeader<TData, TValue>({
  title,
  column,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <Button
      {...props}
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown />
    </Button>
  );
}

export default DataTableColumnHeader;
