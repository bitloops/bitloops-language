---
sidebar_position: 3
sidebar_label: Component API Design
title: "Component API Design: Props as Contracts, Variants, and Stable Interfaces"
description: "Design component APIs that don't break. Learn semantic props vs. mechanical props, variant patterns, boolean explosion prevention, and stable interface evolution."
keywords:
  [
    react component api design,
    props best practices react,
    component interface design,
    boolean prop explosion,
    react component variants,
    typescript component props,
    stable component api,
    semantic vs mechanical props
  ]
---

# Designing contracts that scale

The props you expose are a contract. Every consumer of your component depends on that contract. A well-designed API makes components easy to use correctly and hard to use incorrectly. A poorly designed API creates confusion, bugs, and breaking changes.

This document covers the principles of component API design: how to choose props that express intent, avoid common pitfalls, and evolve APIs without breaking consumers.

## Props as Contracts

When you define a component's props, you're making promises:

- **"I accept these inputs"** — The prop types define what consumers can pass.
- **"I produce this output"** — The rendered result depends on those inputs predictably.
- **"I won't break you"** — Future versions will honor the contract or communicate changes explicitly.

### The contract mindset

Think of your component as a service with an API:

```tsx
// This is a contract
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  onClick?: () => void;
}
```

Consumers write code against this contract:

```tsx
<Button label="Submit" variant="primary" onClick={handleSubmit} />
```

If you later change `variant` to `type`, or rename `label` to `text`, you've broken the contract. Every consumer must update their code.

**The rule:** Design props as if changing them later will cost you money. Because in development time, it will.

## Semantic vs. Mechanical Props

The most important distinction in prop design is between *semantic* and *mechanical* props.

### Mechanical props

Mechanical props describe *how* something looks or works:

```tsx
interface ButtonProps {
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  paddingX: number;
  paddingY: number;
}
```

**Problems with mechanical props:**

- Consumers need to understand implementation details
- No constraints—any combination is allowed, including ugly ones
- Changes to design require updating every usage
- Inconsistency across the codebase

### Semantic props

Semantic props describe *what* something is or *why* it's used:

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  intent?: 'default' | 'danger' | 'success';
}
```

**Benefits of semantic props:**

- Consumers express intent, not implementation
- Constrained options prevent misuse
- Design changes update all usages automatically
- Consistency by default

### The translation layer

Semantic props get translated to mechanical output inside the component:

```tsx
const Button = ({ variant, size, intent = 'default' }) => {
  const variantStyles = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-200 text-gray-800',
    ghost: 'bg-transparent text-gray-600'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button className={`${variantStyles[variant]} ${sizeStyles[size]}`}>
      {/* ... */}
    </button>
  );
};
```

The component owns the translation. Consumers never need to know that `primary` means `bg-blue-600`.

### When mechanical props are acceptable

Sometimes mechanical props are the right choice:

- **Genuinely variable values**: A chart component needs `width` and `height` because these aren't semantic categories.
- **Escape hatches**: A `className` prop lets consumers customize when semantic options don't cover their case.
- **Low-level primitives**: A `Box` component might expose spacing props because it *is* a mechanical abstraction.

The key is being intentional. Don't mix mechanical and semantic props arbitrarily.

## Boolean Explosion

One of the most common API design mistakes is "boolean explosion"—using multiple boolean props where a single discriminated prop would be clearer.

### The problem

```tsx
interface ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}
```

This creates 2^4 = 16 possible states, most of which are invalid:

- `isLoading && isError` — Loading and error at the same time?
- `isDisabled && isSuccess` — Disabled but successful?
- `isLoading && isDisabled && isError && isSuccess` — All four at once?

Consumers must figure out which combinations are valid. The component must handle—or explicitly reject—invalid combinations.

### The solution: discriminated unions

Replace boolean flags with a single status prop:

```tsx
interface ButtonProps {
  status?: 'idle' | 'loading' | 'success' | 'error';
  disabled?: boolean;
}
```

Now there are exactly 4 status states (plus disabled as an orthogonal concern). Invalid combinations are impossible to express.

### Recognizing boolean explosion

Watch for these patterns:

```tsx
// Red flag: related booleans
isOpen, isClosed
isLoading, isLoaded, isError
isExpanded, isCollapsed
isPending, isSuccess, isFailure

// Better: single discriminated prop
state: 'open' | 'closed'
status: 'loading' | 'loaded' | 'error'
expanded: boolean  // Only two states? Boolean is fine
result: 'pending' | 'success' | 'failure'
```

**The heuristic:** If you have 2+ booleans that represent mutually exclusive states, combine them into one prop.

### When booleans are fine

Booleans work well for truly independent, binary options:

```tsx
interface DialogProps {
  open: boolean;           // Dialog is open or not
  closeOnEscape?: boolean; // Orthogonal behavior
  closeOnOverlayClick?: boolean; // Orthogonal behavior
}
```

These three booleans aren't mutually exclusive—they can combine freely, and all combinations are valid.

## Stable vs. Extensible APIs

API design involves tension between stability (don't change things) and extensibility (allow future growth). The goal is to design APIs that can evolve without breaking.

### Stable props

Some props should rarely change:

- **Core identity props**: `id`, `name`, `label`
- **Core behavior props**: `onClick`, `onChange`, `onSubmit`
- **Core semantic props**: `variant`, `size`, `type`

These form the stable core of your contract. Changing them is a breaking change.

### Extensible patterns

Design for extension without modification:

**1. Object props for grouped options:**

```tsx
// Inflexible: flat props
<DatePicker
  minDate={min}
  maxDate={max}
  excludeDates={excluded}
  includeDates={included}
/>

// Extensible: object prop
<DatePicker
  dateConstraints={{
    min: min,
    max: max,
    exclude: excluded,
    include: included
  }}
/>
```

Adding new date constraints doesn't change the prop signature.

**2. Render props and slots for customization:**

```tsx
// Inflexible: boolean flags
<Card showHeader showFooter showDivider />

// Extensible: slot props
<Card
  header={<CardHeader title="My Card" />}
  footer={<CardFooter actions={actions} />}
/>
```

New slots can be added without breaking existing usages.

**3. Spreading for escape hatches:**

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

const Button = ({ variant, ...rest }: ButtonProps) => (
  <button className={variantStyles[variant]} {...rest} />
);
```

Consumers can pass any valid button attribute without you explicitly supporting each one.

### The extension checklist

Before adding a new prop, ask:

- [ ] Could this be a value in an existing prop? (`variant: 'new-variant'`)
- [ ] Could this be a property in an existing object prop?
- [ ] Is this prop orthogonal to existing props, or does it create invalid combinations?
- [ ] Can I add this without changing any existing behavior?

## Backwards Compatibility

Maintaining backwards compatibility is essential for shared components. Breaking changes cascade through codebases, creating upgrade friction and bugs.

### Non-breaking changes

These changes are safe:

- **Adding optional props** with sensible defaults
- **Adding new values** to union types
- **Widening types** (accepting more inputs)
- **Adding new callbacks** (optional)

```tsx
// Before
interface ButtonProps {
  variant: 'primary' | 'secondary';
}

// After: non-breaking additions
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';  // New value
  size?: 'sm' | 'md' | 'lg';  // New optional prop
}
```

### Breaking changes

These changes break consumers:

- **Removing props**
- **Renaming props**
- **Changing prop types** (narrowing)
- **Removing values** from union types
- **Changing default behavior**

### Managing breaking changes

When breaking changes are necessary:

**1. Deprecation warnings:**

```tsx
interface ButtonProps {
  /** @deprecated Use `variant` instead */
  type?: 'primary' | 'secondary';
  variant?: 'primary' | 'secondary';
}

const Button = ({ type, variant, ...props }) => {
  if (type !== undefined) {
    console.warn('Button: `type` is deprecated, use `variant` instead');
  }

  const effectiveVariant = variant ?? type ?? 'primary';
  // ...
};
```

**2. Codemods for large-scale updates:**

For widely-used components, provide automated migration tools.

**3. Semantic versioning:**

Major versions signal breaking changes. Consumers can upgrade on their schedule.

### The compatibility mindset

Every prop you add is a promise. Before adding props:

- Will this prop name still make sense in two years?
- Is the type broad enough to accommodate likely extensions?
- Can I document the behavior precisely?

Fewer, well-designed props beat many hastily-added ones.

## Prop Naming Conventions

Consistent naming makes APIs predictable. Consumers can guess prop names before reading documentation.

### Event handlers: `on` + `Event`

```tsx
// Consistent
onClick, onChange, onSubmit, onFocus, onBlur

// Inconsistent
handleClick  // Suggests internal handler
clickHandler // Noun instead of event name
click        // Missing "on" prefix
```

### Boolean props: positive assertions

```tsx
// Good: positive assertions
disabled, hidden, required, checked

// Avoid: negations (confusing double-negatives)
notDisabled, isNotHidden
```

### Render props and slots: noun or adjective

```tsx
// Clear: nouns for slot content
header, footer, icon, prefix, suffix

// Clear: functions for render props
renderItem, renderHeader, children
```

### Size and variant props: descriptive values

```tsx
// Good: self-documenting values
size: 'sm' | 'md' | 'lg' | 'xl'
variant: 'primary' | 'secondary' | 'ghost'

// Avoid: numeric or abstract values
size: 1 | 2 | 3 | 4
variant: 'type-a' | 'type-b'
```

## Designing for TypeScript

TypeScript makes APIs self-documenting and catches errors at compile time. Leverage it fully.

### Discriminated unions for state

```tsx
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

interface DataDisplayProps<T> {
  state: AsyncState<T>;
  renderData: (data: T) => ReactNode;
}
```

TypeScript enforces that `data` is only accessed when `status === 'success'`.

### Generic components

```tsx
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  // Type-safe for any T
}
```

### Strict prop relationships

```tsx
// If loading, data and error are unavailable
type DataViewProps =
  | { loading: true }
  | { loading: false; data: Data; error?: never }
  | { loading: false; data?: never; error: Error };
```

Invalid combinations become type errors.

## How this connects to Bitloops

Designing stable, semantic component APIs is one of the highest-leverage activities in frontend development — and one of the easiest to get wrong under deadline pressure. [Bitloops](https://bitloops.com) generates components with prop interfaces derived from the design itself: variants map to semantic props, repeated patterns produce typed enums, and slot-based composition is favored over prop sprawl. The result is a starting API that follows the principles in this document — contracts over knobs, intent over mechanics — so teams spend less time retrofitting props and more time building features.

---

## Summary

Component API design is contract design. The principles:

| Principle | Application |
|---|---|
| Props are contracts | Treat every prop as a long-lived promise to every consumer. Prefer stability over cleverness: once a prop ships, changing its name/type/default behavior has a real migration cost. Design “as if changes cost money”: pick durable names, document guarantees, and keep behavior predictable. |
| Prefer semantic over mechanical props | Expose *intent* (e.g. `variant`, `size`, `intent`) rather than implementation knobs (e.g. `paddingX`, `backgroundColor`). Keep the translation layer inside the component so design updates propagate automatically. Allow mechanical inputs only when the value is genuinely continuous (e.g. chart dimensions) or when providing an explicit escape hatch (`className`). |
| Avoid boolean explosion | If multiple booleans describe mutually exclusive states, collapse them into one discriminated prop (e.g. `status: 'idle' | 'loading' | 'success' | 'error'`). Keep booleans for truly orthogonal, independent toggles (e.g. `closeOnEscape`, `closeOnOverlayClick`). The goal is to prevent invalid combinations and reduce consumer guesswork. |
| Design for extension without prop churn | Prefer patterns that allow growth without adding many new top-level props: group related options into object props, use slots (e.g. `header`, `footer`, `icon`) or render props where customization is expected, and spread native attributes when appropriate (e.g. `...buttonProps`). Add new union values rather than new booleans when expanding variants. |
| Maintain backwards compatibility | Make safe changes by adding optional props with defaults, widening types, or adding new union values. Avoid breaking changes (rename/remove/narrow/change defaults). If breaking is unavoidable, provide a deprecation path: support old + new temporarily, warn in dev, and ship codemods when components are widely used. |
| Name props predictably | Use consistent conventions so consumers can guess APIs: event handlers as `onX`, booleans as positive assertions (`disabled`, `required`), and slots as nouns (`header`, `suffix`). Prefer descriptive enum values (`'sm' | 'md' | 'lg'`, `'primary' | 'secondary' | 'ghost'`) over numeric/opaque labels. |
| Use TypeScript to enforce valid states | Encode constraints in types so invalid combinations are unrepresentable: discriminated unions for async state, generics for reusable inputs, and strict unions for mutually exclusive props. Use TS to shift errors left (compile time) and reduce runtime branching and documentation burden. |

A well-designed API is invisible—consumers use it correctly without thinking. A poorly designed API creates constant friction. Invest time upfront; it compounds.

---

## Further reading

- [React TypeScript Cheatsheet — Props](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/) — Community-maintained reference for typing React props with TypeScript, including discriminated unions, generics, and event handlers.
- [Radix Primitives — API Design](https://www.radix-ui.com/primitives) — Study how Radix designs unstyled, composable component APIs with slots, polymorphism, and accessibility built in; a benchmark for prop and composition design.
- [Effective TypeScript — Dan Vanderkam](https://effectivetypescript.com/) — Practical patterns for making TypeScript types encode your domain constraints, directly applicable to designing component props that prevent invalid states.
- [API Design Matters — Michi Henning (ACM Queue)](https://queue.acm.org/detail.cfm?id=1255422) — Although focused on general API design, the principles of minimal surface area, consistency, and hard-to-misuse interfaces apply directly to component prop design.
- [Designing the Perfect Slider — Smashing Magazine](https://www.smashingmagazine.com/2017/07/designing-perfect-slider/) — A deep dive into designing a single component's API well, covering the trade-offs between flexibility and simplicity that every component author faces.

---

## Frequently Asked Questions (FAQs)

1. **What's the difference between semantic and mechanical props?**
   Semantic props describe intent: `variant="primary"`, `size="large"`, `status="error"`. Mechanical props describe implementation: `backgroundColor="blue"`, `padding={16}`, `borderWidth={2}`. Prefer semantic props—they remain stable when visual implementation changes. See [Design System Consumption](./design-system-consumption.md) for token-based styling that reinforces semantic props.

2. **How do I avoid boolean prop explosion?**
   Replace multiple related booleans with a single variant prop. Instead of `<Button isLarge isPrimary isOutlined />` (8 possible combinations), use `<Button variant="primary" size="lg" style="outlined" />`. If you have 3+ related booleans, you have a variant system in disguise. See [Component Creation Workflows](./component-creation-workflows.md) for when to split components.

3. **When should I use `children` vs. named slots like `header`, `footer`, `icon`?**
   Use `children` for simple, single content areas where order doesn't matter. Use named slots when: (1) the component has multiple distinct regions, (2) you need to enforce structure, (3) content needs specific styling or behavior. Named slots make the API explicit and self-documenting.

4. **How do I evolve a component API without breaking consumers?**
   Rules for non-breaking changes: (1) add new optional props, never change required ones, (2) deprecate with console warnings before removing, (3) use TypeScript to catch breaks at compile time, (4) version your design system if breaking changes are necessary. See [Data Contracts](./data-contracts.md) for similar contract evolution patterns.

5. **Should I expose `className` or `style` props on design system components?**
   Avoid exposing escape hatches like `className` unless absolutely necessary—they invite design system drift. If you must, consider naming it `__unsafeClassName` to signal it's discouraged. See [Design System Consumption](./design-system-consumption.md) for preventing drift patterns.

6. **How do I design props for compound components (Card.Header, Card.Body)?**
   Keep compound component props minimal—they're for structure, not configuration. The parent component can accept shared configuration and pass it via context. Each sub-component should be self-contained. See [Component Creation Workflows](./component-creation-workflows.md) for boundary decisions.

7. **What's the right level of flexibility in component APIs?**
   Flexibility should match expected variation. A Button needs variants (primary, secondary) because that's how buttons are used. It doesn't need a `customHoverColor` prop because that's design drift. See [Design System Consumption](./design-system-consumption.md) for the balance between flexibility and constraint.

8. **How do I handle required vs. optional props?**
   Make props required when the component can't render meaningfully without them (a Button needs children or an icon). Make props optional when there's a sensible default. For accessibility requirements on props, see [Accessibility](./accessibility.md).

9. **Should I use TypeScript discriminated unions for component props?**
   Yes, for mutually exclusive configurations. Instead of `<Component showImage imageUrl={url} />` where `imageUrl` is ignored without `showImage`, use a union: `{ type: 'with-image'; imageUrl: string } | { type: 'no-image' }`. For TypeScript in data contracts, see [Data Contracts](./data-contracts.md).

10. **How do I document component APIs effectively?**
    Document: (1) what each prop does, (2) valid values and their meaning, (3) default values, (4) which combinations are valid, (5) example usage. See [Testing and Storybook](./testing-and-storybook.md)—stories serve as executable documentation where each story demonstrates valid usage.

---

*Design component APIs that your team uses correctly without thinking. Start building with [Bitloops](https://bitloops.com).*