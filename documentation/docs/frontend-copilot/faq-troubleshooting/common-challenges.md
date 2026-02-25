---
sidebar_position: 2
sidebar_label: Common Challenges
title: "Common Challenges"
description: "Solutions to common issues you might encounter when using Bitloops."
keywords:
  [
    troubleshooting,
    common issues,
    problems,
    solutions,
    help,
  ]
---

# Common Challenges

Bitloops is designed to streamline your design-to-code workflow, but even the best tools encounter occasional challenges. This guide covers common issues and their solutions.

:::tip Need More Help?
If your issue persists or isn't listed here, we **highly recommend** reaching out:
- Email us at [support@bitloops.com](mailto:support@bitloops.com) with a video of the issue
- Join our [Discord server](https://discord.com/invite/vj8EdZx8gK)

**We'll send you an Amazon voucher as thanks for helping us improve!**
:::

---

## Import Issues

### Design won't import from Figma

**Possible causes:**
- The Figma file link is incorrect or inaccessible
- Your Figma account doesn't have access to the file
- Network connectivity issues

**Solutions:**
1. Verify the Figma link is correct and the file is accessible
2. Make sure you're logged into Figma with the correct account
3. Re-authenticate your Figma connection in Bitloops
4. Check your internet connection

### Some frames are missing after import

**Possible causes:**
- Very complex or deeply nested frames
- Frames with unsupported features

**Solutions:**
1. Try importing specific frames instead of the entire file
2. Simplify complex nested structures in Figma
3. Contact support if the issue persists

---

## Component Generation Issues

### Component not generated

**Possible causes:**
- Fallback option did not work
- An unsupported Figma feature was used (e.g., overly complex SVGs)
- Selection includes incompatible elements

**Solutions:**
1. Delete the component and try again
2. Try building a smaller component first
3. Select consecutive elements that form a harmonious component

### Elements not appearing in generated code

**Possible causes:**
- Elements may be hidden or have zero dimensions in Figma
- Complex layer structures

**Solutions:**
1. Check that all elements are visible in Figma
2. Verify elements have proper dimensions
3. Use the layer tree to ensure all elements are selected

---

## Layout Issues

### Layout doesn't match the design

**Possible causes:**
- Missing layout containers
- Incorrect flex/grid settings

**Solutions:**
1. Add layout containers to group related elements
2. Adjust flex direction and alignment settings
3. Check spacing and gap values

### Elements overlapping incorrectly

**Possible causes:**
- Absolute positioning in the original design
- Missing structural grouping

**Solutions:**
1. Create layout containers to establish proper structure
2. Review the design hierarchy in Figma
3. Use the sidebar tree to verify element ordering

---

## Testing & Preview Issues

### Unresponsive tests or errors in Storybook

**Possible causes:**
- Code-generation process was interrupted
- CSS/Responsiveness decisions were not optimal for the circumstance

**Solutions:**
1. Try deleting and re-creating the component
2. Manually edit the code to your preference
3. Email us your specific needs for assistance

### Component preview not updating

**Possible causes:**
- File not saved
- Syntax error in the code

**Solutions:**
1. Save the file (`Ctrl+S` / `Cmd+S`)
2. Check for syntax errors in your IDE
3. Verify the component file path is correct

---

## Images & Assets

### Images not exporting correctly

**Possible causes:**
- Image format not supported
- Very large image files
- Complex vector graphics

**Solutions:**
1. Ensure images are in supported formats (PNG, JPG, SVG)
2. Optimize large images before importing
3. For complex vectors, try flattening them in Figma

### Icons appearing as broken images

**Possible causes:**
- SVG complexity
- Missing vector data

**Solutions:**
1. Simplify complex SVGs in Figma
2. Outline strokes in Figma before importing
3. Use the "Flatten" option in Figma for complex icons

---

## Performance Issues

### Bitloops running slowly

**Possible causes:**
- Very large Figma files
- Many components in the project
- System resources

**Solutions:**
1. Import only the frames you need
2. Close unnecessary applications
3. Break large designs into smaller imports

---

## We're Here to Help!

If you encounter persistent issues:

📧 **Email:** [support@bitloops.com](mailto:support@bitloops.com) — Include a video showing the issue

💬 **Discord:** [Join our community](https://discord.com/invite/vj8EdZx8gK)

---

## Related Resources

- [FAQs](./faqs.md) — Common questions answered
- [Tips & Tricks](./tips-and-tricks.md) — Pro tips to avoid issues
- [Submit a Bug](../community-support/submit-bug.md) — Report issues and get credits
- [Importing Designs](../Guides/importing-designs.md) — Fix import issues
- [Creating Components](../Guides/creating-components.md) — Fix component generation issues
- [Adding Layout Containers](../Guides/adding-layout-containers.md) — Fix layout issues
- [Editing Components](../Guides/editing-components.md) — Fix code issues

---

*Need more help? Contact us at [bitloops.com](https://bitloops.com).*
