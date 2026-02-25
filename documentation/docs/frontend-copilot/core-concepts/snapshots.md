---
sidebar_position: 3
sidebar_label: Snapshots
title: "Snapshots"
description: "Understand Snapshots in Bitloops - design-based examples that power props, variants, and reusable component code."
keywords:
  [
    snapshots,
    component states,
    storybook stories,
    design states,
    variants,
    instances,
  ]
---

# Snapshots

A **Snapshot** in Bitloops is a **design-based example** of a component—captured from your imported design and used as a reference while you build.

Snapshots do two jobs at once:

1. They show the *exact* design slice you’re implementing (for comparison and validation).
2. They provide concrete examples that help Bitloops infer a reusable component API (props, state-driven differences, and conditional rendering).

## Snapshots vs instances (the mental model)

It helps to separate two related ideas:

- **Snapshot** → an example attached to a component during construction.  
  It’s “this component, as seen in this design, with this content/state.”

- **Instance** → a usage of a component inside another component or page.  
  When you build parent components, Bitloops uses the component **as an instance** and passes the right props.

In practice:

- You attach **snapshots** to *define* a component.
- You create **instances** when you *use* that component elsewhere.

You can think of snapshots as the “source examples” that later become real instances in your UI. A snapshot may also include viewport context (e.g. mobile/tablet/desktop), so Bitloops can learn responsive intent.

## What a snapshot represents

Snapshots usually vary along one or more of these axes:

### 1) Instances (same component, different content)

Example: a page shows 6 blog cards. The component structure is the same, but each card has different text, images, tags, or metadata.

Those are still valuable snapshots because they help Bitloops infer:
- **Props** (what should be passed in vs hardcoded)
- **Optional fields** (what appears only sometimes)
- **Data shape** (what the component expects)

### 2) Variants (same component, different state)

Example: `default`, `active`, `disabled`, `expanded`, `error`, etc.

These snapshots help Bitloops infer:
- **Variant/state handling**
- **Conditional rendering**
- **Behavior-related differences** expressed in design (what changes visually across states)

### 3) Viewports (same component, different breakpoint context)

Example: the same component at mobile vs desktop, where layout, density, or element visibility changes due to responsive rules.
These snapshots help Bitloops infer: 

- **Responsive layout changes**
- **Conditional visibility and density**
- **Breakpoint-driven styling and behavior**

:::note
Viewport snapshots are not a separate category from instances or variants—you can have “the same content” at multiple viewports, or “the same variant” across viewports. Viewport is the context in which the snapshot is captured.
:::

## Why snapshots exist

Snapshots act as **ground truth** for design-to-code accuracy.

When you open a snapshot, Bitloops isolates the relevant slice of the design so you can compare it directly against the live component output—without bouncing between tools.

That makes snapshots useful for:
- building faster (less ambiguity)
- iterating safely (changes are testable against real examples)
- catching mismatches early (structure, spacing, missing elements)

## What a snapshot contains

A snapshot includes:

- A specific set of design elements (the slice)
- Concrete content (text, images, labels, etc.)
- Context for how the component is expected to render (instance data, state and/or viewport/breakpoint context)

## How snapshots shape your component code

A single Bitloops component is backed by **one `.tsx` file**, and snapshots provide the evidence that shapes it.

As you attach more snapshots, Bitloops can refine:
- component structure (what is consistent across examples)
- prop boundaries (what changes across examples)
- variants/state handling (what changes across states)
- conditional rendering (what appears/disappears)
- asset handling (what should be static vs dynamic)

More snapshots = better coverage = a component that is reusable in more real scenarios.

## Key takeaway

**Snapshots are the examples that define a component. Instances are how that component gets used elsewhere.**  
Attach snapshots to teach Bitloops what changes and what stays consistent—then reuse the resulting component as instances across your UI.

## Related pages

- [Components & Reusability](./components-and-reusability.md) — Component architecture patterns
- [Variants](./variants.md) — Managing state-based differences
- [Canvases](./canvases.md) — Where you explore and compare designs and code
- [Guide: Attaching Snapshots](../Guides/attaching-snapshots.md) — Adding examples to improve props/variants

---

*Give [Bitloops](https://bitloops.com) a try — snapshots in, reusable components out.*
