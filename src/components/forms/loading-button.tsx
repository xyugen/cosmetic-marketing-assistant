/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton = (props: LoadingButtonProps) => {
  return (
    <Button
      className={cn("w-full", props.className)}
      disabled={props.isLoading}
      {...props}
    >
      {props.isLoading ? (
        <LoaderCircle
          className={cn(
            "h-6 w-6 animate-spin text-primary-foreground",
            props.variant === "outline"
              ? "text-primary"
              : "text-primary-foreground",
          )}
        />
      ) : (
        <>{props.children}</>
      )}
    </Button>
  );
};

export default LoadingButton;
