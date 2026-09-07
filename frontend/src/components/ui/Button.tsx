import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm",
      secondary: "bg-white hover:bg-slate-50 text-slate-800 focus:ring-slate-300 border border-slate-300 shadow-sm",
      outline: "border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400",
      danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm",
      ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300",
    };

    const sizes = {
      sm: "px-2.5 py-1.5 text-xs",
      md: "px-3.5 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
