---
sidebar_position: 4
sidebar_label: Adding Layout Containers
title: "Adding Layout Containers"
description: "Step-by-step guide to adding Layout Containers (wrapper divs) so Bitloops can generate cleaner, more intentional layout code."
keywords:
  [
    layout containers,
    divs,
    grouping elements,
    flex layout,
    structure,
  ]
---

# Adding Layout Containers

This guide shows you how to add **Layout Containers** in Bitloops—intentional wrapper `div`s that define layout structure (flex/grid, spacing, alignment). We assume you’re signed in, inside a project, and you’re working from an imported design (or an existing component).

Layout containers are where Bitloops becomes a true copilot: it can infer a lot from design, but **layout can be implemented in multiple valid ways**. Containers let you and Bitloops agree on the hierarchy that will produce clean, maintainable code.

## Video walkthrough

<!-- TODO: Replace with YouTube link -->
- YouTube: https://www.youtube.com/watch?v=YOUR_VIDEO_ID

:::tip
Watch once end-to-end, then follow the steps below.
:::

## When to use this

- The generated structure feels too flat (missing wrappers you’d write by hand)
- Spacing/alignment is hard to express without a parent wrapper (`gap`, `items-*`, `justify-*`)
- A snapshot doesn’t match well because grouping/hierarchy is unclear
- You’re preparing a selection so “Create Component” produces a cleaner layout
- You’re attaching snapshots (instances/variants) and want consistent structure across them

## Before you start

- You’re signed in to Bitloops
- You have a project open
- You can see the relevant UI in **Design View** or via a component’s **Snapshot View**
- You have a clear intent (row vs column, what should move together, what should wrap together)

## How it works

A Layout Container is a structural decision:

- Bitloops groups the selected elements under a new container in the tree
- In code, that container becomes a wrapper element (typically a `<div>`)
- You can then configure it with layout rules (flex/grid, alignment, gap, padding, responsive behavior)

You can nest containers—exactly like you would when structuring JSX by hand.

## Steps

### 1) Open the right place to add containers

You can add containers in either place:

- **Design View** (best when you want to fix structure before creating a component), or
- **Snapshot View** (best when you’re refining an existing component to match a snapshot)

✅ **Checkpoint:** You can see the elements you want to group, and you can select them on canvas or in the tree.

<!-- TODO: Add screenshot: “Design View vs Snapshot View (where to do it)” -->

### 2) Select the elements to group

Select multiple elements that should behave as a unit—for example:
- image + text block + button inside a card
- a row of tags
- a header title + subtitle group

Tip: group by **behavior**, not just proximity (what should resize/move together).

✅ **Checkpoint:** All intended elements are selected and highlighted.

<!-- TODO: Add screenshot: “Multi-select highlighted” -->

### 3) Create the Layout Container

With elements selected:

- Press `Cmd + G` (Mac) / `Ctrl + G` (Windows/Linux), or
- Right-click → **Add Layout Container**

Bitloops will wrap the selected elements into a container and apply a sensible default layout you can refine.

✅ **Checkpoint:** A new container appears in the tree and the selected elements are now children of it.

<!-- TODO: Add screenshot: “Container added in tree” -->

### 4) Configure layout intent (direction, spacing, alignment)

Select the new container and set the layout intent in the properties panel:

- **Direction:** row vs column
- **Spacing:** `gap-*`
- **Alignment:** `items-*`, `justify-*`
- **Sizing & padding:** width/height constraints, `p-*`, `m-*`
- **Responsive adjustments:** breakpoint-specific behavior (as needed)

✅ **Checkpoint:** The grouping reads correctly in the tree and the layout looks closer to the design.

<!-- TODO: Add screenshot: “Container properties panel + updated layout” -->

### 5) Nest containers for real layouts

If the UI needs more structure, repeat the process:

1. Create an inner container first (tightest grouping)
2. Then group that container with adjacent elements
3. Build outward until the layout hierarchy matches your mental model

✅ **Checkpoint:** The hierarchy is understandable at a glance (not overly deep, but not flat).

<!-- TODO: Add screenshot: “Nested containers” -->

## Notes

- If a snapshot doesn’t match, missing hierarchy is often the culprit—containers are usually the cleanest fix.
- Don’t over-nest. Prefer fewer, meaningful wrappers.
- Containers are especially useful before attaching lots of snapshots: consistent structure reduces later refactors.

---

*Next up: attach snapshots (instances + variants) and use them to pressure-test your layout across real examples.*
