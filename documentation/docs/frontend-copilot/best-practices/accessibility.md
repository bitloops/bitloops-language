---
sidebar_position: 7
sidebar_label: Accessibility
title: "Accessible React Components: Semantic HTML, ARIA Patterns, and Keyboard Navigation"
description: "Accessibility isn't a checklist—it's architecture. Learn semantic HTML defaults, ARIA patterns, keyboard navigation, and focus management for React components."
keywords:
  [
    react accessibility best practices,
    semantic html components,
    aria attributes react,
    keyboard navigation react,
    focus management react,
    accessible component library,
    screen reader testing,
    wcag react components,
  ]
---

# Designing for accessibility by default

Accessibility isn't a checklist to satisfy at the end of a project. It's a byproduct of good structure—components built with semantic HTML, clear interaction patterns, and thoughtful state management are often accessible by default. Components built with divs and click handlers require extensive retrofitting.

This document covers accessibility as architecture: the structural decisions that produce accessible components, and the patterns that close remaining gaps.

## Accessibility as Architecture

The difference between accessible and inaccessible components is usually structural, not cosmetic.

### Two approaches to a button

**The div approach:**

```tsx
const Button = ({ children, onClick }) => (
  <div
    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
    onClick={onClick}
  >
    {children}
  </div>
);
```

This "button" is:
- Not focusable via keyboard
- Not announced as a button by screen readers
- Not activatable with Enter or Space
- Not included in the tab order

**The button approach:**

```tsx
const Button = ({ children, onClick }) => (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded"
    onClick={onClick}
  >
    {children}
  </button>
);
```

This button is:
- Focusable by default
- Announced as "button" by screen readers
- Activatable with Enter or Space
- In the natural tab order

The second version required no extra work—just the right element. Accessibility was architectural, not added.

### The 80% rule

Approximately 80% of accessibility comes from using semantic HTML correctly. The remaining 20% requires ARIA attributes and JavaScript for complex interactions.

If you're adding ARIA to every component, you're likely using the wrong elements.

## Semantic HTML

Semantic elements carry meaning and behavior that browsers and assistive technologies understand.

### Elements and their semantics

| Element | Semantic meaning | Built-in behavior |
|---------|------------------|-------------------|
| `<button>` | Interactive control | Focus, keyboard activation |
| `<a href>` | Navigation link | Focus, keyboard activation, context menu |
| `<input>` | Data entry | Focus, keyboard input, form integration |
| `<h1>`-`<h6>` | Heading hierarchy | Document outline, navigation |
| `<nav>` | Navigation region | Landmark for screen readers |
| `<main>` | Main content | Landmark, skip-link target |
| `<article>` | Self-contained content | Syndication, outline |
| `<aside>` | Tangential content | Landmark |
| `<form>` | Data collection | Submission, validation |

### Common semantic mistakes

**Links vs. buttons:**

```tsx
// Wrong: link with no href (not a link)
<a onClick={handleClick}>Click me</a>

// Wrong: link that doesn't navigate
<a href="#" onClick={handleClick}>Click me</a>

// Right: button for actions
<button onClick={handleClick}>Click me</button>

// Right: link for navigation
<a href="/page">Go to page</a>
```

The rule: buttons do things, links go places.

**Heading hierarchy:**

```tsx
// Wrong: skipping levels
<h1>Page Title</h1>
<h4>Section Title</h4>  // Skipped h2, h3

// Right: sequential hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
```

Screen reader users navigate by headings. Skipped levels break this navigation.

**Lists for lists:**

```tsx
// Wrong: divs for a list of items
<div>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Right: actual list
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

Screen readers announce "list, 3 items" for the second version, providing context.

## ARIA: Completing the Picture

ARIA (Accessible Rich Internet Applications) fills gaps when semantic HTML isn't enough. Use it to:

- Describe relationships between elements
- Communicate dynamic state changes
- Make custom components accessible

### The first rule of ARIA

> No ARIA is better than bad ARIA.

ARIA can make things worse. A `<div role="button">` that doesn't handle keyboard events is worse than a plain `<div>`—it promises button behavior and fails to deliver.

### Common ARIA patterns

**Labels for form elements:**

```tsx
// Explicit label association
<label htmlFor="email">Email address</label>
<input id="email" type="email" />

// aria-label for icon-only buttons
<button aria-label="Close dialog">
  <XIcon />
</button>

// aria-labelledby for complex labels
<h2 id="section-title">User Settings</h2>
<section aria-labelledby="section-title">
  {/* Content */}
</section>
```

**Describing relationships:**

```tsx
// Error messages
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
<span id="email-error" role="alert">
  Please enter a valid email address
</span>

// Related content
<button aria-controls="menu" aria-expanded={isOpen}>
  Menu
</button>
<nav id="menu" hidden={!isOpen}>
  {/* Menu items */}
</nav>
```

**Live regions for dynamic updates:**

```tsx
// Polite announcements (wait for pause in speech)
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Assertive announcements (interrupt immediately)
<div role="alert">
  {errorMessage}
</div>
```

### When to use roles

Roles override native semantics. Use them for custom components:

```tsx
// Custom toggle switch
<button
  role="switch"
  aria-checked={isOn}
  onClick={toggle}
>
  <span className={isOn ? 'on' : 'off'} />
</button>

// Custom tab interface
<div role="tablist">
  <button role="tab" aria-selected={index === 0}>Tab 1</button>
  <button role="tab" aria-selected={index === 1}>Tab 2</button>
</div>
<div role="tabpanel">
  {/* Tab content */}
</div>
```

## Icon-Only Controls

Controls with only icons (no visible text) are accessibility hazards. Users who can't see the icon have no idea what it does.

### The problem

```tsx
// Inaccessible: no indication what this button does
<button>
  <TrashIcon />
</button>
```

Screen readers announce: "button" (with no context).

### Solutions

**1. Visually hidden text:**

```tsx
<button>
  <TrashIcon aria-hidden="true" />
  <span className="sr-only">Delete item</span>
</button>
```

Screen readers announce: "Delete item, button."

**2. aria-label:**

```tsx
<button aria-label="Delete item">
  <TrashIcon aria-hidden="true" />
</button>
```

Same result, shorter markup.

**3. Tooltip (visible on hover/focus):**

```tsx
<Tooltip content="Delete item">
  <button aria-label="Delete item">
    <TrashIcon aria-hidden="true" />
  </button>
</Tooltip>
```

Helps sighted users too.

### Icon accessibility patterns

```tsx
// Decorative icons: hide from screen readers
<button>
  <CheckIcon aria-hidden="true" />
  Save
</button>

// Informative icons: provide alt text
<span role="img" aria-label="Warning">⚠️</span>
<span className="text-yellow-500">
  <WarningIcon aria-hidden="true" /> {/* Icon hidden, text visible */}
  Warning: This action cannot be undone
</span>
```

## Keyboard Navigation

All interactive elements must be operable with a keyboard. This isn't just for screen reader users—power users, users with motor impairments, and anyone with a broken mouse depend on keyboard access.

### Focus order

Focus should follow a logical order, typically matching visual reading order:

```tsx
// Natural flow: focus moves top-to-bottom, left-to-right
<header>
  <nav>
    <a href="/">Home</a>        {/* 1 */}
    <a href="/about">About</a>  {/* 2 */}
  </nav>
</header>
<main>
  <input type="text" />         {/* 3 */}
  <button>Submit</button>       {/* 4 */}
</main>
```

**Avoid tabindex > 0.** It overrides natural order and creates confusion:

```tsx
// Don't: arbitrary tab order
<button tabIndex={2}>Second</button>
<button tabIndex={1}>First</button>

// Do: natural document order
<button>First</button>
<button>Second</button>
```

### Keyboard interaction patterns

Standard patterns users expect:

| Element | Key | Action |
|---------|-----|--------|
| Button | Enter, Space | Activate |
| Link | Enter | Navigate |
| Checkbox | Space | Toggle |
| Menu | Arrow keys | Navigate items |
| Dialog | Escape | Close |
| Tabs | Arrow keys | Switch tabs |

Implement these patterns for custom components:

```tsx
// Custom menu keyboard navigation
const Menu = ({ items }) => {
  const [focusIndex, setFocusIndex] = useState(0);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex(i => Math.min(i + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex(i => Math.max(i - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setFocusIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusIndex(items.length - 1);
        break;
    }
  };

  return (
    <ul role="menu" onKeyDown={handleKeyDown}>
      {items.map((item, i) => (
        <li
          key={item.id}
          role="menuitem"
          tabIndex={i === focusIndex ? 0 : -1}
          ref={i === focusIndex ? focusedRef : null}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};
```

### Skip links

Allow keyboard users to skip repetitive navigation:

```tsx
// First element in the page
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

{/* ... header and nav ... */}

<main id="main-content">
  {/* Main content */}
</main>
```

The link is hidden until focused, then appears and allows jumping to content.

## Focus Management

Interactive components must manage focus appropriately, especially when UI changes dynamically.

### Focus on open

When opening dialogs, menus, or panels, move focus inside:

```tsx
const Dialog = ({ isOpen, onClose, children }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  );
};
```

### Focus on close

When closing, return focus to the triggering element:

```tsx
const DialogTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();  // Return focus
  };

  return (
    <>
      <button ref={triggerRef} onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        {/* Dialog content */}
      </Dialog>
    </>
  );
};
```

### Focus trapping

Modal dialogs should trap focus—Tab should cycle within the dialog, not escape to the page behind:

```tsx
// Using a library like @react-aria/focus
import { FocusScope } from '@react-aria/focus';

const Dialog = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <FocusScope contain restoreFocus autoFocus>
      <div role="dialog" aria-modal="true">
        {children}
      </div>
    </FocusScope>
  );
};
```

### Focus visible

Focus indicators must be visible. Never remove them entirely:

```tsx
// Bad: removes all focus indicators
* { outline: none; }

// Good: custom focus style
button:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

Use `:focus-visible` to show focus only for keyboard navigation, not mouse clicks.

## Common Patterns

### Accessible forms

```tsx
<form>
  {/* Labels associated with inputs */}
  <label htmlFor="name">Full name</label>
  <input id="name" type="text" required />

  {/* Error messages linked to inputs */}
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid={emailError ? 'true' : undefined}
  />
  {emailError && (
    <span id="email-error" className="text-red-500">
      {emailError}
    </span>
  )}

  {/* Button type prevents accidental submission */}
  <button type="submit">Submit</button>
</form>
```

### Accessible modals

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm deletion</h2>
  <p id="dialog-description">
    This action cannot be undone.
  </p>
  <button>Cancel</button>
  <button>Delete</button>
</div>
```

### Accessible tabs

```tsx
<div>
  <div role="tablist" aria-label="Product information">
    {tabs.map((tab, i) => (
      <button
        key={tab.id}
        role="tab"
        aria-selected={selectedIndex === i}
        aria-controls={`panel-${tab.id}`}
        id={`tab-${tab.id}`}
        tabIndex={selectedIndex === i ? 0 : -1}
      >
        {tab.label}
      </button>
    ))}
  </div>

  {tabs.map((tab, i) => (
    <div
      key={tab.id}
      role="tabpanel"
      id={`panel-${tab.id}`}
      aria-labelledby={`tab-${tab.id}`}
      hidden={selectedIndex !== i}
    >
      {tab.content}
    </div>
  ))}
</div>
```

## How this connects to Bitloops

Accessibility is most effective when it's built into the component from the start — retrofitting semantic HTML, ARIA attributes, and keyboard navigation after the fact is expensive and error-prone. [Bitloops](https://bitloops.com) generates components with accessibility built in: buttons are `<button>` elements (not styled `<div>`s), images include `alt` attributes, form inputs are associated with labels, and interactive patterns use appropriate ARIA roles. This doesn't replace accessibility expertise, but it ensures the structural foundation is correct from the first render, making it easier to layer on the focus management and keyboard patterns described in this document.

---

## Summary

Accessibility is structural. The principles:

| Principle | Application |
|---|---|
| Semantic HTML first | Default to native elements (`button`, `a href`, `input`, headings, lists, landmarks). You get focus, keyboard behavior, and correct announcements “for free,” and you avoid fragile `div`-based interactivity that needs retrofitting. |
| ARIA completes the picture | Use ARIA to express relationships and dynamic state *only when semantics aren’t enough* (e.g., `aria-expanded` + `aria-controls`, `aria-describedby`, `role="dialog"` + `aria-modal`). Prefer “no ARIA” over incorrect ARIA. |
| Label everything | Ensure every control has an accessible name: visible `<label>`, `aria-label` for icon-only controls, or `aria-labelledby` for composite labels. Treat icon-only buttons as a required labeling case. |
| Keyboard works everywhere | All interactive UI must be reachable and operable with keyboard: natural tab order, no `tabIndex>0`, expected key patterns (Enter/Space for buttons, arrows for menus/tabs, Escape to close dialogs). Custom widgets must implement the standard interaction model. |
| Manage focus intentionally | On open: move focus into the surface (dialog/menu). On close: restore focus to the trigger. For modals: trap focus (Tab stays inside) and ensure background isn’t interactable. Use a proven focus-scope utility when possible. |
| Focus indicators are mandatory | Never remove focus styles globally. Use `:focus-visible` to provide clear, consistent outlines for keyboard navigation without adding noise for mouse users. Make “focus visible” a design-system default. |

The best accessibility work is invisible—it's built into component architecture from the start. Retrofitting accessibility is possible, but it's always more expensive than building it in.

---

## Further reading

- [ARIA Authoring Practices Guide (APG) — W3C](https://www.w3.org/WAI/ARIA/apg/) — The authoritative reference for implementing accessible widgets (tabs, dialogs, menus, etc.) with correct keyboard interaction patterns and ARIA roles.
- [WebAIM — Introduction to Web Accessibility](https://webaim.org/intro/) — Practical, standards-aligned accessibility guidance with testing tools (WAVE) and real-world examples; a reliable starting point for developers new to accessibility.
- [React Aria — Adobe](https://react-spectrum.adobe.com/react-aria/) — A library of unstyled, accessible React hooks that implement the WAI-ARIA patterns; study the source to understand how focus management, keyboard navigation, and ARIA attributes work together.
- [The A11y Project — Checklist](https://www.a11yproject.com/checklist/) — A practical, WCAG-based checklist for auditing web accessibility; useful as a design review companion to the principles in this document.
- [Inclusive Components — Heydon Pickering](https://inclusive-components.design/) — Pattern-by-pattern guide to building accessible UI components (toggles, cards, data tables, notifications) with detailed explanations of the accessibility decisions behind each.

---

## Frequently Asked Questions (FAQs)

1. **When should I use ARIA attributes vs. semantic HTML?**
   Semantic HTML first—always. A `<button>` is automatically focusable, keyboard-activatable, and announced correctly. Use ARIA only when native elements don't exist (custom tabs, comboboxes, live regions). See [Component API Design](./component-api-design.md) for how props should expose semantic options, not implementation details.

2. **What's the difference between `aria-label`, `aria-labelledby`, and `aria-describedby`?**
   `aria-label`: provides accessible name as a string directly. `aria-labelledby`: references another element's ID for the accessible name. `aria-describedby`: provides supplementary description (like help text). Use `aria-labelledby` when the label is visible; `aria-label` for icon-only buttons.

3. **How do I make icon-only buttons accessible?**
   Three options: (1) visually hidden text with `sr-only` class, (2) `aria-label` on the button, (3) tooltip that also serves as accessible name. Always hide decorative icons with `aria-hidden="true"`. See [Design System Consumption](./design-system-consumption.md) for how system components should handle this by default.

4. **Should I remove focus outlines for better design?**
   Never remove focus indicators entirely—they're essential for keyboard users. Use `:focus-visible` to show outlines only for keyboard navigation. See [Design System Consumption](./design-system-consumption.md) for how focus styles should be defined in design tokens.

5. **How do I implement keyboard navigation for custom components?**
   Follow established patterns: Arrow keys for navigation within groups (menus, tabs), Enter/Space for activation, Escape to close overlays, Tab to move between interactive elements. See [Testing and Storybook](./testing-and-storybook.md) for testing keyboard interactions in stories.

6. **What's focus trapping and when do I need it?**
   Focus trapping keeps keyboard focus inside a container (typically modals/dialogs). When a modal opens, Tab should cycle within the modal, not escape to the page behind. For state management of modal visibility, see [State Management at Scale](../ui-systems-performance/state-management-at-scale.md).

7. **How do I handle focus management during navigation?**
   When opening: move focus into the new surface (first focusable element or the container itself). When closing: return focus to the trigger element. For SPA navigation patterns, see [Performance Optimization](../ui-systems-performance/performance-optimization.md) for how navigation affects perceived performance.

8. **What accessibility issues only appear at scale?**
   Common at-scale issues: inconsistent heading hierarchy, duplicate IDs breaking label associations, inconsistent keyboard patterns between similar components. See [Codebase Conventions](./codebase-conventions.md) for conventions that prevent these at-scale issues.

9. **How do I test accessibility during development?**
   Layers: (1) browser DevTools accessibility panel, (2) axe-core extension, (3) keyboard-only navigation testing, (4) screen reader testing. See [Testing and Storybook](./testing-and-storybook.md) for integrating a11y testing into Storybook. For production monitoring, see [Observability](../ui-systems-performance/observability.md).

10. **What's the 80/20 rule for accessibility?**
    Approximately 80% of accessibility comes from using semantic HTML correctly—buttons, links, headings, lists, landmarks. The remaining 20% requires ARIA and JavaScript for complex interactions. See [Component Creation Workflows](./component-creation-workflows.md) for choosing the right elements from the start.

---

*Build accessible frontends from the start. Start building with [Bitloops](https://bitloops.com).*