"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  User,
  ChevronDown,
  Compass,
  FileText,
  Building2,
  Scale,
  FolderOpen,
  CheckCircle2,
  LogOut,
  SlidersHorizontal,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";
import { BhuRailLogo } from "../ui/BhuRailLogo";

export function Navbar() {
  const pathname = usePathname();
  const { role, user, logout, switchRole } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/explorer?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const isCitizen = role === "citizen";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Identity */}
          <BhuRailLogo size="sm" asLink={true} href="/" className="flex-shrink-0" />

          {/* Quick Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-xs relative"
          >
            <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ULPIN, Survey, Owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </form>

          {/* Role Portal Quick Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {isCitizen ? (
              <>
                <Link
                  href="/citizen/dashboard"
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    pathname.startsWith("/citizen/dashboard") || pathname.startsWith("/dashboard/citizen")
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/citizen/my-land"
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    pathname.startsWith("/citizen/my-land") || pathname.startsWith("/my-land")
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>My Land</span>
                </Link>
                <Link
                  href="/citizen/applications"
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    pathname.startsWith("/citizen/applications") || (pathname.startsWith("/applications") && !pathname.startsWith("/government/applications"))
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>Applications</span>
                </Link>
                <Link
                  href="/citizen/documents"
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    pathname.startsWith("/citizen/documents") || (pathname.startsWith("/documents") && !pathname.startsWith("/records/documents"))
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>Documents</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/government/dashboard"
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    pathname.startsWith("/government/dashboard") || pathname.startsWith("/dashboard/government")
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>Officer Dashboard</span>
                </Link>
                <Link
                  href="/government/parcels"
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    pathname.startsWith("/government/parcels")
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>All Parcels</span>
                </Link>
                <Link
                  href="/government/verification"
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    pathname.startsWith("/government/verification")
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>Record Verification</span>
                </Link>
                <Link
                  href="/government/disputes"
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    pathname.startsWith("/government/disputes")
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <span>Disputes</span>
                </Link>
              </>
            )}
            <Link
              href="/explorer"
              className={cn(
                "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                pathname.startsWith("/explorer")
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>GIS Explorer</span>
            </Link>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </Link>

            {/* Portal Badge */}
            <div
              className={cn(
                "hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold",
                isCitizen
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              )}
            >
              {isCitizen ? <User className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
              <span>{isCitizen ? "Citizen Portal" : "Government Portal"}</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-left shadow-sm"
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs",
                    isCitizen ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                  )}
                >
                  {user?.name ? user.name.charAt(0) : "U"}
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-[120px]">
                    {user?.name || (isCitizen ? "Suresh Yadav" : "Rajeshwar Sharma")}
                  </p>
                  <p className="text-[9px] text-slate-500 leading-tight truncate max-w-[120px]">
                    {isCitizen ? "Verified Citizen" : "Government Officer"}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setProfileOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="font-bold text-slate-900">{user?.name || "User"}</p>
                    <p className="text-[10px] text-slate-500 truncate font-mono">
                      {user && "officerId" in user
                        ? (user as any).officerId
                        : user && "aadhaarHash" in user
                        ? (user as any).aadhaarHash
                        : user?.email || "Authenticated"}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{isCitizen ? "Aadhaar e-KYC Verified" : "Gov Authorized Officer"}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    {isCitizen ? (
                      <>
                        <Link
                          href="/citizen/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          <User className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Citizen Dashboard</span>
                        </Link>
                        <Link
                          href="/citizen/my-land"
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          <Layers className="w-3.5 h-3.5 text-blue-600" />
                          <span>My Land Holdings</span>
                        </Link>
                        <Link
                          href="/citizen/applications"
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          <FileText className="w-3.5 h-3.5 text-purple-600" />
                          <span>My Applications</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/government/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          <Shield className="w-3.5 h-3.5 text-blue-600" />
                          <span>Officer Dashboard</span>
                        </Link>
                        <Link
                          href="/government/parcels"
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          <Layers className="w-3.5 h-3.5 text-emerald-600" />
                          <span>All Parcels Directory</span>
                        </Link>
                        <Link
                          href="/government/verification"
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Verification Queue</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={switchRole}
                      className="w-full flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-slate-50 text-left font-medium"
                    >
                      <span>Switch to {isCitizen ? "Officer Portal" : "Citizen Portal"}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
