# Mise en place

A local-first, high-performance recipe management workspace designed for
precision nutrition, baking, and documentation.

**Table of Contents**

1. [The Vision, The Problem, & The Why](#i-the-vision-the-problem--the-why)
2. [Technical Architecture & Stack](#ii-technical-architecture--stack)
3. [Core Features & Implementation Details](#iii-core-features--implementation-details)
4. [Living Architecture: Development Progress & Implementation Notes](#iv-living-architecture-development-progress--implementation-notes)
5. [File System Tree](#v-file-system-tree)

**File System Tree**

```text
./
├── docs/
│   └── openapi.json                  # Cross-language API schema definition
├── dev_server/
│   ├── venv/                         # Python virtual environment
│   ├── scripts/                      # Server and database management scripts
│   │   ├── generate_openapi.sh       # Proxy to generate openapi.json doc from src
│   │   └── run.sh                    # Automated virtualenv bootstrap and uvicorn runner
│   ├── src/                          # Modular Python FastAPI source code
│   └── dev.db                        # Remote development database
└── mise/                             # Tauri desktop application workspace
    ├── scripts/                      # Build, packaging, and helper scripts
    │   ├── build.sh
    │   └── installer.sh
    ├── src/                          # React + TypeScript frontend
    └── src-tauri/                    # Rust backend, SQLite pool, and sync worker
```

---

## I. The Vision, The Problem, & The Why

### What is Mise?

Mise is a local-first recipe management tool I built to solve my own
frustrations in the kitchen.

### Why I Built This (My Motivation)

I cook and bake a lot, and I got tired of how messy digital recipe storage is.
Most recipe sites and apps are buried under ads, life stories, and clunky
interfaces. Worse, they treat recipes like simple blocks of text. When I'm in
the middle of baking, I need precision, speed, and reliability.

I built Mise because I needed a place to actually store and structure my recipes
the way my brain works. I wanted something personalized—not just a generic
database, but a tool built around how I prep and execute a dish.

Beyond just keeping them for myself, I wanted a way to share my recipes with
others so they can actually replicate my results. Baking and cooking are
scientific; small details matter. If someone else uses my recipe, I want them to
be able to follow the exact steps, ingredient breakdowns, and notes I took to
get the exact same outcome.

### The Problem It Solves

- **The "Recipe Blog" Fatigue:** No ads, no scrolling past paragraphs of text,
  no latency. Just clean data.
- **Offline Reliability:** Kitchens have terrible Wi-Fi. Your recipes shouldn't
  break just because you're offline. A local-first design means everything lives
  on your device first.
- **Lack of Precision:** Standard notes apps don't handle structured data well.
  Mise treats recipes as data models—tracking exact quantities, history,
  substitutions, and media.

### High-Level Feature Overview

- **Local Recipe & User Management:** Instant local CRUD operations for users,
  recipes, and favorites backed by SQLite.
- **Granular Ingredient & Metadata Tracking:** Structured data handling for
  quantities, units, cooking times, cuisines, substitutions, allergy notes, and
  history.
- **Media & Video Support:** Ability to attach photos and future video
  walkthroughs to individual recipes.
- **Export & Document Generation:** Formatted outputs for printing, PDF
  generation, and JSON/CSV data backups.
- **Bidirectional Cloud Sync:** Real-time background replication between the
  local SQLite database and a custom Python FastAPI backend to share recipes
  with others.
- **Secure Authentication & Data Isolation:** Ensuring user data stays secure
  and private.

---

## II. Technical Architecture & Stack

Mise is built around a **Backend-for-Frontend (BFF)** pattern, ensuring a strict
separation of concerns across native boundaries, local databases, and remote
synchronization endpoints.

### 1. Frontend Layer

- **Framework:** React with TypeScript for a fully type-safe, modular component
  tree.
- **Styling:** Tailwind CSS for a responsive, clean layout across desktop and
  mobile form factors.
- **Desktop Runtime:** Tauri v2 leveraging native OS webviews for a lightweight,
  secure footprint without Electron bloat.
- **IPC Bridge:** Secure asynchronous command bindings connecting the React
  frontend directly to Rust controllers without exposing filesystem or database
  primitives to the browser context.

### 2. Backend Layer (Local & Core)

- **Language & Orchestration:** Rust acting as the core application controller,
  managing lifecycle events, background routines, and secure local state.
- **Embedded Database:** SQLite (`sqlx`) serving as the local-first primary
  source of truth, guaranteeing sub-millisecond local reads/writes and complete
  offline functionality.
- **Background Workers:** Asynchronous Tokio tasks (`sync_worker.rs`) handling
  silent heartbeat polling, telemetry checks, and automatic payload
  synchronization when network conditions allow.

### 3. Sync & Cloud Layer (The In-Betweens & Remote Spoke)

- **Remote Sync API:** A custom Python FastAPI server acting as the remote cloud
  endpoint for receiving data bundles, managing user states, and hosting shared
  community recipes.
- **Data Contracts & Validation:** An OpenAPI specification
  (`docs/openapi.json`) acting as the cross-language source of truth, enforcing
  unified payload structures between Rust, TypeScript, and Python.
- **Database & Schema Synchronization:** A dual-persistence model mirroring
  local SQLite constraints with remote database schemas (utilizing
  object-relational mapping / query builders where appropriate) to maintain
  integrity across local development (`sqlite`), staging, and production
  environments.

---

## III. Core Features & Implementation Details

### Local-First SQLite Storage & Rust Controller

- **Implementation:** The Rust backend (`sqlx`) initializes and manages an
  embedded SQLite database (`recipes.db`) directly on the user's machine.
- **Affordance:** All primary reads and writes happen locally first. This
  guarantees instant UI response times and full functionality even without an
  active internet connection.

### Type-Safe IPC & OpenAPI Integration

- **Implementation:** Shared data contracts are defined via an OpenAPI
  specification (`docs/openapi.json`), which Rust utilizes to guarantee type
  alignment across the application boundary. Tauri commands bridge the React
  frontend securely to Rust logic without exposing raw filesystem or database
  primitives to the webview.

### Granular Recipe & Nutrition Data Models

- **Implementation:** Recipes are stored as structured relational schemas rather
  than unstructured text blobs.
- **Affordance:** Tracks precise metadata including cooking times, cuisine
  types, ingredient quantities, historical notes, substitutions, and allergen
  warnings so steps can be reliably replicated.

### Automated Background Synchronization

- **Implementation:** A background asynchronous Tokio worker (`sync_worker.rs`)
  periodically polls the remote Python FastAPI server. When network availability
  is detected, it pushes local offline modifications and pulls down shared
  records.
- **Affordance:** Users can edit recipes offline in the kitchen and have them
  automatically propagate to the cloud server once back online, allowing others
  to follow their exact steps.

### Media & Video Support (Planned / In-Progress)

- **Implementation:** Designed to handle binary asset referencing, allowing
  high-resolution photography and step-by-step video walkthroughs to be linked
  directly to recipe nodes and synced across environments.

---

## IV. Living Architecture: Development Progress & Implementation Notes

This section tracks the active state of implementation, what has been
successfully wired up, and the engineering notes taken along the way.

### 1. Implemented & Operational

- **Tauri + Rust Bootstrap:** Successfully configured Tauri v2 with a Rust
  backend. Initialized `sqlx` with an embedded SQLite database (`recipes.db`)
  running foreign key constraints and automated connection pooling.
- **Core Data Models & Commands:** Built strongly typed row structures
  (`UserRow`, `RecipeRow`) mapped to database schemas. Established secure Tauri
  IPC command handlers for fetching, saving, and deleting users and recipes.
- **Python FastAPI Dev Server:** Spooled up a modular FastAPI backend in
  `dev_server/` with automated startup management scripts (`run.sh`) to handle
  remote sync requests and payload exchanges.
- **Background Sync Infrastructure:** Implemented an asynchronous Tokio worker
  (`sync_worker.rs`) inside the Tauri setup lifecycle that periodically checks
  remote server health and handles background data synchronization loops.

### 2. In Progress & Next Up

- **Bidirectional Sync Payloads:** Finalizing the exact payload serialization
  format between the Rust local SQLite state and the Python FastAPI sync
  endpoints to handle conflict-free data merging.
- **Media Attachment Pipeline:** Integrating local file system handlers in Rust
  to save and reference high-res recipe photos, preparing the architecture for
  future video upload capabilities.
- **Frontend State & UI Wiring:** Connecting the React components directly to
  the newly exposed Tauri IPC commands to replace mock states with live
  local-first database interactions.
