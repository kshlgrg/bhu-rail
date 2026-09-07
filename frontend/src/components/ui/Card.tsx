import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ className, header, footer, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {header && <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/60 font-semibold text-slate-900">{header}</div>}
      <div className="p-5">{children}</div>
      {footer && <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500">{footer}</div>}
    </div>
  );
}
