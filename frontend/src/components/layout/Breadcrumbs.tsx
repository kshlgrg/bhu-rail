"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-500 mb-2 overflow-x-auto no-scrollbar py-1">
      <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>DPI</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center space-x-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            {isLast || !item.href ? (
              <span className="font-bold text-emerald-700 truncate max-w-[240px]">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-slate-900 transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
