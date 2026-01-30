---
sidebar_position: 7
sidebar_label: Layout Containers
title: "Layout Containers"
description: "Understand Layout Containers in Bitloops - developer-controlled wrappers (divs) that shape hierarchy and layout in generated code."
keywords:
  [
    layout containers,
    divs,
    grouping,
    structure,
    flex,
    grid,
  ]
---

# Layout Containers

A **Layout Container** in Bitloops is essentially a **wrapper `div`** that you add intentionally to shape layout and hierarchy.

Design tools often “group” layers for organization. Layout Containers go further: they represent a real structural decision that affects both:
- the design tree you work with, and
- the code Bitloops generates.

They’re one of the most direct ways you (the developer) can communicate layout intent to Bitloops.

## Why Layout Containers exist

Real-world designs don’t always encode layout intent cleanly. Layers may be visually aligned, but not grouped in a way that translates to maintainable code.

A Layout Container helps when you need to answer questions like:
- “Is this a row or a column?”
- “Which elements should move together on resize?”
- “What should be spaced with a `gap` vs positioned independently?”
- “What is the correct wrapper for this section?”

There isn’t one universally correct answer—layout can be implemented in multiple valid ways. Layout Containers are where **you and Bitloops collaborate** to choose the best structure for your codebase.

## What Layout Containers do

### 1) They change the design hierarchy you work with

When you create a Layout Container, Bitloops updates the design tree to reflect the new grouping. Elements that were previously siblings become children of a shared container.

This makes the structure:
- clearer to reason about
- easier to componentize
- easier to reuse and nest

### 2) They change the generated code (on purpose)

Each Layout Container becomes a wrapper element in code (typically a `<div>`). That wrapper is where layout rules live:

- flex/grid direction
- alignment and spacing (`gap-*`)
- padding/margins and sizing constraints
- responsive adjustments

This is not decorative—it’s a direct mapping from “how this should be grouped” to “how this should be implemented.”

## When you should add a layout container

Use Layout Containers when:

- the generated structure feels too flat or ambiguous
- a group of elements should behave as a unit (move together, align together, wrap together)
- spacing is easier to express with a `gap` on a wrapper
- you want to enforce a specific row/column structure before generating a component
- a snapshot/instance is hard to match because the layout hierarchy is missing a wrapper

A good rule of thumb: **if you’d write a wrapper `div` manually, add a Layout Container.**

## How layout containers appear in code

A Layout Container usually introduces a wrapper with layout classes.

```tsx
// Without a Layout Container (flat structure)
<>
  <Image />
  <Title />
  <Description />
  <Button />
</>

// With a Layout Container (explicit layout intent)
<div className="flex flex-col gap-4">
  <Image />
  <Title />
  <Description />
  <Button />
</div>
```

## Creating a layout container

### Keyboard shortcut

1. Select multiple elements (canvas or tree)
2. Press `Cmd + G` (Mac) or `Ctrl + G` (Windows/Linux)

### Context menu

1. Select multiple elements
2. Right-click → **Add Layout Container**

---

## Customizing a layout container

After creating a Layout Container, you can adjust the wrapper to match intent:

- **Layout:** `flex-row` / `flex-col` / grid patterns  
- **Alignment:** `justify-*`, `items-*`  
- **Spacing:** `gap-*`  
- **Sizing:** width/height constraints  
- **Padding/Margins:** `p-*`, `m-*`  
- **Responsive behavior:** breakpoint-specific adjustments  

This is often where the “copilot” workflow is most visible:

- Bitloops proposes structure
- You add/adjust containers to express intent
- The generated code becomes dramatically cleaner and easier to maintain

---

## Nesting layout containers (real-world layout)

Complex UIs often require nested wrappers.

You can build nested containers progressively:

1. Group the innermost related elements
2. Add a container
3. Select that container + adjacent elements
4. Group again

This mirrors how you’d build layout wrappers by hand in React.

---

## Best practices

- **Group by behavior, not just proximity**  
  If items should move together on resize, they belong together.

- **Prefer fewer, meaningful wrappers**  
  Avoid deep nesting unless it buys you clarity or layout correctness.

- **Add containers early when a design is messy**  
  It improves component boundaries and snapshot matching.

- **Use containers to make snapshots match**  
  If a snapshot doesn’t align well, missing hierarchy is often the cause.

---

## Key takeaway

Layout Containers are intentional wrapper `div`s. They let you and Bitloops agree on layout structure before (and during) code generation—so your output is easier to reuse, easier to reason about, and easier to keep consistent across snapshots and viewports.

---

## Related pages

- [Canvases](./canvases.md) — Where you explore and compare designs and code
- [Components & Reusability](./components-and-reusability.md) — Component architecture patterns
- [Tailwind CSS](./tailwind-css.md) — Why Bitloops uses Tailwind
- [Guide: Adding Layout Containers](../Guides/adding-layout-containers.md) - Manual layout restructuring

---

*Try Bitloops at [bitloops.com](https://bitloops.com) — when layout gets tricky, containers make the intent explicit.*