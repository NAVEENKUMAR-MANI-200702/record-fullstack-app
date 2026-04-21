import React from "react";
import { ChevronDown } from "lucide-react";

export const SelectField = ({
  name,
  placeholder,
  options,
  value,
  onChange,
  error,
}) => (
  <div>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-xl px-4 py-3 pr-10 bg-white appearance-none focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-slate-200 focus:ring-slate-100"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <ChevronDown size={16} strokeWidth={2.5} />
      </div>
    </div>
    {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
  </div>
);

export const InputField = ({
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  children,
}) => (
  <div>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 ${
        error
          ? "border-red-400 focus:ring-red-200"
          : "border-slate-200 focus:ring-slate-100"
      }`}
    />
    {children}
    {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
  </div>
);
