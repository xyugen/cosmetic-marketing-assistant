import { PhilippinePeso } from "lucide-react";
import React from "react";
import { Input, type InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

const CurrencyInput = ({ className, ...props }: InputProps) => {
  return (
    <div className="relative">
      <div className="absolute left-1 top-1/2 -translate-y-1/2 rounded bg-muted p-2">
        <PhilippinePeso className="size-3" />
      </div>
      <Input type="number" className={cn("pl-10", className)} {...props} />
    </div>
  );
};

export default CurrencyInput;
