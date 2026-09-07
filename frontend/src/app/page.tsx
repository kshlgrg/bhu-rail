"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CadastralHeroVisual } from "@/components/landing/CadastralHeroVisual";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BhuRailLogo } from "@/components/ui/BhuRailLogo";
import {
  ShieldCheck,
  Landmark,
  UserCheck,
  Scale,
  FileCheck,
  Layers,
  Compass,
  ArrowRight,
  Lock,
  Search,
  CheckCircle2,
  FileText,
  Activity,
  KeyRound,
  History,
  Building2,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* 1. PUBLIC HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Platform Name */}
          <BhuRailLogo size="md" asLink={true} href="/" />

          {/* Center Navigation Anchors */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#hero" className="hover:text-blue-700 transition-colors">
              Home
            </a>
            <a href="#features" className="hover:text-blue-700 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-700 transition-colors">
              How It Works
            </a>
            <a href="#services" className="hover:text-blue-700 transition-colors">
              Services
            </a>
            <a href="#security" className="hover:text-blue-700 transition-colors">
              Security
            </a>
            <a href="#about" className="hover:text-blue-700 transition-colors">
              About
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/citizen/login">
              <Button size="sm" variant="secondary" className="text-xs font-bold px-4 py-2 border-slate-300">
                <span>Citizen Login</span>
              </Button>
            </Link>
            <Link href="/government/login">
              <Button size="sm" variant="primary" className="text-xs font-bold px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                <Landmark className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                <span>Government Login</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3">
            <div className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-slate-50">
                Home
              </a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-slate-50">
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-slate-50">
                How It Works
              </a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-slate-50">
                Services
              </a>
              <a href="#security" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-slate-50">
                Security
              </a>
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link href="/citizen/login" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" variant="secondary" className="w-full justify-center text-xs font-bold">
                  Citizen Login
                </Button>
              </Link>
              <Link href="/government/login" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" variant="primary" className="w-full justify-center text-xs font-bold bg-slate-900 text-white">
                  Government Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden bg-white border-b border-slate-200">
        {/* Subtle Institutional Grid Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Integrated Land Governance Public Infrastructure</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                India&apos;s Digital Land Intelligence Platform
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Securely access, verify, and manage land records with transparent digital services for citizens and government authorities.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link href="/citizen/login" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-900/10 gap-2">
                    <UserCheck className="w-4 h-4" />
                    <span>Citizen Login</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </Button>
                </Link>

                <Link href="/government/login" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold border-slate-300 text-slate-800 bg-white hover:bg-slate-50 gap-2">
                    <Landmark className="w-4 h-4 text-slate-600" />
                    <span>Government Login</span>
                  </Button>
                </Link>
              </div>

              {/* Quick explorer link */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
                <span>Looking for public map data?</span>
                <Link href="/explorer" className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1">
                  <span>Open GIS Cadastral Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Hero Right Visual: Digital Land Cadastral Visual */}
            <div className="lg:col-span-6 flex justify-center">
              <CadastralHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST / VALUE STRIP */}
      <section className="py-8 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Verified Land Records</h3>
                <p className="text-xs text-slate-400 mt-0.5">Authentic Jamabandi and title verification.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Transparent Ownership</h3>
                <p className="text-xs text-slate-400 mt-0.5">Clear share fraction and title lineage.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Secure Digital Documents</h3>
                <p className="text-xs text-slate-400 mt-0.5">Tamper-evident cryptographic digests.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Government-Grade Data</h3>
                <p className="text-xs text-slate-400 mt-0.5">Direct sync with revenue authorities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Everything You Need to Understand Your Land
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Standardized digital public rails that unify geographic boundaries, statutory rights, encumbrance charges, and court litigation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Parcel 360°</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete digital overview of a land parcel, including ownership, boundaries, records, and status.
              </p>
              <div className="pt-2 text-xs font-semibold text-blue-700 flex items-center gap-1">
                <span>View standard passport</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Ownership Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verify registered ownership information through structured digital records.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>Inspect title standing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Document Intelligence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access and organize important land-related documents digitally.
              </p>
              <div className="pt-2 text-xs font-semibold text-purple-700 flex items-center gap-1">
                <span>View document vault</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Transaction History</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                View relevant land transactions and historical records.
              </p>
              <div className="pt-2 text-xs font-semibold text-amber-700 flex items-center gap-1">
                <span>Check transfer lineage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Dispute & Legal Status</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understand registered disputes, court restrictions, and legal status.
              </p>
              <div className="pt-2 text-xs font-semibold text-rose-700 flex items-center gap-1">
                <span>Track active stay orders</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Land Analytics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide government authorities with structured land intelligence and analytics.
              </p>
              <div className="pt-2 text-xs font-semibold text-cyan-700 flex items-center gap-1">
                <span>Explore jurisdiction yield</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How Bhu-Rail Works
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed for ease of use by citizens and authoritative certainty for officers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative space-y-4">
              <div className="text-3xl font-black font-mono text-blue-600">01</div>
              <h3 className="text-lg font-bold text-slate-900">Login Securely</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authenticate securely through the dedicated Citizen or Government Officer portals with verified credentials.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                  <KeyRound className="w-3 h-3 text-blue-600" />
                  <span>Mobile OTP / Officer ID</span>
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative space-y-4">
              <div className="text-3xl font-black font-mono text-emerald-600">02</div>
              <h3 className="text-lg font-bold text-slate-900">Select or Search Land Parcel</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Find property using standardized 14-digit ULPIN, survey number, revenue village, or cadastral map explorer.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                  <Search className="w-3 h-3 text-emerald-600" />
                  <span>ULPIN or Survey No.</span>
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative space-y-4">
              <div className="text-3xl font-black font-mono text-purple-600">03</div>
              <h3 className="text-lg font-bold text-slate-900">View Verified Land Information</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly inspect verified rights, municipal zoning, encumbrance status, certified deeds, and dispute records.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                  <ShieldCheck className="w-3 h-3 text-purple-600" />
                  <span>Parcel 360° Passport</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CITIZEN + GOVERNMENT SECTION */}
      <section id="services" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Role-Specific Experiences
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tailored Portals for Every Stakeholder
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Citizens and government officers see distinct dashboards, navigation, information depth, and available workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Citizen Portal Card */}
            <div className="p-8 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-white shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-sm">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <Badge variant="success">Citizen Portal</Badge>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    &ldquo;Your Land. Your Records. Your Rights.&rdquo;
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Designed specifically for landowners, buyers, and citizens to access their personal property records transparently.
                  </p>
                </div>

                <div className="pt-2 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>View My Land:</strong> Dedicated digital property locker for your plots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Parcel 360°:</strong> Simplified property passport with plain status labels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Ownership Information:</strong> Verified freehold share and co-owners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Digital Documents:</strong> Download certified Jamabandi and deeds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Applications:</strong> Apply for mutation and boundary demarcation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Notifications:</strong> Real-time alerts on boundary and title changes</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-100">
                <Link href="/citizen/login">
                  <Button className="w-full justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 shadow-md gap-2 text-xs">
                    <span>Access Citizen Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Government Portal Card */}
            <div className="p-8 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-white shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm">
                    <Landmark className="w-6 h-6 text-emerald-400" />
                  </div>
                  <Badge variant="info">Government Portal</Badge>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    &ldquo;Unified Intelligence for Better Land Governance&rdquo;
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Designed for Tehsildars, Town Planners, Sub-Registrars, and Surveyors to execute statutory workflows.
                  </p>
                </div>

                <div className="pt-2 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span><strong>All Parcels:</strong> Jurisdiction-wide cadastral registry and search</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span><strong>Record Verification:</strong> Side-by-side legacy vs canonical diffing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span><strong>Dispute Management:</strong> Revenue court stays and injunction registry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span><strong>Transactions:</strong> Pre-validation engine enforcing legal checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span><strong>Planning & Zoning:</strong> Master plan 2031 and FAR verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span><strong>Fraud Prevention & Audit:</strong> Deterministic rules & SHA-256 ledger</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-100">
                <Link href="/government/login">
                  <Button className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 shadow-md gap-2 text-xs">
                    <span>Access Government Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECURITY SECTION */}
      <section id="security" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Security Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Built for Trust, Transparency and Security
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Institutional security controls ensuring data authenticity, non-repudiation, and protected access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Role-Based Access Control</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict separation between public citizen services and restricted administrative tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Secure Authentication</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Session tokens, encrypted credential transmission, and multi-factor recovery pathways.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <History className="w-5 h-5 text-purple-700" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Audit Trails & Lineage</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every state transition, deed endorsement, and court stay order is cryptographically logged.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-amber-700" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Data Integrity Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                SHA-256 fingerprinting ensures parcel boundaries and rights cannot be quietly altered.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5 text-rose-700" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Document Security</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certified PDF extracts carry verifiable digital seal hashes and official timestamps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5 text-cyan-700" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Controlled Government Access</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Government accounts are provisioned and sanctioned through authorized administrative channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to access your land records?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Choose your login portal to begin exploring verified cadastral data, active applications, and digital certificates.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/citizen/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 py-3.5 font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md gap-2 text-sm">
                <UserCheck className="w-4 h-4" />
                <span>Citizen Login</span>
              </Button>
            </Link>
            <Link href="/government/login" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 py-3.5 font-bold border-slate-300 text-slate-800 bg-white hover:bg-slate-50 gap-2 text-sm">
                <Landmark className="w-4 h-4 text-slate-600" />
                <span>Government Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. INSTITUTIONAL FOOTER */}
      <footer id="about" className="bg-slate-900 text-white pt-16 pb-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Col 1: Platform branding */}
            <div className="md:col-span-2 space-y-4">
              <BhuRailLogo size="md" variant="light" asLink={true} href="/" />
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                An Integrated GIS-based Digital Public Infrastructure for Land Governance. Empowering citizens with transparent records and authorities with deterministic intelligence.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Sovereign Digital Public Infrastructure • National Land Records Modernization
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Platform Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/explorer" className="hover:text-white transition-colors">Cadastral Explorer</Link></li>
                <li><Link href="/services/land-upi" className="hover:text-white transition-colors">Land UPI Title Rail</Link></li>
                <li><Link href="/citizen/login" className="hover:text-white transition-colors">Citizen Property Locker</Link></li>
                <li><Link href="/government/login" className="hover:text-white transition-colors">Revenue Officer Console</Link></li>
              </ul>
            </div>

            {/* Col 3: Portals */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Access Portals</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/citizen/login" className="hover:text-white transition-colors">Citizen Sign In</Link></li>
                <li><Link href="/citizen/register" className="hover:text-white transition-colors">Citizen Registration</Link></li>
                <li><Link href="/government/login" className="hover:text-white transition-colors">Government Officer Login</Link></li>
                <li><Link href="/forgot-password" className="hover:text-white transition-colors">Password Recovery</Link></li>
              </ul>
            </div>

            {/* Col 4: Legal & Support */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Governance & Policy</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Bhu-Rail</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Terms of Public Service</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Help & Citizen Grievance</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Contact Nodal Office</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 Bhu-Rail (भू-रेल) • National Land Digital Public Infrastructure. Open Standards Architecture.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>All Systems Operational</span>
              </span>
              <span>•</span>
              <span>Open API v1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
