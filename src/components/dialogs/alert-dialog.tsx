import {
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { LoaderCircle } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const ConfirmDialog = ({
  title,
  description,
  actionText = "Confirm",
  onConfirm,
  isLoading = false,
  ...props
}: AlertDialogProps & {
  onConfirm: () => void;
  title: string;
  description: string | React.ReactNode;
  actionText?: string;
  isLoading?: boolean;
}) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2 sm:gap-0">
          <AlertDialogCancel asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button type="button" className="relative" disabled={isLoading} onClick={onConfirm}>
              {isLoading ? (
                <LoaderCircle
                  className=" size-6 animate-spin text-primary-foreground"
                  aria-hidden="true"
                />
              ) : (
                <>{actionText}</>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
