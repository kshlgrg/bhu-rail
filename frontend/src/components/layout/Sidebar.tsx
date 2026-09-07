"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { citizenSidebarNavigation, governmentSidebarNavigation, NavSection } from "../../config/navigation";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";
import { MapPin, ShieldCheck, LogOut, User, Shield } from "lucide-react";

function SidebarNavList({
  sections,
  effectiveRole,
}: {
  sections: NavSection[];
  effectiveRole: "citizen" | "government" | "admin";
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isCitizen = effectiveRole === "citizen";

  const isItemActive = (href: string) => {
    if (href.includes("?")) {
      const [itemPath, itemQuery] = href.split("?");
      if (pathname !== itemPath) return false;
      const itemParams = new URLSearchParams(itemQuery);
      const itemTab = itemParams.get("tab");
      const currentTab = searchParams ? searchParams.get("tab") || "land-use" : "land-use";
      return itemTab === currentTab;
    }
    if (href === "/citizen/dashboard" || href === "/dashboard/citizen") {
      return pathname === "/citizen/dashboard" || pathname === "/dashboard/citizen";
    }
    if (href === "/government/dashboard" || href === "/dashboard/government") {
      return pathname === "/government/dashboard" || pathname === "/dashboard/government";
    }
    if (pathname === href) return true;
    if (href !== "/" && pathname.startsWith(href + "/")) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {section.title}
          </div>
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const ItemIcon = item.icon;
              const isActive = isItemActive(item.href);

              return (
                <Link
                  key={item.title + item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all group",
                    isActive
                      ? isCitizen
                        ? "bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/80 shadow-2xs"
                        : "bg-blue-50 text-blue-950 font-bold border border-blue-200/80 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent font-medium"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {ItemIcon && (
                      <ItemIcon
                        className={cn(
                          "w-4 h-4 flex-shrink-0 transition-colors",
                          isActive
                            ? isCitizen
                              ? "text-emerald-700"
                              : "text-blue-700"
                            : "text-slate-400 group-hover:text-slate-700"
                        )}
                      />
                    )}
                    <span className="truncate">{item.title}</span>
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
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { role, user, logout } = useAuth();

  // Determine active navigation schema
  const isGovernmentRoute =
    pathname.startsWith("/government") ||
    pathname.startsWith("/dashboard/government") ||
    pathname === "/login/government";

  const isCitizenRoute =
    pathname.startsWith("/citizen") ||
    pathname.startsWith("/dashboard/citizen") ||
    pathname.startsWith("/my-land") ||
    pathname === "/login/citizen" ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/documents") ||
    pathname.startsWith("/requests") ||
    pathname.startsWith("/notifications");

  const effectiveRole = isGovernmentRoute
    ? "government"
    : isCitizenRoute
    ? "citizen"
    : role;

  const sections =
    effectiveRole === "government"
      ? governmentSidebarNavigation
      : citizenSidebarNavigation;

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col justify-between border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] p-4 select-none">
      <div className="space-y-6">
        {/* Portal Role Indicator Banner */}
        <div
          className={cn(
            "px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border",
            effectiveRole === "citizen"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          )}
        >
          <div className="flex items-center gap-1.5">
            {effectiveRole === "citizen" ? (
              <User className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Shield className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span className="font-bold">
              {effectiveRole === "citizen" ? "Citizen Portal" : "Government Portal"}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-white border border-current">
            Live
          </span>
        </div>

        {/* Navigation Sections with Suspense */}
        <Suspense fallback={<div className="text-xs text-slate-400 p-2">Loading menu...</div>}>
          <SidebarNavList sections={sections} effectiveRole={effectiveRole} />
        </Suspense>
      </div>

      {/* Bottom Profile & Pilot Info */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        {/* User Card */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="text-xs font-bold text-slate-900 truncate">
              {user?.name || (effectiveRole === "citizen" ? "Suresh Yadav" : "Rajeshwar Sharma")}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {effectiveRole === "citizen" ? "Verified Citizen" : "Government Officer"}
            </div>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Pilot Sector Badge */}
        <div className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-200/80 text-[10px] text-slate-500 space-y-1">
          <div className="flex items-center justify-between font-semibold text-slate-700">
            <span className="flex items-center gap-1 text-emerald-600">
              <MapPin className="w-3 h-3" />
              Pilot Kadarpur
            </span>
            <span>Gurugram, HR</span>
          </div>
          <div className="flex items-center justify-between text-[9px] text-slate-400">
            <span>5 Cadastral Parcels</span>
            <span className="flex items-center gap-0.5 text-emerald-600 font-medium">
              <ShieldCheck className="w-2.5 h-2.5" /> PostGIS
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
