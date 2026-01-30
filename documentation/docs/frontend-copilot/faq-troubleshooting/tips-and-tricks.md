---
sidebar_position: 4
sidebar_label: Tips & Tricks
title: "Tips & Tricks"
description: "Pro tips to get the most out of Bitloops and speed up your workflow."
keywords:
  [
    tips,
    tricks,
    best practices,
    workflow optimization,
    productivity,
  ]
---

# Tips & Tricks

Get the most out of Bitloops with these productivity tips and best practices.

---

## Keyboard Shortcuts

### Quick Component Creation
Use `Cmd+C` / `Ctrl+C` to quickly create a component. Just select the elements you want and press the shortcut — Bitloops will prompt you to name the component and generate everything instantly.

### Quick Snapshot Attachment
Use `Cmd+A` / `Ctrl+A` to attach a snapshot to a component. Make sure the correct base component is visible in Component Preview before using this shortcut.

### Recursive Grouping
Use `Cmd+G` / `Ctrl+G` repeatedly to build layout hierarchy quickly. Start with the innermost elements, group them, then group those groups — this mimics how you'd build nested layout containers with divs in code.

---

## Selection Tips

### Use the Sidebar Tree for Precision
Figma designs can be tricky to click on, especially with overlapping layers. The sidebar tree in Snapshot View gives you pixel-perfect control over what's selected and grouped.

### Multi-Select on Canvas
Hold `Ctrl` (Windows) or `Cmd` (Mac) while clicking to select multiple elements. You can also click and drag to create a selection box.

### Inspect Spacing
Hold `ALT` while hovering over elements to see spacing information, just like in Figma.

---

## Component Strategy

### Start with Atomic Components
Creating small components like `Button`, `Badge`, or `Avatar` first allows you to reuse them across multiple sections. Then nest them into larger `Card`, `Hero`, or `Section` components for better structure and code reuse.

### Attach Multiple Snapshots Early
Even if you're not sure about variants yet, attaching multiple versions (e.g., mobile and desktop) upfront helps Bitloops generate more robust and responsive components from the start.

### Build Bottom-Up for Design Systems
If you're building a design system, start with the smallest atoms and work your way up:

```
Icons → Buttons → Form Fields → Cards → Sections → Pages
```

---

## Code Editing Tips

### Edit Freely — Bitloops Stays in Sync
Don't be afraid to make manual changes. Just save your edits, and Bitloops will re-analyze the code, update previews, and re-run snapshot tests automatically.

### Fix One, Fix Many
When fixing layout issues, often correcting one problem in the base component resolves similar issues across all attached snapshots.

### Use the Three-Panel View
Keep Snapshot View, Component View, and your code editor visible simultaneously for the most efficient workflow.

---

## Naming Conventions

### Name Components Meaningfully
Component names don't affect Bitloops' behavior, but naming things clearly (e.g., `FeatureCard` instead of `Card1`) will make your component tree and file structure much easier to manage as your project scales.

### Use Descriptive Prop Names
When Bitloops infers props from your snapshots, meaningful names help future maintainability.

---

## Design Import Tips

### Import Once, Use Everywhere
You can import a Figma file once and add frames to multiple projects. No need to re-import for each project.

### Re-Import for Updates
Bitloops doesn't auto-sync with Figma. If your design changes, simply delete the imported file and re-import to get the latest version.

### Import Selectively
You don't need to import entire files. Import only the frames you need to keep your project focused and organized.

---

## Workflow Optimization

### Create Component First, Then Attach All Snapshots
The recommended workflow is:
1. Create the component from the primary design
2. Attach all relevant snapshots (variants, viewports, states)
3. Fix any errors that exist
4. Only then create nested components

### Use Layout Containers Proactively
Adding layout containers before generating code often produces better results than trying to fix layout issues afterward.

### Keep Related Elements Grouped
In Figma, keeping related elements logically grouped makes Bitloops' job easier and produces cleaner code.

---

## Common Patterns

### Card Components
```
Layout Container (flex-col)
  └── Image
  └── Content Container (flex-col)
      └── Title
      └── Description
      └── CTA Button
```

### Navigation Components
```
Layout Container (flex-row, justify-between)
  └── Logo
  └── Nav Links Container (flex-row, gap-4)
  └── CTA Button
```

### Hero Sections
```
Layout Container (flex-col, items-center)
  └── Headline
  └── Subheadline
  └── CTA Container (flex-row, gap-4)
      └── Primary Button
      └── Secondary Button
```

---

## Pro Tips Summary

| Tip | Benefit |
|-----|---------|
| Start atomic, compose up | Better reusability |
| Attach snapshots early | Better variant handling |
| Use keyboard shortcuts | Faster workflow |
| Name meaningfully | Better maintainability |
| Fix one, fix many | Efficient debugging |
| Use layout containers | Cleaner code output |

---

## Need More Help?

### Getting Started

- [The Essential Guide](../getting-started-new/essential-guide.md) — Complete beginner walkthrough
- [Quick Start](../getting-started-new/quick-start.md) — Fast reference guide
- [Video Tutorials](../tutorials/learn-by-watching.md) — Watch Bitloops in action
- [Importing Designs](../Guides/importing-designs.md) — Import workflow
- [Creating Components](../Guides/creating-components.md) — Component creation
- [Attaching Snapshots](../Guides/attaching-snapshots.md) — Managing states
- [Adding Layout Containers](../Guides/adding-layout-containers.md) — Structuring elements
- [Nested Components](../Guides/nested-components.md) — Complex hierarchies
- [Discord](https://discord.gg/vj8EdZx8gK) — Get help from the community
- [FAQs](./faqs.md) — Common questions answered

---

*Master your workflow with [Bitloops](https://bitloops.com).*
