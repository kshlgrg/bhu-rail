# 🇮🇳 Bhu-Rail (भू-रेल)
### Integrated GIS-based Digital Public Infrastructure for Land Governance

> *"We are not building a Land Management App. We are building a Land Digital Public Infrastructure (DPI) that other apps, government departments, banks, courts, registries, and citizens can plug into."*

---

## 🏛️ Platform Overview & Architecture

Bhu-Rail operates as a **Digital Public Infrastructure (DPI)** following a layered, feature-oriented, and domain-driven design:

```text
                                  ┌─────────────────────────────────┐
                                  │       CITIZENS & END USERS      │
                                  │   Citizen Portal • My Land      │
                                  │   Applications • Notifications  │
                                  └───────────────┬─────────────────┘
                                                  │
                ┌─────────────────────────────────┴─────────────────────────────────┐
                │                                                                   │
    ┌───────────▼───────────┐                           ┌───────────────────────────▼───────────────────────────┐
    │     LAND EXPLORER     │                           │            INSTITUTIONAL INTEGRATIONS                 │
    │ Interactive PostGIS   │                           │   Banking (Land UPI) • Sub-Registrar (SRO)            │
    │ Cadastral Map (WGS84) │                           │   Revenue Courts (SDM) • Municipal Corp (MCG)         │
    └───────────┬───────────┘                           └───────────────────────────┬───────────────────────────┘
                │                                                                   │
                └─────────────────────────────────┬─────────────────────────────────┘
                                                  │
                                       ┌──────────▼──────────┐
                                       │    PARCEL 360°      │
                                       │ 13-Tab Unified Hub  │
                                       └──────────┬──────────┘
                                                  │
        ┌─────────────────────────┬───────────────┴───────────────┬─────────────────────────┐
        │                         │                               │                         │
 ┌──────▼──────┐           ┌──────▼──────┐                 ┌──────▼──────┐           ┌──────▼──────┐
 │   RECORDS   │           │  PLANNING   │                 │  PROPERTY   │           │ GOVERNANCE  │
 │ RoR (Jamab) │           │ Land Use    │                 │ PropertyTax │           │ Disputes    │
 │ Deeds (SRO) │           │ Zoning DCR  │                 │ Utilities   │           │ Transfers   │
 │ Encumbrance │           │ Master Plan │                 │ Feeder/Grid │           │ Subdivision │
 │ Documents   │           │ Permissions │                 │ Receipts    │           │ Ledger      │
 └──────┬──────┘           └──────┬──────┘                 └──────┬──────┘           └──────┬──────┘
        │                         │                               │                         │
        └─────────────────────────┴───────────────┬───────────────┴─────────────────────────┘
                                                  │
                                       ┌──────────▼──────────┐
                                       │   OPEN API RAIL     │
                                       │ FastAPI v1 Router   │
                                       └──────────┬──────────┘
                                                  │
                         ┌────────────────────────┴────────────────────────┐
                         │                                                 │
                  ┌──────▼──────┐                                   ┌──────▼──────┐
                  │ RULE ENGINE │                                   │ TRUST LEDGER│
                  │ Pre-validat │                                   │ SHA-256     │
                  └──────┬──────┘                                   └──────┬──────┘
                         │                                                 │
                         └────────────────────────┬────────────────────────┘
                                                  │
                                       ┌──────────▼──────────┐
                                       │ POSTGRESQL+POSTGIS  │
                                       │ 12-Entity Schema    │
                                       └─────────────────────┘
```

---

## 🧭 Complete Route & Platform Sitemap

| Domain | Route | Description |
| :--- | :--- | :--- |
| **Home** | `/` | Operational dashboard with live metrics, quick actions, alerts & GIS map |
| **Land** | `/explorer` | Interactive GIS cadastral map with ULPIN/Survey/Owner search & filters |
| **Land** | `/parcel/[ulpin]` | Holistic Parcel 360° profile with 13 domain tabs & Property Passport |
| **Land** | `/my-land` | Verified citizen property holdings (Aadhaar-linked profile) |
| **Services** | `/services` | DPI service directory (Land UPI, Mutation, Subdivision, Tax NOC) |
| **Services** | `/services/land-upi` | **Killer Demo 3**: 1-Click Title & Collateral verification for banks |
| **Services** | `/applications` | Real-time tracking of filed citizen applications & NOCs |
| **Services** | `/applications/[id]` | Detailed application review stages and departmental timeline |
| **Services** | `/requests` | Citizen service requests & grievances with interactive intake modal |
| **Services** | `/notifications` | Notification center with filterable alerts, restrictions & reminders |
| **Records** | `/records/ror` | Record of Rights (Jamabandi) ownership registry |
| **Records** | `/records/registration` | Sub-Registrar conveyance deed registry (Sale, Gift, Partition) |
| **Records** | `/records/encumbrance` | Bank mortgages, charges, and institutional liens |
| **Records** | `/records/documents` | Digital public document repository with SHA-256 hash verification |
| **Planning** | `/planning/land-use` | Statutory land use classifications and CLU regulations |
| **Planning** | `/planning/zoning` | FAR schedules, maximum height limits & conforming activities |
| **Planning** | `/planning/master-plan` | GMDA Master Plan 2031 sector overlays & buffer restrictions |
| **Planning** | `/planning/building-permissions` | Municipal building sanction registry & architectural approvals |
| **Property** | `/property/tax` | Municipal property tax assessments, NOCs & payment simulation |
| **Property** | `/property/utilities` | Infrastructure dashboard (DHBVN Power, GMDA Water, Sewerage, Fiber) |
| **Governance** | `/governance/disputes` | Revenue court civil disputes & status quo stay orders |
| **Governance** | `/governance/transactions` | Pre-validation transaction monitoring with deterministic rule pipeline |
| **Governance** | `/governance/fraud-prevention` | **Killer Demo 1**: Automated transfer lock on court-stayed parcels |
| **Governance** | `/governance/subdivision` | **Killer Demo 2**: Geodesic parcel bisection & area conservation |
| **Governance** | `/governance/ledger` | Permissioned SHA-256 cryptographic state transition audit chain |

---

## ⚡ 3 Killer Demonstrations Built-in

### 1. 🛡️ Fraud Prevention via Judicial Injunction Lock (`/governance/fraud-prevention`)
* **Scenario:** Seller attempts to register a conveyance sale deed on Plot 104 (`IN-HR-GGM-KDP-0104-0000`), which has an active court injunction.
* **Result:** The Bhu-Rail Rule Engine evaluates 4 deterministic rules (Identity, Ownership, Encumbrance, Court Status) and **instantly blocks the transaction**, citing Revenue Court Case `REV/COURT/SOHNA/2024/771`.

### 2. 📐 Spatial Parcel Subdivision & Lineage (`/governance/subdivision`)
* **Scenario:** A 10,000 m² agricultural plot (`IN-HR-GGM-KDP-0108-0000`) is partitioned among heirs.
* **Result:** The spatial engine executes a geodesic cut, mathematically verifies area conservation ($\sum \text{Area}_{child} = \text{Area}_{parent}$), retires the parent parcel to `SUBDIVIDED`, mints active child ULPINs, and anchors the genealogy in the ledger.

### 3. 💳 "Land UPI" 1-Click Collateral Verification (`/services/land-upi`)
* **Scenario:** A commercial bank loan underwriter needs to verify title clearance before issuing a mortgage.
* **Result:** Calling `GET /v1/verification/title-status?ulpin=...` returns instant boolean verification flags (`owner_verified`, `active_mortgage`, `active_court_restriction`, `transferrable`) in sub-80ms with cryptographic audit telemetry.

---

## 🚀 Running Locally

### Backend (FastAPI + PostgreSQL + PostGIS)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run automated tests
pytest tests/ -v

# Start FastAPI server
python3 -m uvicorn app.main:app --reload --port 8000
```

Interactive OpenAPI docs: `http://localhost:8000/docs`

### Frontend (Next.js 14 + Tailwind CSS)

```bash
cd frontend

# Install dependencies
npm install

# Run TypeScript & lint verification
npm run lint
npm run build

# Start development server
npm run dev
```

Open `http://localhost:3000` to navigate the complete Bhu-Rail Land DPI.
