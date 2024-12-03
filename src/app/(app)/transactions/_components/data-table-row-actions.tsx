"use client";

import { type Row } from "@tanstack/react-table";
import { MoreHorizontal, UserRoundX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const DeleteDialog = ({
  onDelete,
  ...props
}: DialogProps & { onDelete: () => void }) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product Transaction?</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Deleting this transaction will permanently remove it from the
            records.
          </p>

          <p>
            This action is{" "}
            <span className="text-destructive">irreversible</span>.
          </p>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Yes, Delete It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const email: string = row.getValue("email");

  const deleteProductTransactionMutation =
    api.product.deleteProductTransaction.useMutation({});
  const { refetch } = api.product.getProductTransactions.useQuery();

  const openDeleteDialog = async () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting product transaction...");
    try {
      await deleteProductTransactionMutation.mutateAsync({
        id: row.getValue("id"),
      });
      toast.success("Product transaction deleted", { id: toastId });
      await refetch();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }

    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={openDeleteDialog}
            className="flex items-center justify-between text-destructive focus:bg-destructive focus:text-destructive-foreground"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
