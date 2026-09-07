"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  UserCheck,
  Menu,
  X,
  Home,
  FileText,
  FolderOpen,
  Layers,
  CheckSquare,
  Scale,
} from "lucide-react";
import { citizenSidebarNavigation, governmentSidebarNavigation } from "../../config/navigation";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { role } = useAuth();

  const isGovernmentRoute =
    pathname.startsWith("/government") ||
    pathname.startsWith("/dashboard/government");

  const effectiveRole = isGovernmentRoute ? "government" : role;
  const isCitizen = effectiveRole === "citizen";

  const quickNav = isCitizen
    ? [
        { title: "Home", href: "/citizen/dashboard", icon: Home },
        { title: "My Land", href: "/citizen/my-land", icon: UserCheck },
        { title: "Applications", href: "/citizen/applications", icon: FileText },
        { title: "Documents", href: "/citizen/documents", icon: FolderOpen },
        { title: "Menu", action: () => setIsOpen(!isOpen), icon: Menu },
      ]
    : [
        { title: "Dashboard", href: "/government/dashboard", icon: Home },
        { title: "Parcels", href: "/government/parcels", icon: Layers },
        { title: "Verification", href: "/government/verification", icon: CheckSquare },
        { title: "Disputes", href: "/government/disputes", icon: Scale },
        { title: "Menu", action: () => setIsOpen(!isOpen), icon: Menu },
      ];

  const sections = isCitizen ? citizenSidebarNavigation : governmentSidebarNavigation;

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        {quickNav.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname === item.href : false;

          if (item.action) {
            return (
              <button
                key={idx}
                onClick={item.action}
                className={cn(
                  "flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
                  isOpen ? "text-emerald-600" : "text-slate-500 hover:text-slate-800"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </button>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href!}
              className={cn(
                "flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
                isActive ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Full-Screen Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-white shadow-sm">
                भू
              </div>
              <span className="font-bold text-slate-900 text-base">
                {isCitizen ? "Citizen Portal" : "Government Officer Portal"}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 space-y-6 pb-20 bg-white">
            {sections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                  {section.title}
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {section.items.map((item) => {
                    const ItemIcon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-2.5 rounded-xl text-xs transition-colors",
                          isActive
                            ? isCitizen
                              ? "bg-emerald-50 text-emerald-950 font-bold border border-emerald-200"
                              : "bg-blue-50 text-blue-950 font-bold border border-blue-200"
                            : "text-slate-700 hover:bg-slate-50 border border-transparent font-medium"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {ItemIcon && (
                            <ItemIcon
                              className={cn(
                                "w-4 h-4",
                                isActive
                                  ? isCitizen
                                    ? "text-emerald-700"
                                    : "text-blue-700"
                                  : "text-slate-400"
                              )}
                            />
                          )}
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={cn(
                              "text-[9px] font-bold px-1.5 py-0.5 rounded-full border",
                              isActive
                                ? isCitizen
                                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                  : "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MobileNav;
