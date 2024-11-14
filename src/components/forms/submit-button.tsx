/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import type { FormState } from "react-hook-form";

const SubmitButton = ({
  children,
  formState,
  className,
}: {
  children?: React.ReactNode;
  formState: FormState<any>;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      disabled={formState.isSubmitting}
    >
      {formState.isSubmitting ? (
        <LoaderCircle className="text-primary-foreground h-6 w-6 animate-spin" />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default SubmitButton;