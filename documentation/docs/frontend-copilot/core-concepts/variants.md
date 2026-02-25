---
sidebar_position: 4
sidebar_label: Variants
title: "Variants"
description: "Learn about Variants in Bitloops - meaningful state, style, or viewport differences captured through snapshots and expressed in one reusable component."
keywords:
  [
    variants,
    component states,
    visual states,
    behavioral states,
    design variants,
    viewport variants,
  ]
---

# Variants

**Variants** are meaningful differences in how the *same component* renders—based on state, styling, content configuration, or viewport.

In Bitloops, variants are discovered through **snapshots**. You attach snapshots to a component, and Bitloops uses the differences between them to infer what should be:
- a prop,
- a conditional branch,
- a styling change,
- or a responsive rule.

## Variants vs instances

It’s useful to separate two ideas:

- **Instances**: the component is the same, but the data changes (e.g., 6 blog cards with different titles/images).  
  This typically becomes **props**.

- **Variants**: the component changes in a meaningful way (e.g., different state, styling, layout, or behavior).  
  This typically becomes **variant/state logic** or conditional rendering inside the component.

Both are captured as snapshots—but they lead to different outcomes in the final component API.

## What a variant represents

A variant usually shows up as one (or more) of the following:

- **State differences** (e.g., selected vs unselected, expanded vs collapsed)
- **Style differences** (e.g., emphasis, color, “with star” vs “without star”)
- **Structural differences** (e.g., “with badge” vs “no badge”, optional sections)
- **Viewport differences** (e.g., mobile vs desktop layouts for the same component)

## Viewport variants (responsive snapshots)

Variants can also be viewport-driven.

If you have a mobile design for the same component, you can attach that as a snapshot. Bitloops will then try to infer the best way to make the component render correctly at that viewport—often by introducing responsive Tailwind classes and/or media-query-driven behavior.

The goal is not to duplicate components for each breakpoint, but to support multiple viewports inside **one reusable component**.

## How variants show up in code

Variants are expressed inside **one component file** (`.tsx`) rather than duplicating components.

As snapshots are attached, Bitloops can infer:

- **Props** (what changes between snapshots)
- **Variant keys** (the “mode” or “state” being represented)
- **Conditional rendering** (what appears/disappears in certain states)
- **Conditional styling** (class changes based on props/state)
- **Responsive rules** (when viewport snapshots are provided)

This keeps the result:
- maintainable (one component)
- reusable (prop/variant driven)
- consistent with design intent (snapshots as reference)

## Examples of variants (what you’ll actually see)

- **Interaction/state**: default, selected, expanded, error
- **Style**: with icon vs without icon, with star vs without star, emphasis levels
- **Structure**: with badge vs no badge, with description vs no description
- **Viewport**: desktop layout vs mobile layout for the same component

## Current status

:::info
Full “first-class variants” (explicit variant tooling and richer automatic detection) is evolving.  
Today, you can still achieve variant behavior by attaching multiple snapshots to the same component—Bitloops uses the differences to guide props, conditions, and responsiveness.
:::

## Related pages

- [Snapshots](./snapshots.md) — Design-based component examples (instances and variants)
- [Components & Reusability](./components-and-reusability.md) — Component architecture patterns
- [Tailwind CSS](./tailwind-css.md) — Why Bitloops uses Tailwind
- [Guide: Attaching Snapshots](../Guides/attaching-snapshots.md) - How to attach a snapshot to a component

---

*Try Bitloops at [bitloops.com](https://bitloops.com) — attach a few snapshots, and watch one component learn new states.*
