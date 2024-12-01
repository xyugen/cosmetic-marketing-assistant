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

const RevokeDialog = ({
  onRevoke,
  ...props
}: DialogProps & { onRevoke: () => void }) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke Email?</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Revoking this email will prevent the user from logging in and
            accessing their account.
          </p>

          <p>
            The user will be{" "}
            <span className="text-destructive">unable to recover</span> their
            account.
          </p>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={onRevoke}>
            Yes, Revoke It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState<boolean>(false);
  const email: string = row.getValue("email");

  const revokeAuthorizedEmailMutation =
    api.auth.revokeAuthorizedEmail.useMutation();
  const { refetch } = api.auth.getAuthorizedEmails.useQuery();

  const openRevokeDialog = async () => {
    const currentUserEmail = await authClient.getSession();

    if (currentUserEmail?.data?.user?.email === email) {
      return toast.error("You cannot revoke your own email");
    }

    setIsRevokeDialogOpen(true);
  };

  const handleRevoke = async () => {
    const toastId = toast.loading("Revoking email...");
    try {
      await revokeAuthorizedEmailMutation.mutateAsync({ email });
      toast.success("Email revoked", { id: toastId });
      await refetch();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }

    setIsRevokeDialogOpen(false);
  };

  return (
    <>
      <RevokeDialog
        open={isRevokeDialogOpen}
        onOpenChange={setIsRevokeDialogOpen}
        onRevoke={handleRevoke}
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
            onClick={openRevokeDialog}
            className="flex items-center justify-between text-destructive focus:bg-destructive focus:text-destructive-foreground"
          >
            Revoke
            <UserRoundX className="size-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
