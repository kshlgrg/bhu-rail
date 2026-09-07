import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({ className, variant = "neutral", size = "sm", dot = false, children, ...props }: BadgeProps) {
  const variants = {
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-rose-50 text-rose-800 border-rose-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const dots = {
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-blue-500",
    neutral: "bg-slate-400",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[11px] font-semibold leading-tight",
    md: "px-3 py-1 text-xs font-semibold leading-normal",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border whitespace-nowrap shadow-2xs shrink-0 select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dots[variant])} />}
      {children}
    </span>
  );
}
