---
sidebar_position: 5
sidebar_label: Component Testing
title: "Component Testing"
description: "Step-by-step guide to validating components in Bitloops by comparing Snapshot View (design) against Component View (live output)."
keywords:
  [
    component testing,
    snapshot comparison,
    visual testing,
    design to code validation,
    component preview,
  ]
---

# Component Testing

This guide shows you how Bitloops helps you validate a component against its attached snapshots—so you can catch layout/structure issues early and fix them while you’re still in the implementation loop.

Bitloops testing here is not “unit tests” in the traditional sense. It’s **design-to-output validation**: Snapshot View is the reference, Component View is the live result, and Bitloops surfaces where they don’t match.

## Video walkthrough

<!-- TODO: Replace with YouTube link -->
- YouTube: https://www.youtube.com/watch?v=YOUR_VIDEO_ID

:::tip
Attach at least 2–3 snapshots (instances or variants) before testing—differences are where the signal comes from.
:::

## When to use this

- After attaching snapshots to a component (instances, variants, viewport-specific examples)
- After editing layout containers or refactoring component structure
- Before reusing a component across multiple screens/pages
- When a component “looks right” for one snapshot but breaks for another

## Before you start

- You’re signed in to Bitloops
- You have a project open
- You have a component created under **Components**
- That component has at least one snapshot attached (ideally multiple)

## How it works

Bitloops compares each snapshot’s **design slice** to the component’s **rendered output** and flags potential mismatches, such as:

- spacing/alignment issues
- incorrect hierarchy/grouping
- missing/extra elements
- conditional elements behaving inconsistently across snapshots
- responsive differences (when viewport snapshots exist)

These results are surfaced per snapshot so you can fix issues incrementally without guessing.

## Steps

### 1) Open the component from the Components tab

1. Open the **Components** tab
2. Double-click the component you want to validate

✅ **Checkpoint:** Snapshot View + Component View are visible (and your `.tsx` file is open).

<!-- TODO: Add screenshot: “Components tab → component opened → panels visible” -->

### 2) Check the snapshot indicators

In the **Components** tab (and/or while browsing snapshots), Bitloops surfaces indicators per snapshot when it detects mismatches.

✅ **Checkpoint:** You can see which snapshots are “clean” and which ones are flagged.

<!-- TODO: Add screenshot: “Snapshot list with pass/fail/issue indicator” -->

### 3) Inspect a flagged snapshot

1. Select a flagged snapshot
2. Compare **Snapshot View** (design reference) against **Component View** (live output)

Use this pass to identify what kind of mismatch it is:
- missing wrapper / grouping issue
- spacing/alignment
- conditional element appearing incorrectly
- viewport-specific layout differences

✅ **Checkpoint:** You can point to the mismatch visually (what’s different, and where).

<!-- TODO: Add screenshot: “Same snapshot vs live preview mismatch example” -->

### 4) Fix the mismatch

Most fixes fall into one of these paths:

- **Layout/structure fix:** add or adjust **Layout Containers** to make hierarchy intent explicit
- **Implementation fix:** edit the `.tsx` file (and save) to correct structure, props, or conditional rendering

✅ **Checkpoint:** After saving or updating containers, Component View matches Snapshot View more closely for that snapshot.

<!-- TODO: Add screenshot: “Before/after: mismatch resolved” -->

### 5) Re-check across all snapshots

Once a fix is applied, cycle through the other snapshots attached to the same component. Often:
- a structural fix improves multiple snapshots at once, or
- a conditional fix resolves a specific variant only

✅ **Checkpoint:** The component renders consistently across the snapshot set (instances + variants).

<!-- TODO: Add screenshot: “Multiple snapshots all passing / clean state” -->

## Notes

- Snapshot validation is most useful when you attach **real examples** (multiple instances + at least one meaningful state difference).
- If a single snapshot is “wrong,” the issue is often missing hierarchy—try Layout Containers before rewriting logic.
- Bitloops may also add stable data attributes to support mapping and testing workflows. In general, treat them as tool-owned metadata.

---

*Next up: if the component passes across snapshots, start nesting it into a parent component and reuse it across screens with confidence.*
