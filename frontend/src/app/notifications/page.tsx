"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/formatters";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Receipt,
  ShieldAlert,
  ArrowRight,
  CheckCheck,
} from "lucide-react";

export interface CitizenNotification {
  id: string;
  type: "VERIFICATION" | "APPLICATION" | "DOCUMENT" | "RESTRICTION" | "TAX";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action_url?: string;
  category: "Applications" | "Alerts" | "General";
}

const INITIAL_CITIZEN_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: "notif-1",
    type: "VERIFICATION",
    title: "Property verification completed",
    message: "Cadastral boundaries and Jamabandi ownership verification for Plot 101 successfully confirmed under Haryana Land DPI.",
    timestamp: "2026-03-05T10:30:00Z",
    read: false,
    action_url: "/parcel/IN-HR-GGM-KDP-0101-0000",
    category: "General",
  },
  {
    id: "notif-2",
    type: "APPLICATION",
    title: "Application status updated",
    message: "Your application APP-2025-0812 for Land Mutation has progressed to Stage 2: Revenue Tehsildar Verification.",
    timestamp: "2026-03-04T15:45:00Z",
    read: false,
    action_url: "/applications/APP-2025-0812",
    category: "Applications",
  },
  {
    id: "notif-3",
    type: "DOCUMENT",
    title: "New document available",
    message: "Certified copy of Jamabandi Nakal (2023-24) is now available in your digital document locker.",
    timestamp: "2026-03-03T11:20:00Z",
    read: false,
    action_url: "/documents",
    category: "General",
  },
  {
    id: "notif-4",
    type: "RESTRICTION",
    title: "Parcel restriction detected",
    message: "Routine automated DPI scan: Neighboring parcel 0104 has an active judicial injunction. Your parcel 0101 remains 100% clear.",
    timestamp: "2026-03-01T09:15:00Z",
    read: false,
    action_url: "/parcel/IN-HR-GGM-KDP-0101-0000",
    category: "Alerts",
  },
  {
    id: "notif-5",
    type: "TAX",
    title: "Tax reminder",
    message: "MCG Property Tax assessment notice for financial year 2024-25. Your current status is PAID in full with Zero dues.",
    timestamp: "2026-02-28T14:10:00Z",
    read: true,
    action_url: "/documents",
    category: "Alerts",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<CitizenNotification[]>(INITIAL_CITIZEN_NOTIFICATIONS);
  const [filter, setFilter] = useState<"All" | "Unread" | "Applications" | "Alerts">("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filtered = notifications.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Applications") return n.category === "Applications";
    if (filter === "Alerts") return n.category === "Alerts";
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "VERIFICATION":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case "RESTRICTION":
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case "DOCUMENT":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "TAX":
        return <Receipt className="w-5 h-5 text-amber-600" />;
      case "APPLICATION":
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="Real-time alerts, property verification notices, and application updates."
        breadcrumbs={[{ label: "Citizen Dashboard", href: "/dashboard/citizen" }, { label: "Notifications" }]}
        badge={
          unreadCount > 0 ? (
            <Badge variant="warning">{unreadCount} Unread</Badge>
          ) : (
            <Badge variant="success">All Caught Up</Badge>
          )
        }
        actions={
          <Button
            size="sm"
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="gap-1.5 text-xs font-semibold"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        {(["All", "Unread", "Applications", "Alerts"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors border ${
              filter === f
                ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f === "Unread" ? `Unread (${unreadCount})` : f}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
              item.read
                ? "bg-white border-slate-200 text-slate-700"
                : "bg-emerald-50/40 border-emerald-300 shadow-sm text-slate-900"
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex-shrink-0 shadow-sm">
              {getNotificationIcon(item.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <Badge
                    variant={
                      item.type === "RESTRICTION"
                        ? "danger"
                        : item.type === "VERIFICATION"
                        ? "success"
                        : item.type === "TAX"
                        ? "warning"
                        : "info"
                    }
                  >
                    {item.type === "RESTRICTION"
                      ? "⚠ Restriction Alert"
                      : item.type === "VERIFICATION"
                      ? "✓ Verified"
                      : item.type === "TAX"
                      ? "⏱ Assessment"
                      : "ℹ Notification"}
                  </Badge>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
                  )}
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {formatDateTime(item.timestamp)}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">{item.message}</p>

              <div className="pt-2 flex items-center gap-4">
                {item.action_url && (
                  <Link
                    href={item.action_url}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {!item.read && (
                  <button
                    onClick={() => markAsRead(item.id)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
