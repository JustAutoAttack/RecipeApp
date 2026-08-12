# Mise En Place

A local-first, high-performance recipe management workspace designed for
cooking, baking, nutrition info, grocery listing, and documentation.

---

## Table of Contents

1. [I. About](#i-about)
    - [A. Key Highlights](#a-key-highlights)
2. [II. Stack](#ii-stack)
    - [A. Repository Layout](#ii-stack)
3. [III. Usage](#iii-usage)
    - [A. Getting Started & Installation](#a-getting-started--installation)
    - [B. Desktop Application](#b-desktop-application)
4. [IV. Development](#iv-development)
    - [A. Current Architectural Implementation](#a-current-architectural-implementation)
    - [B. Development Guidelines & Utilities](#b-development-guidelines--utilities)
5. [V. Feature Tracker](#v-feature-tracker)
6. [VI. Product Strategy & Monetization Model](#vi-product-strategy--monetization-model)
    - [A. Free Tier (Local-First & Offline)](#a-free-tier-local-first--offline)
    - [B. Paid Tier (Cloud & Social Infrastructure)](#b-paid-tier-cloud--social-infrastructure)
    - [C. Decentralized P2P Sharing](#c-decentralized-p2p-sharing)
7. [VII. Future](#vii-future)
    - [A. Roadmap & Planned Enhancements](#a-roadmap--planned-enhancements)
        - [1. Backend, API, & Security](#1-backend-api--security)
        - [2. Frontend & UI Views](#2-frontend--ui-views)

---

## I. About

Mise is a local-first application engineered to streamline culinary
documentation, recipe management, and grocery overhead. Standard consumer
platforms are encumbered by advertisements, informal narratives, and
unstructured text blocks. Mise captures precise measurements, historical
variations, ingredient substitutions, and media assets to ensure consistency and
reproducibility.

### A. Key Highlights

- **Low-Latency Performance:** Instant CRUD operations operating locally without
  network latency or UI bloat.
- **Offline-First Architecture:** You shouldn't need WiFi in the kitchen.
  Designed for environments with intermittent connectivity, utilizing a local
  embedded database as the primary source of truth.
- **Structured Metadata:** Tracks discrete attributes such as unit conversions,
  preparation timers, allergen warnings, and custom scaling parameters.

---

## II. Stack

Mise implements a Backend-for-Frontend (BFF) pattern, maintaining strict
isolation between native UI runtimes, local embedded persistence, and remote
synchronization services.

### A. Repository Layout

```bash
./
├── configs/
│   └── sql-ts.json                   # TypeScript SQL mapping configuration
├── database/
│   └── schema.sql                    # Master database schema definition
├── dev_server/
│   ├── .venv/                        # Python virtual environment
│   ├── scripts/                      # Server and database management scripts
│   ├── src/                          # Python FastAPI source code
│   ├── dev.db                        # Development database
│   └── requirements.txt              # Python package dependencies
├── dist/                             # Build output directory
├── docs/
│   └── openapi.json                  # Cross-language API schema definition
├── mise/                             # Tauri desktop application workspace
│   ├── assets/                       # Tauri application assets and icons
│   ├── public/                       # Static frontend assets
│   ├── scripts/                      # Tauri-specific build and helper scripts
│   ├── src/                          # React + TypeScript frontend application
│   └── src-tauri/                    # Rust backend, SQLite pool, and sync worker
├── scripts/                          # Root automation & tooling framework
│   ├── utils/                        # Shared modular shell utilities
│   │   ├── colors.sh                 # ANSI color code definitions
│   │   ├── logger.sh                 # Standardized logging utilities
│   │   ├── parsers.sh                # Argument parsing and target matching
│   │   └── wrappers.sh               # Subshell execution and safety wrappers
│   ├── build.sh                      # Build orchestrator script
│   ├── generate-models.sh            # Cross-language model generator script
│   ├── install-requirements.sh       # Dependency installer script
│   └── run.sh                        # Development environment launcher script
├── Cargo.toml                        # Workspace-level Rust configuration
├── index.html                        # Frontend HTML entry point
├── package.json                      # Root Node.js project manifest & workspace scripts
├── tsconfig.json                     # TypeScript compiler configuration
├── tsconfig.node.json                # TypeScript node configuration
└── vite.config.ts                    # Vite build tool configuration
```

---

## III. Usage

Project automation is handled via a modular Bash CLI framework in scripts/,
managing workspace dependencies, build pipelines, and environment execution.
Execution scripts output clean status logs by default, supporting the --verbose
or -v flags for verbose execution tracing.

### A. Getting Started & Installation

**Installing Requirements:**

```bash
# Install all workspace dependencies across Node, Python, and Cargo
./scripts/install-requirements.sh

# Install only specific runtimes quietly (remove unrequired targets)
./scripts/install-requirements.sh npm pip cargo

# Install with full verbose logs
./scripts/install-requirements.sh -v
```

**Generating Models:**

```bash
# Initialize temporary database schema and generate cross-language models (TS, Rust, Python)
./scripts/generate-models.sh
```

**Running:**

```bash
# Launch the Python backend and Tauri development environment (default)
./scripts/run.sh dev

# Run the application in production mode (accessing production database and env settings)
./scripts/run.sh prod
```

**Building:**

```bash
# Build the Tauri application in development/debug mode
./scripts/build.sh dev

# Build the Tauri application for production release (handles environment and version injection)
./scripts/build.sh prod
```

### B. Desktop Application

---

## IV. Development

### A. Current Architectural Implementation

- **Tauri & Rust Core:** Configured Tauri v2 with a native Rust backend managing
  connection pooling and foreign-key-constrained SQLite operations via `sqlx`.

- **IPC & Type Safety:** Strongly typed database row structures mapped to secure
  Tauri Inter-Process Communication (IPC) handlers.

- **FastAPI Sync Service:** Modular Python backend services handling remote
  synchronization endpoints and payload validation.

- **Asynchronous Sync Worker:** Background Tokio tasks (`sync_worker.rs`)
  executing polling loops for offline-to-online data replication.

### B. Development Guidelines & Utilities

- **Modular Shell Architecture:** Shell scripts utilize shared libraries for
  standardized output formatting (`logger.sh`), argument parsing (`parsers.sh`),
  and subshell isolation (`wrappers.sh`) to eliminate state leakage and
  directory drift.

- **Cross-Language Contracts:** Shared `OpenAPI` specifications enforce explicit
  boundary contracts across TypeScript, Rust, and Python codebases.

---

## V. Feature Tracker

| Feature / Subsystem                | Scope                | Status         | Notes                                                                                                             |
| :--------------------------------- | :------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Local SQLite Engine**            | Core Persistence     | **Finished**   | Embedded storage operational via `sqlx` in Rust.                                                                  |
| **Cross-Language Codegen**         | Automation CLI       | **Finished**   | Automated script generating TS, Rust, and Python models from master schema.                                       |
| **Modular Shell Framework**        | Tooling / CLI        | **Finished**   | Standardized loggers, execution wrappers, and argument parsers deployed.                                          |
| **Recipe Management & Tracking**   | Core Domain          | **Finished**   | Structured storage for quantities, units, scaling parameters, and notes.                                          |
| **Dashboard Page**                 | Frontend UI          | **Developing** | Central command view for quick-access recipes, recent activity, and shortcuts.                                    |
| **Pantry & Grocery Integration**   | Core Domain / Pantry | **Developing** | Optional toggle to cross-reference local pantry items against recipe requirements; external grocery app linkouts. |
| **Tauri v2 IPC Layer**             | Desktop Runtime      | **Developing** | Connecting React frontend state securely to Rust state handlers.                                                  |
| **FastAPI Sync Service**           | Cloud Sync Backend   | **Developing** | Base routing initialized; payload merging protocols pending.                                                      |
| **Asynchronous Sync Worker**       | Background Logic     | **Developing** | Tokio worker polling background status loops; validating failure recovery.                                        |
| **Settings & Accessibility**       | Frontend UI          | **Planned**    | Configuration panels, typography adjustments, high-contrast toggles, and theme management.                        |
| **Touch-Optimized Cook Mode**      | Frontend UI          | **Planned**    | Active kitchen layout with large touch targets, step-by-step presentation, and timers.                            |
| **Discovery Page & Global Feed**   | Frontend UI / Social | **Planned**    | Community explore interface for browsing, searching, and importing shared records.                                |
| **User Profiles Page**             | Frontend UI / Social | **Planned**    | Public creator profiles, saved items, and personal portfolio views.                                               |
| **P2P `.mise` File Sharing**       | Distribution         | **Planned**    | Binary packet compilation and parsing for zero-cost sharing via messaging/email.                                  |
| **Subscription Model Gating**      | Business Logic       | **Planned**    | Paywall enforcing limits on global publishing and automated cloud backups while keeping offline features free.    |
| **Mobile Version (iOS / Android)** | Cross-Platform       | **Planned**    | Tauri mobile targets and responsive UI layouts optimized for mobile form factors.                                 |

---

## VI. Product Strategy & Monetization Model

Mise implements a cost-aligned monetization strategy: features that operate
entirely offline and consume zero server infrastructure are permanently free,
while features requiring centralized storage, global distribution, and
cross-device synchronization are supported via a paid subscription.

### A. Free Tier (Local-First & Offline)

- **Core Functionality:** All capabilities operable without an active internet
  connection remain free, including local recipe CRUD, embedded SQLite storage,
  local pantry tracking, and active cooking mode.
- **Data Portability:** Users retain absolute data ownership with full export
  and import capabilities for their entire local database at any time.
- **Discovery Consumption:** Free users can browse the global discovery feed,
  save recipes locally, and import shared community data packets.

### B. Paid Tier (Cloud & Social Infrastructure)

- **Automated Cloud Storage & Sync:** Continuous server-side backup and
  cross-device synchronization, ensuring users never have to manually manage
  file exports or data re-uploads.
- **Global Publishing:** Access to publish recipes directly to the public
  community discovery feed and maintain an active public creator profile.
- **Advanced Cloud Features:** Remote state management and centralized
  infrastructure scaling for seamless multi-device workflows.

### C. Decentralized P2P Sharing

- **Portable Data Packets:** Zero-cost sharing via compiled binary packets
  (e.g., `.mise` files) transmitted peer-to-peer over messaging apps, email, or
  AirDrop.
- **Native Ingestion:** Recipients can open shared files directly with the
  application to securely parse and upsert records into their local database
  without hitting central server infrastructure or incurring hosting costs.

---

## VII. Future

### A. Roadmap & Planned Enhancements

#### 1. Backend, API & Security

- **OpenAPI Expansion:** Broaden documentation coverage across all FastAPI route
  parameters, response payloads, and error codes.

- **Access Control (RBAC):** Introduce role-based permission boundaries for
  shared community datasets.

- **Data Isolation (RLS):** Implement database-level policies to enforce strict
  private record separation.

#### 2. Frontend & UI Views

- **Discovery Feed:** Implement a community explore interface for importing
  shared records.

- **Settings & Account Management:** Build user profile configuration and
  preference views.

- **Optimized Cook Mode:** Design high-contrast, touch-optimized layouts for
  active workspace usage.

- **Cross-Platform Porting:** Finalize Tauri mobile targets for iOS and Android
  deployment.
