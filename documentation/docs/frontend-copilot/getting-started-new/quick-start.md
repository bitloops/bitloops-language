---
sidebar_position: 1
sidebar_label: Quick Start
title: "Quick Start"
description: "The fastest way to get your first Bitloops component generated and editable."
keywords:
  [
    bitloops quick start,
    fast tutorial,
    quick reference,
    getting started fast,
    cheat sheet,
  ]
---

# Quick Start

Fast path for experienced users. Goal: **create a component → open the preview + code → iterate.**

:::info
Want the full walkthrough? See [Getting Started - The Essential Guide](./essential-guide.md).
:::

## 1) Install & sign in

- Install Bitloops from the [**VS Code Marketplace**](https://marketplace.visualstudio.com/items?itemName=Bitloops.bitloops)
- Open the **Bitloops** panel (sidebar icon)
- Sign in with GitHub or Google

Bitloops runs in **VS Code** and **VS Code-based editors** (including forks like **Cursor**).

## 2) Create a project

- **File → Open Folder…**
- Open Bitloops → give your project a name → **Create**

✅ **Checkpoint:** Project actions are enabled.

## 3) Use the demo design (fastest)

Your first project includes a **pre-loaded demo design** already added to the project.

- Open **Design View**
- Select the demo design/frame

✅ **Checkpoint:** You can see the design preview and the design tree.

## 4) Create a component

- Select elements (click, or drag-select like in Figma)
- **Right-click → Create Component** *(Shortcut: Ctrl/Cmd + C in the Bitloops canvas)*
- Name the component

✅ **Checkpoint:** The component appears under **Components** and renders in **Component View** (live preview).

## 5) Attach snapshots (recommended)

Snapshots can be:

- **Instances** (same component, different content) → helps infer **props**
- **Variants** (same component, different state) → helps infer **variants** and **conditional rendering**
- Accept suggested snapshots, **or**
- Select elements → **Right-click → Attach Snapshot to [Component-name]**
  *(Shortcut: if the component is selected, Ctrl/Cmd + A)*

✅ **Checkpoint:** The component has an additional snapshot captured from the design.

## 6) Edit code (the loop)

- Double-click the component under **Components** to open its `.tsx` file
- Edit code → `Ctrl/Cmd + S` → **Component View** updates instantly
- Snapshot View stays fixed as your reference

---

## Account library vs project designs

- **Account library:** all figma pages imported will be stored in your account library and live under **My Design Files.** These are reusable across projects and you only need to import them once. 
- **Project Designs:** are designs you actually add fron your account library to a specific project. A project will generate design system tokens and extract the assets (text and images) from designs added to a project. All generated components/assets/code live in **the folder you opened** (your repo)

## Using your own Figma designs (closed alpha)

Bitloops works with any design, but Figma import access may require enablement while we’re in closed alpha. [Join the waitlist](https://airtable.com/appuDrjEAoOhJTIls/shrSM0ZEsJBanusfa) to get full access. 

## Design syncing (not yet)

Designs don’t auto-sync after import. If a design changes, the simplest approach today is to import a second version or start a new project and re-run the flow.

---

*Try Bitloops at [bitloops.com](https://bitloops.com) and ship your first component before your coffee gets cold.*