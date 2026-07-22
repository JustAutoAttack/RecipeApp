# Recip

A local-first, high-performance recipe management IDE designed for precision
nutrition and documentation. By utilizing a **Rust-powered backend** and a
**React frontend**, the application ensures that your culinary data is managed
with absolute integrity, remains accessible offline, and synchronizes seamlessly
across all your devices.

## The Tech Stack

| Layer                    | Technology         | Role                                                  |
| :----------------------- | :----------------- | :---------------------------------------------------- |
| **Language (Backend)**   | Rust               | Orchestration, sync logic, and secure key management. |
| **Database (Embedded)**  | SQLite (libSQL)    | High-performance, local-first storage.                |
| **Sync Engine**          | Supabase/PowerSync | Bidirectional replication between local and remote.   |
| **Language (Frontend)**  | TypeScript         | Type-safe UI logic and state management.              |
| **Framework (Frontend)** | React              | Declarative UI for recipe creation and planning.      |
| **Styling**              | Tailwind CSS       | Atomic CSS for rapid UI iteration.                    |
| **Communication**        | Tauri IPC          | Secure bridge between Rust and the React UI.          |

## Feature Roadmap & Status

| Feature                 | Description                                                             | Status  |
| :---------------------- | :---------------------------------------------------------------------- | :------ |
| **Recipe Management**   | Create, edit, and store recipes (ingredients, instructions, etc).       | Planned |
| **Ingredient Tracking** | Granular data: Name, brand, amount, and units.                          | Planned |
| **Advanced Metadata**   | Substitutions, allergy notes, and history.                              | Planned |
| **Media Support**       | Ability to attach photos to individual recipes. Upload/Download photos. | Planned |
| **Data Export**         | Export capabilities to PDF, JSON, and CSV.                              | Planned |
| **Print Support**       | Formatted, print-ready document generation.                             | Planned |
| **Cloud Sync**          | Real-time bidirectional sync via Supabase.                              | Planned |
| **Auth/Login**          | Secure user authentication and data isolation.                          | Planned |

## Why This Stack?

The architecture is built for **data ownership** and **zero-latency interaction**.

- **Tauri:** Leverages the OS native webview for a lightweight, secure
  footprint, ensuring the app runs efficiently on desktop and mobile without the
  bloat of traditional frameworks.
- **Rust:** Acts as the "Controller." It manages the local database, handles
  sensitive API keys (Service Role) that never touch the frontend, and manages
  the lifecycle of your remote synchronization.
- **SQLite (libSQL):** Provides a robust local "Source of Truth." Because your
  data lives on your device, the app remains fully functional and lightning-fast
  regardless of your network connectivity.
- **PowerSync/Supabase:** Bridges your local environment to the cloud. It
  handles the complex "heavy lifting" of conflict resolution and real-time
  streaming, ensuring your PC and phone stay perfectly in sync.
- **React & TypeScript:** Enables a highly modular component structure. This
  allows for complex recipe editing and macro-tracking dashboards that are as
  performant as they are type-safe.
- **Tailwind CSS:** Facilitates a design-system-first approach, ensuring the app
  is responsive across both wide-screen desktop monitors and compact mobile
  screens.

## The Philosophy: Local-First Synchronization

The core of the Recipe App is a **BFF (Backend-for-Frontend) pattern** that
prioritizes data sovereignty:

1.  **The Local Source (Rust/SQLite):** Every interaction—creating a recipe or
    adding a macro—happens locally first. The UI writes to the Rust backend,
    which commits to SQLite instantly, providing a zero-latency experience.
2.  **The Invisible Sync (Remote):** The Rust backend silently manages the
    background synchronization with Supabase. Because this happens at the system
    level, your frontend never needs to manage API tokens, WebSocket
    connections, or network state—it simply reacts to data updates emitted by
    the Rust layer.

This separation ensures that your data is **yours first**, while remaining
**available everywhere** you need it.
