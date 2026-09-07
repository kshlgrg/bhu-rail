import {
  Compass,
  FileText,
  Building2,
  Scale,
  Landmark,
  UserCheck,
  FolderOpen,
  Layers,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Link as LinkIcon,
  Bell,
  SendHorizontal,
  Home,
  FileCheck,
  BarChart3,
  LayoutDashboard,
  CheckSquare,
  ClipboardList,
  ArrowLeftRight,
  Map,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: any;
  badge?: string;
}

export interface NavSection {
  title: string;
  icon?: any;
  items: NavItem[];
}

// CITIZEN SIDEBAR NAVIGATION (Strictly Citizen-Specific)
export const citizenSidebarNavigation: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      { title: "Citizen Dashboard", href: "/citizen/dashboard", icon: LayoutDashboard, description: "Your land governance summary" },
      { title: "My Land", href: "/citizen/my-land", icon: UserCheck, description: "Your connected land parcels" },
      { title: "Parcel 360°", href: "/parcel/IN-HR-GGM-KDP-0101-0000", icon: MapPin, description: "Public land overview & rights" },
    ],
  },
  {
    title: "SERVICES",
    items: [
      { title: "Applications", href: "/citizen/applications", icon: FileText, description: "Track your land applications" },
      { title: "Requests", href: "/requests", icon: SendHorizontal, description: "Grievances & service requests" },
      { title: "Documents", href: "/citizen/documents", icon: FolderOpen, description: "Property records & certificates" },
    ],
  },
  {
    title: "ACTIVITY",
    items: [
      { title: "Notifications", href: "/citizen/notifications", icon: Bell, badge: "4", description: "Alerts & updates" },
    ],
  },
  {
    title: "GLOBAL",
    items: [
      { title: "Land Explorer", href: "/explorer", icon: Compass, description: "Open GIS cadastral explorer" },
      { title: "Land UPI", href: "/services/land-upi", icon: Landmark, description: "Instant title & collateral check" },
    ],
  },
];

// GOVERNMENT OFFICER SIDEBAR NAVIGATION (Strictly Operational / Governance)
export const governmentSidebarNavigation: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      { title: "Officer Dashboard", href: "/government/dashboard", icon: LayoutDashboard, description: "Governance overview" },
      { title: "Analytics", href: "/government/analytics", icon: BarChart3, description: "Coverage & performance stats" },
    ],
  },
  {
    title: "LAND",
    items: [
      { title: "All Parcels", href: "/government/parcels", icon: Layers, description: "Full cadastral parcel directory" },
      { title: "GIS Explorer", href: "/explorer", icon: Compass, description: "Cadastral map viewer" },
      { title: "Parcel 360°", href: "/parcel/IN-HR-GGM-KDP-0101-0000", icon: MapPin, description: "Administrative parcel 360°" },
    ],
  },
  {
    title: "RECORDS",
    items: [
      { title: "Record Verification", href: "/government/verification", icon: CheckSquare, badge: "126", description: "Cross-department reconciliation" },
      { title: "Registration", href: "/records/registration", icon: FileCheck, description: "Sub-registrar deed registry" },
      { title: "Encumbrance", href: "/records/encumbrance", icon: ShieldAlert, description: "Charges & mortgage filings" },
      { title: "Documents", href: "/records/documents", icon: FolderOpen, description: "Master document store" },
    ],
  },
  {
    title: "GOVERNANCE",
    items: [
      { title: "Applications", href: "/government/applications", icon: ClipboardList, badge: "348", description: "Citizen application processing" },
      { title: "Disputes", href: "/government/disputes", icon: Scale, badge: "48", description: "Revenue court injunctions" },
      { title: "Transactions", href: "/government/transactions", icon: ArrowLeftRight, badge: "31", description: "Pre-validation lifecycle" },
      { title: "Fraud Prevention", href: "/government/fraud-prevention", icon: ShieldCheck, description: "Deterministic rule locks" },
    ],
  },
  {
    title: "PLANNING",
    items: [
      { title: "Planning & Zoning", href: "/government/planning", icon: Building2, badge: "GMDA", description: "Land use, master plan & sanctions" },
    ],
  },
  {
    title: "AUDIT",
    items: [
      { title: "Trust Ledger", href: "/governance/ledger", icon: LinkIcon, description: "Cryptographic SHA-256 chain" },
      { title: "Audit & Provenance", href: "/government/audit", icon: ShieldCheck, description: "Tamper-evident log" },
    ],
  },
];
