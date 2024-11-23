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
  isLoading?: never;
}

interface WithMutation {
  formState?: never;
  mutation: UseMutationResult<unknown, unknown, unknown, unknown>;
  isLoading?: never;
}

interface WithLoading {
  formState?: never;
  mutation?: never;
  isLoading: boolean;
}

type SubmitButtonProps = (WithFormState | WithMutation | WithLoading) & {
  children?: React.ReactNode;
  className?: string;
};

const SubmitButton = ({
  children,
  mutation,
  formState,
  className,
  isLoading,
}: SubmitButtonProps) => {
  const loading = formState?.isSubmitting ?? mutation?.isPending ?? isLoading;

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
