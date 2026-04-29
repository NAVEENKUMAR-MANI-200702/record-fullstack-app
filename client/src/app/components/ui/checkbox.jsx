"use client";

import React from "react";
import { CheckIcon } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "../../../utils/utils";

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-400 bg-white transition-colors",
        "focus-visible:ring-2 focus-visible:ring-black/40",
        "data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white",
        "disabled:cursor-not-allowed disabled:opacity-50",

        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="h-3.5 w-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
