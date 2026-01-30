---
sidebar_position: 2
sidebar_label: Components & Reusability
title: "Components & Reusability"
description: "Learn how Components work in Bitloops and how they enable reusability across your codebase."
keywords:
  [
    components,
    reusability,
    react components,
    UI components,
    code reuse,
  ]
---

# Components & Reusability

A **Component** in Bitloops is a reusable piece of UI that originates from your imported designs and becomes a real, production-ready React component in your codebase.

Bitloops treats components as the main unit of work: you extract them from the design, attach snapshots to expand coverage, and then build upward by composing components into larger components and pages.

## What makes a component in Bitloops

When you create a component in Bitloops, you’re defining more than a visual block—you’re defining a **unit of reusable structure + data**.

Bitloops will:

1. Analyze the selected design elements
2. Generate an initial code representation (`.tsx`)
3. Create and/or suggest snapshots that represent how the component appears in real usage

Once created, the component appears in the **Components** tab—this is where you manage the component and everything attached to it.

## Snapshots are not only “variants”

Snapshots are design-based examples of a component—and they’re useful even when nothing is “variant-like” is happening.

Snapshots commonly represent two things:

- **Instances (same structure, different data)**  
  Example: a page shows 6 blog cards. Same component structure, but different title, image, tag, or description. Each card can be a snapshot. These snapshots help Bitloops infer **props** and a clean data model (what should be passed in vs hardcoded).

- **Variants (same component, different state)**  
  Example: `default`, `active`, `disabled`, `expanded`, `error`, etc. These snapshots help Bitloops model **variants** and, where needed, **conditional rendering**.

In both cases, snapshots clarify what changes vs what stays consistent—so the component becomes reusable without becoming fragile.

:::info
Variant handling is currently under active development and not yet fully supported.
:::

## How snapshots attach to components (and why it matters)

Components and snapshots are linked explicitly in Bitloops:

- When a component is created, it’s added to the **Components** tab
- Each time you attach a snapshot, it is added **under that specific component**
- A single component can have **many snapshots**
- Each snapshot contributes signal that Bitloops uses to improve:
  - prop boundaries
  - variants/state handling
  - conditional rendering
  - asset handling (static vs dynamic)
  - structural consistency

This is what allows Bitloops to turn “one design selection” into “a component you can use across the product.”

## Validation and snapshot-level errors

Bitloops uses snapshots as a reference for correctness.

If a component renders a snapshot correctly compared to the snapshot design, you should see a clean state. If a snapshot doesn’t match (e.g., spacing is off, text is misaligned, a conditional element is missing), Bitloops can surface that as a snapshot-level issue in the **Components** tab.

This makes it easier to iterate safely as you add more snapshots and expand coverage.

## Nested components and composition

Bitloops supports real composition:

- A component can be used **inside another component**
- When Bitloops generates or updates a parent component, it can replace repeated UI with **an instance of an existing component**
- Snapshots help Bitloops pass the right data into nested components (e.g., the right props for each instance)

This allows you to build the UI the way you would manually: start with primitives, then compose upward into sections and pages.

## Design system components vs custom components

Bitloops can distinguish between:
- **UI elements / design system components** (buttons, checkboxes, accordions, inputs, etc.)
- **Custom components** (product-specific cards, sections, layout patterns)

As Bitloops evolves, this distinction becomes more important—because the tooling and best practices differ between:
- foundational UI primitives (often backed by libraries like Radix/Base UI),
- reusable product components,
- and higher-level “page sections” or layout modules.

## Seeing components in the design tree

Once a component is created, Bitloops can reflect that decision back into the design representation:

- Containers/elements that belong to a component can be replaced by a **component instance** in the design tree
- This makes it obvious what is “already componentized” vs what is still raw design structure
- It also helps guide the next extraction steps (what to componentize next, and where reuse already exists)

## Key takeaway

Components are your reusable units. Snapshots are your real examples. Reusability emerges when one component is proven across many snapshots—instances and variants alike.

## Related concepts

- [Variants](./variants.md) — Managing state-based differences
- [Layout Containers](./layout-containers.md) — Manual structure control
- [Creating Components](../Guides/creating-components.md) — Step-by-step component creation
- [Attaching Snapshots](../Guides/attaching-snapshots.md) — Adding examples to improve props/variants
- [Nested Components](../Guides/nested-components.md) — Building complex hierarchies
- [Editing Components](../Guides/editing-components.md) — Modifying generated code
- [The Essential Guide](../getting-started-new/essential-guide.md) — Create your first component

---

*Try Bitloops at [bitloops.com](https://bitloops.com) — extract components, attach snapshots, and build up to full pages fast.*
