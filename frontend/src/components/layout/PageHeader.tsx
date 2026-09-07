import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumbs, actions, badge }: PageHeaderProps) {
  return (
    <div className="mb-6 pb-4 border-b border-slate-200">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">{title}</h1>
            {badge}
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
