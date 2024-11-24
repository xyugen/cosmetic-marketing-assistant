import { type Table } from "@tanstack/react-table";
import { Import } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
// import UploadButtonForm from "../forms/upload-button-form";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn?: string;
  filterTitle?: string;
  onImport?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterTitle,
  onImport,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between py-4">
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
      <div className="flex items-center gap-2">
        {/* <UploadButtonForm onImport={onImport} /> */}
        {onImport && (
          <Button variant={"outline"} onClick={onImport}>
            <Import className="size-4" />
            Import
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
