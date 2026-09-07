import React from "react";
import { cn } from "../../lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No records found.",
  className,
}: DataTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-slate-500 border border-slate-200 rounded-xl bg-slate-50">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm", className)}>
      <table className="w-full text-left text-xs text-slate-800 min-w-[960px]">
        <thead className="bg-slate-50 uppercase text-[10px] tracking-wider text-slate-500 border-b border-slate-200 font-bold">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cn("px-4 py-3 whitespace-nowrap", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item, index) => (
            <tr
              key={keyExtractor(item, index)}
              className="hover:bg-slate-50/80 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn("px-4 py-3.5 align-middle", col.className)}>
                  {col.render ? col.render(item, index) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
