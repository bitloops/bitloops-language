---
sidebar_position: 6
sidebar_label: Editing Components
title: "Editing Components"
description: "Step-by-step guide to editing generated components in your codebase and validating changes instantly in Bitloops."
keywords:
  [
    editing components,
    code editing,
    live preview,
    snapshot validation,
  ]
---

# Editing Components

This guide shows you how to edit a Bitloops-generated component like any normal React component: open the file, change the code, save.

Bitloops stays in sync while you work by keeping the **compare loop** tight:
**Snapshot View (design) ↔ Component View (live output) ↔ Code (your editor)**

There’s no special syntax and no hidden layer—you own the code.

## Video walkthrough

<!-- TODO: Replace with YouTube link -->
- YouTube: https://www.youtube.com/watch?v=YOUR_VIDEO_ID

:::tip
Make small edits first (spacing, wrappers, simple props), then pressure-test across snapshots before doing larger refactors.
:::

## When to use this

- You want to tweak Tailwind classes, spacing, typography, or layout
- A snapshot is flagged as “off” and you want to fix the mismatch
- You’re adding conditional rendering or cleaning up props
- You’re preparing a component for reuse (nesting into a parent component)

## Before you start

- You’re signed in to Bitloops
- You have a project open
- You have a component under the **Components** tab
- That component has at least one snapshot (ideally multiple) so you can validate changes

## How it works

When you open a component from the **Components** tab, Bitloops gives you the full editing loop:

- **Code file** (`.tsx`) opens in your editor
- **Component View** renders the component from your code
- **Snapshot View** shows the design reference for the selected snapshot
- On save (`Ctrl/Cmd + S`), Bitloops refreshes the preview and re-evaluates snapshot alignment

Edits don’t require a rebuild or manual refresh—the live preview updates immediately.

## Steps

### 1) Open the component from the Components tab

1. Open the **Components** tab
2. Double-click the component you want to edit

✅ **Checkpoint:** The component’s `.tsx` file opens, and you can see Snapshot View + Component View for comparison.

<!-- TODO: Add screenshot: “Components tab → component opened → code + snapshot + preview visible” -->

### 2) Make a targeted change

Common edits include:

- Adjust Tailwind classes (`gap-*`, `p-*`, `text-*`, `items-*`, `justify-*`)
- Introduce or remove a wrapper `div` (often paired with Layout Containers)
- Refine props (rename, make optional, set defaults)
- Add conditional rendering for optional elements
- Replace repeated markup with nested component usage

✅ **Checkpoint:** The code compiles and the component still renders in Component View.

<!-- TODO: Add screenshot: “Code change highlighted” -->

### 3) Save and validate instantly

Save the file (`Ctrl/Cmd + S`).

✅ **Checkpoint:** Component View updates immediately—no reload required.

<!-- TODO: Add screenshot: “Before/after preview update on save” -->

### 4) Pressure-test across snapshots

Switch between snapshots attached to the component:

- Instances (same structure, different content)
- Variants (state/style/layout differences)
- Viewport snapshots (mobile/desktop examples)

✅ **Checkpoint:** The component holds up across snapshots (or you can clearly see which snapshot is now off).

<!-- TODO: Add screenshot: “Switching snapshots + consistent rendering” -->

### 5) Fix structural issues with Layout Containers (when needed)

If one snapshot is off due to hierarchy/grouping, the cleanest fix is often structural:

- Add or adjust **Layout Containers** to make layout intent explicit
- Then refine Tailwind classes for spacing/alignment

✅ **Checkpoint:** The hierarchy is clearer and the snapshot matches more reliably.

<!-- TODO: Add screenshot: “Layout container adjustment + improved match” -->

## Notes

- Bitloops won’t overwrite your edits unless you explicitly regenerate/replace a component.
- If a change “fixes” one snapshot but breaks another, that’s usually a signal you need:
  - a prop boundary (instance differences), or
  - a conditional branch/variant handling (state differences), or
  - an explicit wrapper (layout container / hierarchy intent).
- Treat tool-owned metadata (like generated mapping attributes) as read-only unless a doc explicitly says otherwise.

---

*Next up: once the component holds up across snapshots, nest it into a parent component and reuse it with confidence.*