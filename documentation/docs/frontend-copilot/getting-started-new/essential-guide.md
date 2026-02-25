---
sidebar_position: 2
sidebar_label: The Essential Guide
title: "Getting Started - The Essential Guide"
description: "Complete walkthrough of Bitloops: install the extension, open your first project, create a component, and understand snapshots."
keywords:
  [
    bitloops tutorial,
    getting started,
    figma import,
    create component,
    snapshots,
    VS Code extension,
    first component,
  ]
---

# Guide to working with Bitloops

This guide walks you through your first Bitloops win: **open a project → create a component → generate code → attach snapshots**.

You’ll learn the basics by doing, not reading.

## Welcome & Overview

Bitloops is your [AI-powered frontend copilot](https://bitloops.com)—built to turn messy designs into **clean, reusable, production-ready React + Tailwind CSS code**. No magic tricks. No throwaway prototypes. Just real components you can ship.

Bitloops runs inside [**Visual Studio Code**](https://visualstudio.microsoft.com/) and **VS Code-based editors** (including popular forks like [**Cursor**](https://cursor.com/docs), [**Windsurf**](https://windsurf.com/) and [**Antigravity**](https://antigravity.google/)).

### Start here: Watch a demo video

Below is a short walkthrough of the exact flow you're about to follow (new video being developed).

<!-- TODO: Add Embedded Demo Video Here -->

:::tip
Keep the video open as you go—it's much easier to follow along.
:::

---

## Install & set up Bitloops

Before we jump into generating components, let’s get Bitloops installed and signed in. You only need to do this once.

### 1) Install the Bitloops extension

Search for **"Bitloops"** in the **VS Code Marketplace** within VS Code and click Install or click on this link: [Bitloops VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Bitloops.bitloops)

✅ **Checkpoint:** You can see the Bitloops icon/panel in your editor sidebar.

### 2) Sign In / Create Your Account

Open the Bitloops panel and sign in using GitHub or Google.

✅ **Checkpoint:** You’re signed in and can access Bitloops features from the sidebar. It now asks you to open a folder (if you're not in one), or to create a project. 

### 3) Prerequisites

Bitloops works out of the box. Recommended:

- **VS Code (or a VS Code-based editor)**
- **A Figma account** (only needed if/when you import your own designs - we provide you a Demo Design in your first project)

---

## Account Library vs Project

Bitloops separates **design storage** from **your codebase**:

- **Account library:** Design files live under **My Design Files** and can be reused across projects.
- **Project:** Generated components, assets, and code live in **the folder you opened in your editor** (your repository).

This keeps your code local and reviewable, while letting you reuse design imports across projects.

---

## Start a project (1st project comes with a Demo Design)

### Name and create a project

Open a folder in your editor (empty or existing):

**Top Menu → File → Open Folder…**

Now click on the Bitloops extension icon, give your project a name and click create. That folder becomes your current Bitloops project.

✅ **Checkpoint:** Bitloops treats the open folder as the active project (project actions become available). You should see 2 sections on the left: Components and Designs as well as 3 canvasas: Designs View, Snapshot View and Component Preview

### Your Demo Design is already ready

To help you get your first win quickly, Bitloops starts you with a **pre-loaded demo design** already imported **and added to your first project**.

That means you can immediately move on to creating a component — no Figma setup required or design import. 

✅ **Checkpoint:** You can see a design/frame available in your project’s Design View.

### Want to use your own designs?

Bitloops works with any design, however, we are in closed Alpha. Do sign-up to our [waiting list](https://airtable.com/appuDrjEAoOhJTIls/shrSM0ZEsJBanusfa) if you want to gain early acces by providing some additional information. 

---

## Understanding the canvases

Bitloops includes four canvases, each aligned with a different stage of work:

| Canvas | Purpose |
|--------|---------|
| **Design View** | Inspect design structure and select elements to turn into components |
| **Snapshot View** | Compare a component’s design slice (a specific state) |
| **Component View** | Live preview rendered from your code |
| **File Import Canvas** | Manage (import) design files in your account/ add designs to projects |

You don’t need to memorize these right now—just know where you are:

- **Design View** is where you create components and can see the design "data" (spacings, distances, etc. by selecting an element and pressing option or alt)
- **Snapshot View** is where you see only that specific snapshot to compare against the implemented component where you're able to manually add layout containers 
- **Component Preview** is where you view the rendered component

For the full breakdown, see:  
- [Core Concepts: Canvases](../core-concepts/canvases.md)

---

## Your first component

Now that you have a design ready in your project, it’s time to create your first Bitloops component.

### Step 1 — Open the design view

Open the Design View (if its not automatically open) and select the design you want to work with.

✅ **Checkpoint:** You can see:
- the design preview on the right
- the design element tree (open) on the left in the sidebar

### Step 2 — Select the element(s)

Select elements directly on the canvas (click, or drag-select like in Figma), or select an entire frame when available. To select multiple items, hold Ctrl (Windows/Linux) or Cmd (Mac) while clicking.

✅ **Checkpoint:** Your target element(s) are highlighted/selected.

### Step 3 — Create the component

With elements selected:

**Right-click → Create Component** (shortcu: Ctrl/CMD + C in the Bitloops canvas) and then give your component a name. 

Bitloops will:

- create a new component in your project
- generate the initial `.tsx` file
- create an associated snapshot representing the design slice for that component

✅ **Checkpoint:** You can see the new component listed under **Components**, and it renders for the first time in **Component Preiew** (live preview).

### Step 4 — View your component code

Double-click the component under **Components**.

Bitloops opens the **component's `.tsx` file** in the editor

✅ **Checkpoint:** You can see Snapshot View + Component View and the component code file is open.

:::tip
Select an element in the snapshot view and press **ALT** to inspect spacing between elements.
:::

---

## Snapshots (the only part you need right now)

A snapshot is a **design-based example** of your component—captured from the imported design and used as a reference while you build.

Snapshots can represent two common situations:

- **Different instances (same component, different content)**  
  Example: a page has 6 blog cards. The component is the same, but each card has different titles, images, or labels. Those are **multiple snapshots of the same component**. They help Bitloops understand what should become **props** (e.g., `title`, `image`, `tag`) while keeping the structure consistent.

- **Variants (same component, different state)**  
  Example: `default`, `hover`, `active`, `disabled`, or other state-driven designs. These snapshots help Bitloops model **variants** and, where needed, **conditional rendering**.

### Why snapshots matter

Snapshots help Bitloops infer:
- **Props** — what changes across different instances (content, assets, optional fields)
- **Variants** — different visual/state configurations of the same component
- **Conditional rendering** — what appears or disappears across snapshots (e.g., “tag” exists only sometimes)

### Attaching a snapshot

Bitloops may suggest snapshots automatically. You can accept/reject them.

To attach one manually:
1. Select the design elements you want as a snapshot
2. Right-click → **Attach Snapshot to [Component-name]** (Shortcut: if the component is selected, you can use Ctrl / CMD + A)

✅ **Checkpoint:** The component now has an additional snapshot captured from the design.

---

## Editing the code

- Edit the `.tsx` file normally
- Press `Ctrl + S`
- Bitloops updates the **Component View** immediately
- Snapshot View stays fixed as your reference

✅ **Checkpoint:** You can change code, save, and see the preview update instantly.

---

## Design syncing (not yet)

Bitloops does **not** auto-sync changes from Figma after a design is imported.

If your design changes, the simplest approach today is to:
- import a second version of the design, **or**
- start a new project and re-run the extraction flow

---

## What’s Next?

### Go Deeper (When You’re Ready)

- [Core Concepts: Canvases](../core-concepts/canvases.md)
- [Core Concepts: Snapshots](../core-concepts/snapshots.md)

### Continue Building

- [Guide: Creating Components](../Guides/creating-components.md)
- [Guide: Attaching Snapshots](../Guides/attaching-snapshots.md)
- [Guide: Adding Layout Containers](../Guides/adding-layout-containers.md)
- [Guide: Nested Components](../Guides/nested-components.md)

### Get Help

- [FAQs](../faq-troubleshooting/faqs.md)
- [Common Challenges](../faq-troubleshooting/common-challenges.md)
- [Join our Discord](../community-support/discord.md)

---

*Try [Bitloops](https://bitloops.com) to see the full workflow in action—design to editable React components in minutes.*