import React from "react";
import { cn } from "../../lib/utils";

export interface Option {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
        <select
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all",
            error && "border-rose-500",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-[11px] text-rose-600">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
