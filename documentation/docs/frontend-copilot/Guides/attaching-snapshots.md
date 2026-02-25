---
sidebar_position: 3
sidebar_label: Attaching Snapshots
title: "Attaching Snapshots"
description: "Step-by-step guide to attaching snapshots to a component to infer props, variants, and responsive behavior."
keywords:
  [
    attaching snapshots,
    snapshots,
    component instances,
    variants,
    responsive design,
  ]
---

# Attaching Snapshots

This guide shows you how to attach additional snapshots to an existing component. We assume you’re signed in, inside a project, and you already created a component.

Snapshots are design-based examples of a component. They can represent:
- **Instances** (same component, different data/content), and/or
- **Variants** (meaningful state/style/layout differences, including viewport-specific versions)

Attaching snapshots is how you teach Bitloops what changes and what stays consistent—so it can infer a cleaner component API.

## Video walkthrough

<!-- TODO: Replace with YouTube link -->
- YouTube: https://www.youtube.com/watch?v=YOUR_VIDEO_ID

:::tip
Watch once end-to-end, then follow the steps below.
:::

## When to use this

- You have multiple occurrences of the same UI (e.g., several cards on a page) and want Bitloops to infer **props**
- You have state differences (e.g., selected/expanded/error) and want Bitloops to infer **variants/conditionals**
- You have desktop + mobile designs and want Bitloops to infer **responsive behavior**
- You created a component early and want to improve it using more examples

## Before you start

- You’re signed in to Bitloops
- You have a project open
- A component already exists under the **Components** tab
- The frame(s) containing the new example(s) are available in **Design View**

## How it works

Attaching a snapshot doesn’t overwrite your component—it **adds another example** under that component.

- Each attached snapshot appears under the component
- A component can have **many snapshots**
- Bitloops uses snapshot differences to infer:
  - props (what changes across instances)
  - variants (what changes across states)
  - conditional rendering (what appears/disappears)
  - responsive rules (when viewport snapshots exist)

## Steps

### 1) Open the frame that contains the example

1. Open **Design View**
2. Select the frame where the example lives (another instance, another state, or another viewport)

✅ **Checkpoint:** You can see the target UI on the canvas and in the design tree.

<!-- TODO: Add screenshot: “Design View with target frame selected” -->

### 2) Select the snapshot elements

Select the exact group of elements that represents the component in this example.

This might be:
- one of several repeated instances (e.g., BlogCard #3), or
- a variant/state (e.g., selected), or
- a viewport-specific version (e.g., mobile)

✅ **Checkpoint:** The selection is highlighted and matches the component boundary you intend.

<!-- TODO: Add screenshot: “Elements selected for snapshot” -->

### 3) Attach the snapshot to an existing component

Right-click the selection → **Attach Snapshot to [Component-name]**  
(or choose the component from the attach list if shown)

*(Shortcut: if the component is selected, `Ctrl/Cmd + A` attaches the snapshot.)*

✅ **Checkpoint:** The snapshot is now listed under that component.

<!-- TODO: Add screenshot: “Context menu attach + snapshot appears under component” -->

### 4) Review in Snapshot View + Component View

Open the component from the **Components** tab to enter the compare loop:

- **Snapshot View** shows the newly attached design example
- **Component View** shows the live render from your `.tsx`

✅ **Checkpoint:** You can switch between snapshots and compare design vs output.

<!-- TODO: Add screenshot: “Snapshot list + Snapshot View + Component View visible” -->

### 5) Iterate if something is off

If the new snapshot doesn’t match the current implementation, you have two common fixes:

- Adjust code in the `.tsx` file (save to refresh preview)
- Add/adjust **Layout Containers** if the hierarchy/grouping is the real issue

✅ **Checkpoint:** The component renders correctly for this snapshot example.

<!-- TODO: Add screenshot: “Before/after fix with matching preview” -->

## Notes

- **Instances vs variants:** multiple “same component” examples are still valuable snapshots—even if nothing is “variant-like.” They help Bitloops infer props and optional fields.
- **Viewport snapshots:** attaching mobile/desktop examples gives Bitloops more signal for responsive output.
- You can attach snapshots at any time—even after editing the component code.

---

*Next up: open the component and use the snapshots to drive props, variants, and responsiveness—one example at a time.*