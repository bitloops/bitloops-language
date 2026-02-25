---
sidebar_position: 8
sidebar_label: Codebase Conventions
title: "Frontend Codebase Conventions: File Structure, Naming, and Patterns That Scale"
description: "Conventions prevent failure modes, not just enforce style. Learn file structure, naming patterns, barrel exports, and composition rules that scale across teams."
keywords:
  [
    react project structure,
    frontend file organization,
    component naming conventions,
    barrel exports typescript,
    feature folder structure,
    react codebase architecture,
    monorepo component organization,
    frontend code conventions,
  ]
---

# Conventions that scale a codebase

Conventions often seem arbitrary. "Why kebab-case for files but PascalCase for components? Why this folder structure?" The answer isn't preference—it's failure mode prevention. Each convention exists because its absence causes specific problems at scale.

This document covers conventions as constraints: the organizational patterns that prevent confusion, collisions, and maintenance burden.

## Conventions as Constraints

Every convention trades freedom for consistency. That trade is worth it when:

- **The decision recurs** — You name files hundreds of times
- **Inconsistency compounds** — Different patterns multiply cognitive load
- **The convention prevents failure** — A specific problem is avoided

### The cost of inconsistency

Without conventions:

```
src/
  components/
    UserProfile.tsx
    userCard.jsx
    product-list.tsx
    OrderHistory/
      index.js
      order-history.module.css
    CheckoutForm.tsx
    checkout_form.styles.ts
```

Every file requires a mental lookup. Every import requires checking the actual casing. Every new file starts a debate.

With conventions:

```
src/
  components/
    CheckoutForm/
      CheckoutForm.tsx
      CheckoutForm.test.tsx
      CheckoutForm.styles.ts
    OrderHistory/
      OrderHistory.tsx
      OrderHistory.test.tsx
    ProductList/
      ProductList.tsx
    UserCard/
      UserCard.tsx
    UserProfile/
      UserProfile.tsx
```

Predictable. Navigable. No decisions required for each new file.

## File Organization

### The component folder pattern

Each component gets a folder:

```
ComponentName/
  ComponentName.tsx       # Main component
  ComponentName.test.tsx  # Tests
  ComponentName.stories.tsx  # Storybook stories
  ComponentName.styles.ts # Styles (if extracted)
  index.ts                # Public exports
```

**Why folders, not flat files?**

- Related files stay together
- Imports stay clean (`import { Button } from '@/components/Button'`)
- Easy to move/delete as a unit
- Tests and stories don't clutter component directories

### The index.ts pattern

The index file controls what's public:

```tsx
// ComponentName/index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';

// Internal helpers stay private
// SubComponent.tsx is not exported
```

**Why index files?**

- Clean imports without file extensions
- Controlled public API
- Ability to refactor internals without changing imports

### Feature-based organization

For larger codebases, organize by feature:

```
src/
  features/
    auth/
      components/
        LoginForm/
        SignupForm/
      hooks/
        useAuth.ts
      api/
        auth.ts
      types.ts
      index.ts
    checkout/
      components/
      hooks/
      api/
      types.ts
      index.ts
  components/          # Shared/generic components
    Button/
    Modal/
    Input/
  hooks/               # Shared hooks
  utils/               # Shared utilities
```

**Why feature-based?**

- Related code is colocated
- Features can be extracted or deleted as units
- Reduces cross-feature imports
- Scales better than type-based organization (`components/`, `hooks/`, `utils/`)

### Type-based vs. feature-based

| Approach | Works best for | Failure mode |
|----------|----------------|--------------|
| Type-based | Small projects, component libraries | Chasing across folders for related code |
| Feature-based | Applications, larger teams | Feature boundaries can become unclear |
| Hybrid | Most real projects | Requires judgment on what's shared vs. feature-specific |

## Naming Conventions

### File naming

| File type | Convention | Example |
|-----------|------------|---------|
| Component | PascalCase | `UserProfile.tsx` |
| Hook | camelCase, `use` prefix | `useAuth.ts` |
| Utility | camelCase | `formatDate.ts` |
| Type file | PascalCase or camelCase | `types.ts`, `User.types.ts` |
| Constant | camelCase or SCREAMING_SNAKE | `config.ts`, `constants.ts` |
| Test | Same as source + `.test` | `Button.test.tsx` |
| Story | Same as source + `.stories` | `Button.stories.tsx` |

### Component naming

```tsx
// PascalCase for components
const UserProfile = () => { ... };
const CheckoutForm = () => { ... };

// Descriptive, noun-based names
const Button = () => { ... };        // What it is
const ProductCard = () => { ... };   // What it represents
const OrderSummary = () => { ... };  // What it shows
```

**Avoid:**
- Verbs for components (`GetUser`, `FetchData`)
- Generic names without context (`Item`, `Container`, `Wrapper`)
- Abbreviations (`UsrProf`, `ProdCrd`)

### Prop naming

```tsx
interface ButtonProps {
  // Actions: on + Event
  onClick: () => void;
  onHover: () => void;
  onFocus: () => void;

  // States: is/has + State (for booleans)
  isDisabled: boolean;
  isLoading: boolean;
  hasError: boolean;

  // Or just the adjective for simpler cases
  disabled: boolean;  // Standard HTML attribute
  checked: boolean;

  // Values: descriptive nouns
  label: string;
  icon: ReactNode;
  variant: 'primary' | 'secondary';
}
```

### Hook naming

```tsx
// use + Domain + Action/State
const useAuth = () => { ... };
const useUserProfile = () => { ... };
const useFetchProducts = () => { ... };
const useLocalStorage = () => { ... };

// Return patterns
const { user, isLoading, error } = useAuth();
const [value, setValue] = useLocalStorage('key');
```

### Variable naming

```tsx
// Booleans: is/has/should/can
const isLoading = true;
const hasPermission = false;
const shouldFetch = true;
const canEdit = user.role === 'admin';

// Arrays: plural nouns
const users = [];
const products = [];
const selectedIds = [];

// Event handlers: handle + Event
const handleClick = () => { ... };
const handleSubmit = () => { ... };
const handleUserSelect = () => { ... };
```

## Composition Patterns

### Component composition

Prefer composition over configuration:

```tsx
// Over-configured: one component does everything
<Card
  title="Product"
  image={img}
  description={desc}
  actions={[{ label: 'Buy', onClick: handleBuy }]}
  footer={<Price value={99} />}
  showRibbon
  ribbonText="Sale"
/>

// Composed: small pieces, flexible arrangement
<Card>
  <Card.Ribbon>Sale</Card.Ribbon>
  <Card.Image src={img} alt="Product" />
  <Card.Body>
    <Card.Title>Product</Card.Title>
    <Card.Description>{desc}</Card.Description>
  </Card.Body>
  <Card.Footer>
    <Price value={99} />
    <Button onClick={handleBuy}>Buy</Button>
  </Card.Footer>
</Card>
```

**Why composition?**

- Flexibility: arrange pieces as needed
- Discoverability: subcomponents are visible
- No boolean explosion from optional features

### The compound component pattern

```tsx
// Define subcomponents
const CardImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="card-image" />
);

const CardTitle = ({ children }) => (
  <h3 className="card-title">{children}</h3>
);

// Attach to main component
export const Card = ({ children }) => (
  <div className="card">{children}</div>
);

Card.Image = CardImage;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;
```

### The render prop pattern

When children need data from parent:

```tsx
<DataFetcher url="/api/users">
  {({ data, isLoading, error }) => (
    isLoading ? <Spinner /> :
    error ? <Error message={error} /> :
    <UserList users={data} />
  )}
</DataFetcher>
```

### The slot pattern

Named slots for specific content areas:

```tsx
interface DialogProps {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}

const Dialog = ({ header, body, footer }: DialogProps) => (
  <div className="dialog">
    <header className="dialog-header">{header}</header>
    <main className="dialog-body">{body}</main>
    {footer && (
      <footer className="dialog-footer">{footer}</footer>
    )}
  </div>
);

// Usage
<Dialog
  header={<h2>Confirm Action</h2>}
  body={<p>Are you sure?</p>}
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </>
  }
/>
```

## UI Primitives

### Using design system primitives

Design systems often provide primitive components. Use them consistently:

```tsx
// Don't: mix primitives with raw elements
<div className="flex gap-4">          {/* Raw div */}
  <Stack gap={4}>                     {/* System primitive */}
    <Text variant="heading">Title</Text>
    <p className="text-gray-500">Subtitle</p>  {/* Raw p */}
  </Stack>
</div>

// Do: use primitives consistently
<Stack gap={4}>
  <Text variant="heading">Title</Text>
  <Text variant="muted">Subtitle</Text>
</Stack>
```

### When to use primitives

| Use primitive when... | Use raw element when... |
|----------------------|-------------------------|
| Semantic meaning is UI-related (layout, text styling) | Semantic meaning is content-related (article, nav, form) |
| Design system provides the primitive | No relevant primitive exists |
| Consistency with design system matters | One-off styling is acceptable |

### Primitive layering

```
Application components
        ↓
Feature components
        ↓
Shared components
        ↓
Design system components
        ↓
UI primitives (Stack, Text, Box)
        ↓
HTML elements
```

Higher layers compose lower layers. Don't skip layers arbitrarily.

## Failure Modes and Prevention

### Failure: Can't find the component

**Convention:** Component name = file name = folder name

```
// Finding UserProfile
components/UserProfile/UserProfile.tsx
```

No guessing. Name is the path.

### Failure: Import breaks after refactor

**Convention:** Export from index.ts, import from folder

```tsx
// Importing
import { Button } from '@/components/Button';

// Internally, Button/Button.tsx can be renamed to Button/index.tsx
// or split into multiple files—import path doesn't change
```

### Failure: Test files scattered everywhere

**Convention:** Tests live next to source

```
Button/
  Button.tsx
  Button.test.tsx   # Right here
```

Not in a separate `__tests__` folder. When you work on Button, you see Button.test.

### Failure: Can't tell what's public API

**Convention:** index.ts exports public API only

```tsx
// Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// Internal helper not exported
// ButtonIcon.tsx exists but isn't exported
```

If it's not in index.ts, it's not public.

### Failure: Naming conflicts

**Convention:** Unique, descriptive names

```tsx
// Bad: generic names that collide
import { Card } from '@/features/products/Card';
import { Card } from '@/features/users/Card';  // Collision!

// Good: namespaced or specific names
import { ProductCard } from '@/features/products/ProductCard';
import { UserCard } from '@/features/users/UserCard';
```

### Failure: Can't understand prop expectations

**Convention:** TypeScript types for all props

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}
```

Types are documentation that can't go stale.

## Enforcing Conventions

### Automated enforcement

Use tooling to enforce conventions:

```json
// ESLint
{
  "rules": {
    "react/jsx-pascal-case": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      { "selector": "variable", "format": ["camelCase", "UPPER_CASE"] },
      { "selector": "function", "format": ["camelCase", "PascalCase"] }
    ]
  }
}

// Prettier (formatting consistency)
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2
}
```

### File structure linting

```json
// eslint-plugin-project-structure or similar
{
  "rules": {
    "project-structure/file-structure": [
      "error",
      {
        "modules": {
          "components": {
            "includes": ["*.tsx"],
            "children": ["index.ts", "*.test.tsx", "*.stories.tsx"]
          }
        }
      }
    ]
  }
}
```

### Documentation

Document conventions in the repository:

```
docs/
  conventions.md      # This document
  architecture.md     # How the codebase is organized
  contributing.md     # How to add new code
```

## How this connects to Bitloops

Conventions only work when every contributor follows them — and new code is where conventions most often break. [Bitloops](https://bitloops.com) generates components that follow your project's conventions from the start: PascalCase component names, colocated file structures (component + test + story in one folder), `index.ts` barrel exports, and feature-based organization. By producing code that already matches your naming, folder, and composition patterns, Bitloops reduces the gap between "how we agreed to write code" and "how code actually gets written," especially when onboarding new contributors or working under time pressure.

---

## Summary

Conventions prevent failure modes. The principles:

| Convention / pattern | Why it exists | What to do in practice | Failure modes it prevents |
|---|---|---|---|
| Component folder per component | Keeps related artifacts colocated and makes components movable as a single unit. | Use `ComponentName/` with `ComponentName.tsx`, `ComponentName.test.tsx`, `ComponentName.stories.tsx`, optional `ComponentName.styles.ts`, plus `index.ts`. | Scattered tests/stories, hard-to-delete components, “where is the story/test?” searches, refactors that miss related files. |
| Name alignment (component = folder = file) | Makes navigation deterministic: the name becomes the path. | Ensure `UserProfile` lives at `components/UserProfile/UserProfile.tsx` (or feature equivalent). Avoid mismatched casing or synonyms. | “Can’t find the component”, duplicate implementations, inconsistent imports, collisions from near-identical names. |
| `index.ts` as the public API boundary | Separates what’s public from what’s internal and stabilizes import paths over time. | Export only supported surface from `ComponentName/index.ts` (component + props types). Import from the folder: `@/components/Button`. | Import breakage on internal refactors, accidental coupling to private modules, unclear “what’s supported.” |
| Feature-based organization (with shared layers) | Keeps related logic together and reduces cross-folder chasing as the app grows. | Prefer `src/features/<feature>/{components,hooks,api,types,index.ts}`; reserve `src/components` for genuinely shared UI. | Tangled dependency graph, “type-based” scavenger hunts, unclear ownership, features that are hard to delete/extract. |
| Predictable file naming by intent | Makes file role obvious at a glance and enables tooling/globbing patterns. | Components: `PascalCase.tsx`; hooks: `useX.ts`; utilities: `camelCase.ts`; tests: `.test.tsx`; stories: `.stories.tsx`. | Confusing imports, inconsistent casing bugs, broken test/story discovery, debates on every new file. |
| Prop naming conventions | Makes component usage guessable and consistent across the codebase. | Events: `onClick/onChange`; boolean state: `disabled/checked` (HTML) or `isLoading/hasError`; values: noun-based (`variant`, `size`, `label`). | Cognitive load, mismatched prop names between components, misuse and bugs that come from ambiguous props. |
| Hook and state naming conventions | Encodes semantics directly in names so dataflow is readable without mental decoding. | Hooks: `useDomainState/useFetchX`; booleans: `is/has/should/can`; arrays: plural nouns; handlers: `handleX`. | Misread logic, unclear intent, inconsistent patterns across teams, harder code reviews. |
| Composition over configuration | Prevents “mega-components” with boolean explosion and brittle conditional branches. | Prefer subcomponents/children composition (`<Card><Card.Header/>…</Card>`) over dozens of props. Add wrappers for recurring compositions. | Inflexible components, hard-to-test variants, undocumented combinations, API bloat and breaking changes. |
| Compound components (when structure is stable) | Provides a clear, discoverable API for assembling consistent layouts. | Use `Card.Image`, `Card.Body`, `Card.Footer` when the internal structure is a known pattern and consumers benefit from guided composition. | Consumers re-implement layouts inconsistently, ad-hoc DOM structures, styling hacks to force layouts. |
| Slots / render props (when customization needs data) | Enables controlled flexibility without exposing internals or adding many props. | Use named slots (`header/body/footer`) for structure; use render props when children need parent-provided data (`{(state) => …}`). | Leaky abstraction, consumers depending on internal markup, too many special-case props. |
| Consistent use of design system primitives | Centralizes spacing/typography/layout decisions and reduces drift. | Use primitives like `Stack/Text/Box` for UI scaffolding; use raw HTML for content semantics (`article/nav/form`). | Mixed styling paradigms, inconsistent spacing/type, duplicated layout utilities, harder theming and audits. |
| Tests live beside source | Keeps verification close to implementation and improves maintainability. | Place `Button.test.tsx` in `Button/` and align test naming to the component file. | Orphaned tests, tests forgotten during refactors, slower onboarding, missed coverage for changed components. |
| Convention enforcement via tooling | Keeps conventions stable over time without relying on memory or code review heroics. | Use ESLint/Prettier for naming/formatting; add structure linting rules for folder/file expectations; document conventions in `docs/`. | Convention drift, recurring PR debates, inconsistent folders, “it depends who wrote it” codebase feel. |

The goal isn't to follow rules for their own sake. It's to make the codebase predictable enough that developers can focus on the actual problem instead of navigating inconsistency.

---

## Further reading

- [Bulletproof React — Alan Alickovic](https://github.com/alan2207/bulletproof-react) — An opinionated, production-grade React project structure covering file organization, feature-based folders, naming conventions, and testing placement; a concrete reference implementation of many patterns in this document.
- [Feature-Sliced Design](https://feature-sliced.design/) — An architectural methodology for organizing frontend projects by features and layers, with clear rules for dependencies and public APIs; directly supports the feature-based organization pattern described here.
- [Scaling React Server-Side Rendering — Shaundai Person (Netlify)](https://www.patterns.dev/react/compound-pattern/) — Covers the compound component pattern and other composition patterns for React, showing how structural conventions enable scalable component APIs.
- [ESLint — Configuring Rules](https://eslint.org/docs/latest/use/configure/rules) — Official reference for automating code conventions with ESLint; essential for enforcing naming, structure, and import conventions described in this document.
- [Prettier — Why Prettier?](https://prettier.io/docs/en/why-prettier) — Explains the philosophy behind opinionated formatting and how automated formatting eliminates style debates, freeing teams to focus on conventions that actually affect architecture.

---

## Frequently Asked Questions (FAQs)

1. **Should I organize by feature or by type (components/, hooks/, utils/)?**
   Feature-first for product code—each feature contains its components, hooks, and utilities together. Type-first only for truly shared code. See [Component Creation Workflows](./component-creation-workflows.md) for when components should be local vs. shared.

2. **What naming convention should I use for component files?**
   PascalCase for component files and exports: `UserProfile.tsx` exports `function UserProfile`. Match filename to export exactly. Use `index.ts` only for re-exports, not as the component file itself. For prop naming, see [Component API Design](./component-api-design.md).

3. **Are barrel files (index.ts re-exports) good or bad?**
   It depends. Good for public APIs (design system packages where you control the interface). Often harmful for application code—they defeat tree-shaking, create circular dependency risks. For performance implications, see [Performance Optimization](../ui-systems-performance/performance-optimization.md).

4. **How do I know if a convention matters or is just preference?**
   Conventions matter if violating them causes: bugs, confusion for new developers, maintenance burden, or failure modes. "Colocate tests with source files" prevents orphaned tests—see [Testing and Storybook](./testing-and-storybook.md) for test organization patterns.

5. **What's the component folder pattern and when should I use it?**
   Each component gets a folder: `ComponentName/ComponentName.tsx`, `ComponentName.test.tsx`, `ComponentName.stories.tsx`, `index.ts`. Use it when components have related files. See [Testing and Storybook](./testing-and-storybook.md) for colocating stories.

6. **How do I prevent naming conflicts across features?**
   Use specific, namespaced names: `ProductCard`, `UserCard` instead of just `Card` in different features. If both features need a generic Card, it belongs in shared components. See [Design System Consumption](./design-system-consumption.md) for design system component naming.

7. **Where should TypeScript types live?**
   Colocate types with the code that uses them when possible. Shared types belong in a central `types/` folder. See [Data Contracts](./data-contracts.md) for organizing data types and [Component API Design](./component-api-design.md) for prop types.

8. **What file structure patterns prevent circular dependencies?**
   Layered architecture: higher layers import from lower, never the reverse. Features don't import from each other—shared code lives in a common layer. See [Data Contracts](./data-contracts.md) for keeping mapping layers independent.

9. **How do I enforce conventions across a team?**
   Multiple layers: (1) ESLint/Prettier for automated enforcement, (2) documented conventions in the repository, (3) code review checklist, (4) file structure linting. See [Design System Consumption](./design-system-consumption.md) for linting design token usage.

10. **What happens when conventions conflict with rapid development?**
    Conventions save time in the long run but can slow initial development. For rapid prototyping: relax conventions temporarily but schedule cleanup. See [Testing and Storybook](./testing-and-storybook.md) for how stories can capture intended patterns even during rapid development.

---

*Build codebases that are predictable to navigate. Start building with [Bitloops](https://bitloops.com).*