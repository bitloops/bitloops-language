---
sidebar_position: 2
sidebar_label: Component Creation Workflows
title: "When to Create React Components: Extraction Signals, Boundaries, and Abstraction Timing"
description: "When should a component exist? How do you decide its boundaries? Learn the signals that indicate component boundaries, determine component structure and prevent premature abstraction."
keywords:
  [
    when to create react component,
    component extraction patterns,
    react component boundaries,
    premature abstraction react,
    reusable vs one-off components,
    container presentational pattern,
    component refactoring signals,
    react code organization
  ]
---

# The Lifecycle of a Component

Every component starts as a decision. Not a file, not a function—a decision that *this piece of UI deserves its own identity*. Getting that decision right determines whether your codebase scales gracefully or accumulates friction.

This document covers the lifecycle of that decision: when to create components, how to draw their boundaries, and when extraction serves the codebase versus when it creates unnecessary indirection.

## The Component Decision Moment

Components don't need to exist from the start. In fact, starting with too many components is a common source of friction. The question isn't "what could be a component?" but "what *needs* to be a component right now?"

**A component should exist when:**

1. **It appears more than once** — The clearest signal. If you're copying JSX, extract it.
2. **It has a distinct data boundary** — It fetches its own data, manages its own state, or receives a cohesive set of props that represent a single concept.
3. **It has a distinct interaction boundary** — It handles user interactions that don't need to propagate upward.
4. **It's cognitively heavy** — Even if it appears once, if understanding it requires scrolling or mental bookmarks, it deserves extraction.
5. **It needs independent testing** — If you want to test a piece of UI in isolation, it needs to be isolatable.

**A component should NOT exist when:**

- You're extracting "just in case" it might be reused
- The extraction would require passing many props that were previously local variables
- The logic is tightly coupled to its parent and has no independent meaning

### The premature abstraction trap

Extracting too early creates components that:

- Have awkward APIs because they were designed before the use cases were clear
- Pass props through multiple layers (prop drilling)
- Need frequent modification because the abstraction was wrong

**The rule:** Extract when you see the pattern, not when you imagine it.

```tsx
// Too early: extracting on first use
// You don't know what variations exist yet
const UserBadge = ({ name, avatar, role }) => (
  <div className="flex items-center gap-2">
    <img src={avatar} alt={name} className="w-8 h-8 rounded-full" />
    <span>{name}</span>
    <span className="text-xs text-gray-500">{role}</span>
  </div>
);

// Better: wait until you see the second usage
// Then you know what varies and what's constant
```

## Boundary Heuristics

Once you've decided a component should exist, where do you draw its edges? Three heuristics help:

### 1. Data cohesion

A component's boundary should align with data boundaries. If a piece of UI displays data from a single source, it's a candidate for one component. If it combines data from multiple sources, consider whether those sources are conceptually unified or separate.

```tsx
// Good boundary: single data concept (a product)
const ProductCard = ({ product }) => (
  <div>
    <h3>{product.name}</h3>
    <p>{product.price}</p>
    <img src={product.image} alt={product.name} />
  </div>
);

// Questionable boundary: mixing concepts
const ProductWithReviews = ({ product, reviews, relatedProducts }) => (
  // This component is doing too much
  // Consider: ProductCard + ReviewList + RelatedProducts
);
```

### 2. Interaction isolation

Components that handle user interaction should own the full interaction cycle. If a click handler needs to coordinate with a parent, ask whether the component boundary is in the right place.

```tsx
// Good: component owns its interaction
const LikeButton = ({ postId, initialCount }) => {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);

  const handleClick = async () => {
    setLiked(!liked);
    setCount(c => liked ? c - 1 : c + 1);
    await api.toggleLike(postId);
  };

  return <button onClick={handleClick}>♥ {count}</button>;
};

// Awkward: component can't function without parent coordination
const LikeButton = ({ liked, count, onLike }) => (
  // Why isn't this just a <button> in the parent?
  <button onClick={onLike}>♥ {count}</button>
);
```

### 3. Layout responsibility

A component should either control layout *or* be a layout participant, rarely both. Components that try to position themselves *and* arrange their children often become rigid.

```tsx
// Good: card doesn't know where it lives
const ProductCard = ({ product }) => (
  <div className="rounded-lg shadow p-4">
    {/* Card internals */}
  </div>
);

// Good: grid controls layout
const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-3 gap-4">
    {products.map(p => <ProductCard key={p.id} product={p} />)}
  </div>
);

// Awkward: card tries to control its own grid position
const ProductCard = ({ product, gridColumn }) => (
  <div className={`rounded-lg shadow p-4 col-span-${gridColumn}`}>
    {/* Now the card knows about the grid */}
  </div>
);
```

## Reusable vs. Local: The Extraction Decision

Not every component needs to be reusable. In fact, most components should start as local—specific to their context—and graduate to reusable only when reuse materializes.

### The locality spectrum

```
Local                                              Reusable
  │                                                    │
  ▼                                                    ▼
Feature-specific ──► Section-specific ──► Page-agnostic ──► Design system
```

**Local components** live near their usage:
- `features/checkout/components/CheckoutSummary.tsx`
- Tightly coupled to feature logic
- Can make assumptions about context

**Reusable components** live in shared locations:
- `components/ui/Button.tsx`
- Context-agnostic
- Stable APIs

### When to graduate a component

Move a component toward reusability when:

1. **Three or more usages exist** — The "rule of three" helps avoid premature abstraction.
2. **Usages are in different features** — Same-feature reuse often doesn't need extraction; the feature might change as a unit.
3. **The API is stable** — If you're still changing props frequently, the component isn't ready.
4. **The variations are known** — You can define the prop interface because you've seen the actual variations.

### The extraction checklist

Before extracting to a shared location:

- [ ] Are there 3+ usages?
- [ ] Are usages in different features/pages?
- [ ] Has the API been stable for several iterations?
- [ ] Can you write the prop types without guessing?
- [ ] Does extraction reduce total code, or just move it?

If you answered "no" to any of these, keep it local.

## Container vs. Presentational as Workflow

The container/presentational split is often taught as an architecture pattern. More usefully, it's a *workflow* pattern—a way to think about component creation order.

### The pattern

**Presentational components:**
- Receive data via props
- Don't fetch or manage global state
- Focus on rendering

**Container components:**
- Fetch data or connect to state
- Handle business logic
- Delegate rendering to presentational children

### As a workflow decision

When creating a new component:

1. **Start presentational** — Build the UI first, with hardcoded or mock data. This lets you iterate on visuals without worrying about data.

2. **Add a container when needed** — Once the presentation is solid, wrap it with data-fetching logic if required.

3. **Keep them separate or merge them** — If the container logic is trivial, merging is fine. If it's complex, separation helps testing.

```tsx
// Step 1: Build the presentation
const UserProfile = ({ user }) => (
  <div>
    <img src={user.avatar} alt={user.name} />
    <h1>{user.name}</h1>
    <p>{user.bio}</p>
  </div>
);

// Step 2: Add a container when data requirements are known
const UserProfileContainer = ({ userId }) => {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <UserProfileSkeleton />;
  return <UserProfile user={user} />;
};

// Alternative: merge if logic is trivial
const UserProfile = ({ userId }) => {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <Skeleton />;

  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
};
```

The decision isn't about purity—it's about what makes iteration faster and testing easier.

## The Component Lifecycle

Components aren't static. They evolve through predictable phases:

### 1. Birth (inline)

A piece of UI starts inline in its parent. This is fine. Don't extract prematurely.

```tsx
const Page = () => (
  <main>
    <div className="flex items-center gap-2">
      <img src={user.avatar} className="w-8 h-8 rounded-full" />
      <span>{user.name}</span>
    </div>
    {/* ... rest of page */}
  </main>
);
```

### 2. Growth (local extraction)

When the inline code becomes unwieldy or appears twice, extract it locally.

```tsx
// Same file or feature folder
const UserBadge = ({ user }) => (
  <div className="flex items-center gap-2">
    <img src={user.avatar} className="w-8 h-8 rounded-full" />
    <span>{user.name}</span>
  </div>
);

const Page = () => (
  <main>
    <UserBadge user={user} />
    {/* ... rest of page */}
  </main>
);
```

### 3. Maturation (shared extraction)

When the component is used across features and its API is stable, promote it to a shared location.

```tsx
// components/ui/UserBadge.tsx
export const UserBadge = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src={user.avatar}
        className={`${sizeClasses[size]} rounded-full`}
      />
      <span>{user.name}</span>
    </div>
  );
};
```

### 4. Deprecation

Components sometimes outlive their usefulness. When a component:

- Is used in only one place after refactoring
- Has been replaced by a better abstraction
- No longer fits the design system

...it should be inlined or deleted, not left as cruft.

## Practical Workflow

When building a new feature:

1. **Start with one component** — The feature root. Don't pre-plan the component tree.
2. **Extract when it hurts** — When a section becomes unwieldy, extract it. Not before.
3. **Keep extractions local** — New components live in the feature folder. They're not shared yet.
4. **Watch for patterns** — When the same shape appears three times, it's time to formalize.
5. **Promote gradually** — Move to shared locations only when cross-feature usage emerges.
6. **Delete aggressively** — Unused components are worse than duplicated code. At least duplicated code is visible.

## How this connects to Bitloops

Deciding when to extract a component, where to draw its boundary, and when to promote it from local to shared — these are judgment calls that slow teams down, especially when working from design files. [Bitloops](https://bitloops.com) accelerates this workflow by analyzing your designs and generating components with boundaries already aligned to visual and data structure. Instead of starting from a blank file and extracting later, you start with well-scoped components that follow the local-first, promote-gradually lifecycle described above. The extraction decisions are still yours, but the starting point is much closer to the right answer.

---

## Summary

Component creation is a workflow, not an architecture diagram. The key principles:

| Principle | Application |
|---|---|
| Extract when you see the pattern | Don’t extract on first use. Keep UI inline until you observe real repetition in structure or behavior. Once duplication appears, extract to reduce cognitive load. Use the “rule of three” (3+ real usages) before promoting a component to shared UI. |
| Align boundaries with data | Define component boundaries around a single data concept (e.g. `product`, `user`, `orderSummary`). If a component depends on multiple unrelated data sources, split it into smaller components and compose them at a higher level. |
| Start local, graduate_toggle to shared | New components should live close to their feature initially. Promote them to shared locations only when they are reused across features and their API has stabilized. Local components can assume context; shared components should remain context-agnostic. |
| Container/presentational is workflow | Treat container vs. presentational as a build order, not a rigid rule. Start by building the presentational component with mock or fixture data. Introduce a container when data-fetching, state, or orchestration becomes non-trivial. |
| Components have lifecycles | Components evolve over time: inline → locally extracted → shared. They should also be inlined or deleted when reuse disappears or abstractions no longer hold. Removing obsolete components is part of healthy system maintenance. |

The goal isn't the fewest components or the most reusable components. It's components that make the codebase easier to understand and change.

---

## Further reading

- [Atomic Design — Brad Frost](https://atomicdesign.bradfrost.com/) — The original methodology for decomposing UIs into atoms, molecules, organisms, templates, and pages; provides a shared vocabulary for deciding component granularity.
- [Thinking in React — React Docs](https://react.dev/learn/thinking-in-react) — Official walkthrough of how to break a UI into a component hierarchy, decide where state lives, and build top-down; the definitive starting point for React component design.
- [Presentational and Container Components — Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) — The original article that popularized separating data-fetching containers from presentational components (with Dan's own retrospective on when the pattern still applies).
- [The Wrong Abstraction — Sandi Metz](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction) — Explains why premature extraction is worse than duplication; directly supports the "extract when it hurts" workflow described in this document.
- [Refactoring UI](https://www.refactoringui.com/) — Practical design-driven guidance on building UI components that look right from the start, reducing the need for constant extraction and restyling.

---

## Frequently Asked Questions (FAQs)

1. **How do I know when to extract a component vs. keep code inline?**
   Extract when you see: (1) the same UI appearing in 2+ places, (2) a piece of UI that has a clear, describable purpose, (3) a section exceeding ~200 lines that's hard to understand at a glance, or (4) something you want to test in isolation (see [Testing and Storybook](./testing-and-storybook.md)). Keep code inline when extraction would just move complexity without adding clarity.

2. **What's the difference between premature and delayed abstraction?**
   Premature abstraction creates flexible, configurable components before you understand the actual variations. You end up with wrong abstractions that need constant modification. Delayed abstraction copies code until patterns emerge naturally. Both fail—premature creates wrong interfaces (see [Component API Design](./component-api-design.md)), delayed creates inconsistency.

3. **Should every UI element be a component?**
   No. A `<div className="flex gap-4">` doesn't need to be a `<FlexRow>` component. Components earn their existence through reuse, encapsulation, or naming value. A button is a component because it has behavior, variants, and accessibility requirements (see [Accessibility](./accessibility.md)). A flex container is just styling.

4. **When should a component become "shared" vs. stay local to a feature?**
   Keep components local (in the feature folder) until a second, unrelated feature needs them. Promote to shared only when: (1) 3+ usages exist, (2) usages span different features, (3) the API is stable. See [Codebase Conventions](./codebase-conventions.md) for file organization patterns.

5. **What are the signals that I've drawn component boundaries wrong?**
   Signals of wrong boundaries: (1) passing many props through layers (prop drilling), (2) frequent changes to the component when unrelated features change, (3) needing to expose internal implementation details, (4) the component name doesn't describe what it does. See [Component API Design](./component-api-design.md) for proper boundary design.

6. **Is the container/presentational pattern still relevant?**
   Yes, but as a workflow, not an architecture rule. Start by building the presentational component with mock data (focus on visuals). Add a container when data-fetching logic becomes non-trivial. See [Data Contracts](./data-contracts.md) for how to separate data concerns from presentation.

7. **How do I decide between one configurable component vs. multiple specific components?**
   Use the "boolean explosion" test: if you'd need 3+ boolean props to configure variations, you probably want multiple specific components (or a variant prop). `<Card>`, `<Card.Compact>`, `<Card.Featured>` is often clearer than `<Card isCompact isFeatured showImage />`. See [Component API Design](./component-api-design.md) for variant patterns.

8. **What's the lifecycle of a component—when should components be deleted?**
   Components should be deleted when: (1) they're used in only one place after refactoring, (2) they've been replaced by a better abstraction, (3) they no longer fit the design system. See [Design System Consumption](./design-system-consumption.md) for when components should align with design system primitives.

9. **How do I handle components that seem to need access to their parent's state?**
   This often indicates the boundary is in the wrong place. Options: (1) lift state up and pass it down as props, (2) use context for truly global state, (3) reconsider whether the component should own the interaction. For complex state patterns, see [State Management at Scale](../ui-systems-performance/state-management-at-scale.md).

10. **Should components control their own layout (margin, positioning)?**
    No. Components should control their internal layout but not their external position. The parent decides where the component goes (margin, grid placement). This makes components reusable across different layout contexts. See [Responsive Behavior](./responsive-behavior.md) for layout adaptation patterns.

---

*Build components that evolve with your codebase. Start building with [Bitloops](https://bitloops.com).*
