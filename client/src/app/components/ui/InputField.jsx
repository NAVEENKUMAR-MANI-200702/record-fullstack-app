import React from "react";
import { cn } from "../../../utils/utils";

export const InputField = ({
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  children,
}) => {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full rounded-lg px-4 py-3 bg-white border focus:outline-none focus:ring-2",
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-slate-200 focus:ring-slate-100"
        )}
      />
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
      )}
    </div>
  );
};