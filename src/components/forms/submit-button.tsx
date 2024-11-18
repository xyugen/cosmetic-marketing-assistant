import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type UseMutationResult } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import type { FormState } from "react-hook-form";

/**************************************************************
 * Type helpers for making the component reusable
 * with either `useForm` or `useMutation`.
 **************************************************************/

interface WithFormState {
  formState: FormState<any>;
  mutation?: never;
}

interface WithMutation {
  formState?: never;
  mutation: UseMutationResult<any, any, any, any>;
}

type SubmitButtonProps = (WithFormState | WithMutation) & {
  children?: React.ReactNode;
  className?: string;
};

const SubmitButton = ({
  children,
  mutation,
  formState,
  className,
}: SubmitButtonProps) => {
  const isLoading = formState?.isSubmitting || mutation?.isPending;

  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle className="h-6 w-6 animate-spin text-primary-foreground" />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default SubmitButton;
