---
sidebar_position: 1
sidebar_label: FAQs
title: "Frequently Asked Questions"
description: "Answers to the most common questions about Bitloops Frontend Copilot."
keywords:
  [
    faqs,
    frequently asked questions,
    bitloops questions,
    common questions,
  ]
---

# Frequently Asked Questions

Answers to the most common questions about Bitloops.

---

## General

### What is Bitloops?

Bitloops is an AI-powered frontend copilot that transforms Figma designs into production-ready React code. It generates clean, reusable components with Tailwind CSS styling, complete with test IDs and optional Storybook integration.

### Is Bitloops free to use?

Bitloops offers both free and paid tiers. Check our [pricing page](https://bitloops.com/pricing) for the latest information on plans and features.

### What frameworks does Bitloops support?

Currently, Bitloops generates **React (JSX)** components with **Tailwind CSS**. Support for additional frameworks (Vue, Angular, Svelte) is on our roadmap.

### Do I need to know React to use Bitloops?

While Bitloops generates React code, you can still benefit from the tool even if you're learning React. The generated code follows best practices and is well-structured, making it a good learning resource.

---

## Design & Import

### What design tools does Bitloops support?

Currently, Bitloops supports **Figma**. Support for Adobe XD, Sketch, and other design tools is planned for future releases.

### Does Bitloops modify my original Figma files?

No, Bitloops only reads your Figma files. It never modifies or overwrites your original designs.

### Do I need a perfectly structured Figma file?

No! Bitloops is designed to work with real-world, messy designs. While well-structured files may produce cleaner output, Bitloops can handle imperfect inputs.

### How do I update my design after making changes in Figma?

Bitloops does not auto-sync with Figma. To get updated designs, delete the imported file from Bitloops and re-import it.

---

## Components & Code

### What happens to my code when I edit it?

Your edits are preserved. Bitloops won't overwrite your changes unless you explicitly choose to regenerate a component.

### Can I customize the generated code?

Absolutely! The generated code is fully yours to modify. You can rename components, restructure files, add logic, and integrate with your existing codebase.

### What are snapshots?

Snapshots are design-based representations of component states. They're like Storybook stories, automatically generated from your Figma designs. See [Core Concepts: Snapshots](../core-concepts/snapshots.md) for details.

### Can I create nested components?

Yes! You can compose smaller components into larger ones. Bitloops automatically handles imports and references. See [Guides: Nested Components](../Guides/nested-components.md).

---

## Technical

### What are data IDs and why shouldn't I change them?

Data IDs are stable identifiers that Bitloops assigns to every element. They're used for:
- Linking designs to code
- Testing (Cypress selectors)
- Snapshot reconciliation

Modifying them breaks Bitloops' internal tracking. See [Core Concepts: Code Generation & Testing](../core-concepts/code-generation-and-testing.md).

### Does Bitloops work offline?

Bitloops requires an internet connection to import designs and generate code. However, once code is generated, you can work with it offline.

### Can I use Bitloops with my existing project?

Yes! Bitloops generates components directly into your project folder. The generated code integrates seamlessly with existing React + Tailwind projects.

---

## Support

### How do I report a bug?

See our [Submit a Bug or Request](../community-support/submit-bug.md) page. We offer credits for verified bug reports!

### Where can I get help?

- Join our [Discord community](https://discord.gg/vj8EdZx8gK)
- Email us at [support@bitloops.com](mailto:support@bitloops.com)
- Check our [documentation](../introduction/what-is-bitloops.md)

---

## Still Have Questions?

If your question isn't answered here, reach out to us:

- [Discord Community](https://discord.gg/vj8EdZx8gK)
- [Contact Support](../community-support/contact-us.md)

---

## Related Resources

- [The Essential Guide](../getting-started-new/essential-guide.md) — Complete beginner walkthrough
- [Quick Start](../getting-started-new/quick-start.md) — Fast reference guide
- [What is Bitloops?](../introduction/what-is-bitloops.md) — Product overview
- [Common Challenges](./common-challenges.md) — Solutions to common issues
- [Tips & Tricks](./tips-and-tricks.md) — Pro tips for better workflow
- [Code Licensing](./code-licensing.md) — Understand your code ownership
- [Video Tutorials](../tutorials/learn-by-watching.md) — Watch Bitloops in action
- [Core Concepts](../core-concepts/snapshots.md) — Deep dive into key concepts

---

*Get started with [Bitloops](https://bitloops.com) — your AI-powered frontend copilot.*
