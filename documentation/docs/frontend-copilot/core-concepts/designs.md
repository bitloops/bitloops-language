---
sidebar_position: 1
sidebar_label: Designs
title: "Designs"
description: "Understand how Designs work in Bitloops - the visual source of truth imported from Figma."
keywords:
  [
    designs,
    figma import,
    design files,
    source of truth,
    visual design,
  ]
---

# Designs

A **Design** in Bitloops is the visual source of truth you import from Figma—the interface your team is implementing. Designs are the foundation for component creation, snapshots, prop inference, and design-to-implemented-code comparison.

Bitloops treats designs as **high-fidelity, development-ready representation** sources of truth, translating figma files into artifacts ready for real engineering workflows.

## Important: Bitloops does not import Figma “as-is”

Bitloops does **not** mirror every Figma node one-to-one.

Design tools contain a lot of information that’s useful for designers (layer organization, grouping habits, annotation layers, helper frames, naming noise, etc.) but doesn’t materially affect how the UI should be implemented in code.

So when Bitloops imports a design, it:

- **Keeps what impacts the UI** (structure, layout, text, assets, styles)
- **Filters out superfluous design metadata**
- Produces a **cleaner tree** that is easier to reason about as an engineer

✅ This means the element tree you see in Bitloops may not match the exact tree you see in Figma—and that’s intentional.

## How import works

### 1) Import happens at the account library level

Designs are imported into your **account library** first.

- Imported designs live under **My Design Files**
- They can be reused across multiple projects
- This keeps design imports shareable and avoids re-importing the same file repeatedly

### 2) Importing a Figma URL brings in the frames from that source

When you import a Figma page through its URL into Bitloops, Bitloops imports the frames available from that source (e.g., the frames within that Figma page. it does not import all pages of that figma project).

If you want your project to include designs spread across multiple Figma pages/files, you should import each relevant URL so those frames become available in your library.

### 3) Projects use a subset of frames

After importing into your library, you choose which frames to add to a specific Bitloops project:

- In **My Design Files**, select the relevant figma page
- Then, select the frame(s) you want to add to your project
- Click **Add to Project** (note: multi frame selection in this canvas is not yet available)
- Those frames are added to the project and become the working set you’ll turn into components and snapshots

In other words:

- **Library** = everything you’ve imported
- **Project** = the frames you’ve chosen to implement right now

:::note
As we're in closed Alpha, you're unable to import your own designs without being whitelisted. [Join the waitlist](https://airtable.com/appuDrjEAoOhJTIls/shrSM0ZEsJBanusfa) as we do whitelist users regularly.
:::

## Why you should add all relevant frames early

Bitloops uses the frames you add to a project to make better, more consistent decisions—especially around reuse and design-system inference.

Adding more relevant frames early helps Bitloops:

- Recognize repeated UI patterns and propose better component boundaries
- Infer more accurate prop APIs from multiple real instances
- Detect variants and state differences across screens
- Build stronger design-system signals (tokens, typography, spacing patterns)

If you only add a small subset of frames and later add more, you may end up revisiting earlier components to improve boundaries, tokens, and reuse. In general: **the more complete your project’s design set is up front, the less refactor work you’ll do later** just like if you were doing everything manually.

## Designs as the source of truth (and validation)

Designs are not just used to generate components—they’re also the reference Bitloops uses for comparison and validation.

Bitloops aims for **pixel-accurate output**, and uses your imported design as the baseline to:

- Compare design slices (snapshots) against rendered components
- Highlight mismatches or structural issues
- Detect cases where the *design itself* may be inconsistent or ambiguous

This creates a tighter feedback loop between design intent and implementation.

## Key points

- Designs in Bitloops are **high-fidelity snapshots** of Figma at import time
- Bitloops imports a **development-ready representation**, not a 1:1 Figma layer mirror
- Designs are stored at the **account library** level, then frames are added to projects
- Adding more relevant frames early improves reuse, tokens, and reduces refactor later
- The design remains the **source of truth** for both generation and comparison

## Related concepts

- [Importing Designs](../Guides/importing-designs.md) — Step-by-step import process
- [Snapshots](./snapshots.md) — Design-based component examples (instances and variants)
- [Canvases](./canvases.md) — Where you explore and compare designs and code
- [Design System](./design-system.md) — Tokens and patterns inferred from designs
- [The Essential Guide](../getting-started-new/essential-guide.md) — Complete walkthrough
- [How Bitloops Works](../introduction/how-bitloops-works.md) — The design-to-code transformation process

---

*Try Bitloops at [bitloops.com](https://bitloops.com) - turn designs into code, then let the design keep you honest.*
