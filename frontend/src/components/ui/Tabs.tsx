"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: any;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-1", className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all",
              isActive
                ? "border-emerald-600 text-emerald-700 bg-emerald-50/60"
                : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                  isActive
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
