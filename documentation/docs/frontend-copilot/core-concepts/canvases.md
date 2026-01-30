---
sidebar_position: 6
sidebar_label: Canvases
title: "Canvases"
description: "Learn about the four canvases in Bitloops - Design View, Snapshot View, Component Preview, and File Import."
keywords:
  [
    canvases,
    design view,
    snapshot view,
    component preview,
    file import,
    workspaces,
  ]
---

# Canvases

**Canvases are a core Bitloops product feature.** They’re the purpose-built workspaces that makes Bitloop usable as a *frontend copilot* rather than “just a generator.”

Instead of cramming design inspection, state comparison, and code preview into one cluttered view, Bitloops splits the workflow into four canvases—each optimized for a specific job. That structure helps you:

- understand what you’re looking at (design vs snapshot vs code)
- know what action is appropriate in each step
- quickly spot differences between the design reference and the rendered component

:::tip
Canvases aren’t different “modes.” They’re different **lenses** over the same workflow—each one designed to reduce cognitive load and make the design-to-code loop faster and more reliable.
:::

---

## Design View

The **Design View** is where you explore the imported design in a development-friendly way.

It’s a read-only representation of the imported design that’s optimized for implementation—so the tree you see may be cleaner than Figma’s (design noise is filtered out), but it still preserves the structure and details that matter for building the UI.

### What you do here

- Explore the design structure and hierarchy
- Inspect spacing/alignment (hold `ALT`, like Figma)
- Select single or multiple nodes
- Create layout containers (manual grouping for intent)
- Create components from selected elements
- Attach snapshots to components

### What you don’t do here

- Edit the design itself

Design View is the “where do I start?” canvas: you decide component boundaries and prepare the structure that will become code.

---

## Snapshot View

The **Snapshot View** isolates a component-sized slice of the design—captured as a snapshot.

It’s the design reference you compare against when implementing or refining a component.

### What a snapshot shows

- The exact design slice for a component example
- Concrete content (text/images) for that example
- A specific case that may represent:
  - an **instance** (same structure, different data), or
  - a **variant** (different state/style/layout)

### When to use Snapshot View

- Implementing a component state/example
- Comparing design intent vs implementation output
- Spotting what changes across snapshots (props, variants, conditionals)
- Checking spacing and alignment quickly

Snapshot View exists so you can stay in your editor and still have a precise source of truth.

---

## Component Preview

The **Component Preview** renders the real component output—directly from your `.tsx` file.

Every time you save, the preview updates immediately. This is the implementation side of the comparison loop.

### What Component Preview is for

- Validating implementation against the Snapshot View
- Checking layout/spacing/structure
- Verifying conditionals and snapshot-driven differences
- Evaluating responsiveness (especially when you attach viewport-specific snapshots)

Component Preview is where “does it actually work in code?” gets answered instantly.

---

## File Import Canvas

The **File Import Canvas** is where you manage designs:

- import design files into your account library
- add frames from those files into a specific project

### What it does

- Import a Figma source into **My Design Files** (account-level library)
- Show available pages/frames from that source
- Let you choose what frames to add to the current project

### Important notes

- Imported designs do **not** auto-sync with Figma (yet)
- Imports never edit your original Figma files
- Treat imports as a static capture of the design at that moment

---

## Navigating between canvases

Bitloops makes canvas navigation intentional—because each canvas is tied to a specific kind of work.

### Via icons

Three icons at the top of the sidebar provide quick access:

| Icon | Opens |
|------|-------|
| Design View icon | Design View |
| Snapshot View icon | Snapshot View |
| Component View icon | Component Preview |

### Via sidebar selection

| Selection | Result |
|-----------|--------|
| Select a **Design** | Opens Design View |
| Select a **Snapshot** | Opens Snapshot View |
| Select a **Component** | Opens Snapshot View + Component Preview + the component `.tsx` file |

---

## The “compare loop” (why canvases matter)

The core Bitloops workflow is a tight comparison loop:

- **Snapshot View** shows what the design example looks like
- **Component Preview** shows what your code renders
- **Your editor** is where you make changes

That separation is the whole point of canvases: they make differences obvious and iteration fast.

Snapshot View (design reference) ↔ Component Preview (live code output) ↔ Code Editor

If something is off—spacing, hierarchy, conditional rendering—canvases make it easy to identify where the mismatch is coming from and fix it without leaving your IDE.

## Related pages

- [Designs](./designs.md) - The source of truth
- [Snapshots](./snapshots.md) — Design-based component examples (instances and variants)
- [Components & Reusability](./components-and-reusability.md) — Component architecture patterns
- [Layout Containers](./layout-containers.md) — Manual structure control

---

*Try Bitloops at [bitloops.com](https://bitloops.com) — the canvases make the “design ↔ code” gap finally feel manageable.*
