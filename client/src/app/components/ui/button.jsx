import React from "react";
import { cn } from "../../../utils/utils"

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-black text-white hover:bg-gray-800 h-10 px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}