---
sidebar_position: 7
sidebar_label: Nested Components
title: "Nested Components"
description: "Step-by-step guide to composing child components inside parent components for cleaner structure and reuse."
keywords:
  [
    nested components,
    component composition,
    reusable components,
    parent child components,
  ]
---

# Nested Components

This guide shows you how to build larger components by composing smaller ones (nesting), and how Bitloops keeps the structure clean when components appear inside other components. We assume you’re signed in, inside a project, and you already have at least one component created.

Nesting is how you scale from “one card” to “a whole section” without copy-pasting markup.

## Video walkthrough

<!-- TODO: Replace with YouTube link -->
- YouTube: https://www.youtube.com/watch?v=YOUR_VIDEO_ID

:::tip
Nesting works best when you already have a stable child component with a couple of snapshots (instances/variants). That gives Bitloops a clearer prop boundary.
:::

## When to use this

- You want to build a section/page out of smaller components (compose upward)
- You created a big component and want to extract a reusable part (refactor downward)
- You have repeated UI blocks across screens and want one “child” used in many parents
- You want cleaner props and less duplicated layout logic

## Before you start

- You’re signed in to Bitloops
- You have a project open
- You have a design frame available in **Design View**
- You have (or plan to create) at least one child component (e.g., `Button`, `Card`, `Badge`)

## How it works

In Bitloops, nesting is reflected in both the **design tree** and the **generated code**:

- When a component is created, it appears under the **Components** tab
- When that component is used inside another selection, Bitloops treats it as a component **instance**
- Parent components will reference the child component (imports + JSX usage)
- Snapshot differences help Bitloops pass the right data/props through the hierarchy

You can approach nesting two ways:
- **Bottom-up:** make smaller components first, then build parents
- **Top-down:** make a large component first, then extract smaller parts

## Steps

### 1) Create (or identify) the child component

Pick a UI element that repeats and should be reusable—e.g. `Button`, `Avatar`, `Badge`, `BlogCard`.

If it doesn’t exist yet:
1. In **Design View**, select the child UI
2. **Create Component**

✅ **Checkpoint:** The child component appears under **Components**.

<!-- TODO: Add screenshot: “Child component created + listed under Components” -->

### 2) Open the parent frame/section in Design View

Navigate to the frame or section where you want the parent component (the one that will *contain* the child).

✅ **Checkpoint:** You can see the larger layout/section that includes (or will include) the child UI.

<!-- TODO: Add screenshot: “Parent frame visible in Design View” -->

### 3) Select the parent boundary (including child instances)

Select the elements that make up the parent section. If the design already contains the child UI in multiple places (e.g., multiple cards or buttons), include those in your selection.

✅ **Checkpoint:** Your selection matches the intended parent boundary (a section, header block, page area, etc.).

<!-- TODO: Add screenshot: “Parent selection highlighted” -->

### 4) Create the parent component

Right-click → **Create Component** *(Shortcut: Ctrl/Cmd + C in the Bitloops canvas)*  
Name it (e.g., `HeroSection`, `BlogGrid`, `PricingSection`).

✅ **Checkpoint:** The new parent component appears under **Components** and renders in Component View.

<!-- TODO: Add screenshot: “Parent component created and visible in Components tab” -->

### 5) Verify nesting in the code

Open the parent component from **Components** and inspect the generated `.tsx`.

You should see:
- the child component imported (when applicable)
- the child component rendered as a JSX instance inside the parent

✅ **Checkpoint:** The parent component uses the child component rather than duplicating its markup.

<!-- TODO: Add screenshot: “Parent code showing child import + JSX usage” -->

### 6) Pressure-test with snapshots

If the parent component has multiple snapshots (instances/variants), switch between them and confirm:
- child instances still render correctly
- prop/data differences flow through cleanly
- layout remains consistent

✅ **Checkpoint:** The parent holds up across snapshots without copy-pasted fixes.

<!-- TODO: Add screenshot: “Parent snapshots switching with stable render” -->

## Notes

- If the parent layout becomes messy, add **Layout Containers** to express hierarchy intent (wrappers you’d write by hand).
- If nesting causes one snapshot to break, it usually means you need clearer prop boundaries (instance data) or a conditional (variant/state).
- Nested components are iterative: it’s normal to create a parent, then go back and tighten the child API using more snapshots.

---

*Next up: attach a couple of snapshots to the parent component so its layout and prop boundaries are tested against real examples—not just the “happy path.”*
