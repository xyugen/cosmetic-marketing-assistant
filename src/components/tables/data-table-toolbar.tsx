import { type Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn?: string;
  filterTitle?: string;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterTitle,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center py-4">
      {filterColumn && (
        <Input
          placeholder={`Filter ${filterTitle ?? filterColumn}...`}
          value={
            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="w-[150px] lg:w-[250px]"
        />
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
