---
sidebar_position: 2
sidebar_label: Creating Components
title: "Creating Components"
description: "Step-by-step guide to creating components from your designs in Bitloops."
keywords:
  [
    creating components,
    component creation,
    design to component,
    how to create,
  ]
---

# Creating Components

This guide shows you how to turn a selection in **Design View** into a real React component in your project. We assume you’re signed in, inside a project, and you have at least one design frame added to that project.

You decide what becomes a component and when—Bitloops won’t force a structure. It helps you extract the right boundaries, generate code, and set you up for iteration with snapshots.

## Video walkthrough

<!-- TODO: Replace with YouTube link -->
- YouTube: https://www.youtube.com/watch?v=YOUR_VIDEO_ID

:::tip
Watch once end-to-end, then follow the steps below.
:::

## When to use this

- You want to extract a reusable UI block (card, header, navbar, section, etc.)
- You want Bitloops to generate the initial structure, props, and assets
- You’re ready to start the Snapshot View ↔ Component View ↔ Code loop

## Before you start

- You’re signed in to Bitloops
- You have a project open (folder opened + project created)
- You have at least one frame available in **Design View** (added to the project)

## How it works

Creating a component is the moment Bitloops turns design structure into code:

- You select elements (or a whole frame)
- You create a component (Bitloops generates the `.tsx` and registers it under **Components**)
- Bitloops creates an initial snapshot and/or suggests additional snapshots
- From there, you iterate by attaching more snapshots and refining the code

## Steps

### 1) Open the frame in Design View

1. Open **Design View**
2. Select the frame you want to work with

✅ **Checkpoint:** You can see the frame on the canvas and the design tree on the left.

<!-- TODO: Add screenshot: “Design View with frame selected” -->

### 2) Select the element(s) to componentize

Select elements directly on the canvas (click, or drag-select like in Figma), or select an entire frame when available. To select multiple items, hold **Ctrl** (Windows/Linux) or **Cmd** (Mac) while clicking.

✅ **Checkpoint:** Your target selection is highlighted.

<!-- TODO: Add screenshot: “Selected nodes highlighted on canvas + in tree” -->

### 3) Create the component

With elements selected:

**Right-click → Create Component** *(Shortcut: Ctrl/Cmd + C in the Bitloops canvas)*

Give the component a developer-friendly name (e.g., `ProductCard`, `HeroSection`, `PricingTable`).

✅ **Checkpoint:** The component appears under **Components** and renders for the first time in **Component View** (live preview).

<!-- TODO: Add screenshot: “Create Component dialog + Components tab showing new component” -->

### 4) Open the generated code

Double-click the component under **Components**.

Bitloops opens:
- the component’s `.tsx` file in your editor
- Snapshot View + Component View for comparison (when available)

✅ **Checkpoint:** You can see the component code file open, with Snapshot View and Component View visible for the component.

<!-- TODO: Add screenshot: “3-panel workflow with code + snapshot + preview” -->

### 5) Save and see live updates

Make a small change in the `.tsx` file and save (`Ctrl/Cmd + S`).

✅ **Checkpoint:** **Component View** updates immediately.

<!-- TODO: Add screenshot: “Code change + updated Component View” -->

## Notes

- If the selection produces awkward layout, add **Layout Containers** to make grouping/layout intent explicit before (or after) creating the component.
- Components are composable: you can create smaller components first and build parent components on top.

---

*Next up: attach a couple of snapshots so Bitloops can infer props, variants, and conditionals.*
