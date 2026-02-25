# SEO Metadata Recommendations: Titles, Descriptions, Keywords & FAQs

**Purpose:** Comprehensive SEO improvements for all 20 documents across Best Practices and UI Systems Performance series.

---

### 3. component-api-design.md

**Current Title:** "Component API Design"

**Suggested Title:** "React Component API Design: Props as Contracts, Variants, and Stable Interfaces"

**Current Description:** "Props are contracts. Learn how to design component APIs that are semantic, stable, and evolvable—without boolean explosion or breaking changes."

**Suggested Description:** "Design React component APIs that don't break. Learn semantic props vs. mechanical props, variant patterns, boolean explosion prevention, and stable interface evolution."

**Current Keywords:**
```
component api, props design, react props, component interface, typescript props, component contracts, api stability
```

**Suggested Keywords:**
```
react component api design,
props best practices react,
component interface design,
boolean prop explosion,
react component variants,
typescript component props,
stable component api,
semantic vs mechanical props
```

*

---

### 4. data-contracts.md

**Current Title:** "Data Contracts and Content Boundaries"

**Suggested Title:** "Frontend Data Contracts: API Boundaries, Mapping Layers, and Schema Ownership"

**Current Description:** "Where does data responsibility live? Learn how to design boundaries between CMS, backend, and frontend—with clear contracts, mapping layers, and validation strategies."

**Suggested Description:** "Who owns the data shape—API, CMS, or component? Learn mapping layers, validation boundaries, and contracts that prevent backend changes from breaking your UI."

**Current Keywords:**
```
data contracts, content boundaries, api contracts, cms integration, data mapping, frontend data, schema validation
```

**Suggested Keywords:**
```
frontend data contracts,
api response mapping react,
cms frontend integration,
typescript api validation,
zod schema validation,
backend frontend contract,
data transformation layer,
api schema ownership
```

**Suggested FAQs:**

1. **Should components consume API responses directly?**
   No. Add a mapping layer that transforms API responses into the shape components expect. This isolates components from backend changes: when the API returns `price_cents`, map it to `formattedPrice: "$29.99"` before it reaches components. See [Component API Design](./component-api-design.md) for how component props should be designed around this mapped data.

2. **Where should data validation happen—frontend or backend?**
   Both, for different reasons. Backend validates for security and data integrity (never trust client input—see [Security Boundaries](../ui-systems-performance/security-boundaries.md)). Frontend validates for UX (immediate feedback) and to fail fast on unexpected response shapes. Use tools like Zod for runtime validation at API boundaries.

3. **How do I handle API schema changes without breaking the UI?**
   The mapping layer absorbs changes. When the API renames `user_name` to `username`, update the mapper once—not every component that displays names. See [Codebase Conventions](./codebase-conventions.md) for organizing mapping layers alongside features.

4. **What's the difference between a data contract and a TypeScript type?**
   TypeScript types are compile-time checks—they verify your code is internally consistent. Data contracts are runtime agreements about what shape data actually arrives in. Use both: types for development, runtime validation for production. For related type patterns, see [Component API Design](./component-api-design.md).

5. **Who owns the contract—frontend or backend?**
   Ideally, contracts are shared artifacts (OpenAPI specs, GraphQL schemas) that both sides agree to. In practice, the backend usually defines the API and frontend adapts. See [Network Protocols](../ui-systems-performance/network-protocols.md) for HTTP contract patterns.

6. **How do I handle optional or missing fields from the API?**
   Define defaults in the mapping layer, not scattered across components. If `user.avatarUrl` might be null, the mapper provides a default: `avatarUrl: user.avatarUrl ?? DEFAULT_AVATAR`. Components can assume the shape is complete. See [Component API Design](./component-api-design.md) for handling optional props.

7. **What's the right granularity for data contracts?**
   Match contracts to domain concepts, not API endpoints. A "Product" contract includes everything components need to render a product, regardless of whether it comes from one endpoint or three. For caching these aggregated shapes, see [Caching Strategies](../ui-systems-performance/caching-strategies.md).

8. **How do I version data contracts?**
   When contracts must change, support both versions temporarily: the mapping layer accepts v1 or v2 from the API and normalizes to the component's expected shape. Deprecate old versions with deadlines. For similar versioning patterns with component APIs, see [Component API Design](./component-api-design.md).

9. **Should I use GraphQL to avoid mapping layers?**
   GraphQL reduces the need for mapping by letting frontend request exact shapes. But you still need validation and transformation. For caching GraphQL responses, see [Caching Strategies](../ui-systems-performance/caching-strategies.md). GraphQL is better DX, not a replacement for data boundaries.

10. **How do I test data contracts?**
    Test the mapping layer with fixtures: given this API response, verify the output shape. Test that validation rejects malformed responses. See [Testing and Storybook](./testing-and-storybook.md) for how story fixtures should reflect these mapped data shapes.

---

### 5. design-system-consumption.md

**Current Title:** "Design System Consumption"

**Suggested Title:** "Using Design Systems Correctly: Tokens, Constraints, and Preventing Drift"

**Current Description:** "Design systems provide tokens and constraints. Learn the rules for consuming them: what's allowed, what's forbidden, and how limitation enables scale."

**Suggested Description:** "Design systems fail when developers bypass them. Learn token-only styling, the forbidden list, escape hatch friction, and how to prevent design drift at scale."

**Current Keywords:**
```
design systems, design tokens, tailwind tokens, css variables, theming, design constraints, style consistency
```

**Suggested Keywords:**
```
design system consumption rules,
design tokens best practices,
preventing design system drift,
tailwind design system,
css custom properties tokens,
design system constraints,
token only styling,
design system governance
```

**Suggested FAQs:**

1. **When is it okay to use arbitrary values instead of design tokens?**
   Almost never in production code. Acceptable exceptions: one-off decorative elements (marketing hero positioning), third-party integration constraints (external widget dimensions), or rapid prototyping before tokens exist. Always document why. If you need a value frequently, request a token. See [Responsive Behavior](./responsive-behavior.md) for when fluid values are appropriate.

2. **How do I prevent developers from bypassing the design system?**
   Multiple layers: (1) constrain component APIs—don't expose `className` (see [Component API Design](./component-api-design.md)), (2) add linting rules for arbitrary Tailwind values, (3) make escape hatches explicit (`__unsafeClassName`), (4) review PRs for token compliance, (5) audit quarterly for drift. See [Codebase Conventions](./codebase-conventions.md) for enforcement patterns.

3. **What's the difference between extending and bypassing a design system?**
   Extending adds new tokens, components, or variants through the system's governance process—it's intentional, documented, and reviewed. Bypassing hardcodes values outside the system—it's hidden, undocumented, and erodes consistency. See [Component Creation Workflows](./component-creation-workflows.md) for when to create new components vs. extend existing ones.

4. **Should I use `!important` to override design system styles?**
   No. If you need `!important`, you're fighting the system instead of using it. Either the system needs a new variant (see [Component API Design](./component-api-design.md)), or you're using the wrong component. File an issue requesting what you need rather than forcing overrides.

5. **How do I handle cases where design tokens don't exist for my use case?**
   Follow the fallback hierarchy: (1) verify the token doesn't exist, (2) use the nearest existing token, (3) request a new token if the need is recurring, (4) document the exception if you must use an arbitrary value temporarily. See [Codebase Conventions](./codebase-conventions.md) for documenting exceptions.

6. **What's token-only styling and why does it matter?**
   Token-only styling means using design system values (colors, spacing, typography) exclusively—never hardcoded hex values or pixel measurements. Tokens adapt to themes (dark mode) and can be audited. See [Responsive Behavior](./responsive-behavior.md) for how tokens work with responsive design.

7. **How do themes interact with design system consumption?**
   Themes redefine token values, not component structure. If you use `bg-primary`, the theme defines what "primary" means in each context. Semantic tokens (`bg-background`, `text-muted`) are theme-safe. For accessibility considerations in theming, see [Accessibility](./accessibility.md).

8. **How do I create recurring patterns without violating the design system?**
   Create wrapper components that compose system primitives correctly. If you often use `Button` + `Tooltip` + specific icon sizing, create an `IconButton` wrapper. See [Component Creation Workflows](./component-creation-workflows.md) for when to extract wrapper components.

9. **What are the costs of design system drift?**
   Drift compounds: inconsistent appearance, inconsistent behavior, theme failures, and accessibility gaps (see [Accessibility](./accessibility.md)). Custom components often miss accessibility features that system components provide. See [Testing and Storybook](./testing-and-storybook.md) for catching drift through visual regression testing.

10. **How do I audit a codebase for design system compliance?**
    Search for: arbitrary values in Tailwind (`text-[`, `bg-[`), `!important` usages, inline `style` props, components that duplicate system functionality. See [Codebase Conventions](./codebase-conventions.md) for establishing linting and review processes that catch drift early.

---

### 6. responsive-behavior.md

**Current Title:** "Responsive Behavior"

**Suggested Title:** "Responsive Design Systems: Fluid Typography, Breakpoint Strategy, and Adaptive Images"

**Current Description:** "Responsiveness isn't about breakpoints—it's about strategy. Learn fluid vs. stepped approaches, and how to unify typography, spacing, and images into a coherent responsive system."

**Suggested Description:** "Stop adding breakpoints at random. Learn fluid vs. stepped responsive strategies, clamp() typography, srcset images, and when breakpoints actually matter."

**Current Keywords:**
```
responsive design, breakpoints, fluid design, responsive typography, responsive images, tailwind responsive, mobile-first
```

**Suggested Keywords:**
```
responsive design strategy,
fluid typography clamp,
tailwind breakpoints best practices,
mobile first css,
responsive images srcset sizes,
css container queries,
responsive spacing system,
breakpoint strategy frontend
```

**Suggested FAQs:**

1. **How many breakpoints do I actually need?**
   Most layouts need 1-2 meaningful breakpoints, not 5. Add breakpoints only when layout structure genuinely changes (single column to multi-column, navigation collapse). Don't add breakpoints for minor spacing tweaks. See [Component Creation Workflows](./component-creation-workflows.md) for keeping component complexity manageable.

2. **When should I use fluid typography with clamp()?**
   Use `clamp()` for headings and display text where smooth scaling improves visual rhythm across viewports. Keep body text and UI elements (buttons, labels) at fixed sizes for consistent readability and touch targets—especially important for [Accessibility](./accessibility.md).

3. **What's the difference between fluid and stepped responsive design?**
   Fluid: values scale continuously with viewport (using vw units, clamp()). Stepped: values jump at specific breakpoints. Most production systems are hybrid—fluid typography within ranges, stepped layout changes at major breakpoints. See [Design System Consumption](./design-system-consumption.md) for token-based approaches.

4. **Should I use mobile-first or desktop-first CSS?**
   Mobile-first for most projects—it forces content prioritization and aligns with Tailwind's default modifiers (`sm:`, `md:`, `lg:` add styles as viewport grows). Desktop-first only if 70%+ of your audience uses desktop. For layout shift concerns, see [Performance Optimization](../ui-systems-performance/performance-optimization.md).

5. **How do I handle responsive images correctly?**
   Use `srcset` and `sizes` for resolution switching (same image, different file sizes for different viewports). Use `<picture>` for art direction. Always include `width` and `height` attributes to prevent layout shift (CLS). See [Performance Optimization](../ui-systems-performance/performance-optimization.md) for image performance patterns.

6. **When do breakpoints actually matter vs. being unnecessary?**
   Breakpoints matter when: layout fundamentally restructures (sidebar becomes bottom nav), content reorganizes (tabs become accordion), or interaction patterns change (hover becomes tap). For accessibility of these pattern changes, see [Accessibility](./accessibility.md).

7. **How do I test responsive behavior effectively?**
   Test at edge viewports (320px, 375px, 768px, 1024px, 1440px) and between breakpoints (767px and 769px often reveal bugs). For visual regression testing across viewports, see [Testing and Storybook](./testing-and-storybook.md). For production monitoring, see [Observability](../ui-systems-performance/observability.md).

8. **Should spacing be fluid or use fixed tokens?**
   Fixed tokens for component-internal spacing (padding, gaps)—these need consistent rhythm and touch targets. Viewport-relative or stepped spacing for section-level spacing. See [Design System Consumption](./design-system-consumption.md) for token-only styling patterns.

9. **How do container queries change responsive design?**
   Container queries let components respond to their container's size, not the viewport. This enables truly reusable components—a Card can adapt based on whether it's in a sidebar or main content. See [Component Creation Workflows](./component-creation-workflows.md) for component reusability patterns.

10. **What's the "breakpoint trap" and how do I avoid it?**
    The trap: adding `sm:`, `md:`, `lg:`, `xl:` variants to every property because breakpoints exist. Avoid it by: using fluid values where appropriate, questioning whether each breakpoint variant is necessary. See [Codebase Conventions](./codebase-conventions.md) for establishing responsive design conventions.

---

### 7. accessibility.md

**Current Title:** "Accessibility"

**Suggested Title:** "Accessible React Components: Semantic HTML, ARIA Patterns, and Keyboard Navigation"

**Current Description:** "Accessible components aren't an afterthought—they're a byproduct of good structure. Learn semantic HTML, ARIA patterns, keyboard navigation, and focus management."

**Suggested Description:** "Accessibility isn't a checklist—it's architecture. Learn semantic HTML defaults, ARIA patterns, keyboard navigation, and focus management for React components."

**Current Keywords:**
```
accessibility, a11y, aria, semantic html, keyboard navigation, focus management, screen readers
```

**Suggested Keywords:**
```
react accessibility best practices,
semantic html components,
aria attributes react,
keyboard navigation react,
focus management react,
accessible component library,
screen reader testing,
wcag react components
```

**Suggested FAQs:**

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

### 8. codebase-conventions.md

**Current Title:** "Codebase Conventions"

**Suggested Title:** "Frontend Codebase Conventions: File Structure, Naming, and Patterns That Scale"

**Current Description:** "Conventions aren't preferences—they're constraints that prevent failure modes. Learn file structure, naming patterns, and composition rules that scale."

**Suggested Description:** "Conventions prevent failure modes, not just enforce style. Learn file structure, naming patterns, barrel exports, and composition rules that scale across teams."

**Current Keywords:**
```
codebase conventions, file structure, naming conventions, code organization, frontend architecture, component organization, project structure
```

**Suggested Keywords:**
```
react project structure,
frontend file organization,
component naming conventions,
barrel exports typescript,
feature folder structure,
react codebase architecture,
monorepo component organization,
frontend code conventions
```

**Suggested FAQs:**

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

### 9. testing-and-storybook.md

**Current Title:** "Testing and Storybook Contracts"

**Suggested Title:** "Storybook as a Contract Layer: Fixtures, Visual Testing, and Executable Specifications"

**Current Description:** "Stories aren't just visual documentation—they're executable contracts. Learn how to use Storybook as a verification layer with deterministic fixtures and clear data boundaries."

**Suggested Description:** "Stories aren't documentation—they're contracts. Learn deterministic fixtures, visual regression testing, and how Storybook becomes your component verification layer."

**Current Keywords:**
```
storybook, component testing, visual testing, fixtures, test contracts, frontend testing, react storybook
```

**Suggested Keywords:**
```
storybook testing best practices,
visual regression testing storybook,
storybook fixtures patterns,
component story format csf,
chromatic visual testing,
storybook interaction testing,
deterministic test data,
storybook as documentation
```

**Suggested FAQs:**

1. **What's the difference between stories and unit tests?**
   Stories verify visual output and behavior for specific prop combinations—they're executable specifications of "what this looks like." Unit tests verify logic and edge cases programmatically. For component logic that needs unit testing, see how [Data Contracts](./data-contracts.md) recommends testing mapping layers.

2. **Should I use random data (faker) in Storybook fixtures?**
   No for production stories. Random data breaks visual regression tests, makes debugging harder, and prevents reproducibility. Use deterministic fixtures with factory functions. See [Data Contracts](./data-contracts.md) for how fixtures should mirror real data shapes.

3. **How do I create deterministic fixtures for stories?**
   Create factory functions: `const mockUser = (overrides = {}) => ({ id: 'user-1', name: 'Jane Smith', avatar: '/fixtures/avatar.png', ...overrides })`. See [Codebase Conventions](./codebase-conventions.md) for organizing fixtures alongside components.

4. **How many stories should each component have?**
   Cover: (1) default/primary state, (2) all visual variants (see [Component API Design](./component-api-design.md)), (3) key interactive states (loading, error, empty), (4) edge cases (long text, missing optional data). Focus on states users actually encounter.

5. **How do I test user interactions in Storybook?**
   Use the `play` function with `@storybook/testing-library`. Test keyboard interactions for [Accessibility](./accessibility.md). Write interactions that click, type, and assert—these run automatically and catch behavior regressions.

6. **When should I use Chromatic vs. local Storybook testing?**
   Local Storybook for development iteration—see changes immediately. Chromatic (or Percy) for CI visual regression testing. For production monitoring beyond CI, see [Observability](../ui-systems-performance/observability.md).

7. **What's the relationship between stories and data contracts?**
   Story fixtures should reflect real data shapes—the post-mapping shape that components actually receive. See [Data Contracts](./data-contracts.md) for mapping layer patterns. Stories test the component contract, not the API contract.

8. **How do I organize stories for complex components?**
   Group by category: Primary use cases first, then states (loading, error, disabled), then sizes/variants, then edge cases. See [Codebase Conventions](./codebase-conventions.md) for file organization patterns.

9. **Should stories be documentation or tests?**
   Both. Stories document supported states and verify those states remain stable. The shift from "documentation mindset" to "contract mindset" is key. See [Component API Design](./component-api-design.md) for how stories demonstrate the component's API contract.

10. **How do I prevent stories from becoming stale?**
    Keep stories close to components (see [Codebase Conventions](./codebase-conventions.md) for colocation patterns). Use TypeScript for story args so prop changes surface in stories. See [Accessibility](./accessibility.md) for accessibility checks that should run on every story.

---

## UI Systems Performance Series (11 Documents)

---

### 1. introduction.md

**Current Title:** "System Design & Architecture: An Introduction"

**Suggested Title:** "Frontend Systems Design: Distributed Systems Thinking for Web Applications"

**Current Description:** "A 10-part series that reframes frontend development through a systems design lens, covering state management, caching, performance, security, and more."

**Suggested Description:** "Frontend apps are distributed systems. This 10-part series covers state replication, caching, async patterns, security, and performance from a systems design perspective."

**Current Keywords:**
```
frontend systems design, distributed systems, frontend architecture, systems thinking, web development, system design
```

**Suggested Keywords:**
```
frontend systems design,
distributed systems frontend,
frontend architecture patterns,
web application architecture,
systems thinking javascript,
frontend system design interview,
browser as distributed system,
frontend engineering principles
```

**Suggested FAQs:**

1. **Why should frontend developers learn systems design?**
   The browser is a distributed system—it replicates server data, handles network partitions (offline mode), and resolves conflicts when state diverges. See [State Management at Scale](./state-management-at-scale.md) for replication patterns and [Consistency and Failure Handling](./consistency-and-failure-handling.md) for offline-first architecture.

2. **How is frontend systems design different from backend?**
   Same problems, different constraints. Backend optimizes for throughput and correctness. Frontend must optimize for correctness under perception and latency—see [Human Perception](./human-perception.md) for why a 500ms block feels broken even when metrics are "acceptable."

3. **Is this series for junior or senior developers?**
   Both benefit differently. Juniors get mental models for concepts they're already using ([State Management](./state-management-at-scale.md), [Caching](./caching-strategies.md), [Async Operations](./asynchronous-operations.md)). Seniors get a structured framework for trade-offs they've learned through experience.

4. **Do I need to read the series in order?**
   The series builds progressively, with [Human Perception](./human-perception.md) as the capstone. But each document stands alone. Start with your current pain point: async bugs → [Asynchronous Operations](./asynchronous-operations.md), performance → [Performance Optimization](./performance-optimization.md).

5. **What's the "perception gap" mentioned in the introduction?**
   The gap between technical metrics (LCP 2.5s, API 200ms) and user experience ("this feels sluggish"). See [Human Perception](./human-perception.md) for perception budgets and [Observability](./observability.md) for measuring what users actually experience.

6. **How do these concepts apply to my specific framework (React, Vue, Svelte)?**
   The systems concepts—state replication, caching, failure handling—are framework-agnostic. For framework-specific component patterns, see the [Best Practices series](../best-practices/introduction.md) which covers React examples that apply to any component model.

7. **Is this relevant for simple websites or only complex web apps?**
   Even simple sites face these issues: caching decisions (see [Caching Strategies](./caching-strategies.md)), loading states (see [Human Perception](./human-perception.md)), error handling (see [Consistency and Failure Handling](./consistency-and-failure-handling.md)). The principles apply universally.

8. **How does this relate to backend system design interviews?**
   Frontend system design is increasingly part of technical interviews. Understanding replication (see [State Management](./state-management-at-scale.md)), caching (see [Caching Strategies](./caching-strategies.md)), and failure handling prepares you for these discussions with frontend-specific depth.

9. **What tools or libraries implement these concepts?**
   TanStack Query implements caching and revalidation patterns (see [Caching Strategies](./caching-strategies.md)). Zustand/Redux implement state management (see [State Management at Scale](./state-management-at-scale.md)). Understanding the underlying concepts helps you use these tools correctly.

10. **How does Bitloops relate to these systems concepts?**
    Bitloops generates code that applies these concepts by default: proper loading states (see [Human Perception](./human-perception.md)), data contracts (see [Data Contracts](../best-practices/data-contracts.md)), accessible components (see [Accessibility](../best-practices/accessibility.md)).

---

### 2. state-management-at-scale.md

**Current Title:** "State Management at Scale"

**Suggested Title:** "State Management as Replication: Sources of Truth, Sync, and Conflict Resolution"

**Current Description:** "Understanding state management as replication design - keeping client replicas synchronized with server sources of truth."

**Suggested Description:** "State management isn't Redux vs. Zustand—it's replication design. Learn sources of truth, client-server sync, cross-tab coordination, and conflict resolution patterns."

**Current Keywords:**
```
state management, redux, zustand, react state, global state, state synchronization, frontend state
```

**Suggested Keywords:**
```
react state management patterns,
frontend state architecture,
client server state sync,
zustand vs redux vs tanstack query,
cross tab state synchronization,
state replication frontend,
optimistic state updates,
source of truth frontend
```

**Suggested FAQs:**

1. **What are the four sources of truth in frontend applications?**
   (1) Server: authoritative data (user profile, products). (2) URL: navigation state, shareable app state. (3) Local Storage/IndexedDB: persisted client state. (4) Memory: transient UI state. For caching server state, see [Caching Strategies](./caching-strategies.md). For offline persistence, see [Consistency and Failure Handling](./consistency-and-failure-handling.md).

2. **What's the difference between server state and client state?**
   Server state needs synchronization (user data, products, orders)—see [Caching Strategies](./caching-strategies.md). Client state is UI-only (modal visibility, accordion expansion). For how this affects component design, see [Component API Design](../best-practices/component-api-design.md).

3. **When should I use Redux vs. Zustand vs. TanStack Query?**
   TanStack Query (or SWR) for server state—see [Caching Strategies](./caching-strategies.md) for caching patterns. Zustand or Redux for complex client state. useState/useReducer for local component state. Most apps need all three patterns, not one "winner."

4. **How do I keep state synchronized across browser tabs?**
   Use BroadcastChannel API (modern) or localStorage events (legacy) for cross-tab communication. Critical for: auth state (see [Security Boundaries](./security-boundaries.md)), cart/selection state, real-time data. Don't sync everything—only state users expect to be consistent.

5. **What is "state tearing" and how do I prevent it?**
   State tearing occurs when a React render uses inconsistent state because an external store updated mid-render. `useSyncExternalStore` (React 18+) solves this. For related async state issues, see [Asynchronous Operations](./asynchronous-operations.md).

6. **What's the difference between optimistic updates and server state caching?**
   Caching stores server responses for later reuse (see [Caching Strategies](./caching-strategies.md)). Optimistic updates show expected results before confirmation (see [Consistency and Failure Handling](./consistency-and-failure-handling.md) for when to use optimistic vs. pessimistic patterns).

7. **How do I handle conflicts when local and server state diverge?**
   Strategies: last-write-wins, server-authoritative, merge, or user-mediated conflict UI. See [Consistency and Failure Handling](./consistency-and-failure-handling.md) for reconciliation strategies and [Human Perception](./human-perception.md) for communicating conflicts to users.

8. **When should state live in the URL vs. in memory?**
   URL state for: navigation, shareable application state (search filters, pagination). Memory for: transient UI state. For performance implications of URL state, see [Performance Optimization](./performance-optimization.md).

9. **How do I debug state management issues?**
   Use dev tools: Redux DevTools, React DevTools, TanStack Query DevTools. Log state transitions. For production debugging, see [Observability](./observability.md) for correlation IDs and distributed tracing.

10. **What causes "stale closure" bugs in state management?**
    Closures capture state values at creation time. Related: race conditions in async operations—see [Asynchronous Operations](./asynchronous-operations.md) for commit guards and request cancellation patterns that prevent stale data issues.

---

### 3. caching-strategies.md

**Current Title:** "Caching Strategies"

**Suggested Title:** "Frontend Caching: Browser Cache Stack, Invalidation Strategies, and Security Boundaries"

**Current Description:** "Cache lifecycle design - understanding when stale data is acceptable, invalidation strategies, and cache layers in frontend applications."

**Suggested Description:** "Every cache is a bet. Learn the browser cache stack (memory, HTTP, Service Worker, CDN), stale-while-revalidate, cache invalidation, and security implications."

**Current Keywords:**
```
caching, cache invalidation, http cache, service worker cache, frontend caching, stale while revalidate, cache strategies
```

**Suggested Keywords:**
```
frontend caching strategy,
browser cache explained,
stale while revalidate pattern,
service worker cache api,
http cache headers frontend,
cache invalidation strategies,
tanstack query cache,
indexeddb caching patterns
```

**Suggested FAQs:**

1. **What are the layers of the browser cache stack?**
   From fastest to slowest: (1) Memory/application cache. (2) HTTP cache. (3) Service Worker cache. (4) CDN/edge cache (see [Distributed Systems](./distributed-systems.md)). (5) Origin server. Each layer trades freshness for speed. For HTTP headers, see [Network Protocols](./network-protocols.md).

2. **What's the difference between no-cache and no-store?**
   `no-cache`: browser can store but must revalidate. `no-store`: browser must not store at all. Use `no-store` for sensitive data—see [Security Boundaries](./security-boundaries.md) for token storage patterns. For header syntax, see [Network Protocols](./network-protocols.md).

3. **When should I use stale-while-revalidate?**
   When showing slightly stale data is acceptable while fetching fresh data in background. For user-facing implications, see [Human Perception](./human-perception.md) for how staleness affects perceived performance. Bad for: inventory counts, prices at checkout.

4. **How do I invalidate cached data when it changes?**
   Strategies: (1) Time-based (TTL). (2) Event-based via WebSocket/SSE—see [Network Protocols](./network-protocols.md). (3) Version-based URLs—see [Distributed Systems](./distributed-systems.md) for CDN invalidation. Choose based on freshness requirements.

5. **Should I cache API responses in JavaScript or rely on HTTP cache?**
   Both—they're complementary. HTTP cache handles the network layer (see [Network Protocols](./network-protocols.md)). JavaScript cache (TanStack Query, SWR) handles application layer. For state management integration, see [State Management at Scale](./state-management-at-scale.md).

6. **What are the security risks of caching?**
   Major risks: caching authenticated responses, sensitive data persisting after logout, cross-user data leakage. See [Security Boundaries](./security-boundaries.md) for token storage and [Distributed Systems](./distributed-systems.md) for CDN security considerations.

7. **How does cache invalidation work with immutable assets?**
   Immutable assets (JS, CSS with content hashes) can be cached forever (`max-age=31536000, immutable`). When content changes, the filename changes. For bundle optimization, see [Performance Optimization](./performance-optimization.md).

8. **What's cache key fragmentation and why does it matter?**
   Cache keys determine what's cached separately. Too many key factors fragment the cache—low hit rates, high storage. See [Distributed Systems](./distributed-systems.md) for CDN cache key design.

9. **How do I cache for offline support?**
   Service Worker + Cache API for static assets and API responses. IndexedDB for structured data. See [Consistency and Failure Handling](./consistency-and-failure-handling.md) for offline-first architecture patterns.

10. **What's the cost model for caching decisions?**
    Every cache is a bet: cost of serving stale data vs. cost of fetching fresh data. For how staleness affects user experience, see [Human Perception](./human-perception.md). For measuring cache effectiveness, see [Observability](./observability.md).

---

### 4. asynchronous-operations.md

**Current Title:** "Asynchronous Operations"

**Suggested Title:** "Async Operations in React: Race Conditions, Cancellation, and Commit Guards"

**Current Description:** "Handling race conditions, operation scopes, and commit guards to prevent async bugs in frontend applications."

**Suggested Description:** "Async bugs are state bugs—stale results overwriting fresh data. Learn operation scopes, commit guards, request cancellation, and deduplication patterns."

**Current Keywords:**
```
async operations, race conditions, abort controller, async state, promises, concurrent requests, async patterns
```

**Suggested Keywords:**
```
react race condition fix,
abort controller react,
async state management,
request deduplication pattern,
stale closure react,
cancel fetch request,
async operation lifecycle,
concurrent request handling
```

**Suggested FAQs:**

1. **What causes race conditions in React components?**
   Race conditions occur when async operations complete in different order than they started. User types "abc", then "ab"—if the "abc" search returns after "ab", you display wrong results. Related: [State Management at Scale](./state-management-at-scale.md) for state consistency patterns.

2. **How do I cancel fetch requests when a component unmounts?**
   Use AbortController: create a controller, pass its signal to fetch, call controller.abort() in useEffect cleanup. For fetch patterns and timeouts, see [Network Protocols](./network-protocols.md).

3. **What's a commit guard and when do I need one?**
   A commit guard verifies that an async result is still relevant before applying it to state. Compare request timestamps, version numbers, or request IDs. Related: [Consistency and Failure Handling](./consistency-and-failure-handling.md) for version-based conflict resolution.

4. **How do I deduplicate identical API requests?**
   Store pending promises by request key. If a request with the same key is already in flight, return the existing promise. TanStack Query and SWR do this automatically—see [Caching Strategies](./caching-strategies.md) for application-level caching patterns.

5. **What's the difference between cancellation and ignoring stale results?**
   Cancellation (AbortController) stops the network request—saves bandwidth, frees connections. Ignoring just discards results client-side. For network cost considerations, see [Performance Optimization](./performance-optimization.md).

6. **How do I handle dependent async operations (A must complete before B)?**
   Use async/await for sequential operations. For complex dependency chains, consider state machines (XState). For perceived performance during multi-step operations, see [Human Perception](./human-perception.md).

7. **What are operation scopes and why do they matter?**
   Operation scope is the context in which an async result is valid. A search result is scoped to the query that produced it. When scope changes, results from old scope should be discarded. Related: [State Management at Scale](./state-management-at-scale.md) for sources of truth.

8. **How do I implement retry with exponential backoff?**
   On failure, wait before retrying: delay = baseDelay * 2^attempt + random jitter. Only retry transient failures (5xx, network errors)—see [Network Protocols](./network-protocols.md) for which HTTP errors are retryable.

9. **What's the difference between throttling and debouncing?**
   Throttle: execute at most once per interval (rate limiting). Debounce: execute only after activity stops for an interval. For how this affects perceived responsiveness, see [Human Perception](./human-perception.md).

10. **How do I debug async state corruption?**
    Add logging with timestamps and operation IDs. For production debugging, see [Observability](./observability.md) for correlation IDs and distributed tracing that connects frontend operations to backend requests.

---

### 5. performance-optimization.md

**Current Title:** "Performance Optimization"

**Suggested Title:** "Frontend Performance: Core Web Vitals, Critical Path, and Resource Optimization"

**Current Description:** "Resource allocation under constraints - shipping less, scheduling better, and rendering less for optimal frontend performance."

**Suggested Description:** "Performance is a constraint, not a feature. Learn the critical rendering path, Core Web Vitals optimization, bundle splitting, and rendering performance patterns."

**Current Keywords:**
```
performance, core web vitals, lcp, inp, cls, bundle size, rendering performance, frontend optimization
```

**Suggested Keywords:**
```
frontend performance optimization,
core web vitals optimization,
react performance best practices,
javascript bundle size reduction,
largest contentful paint improve,
interaction to next paint fix,
cumulative layout shift prevent,
critical rendering path
```

**Suggested FAQs:**

1. **What are Core Web Vitals and what scores should I target?**
   LCP (Largest Contentful Paint): < 2.5s measures loading. INP (Interaction to Next Paint): < 200ms measures interactivity. CLS (Cumulative Layout Shift): < 0.1 measures visual stability. For monitoring these in production, see [Observability](./observability.md). For how metrics relate to user experience, see [Human Perception](./human-perception.md).

2. **What's the critical rendering path and why does it matter?**
   The sequence of steps before the first pixel: HTML parsing → DOM, CSS parsing → CSSOM, JavaScript execution, render tree → layout → paint. For CDN delivery optimization, see [Distributed Systems](./distributed-systems.md). For network layer details, see [Network Protocols](./network-protocols.md).

3. **How do I reduce my JavaScript bundle size?**
   Strategies: code splitting with dynamic imports, tree shaking, analyze with webpack-bundle-analyzer. For how bundle size affects loading experience, see [Human Perception](./human-perception.md). For caching strategies for static assets, see [Caching Strategies](./caching-strategies.md).

4. **What causes layout shift (CLS) and how do I fix it?**
   Causes: images without dimensions, fonts that swap and resize, dynamically injected content. For responsive image patterns, see [Responsive Behavior](../best-practices/responsive-behavior.md). Layout stability directly affects perceived performance—see [Human Perception](./human-perception.md).

5. **What's the difference between lab and field performance metrics?**
   Lab metrics: controlled synthetic tests (Lighthouse). Field metrics: real users on real devices (RUM). See [Observability](./observability.md) for RUM implementation. They often differ significantly—optimize for field, gate on lab.

6. **Should I use React.memo and useMemo everywhere?**
   No. Memoization has overhead. Use when: component re-renders frequently with same props, computation is genuinely expensive, you've profiled and confirmed the benefit. For state management patterns that reduce unnecessary renders, see [State Management at Scale](./state-management-at-scale.md).

7. **How do I optimize images for performance?**
   Use modern formats (WebP, AVIF). Serve appropriate sizes with srcset/sizes—see [Responsive Behavior](../best-practices/responsive-behavior.md). Lazy load below-fold images. Use `fetchpriority="high"` for LCP images. Consider blur placeholders for perceived performance—see [Human Perception](./human-perception.md).

8. **What's the performance pipeline model?**
   Five stages: Delivery (see [Network Protocols](./network-protocols.md)), Boot, Render, Interact, Update. Every optimization maps to a stage. Ship less (delivery), schedule better (boot), render less (render/update). For CDN optimization of delivery, see [Distributed Systems](./distributed-systems.md).

9. **How do I set performance budgets?**
   Derive from constraints: target device, target network, target UX (LCP < 2.5s). Convert to byte budgets. Enforce in CI. For monitoring budget adherence in production, see [Observability](./observability.md). For perception thresholds, see [Human Perception](./human-perception.md).

10. **What's the most common performance mistake in React apps?**
    Over-fetching and under-caching. See [Caching Strategies](./caching-strategies.md) for proper caching patterns. See [Asynchronous Operations](./asynchronous-operations.md) for request deduplication. Profile before optimizing render performance.

---

### 6. distributed-systems.md

**Current Title:** "Distributed Systems (CDNs & Edge)"

**Suggested Title:** "Edge Computing for Frontend: CDN Architecture, Cache Keys, and Execution Location"

**Current Description:** "Understanding edge computing, CDN architecture, and where code should execute for optimal latency and user experience."

**Suggested Description:** "Where should code execute—client, edge, or origin? Learn CDN cache architecture, cache key design, edge computing patterns, and latency optimization."

**Current Keywords:**
```
cdn, edge computing, distributed systems, cache invalidation, edge functions, latency optimization, content delivery
```

**Suggested Keywords:**
```
cdn caching frontend,
edge computing patterns,
vercel edge functions,
cloudflare workers frontend,
cdn cache key design,
origin shield cdn,
edge vs serverless,
global latency optimization
```

**Suggested FAQs:**

1. **What's the execution spectrum: client vs. edge vs. origin?**
   Client (browser): zero network latency, full browser APIs. Edge (CDN PoP): 10-50ms latency, limited runtime. Origin (your server): 50-300ms+ latency, full capabilities. For network layer details, see [Network Protocols](./network-protocols.md). For client-side state, see [State Management at Scale](./state-management-at-scale.md).

2. **What's the difference between edge functions and serverless functions?**
   Edge functions run at CDN nodes globally (low latency, constrained runtime). Serverless functions run in specific cloud regions (more compute, higher latency). For caching patterns at each layer, see [Caching Strategies](./caching-strategies.md).

3. **How do I design cache keys for personalized content?**
   Include only factors that vary the response: country, language, A/B variant—not user ID. See [Caching Strategies](./caching-strategies.md) for cache key fragmentation. For security implications, see [Security Boundaries](./security-boundaries.md).

4. **What is origin shield and when should I use it?**
   Origin shield is a designated CDN PoP that consolidates requests to your origin. Protects origin from thundering herd. Related: [Caching Strategies](./caching-strategies.md) for browser-level caching that further reduces origin load.

5. **How do I invalidate CDN cache when content changes?**
   Options: TTL expiration, purge API, surrogate keys, versioned URLs (most reliable). For browser cache invalidation, see [Caching Strategies](./caching-strategies.md). For HTTP headers that control caching, see [Network Protocols](./network-protocols.md).

6. **When should content be cached at CDN vs. fetched fresh?**
   CDN cache: static assets, public content with acceptable staleness. Fetch fresh: user-specific data, prices at checkout. For consistency requirements, see [Consistency and Failure Handling](./consistency-and-failure-handling.md). For user perception of staleness, see [Human Perception](./human-perception.md).

7. **What are the security risks of CDN caching?**
   Risks: cross-user data leakage, cache poisoning, sensitive data persisting. See [Security Boundaries](./security-boundaries.md) for token storage patterns. Use `Cache-Control: private` for user-specific data—see [Network Protocols](./network-protocols.md) for header syntax.

8. **How do I debug CDN caching issues?**
   Check response headers: cache status (HIT/MISS/BYPASS), Age, X-Cache headers. For production monitoring and debugging, see [Observability](./observability.md). Test from multiple locations.

9. **What's stale-while-revalidate at the CDN level?**
   `Cache-Control: max-age=60, stale-while-revalidate=600`: serve cached response immediately, revalidate in background. See [Caching Strategies](./caching-strategies.md) for application-level stale-while-revalidate. For how staleness affects user experience, see [Human Perception](./human-perception.md).

10. **How do I balance latency vs. consistency in distributed systems?**
    Define per-resource. See [Consistency and Failure Handling](./consistency-and-failure-handling.md) for consistency models. For performance implications, see [Performance Optimization](./performance-optimization.md). For user perception of latency, see [Human Perception](./human-perception.md).

---

### 7. network-protocols.md

**Current Title:** "Network Protocols"

**Suggested Title:** "HTTP for Frontend Developers: Methods, Caching Headers, CORS, and Failure Handling"

**Current Description:** "HTTP as a contract - understanding methods, status codes, caching headers, CORS, and designing robust API requests."

**Suggested Description:** "HTTP isn't just transport—it's a contract. Learn method semantics, status codes, Cache-Control headers, CORS preflight, and retry patterns for frontend applications."

**Current Keywords:**
```
http, network protocols, cors, rest api, fetch, request design
```

**Suggested Keywords:**
```
http methods frontend,
cors explained simply,
fetch api best practices,
cache control headers guide,
http status codes frontend,
retry with exponential backoff,
preflight request cors,
http 2 http 3 frontend
```

**Suggested FAQs:**

1. **Why do HTTP method semantics matter for frontend?**
   Methods have meaning beyond "send request." GET is cacheable (see [Caching Strategies](./caching-strategies.md)); POST isn't. PUT is idempotent—see [Consistency and Failure Handling](./consistency-and-failure-handling.md) for idempotency keys. Using wrong methods breaks caching and retry safety.

2. **When does CORS preflight happen?**
   Preflight (OPTIONS request) happens for "non-simple" requests: custom headers (Authorization), Content-Type other than form-urlencoded. For security implications of CORS, see [Security Boundaries](./security-boundaries.md).

3. **Why can't I read certain response headers in JavaScript?**
   CORS restricts which headers JavaScript can access. For custom headers, the server must include them in `Access-Control-Expose-Headers`. For security context, see [Security Boundaries](./security-boundaries.md). For caching headers, see [Caching Strategies](./caching-strategies.md).

4. **How should I implement retry logic for failed requests?**
   Rules: retry only transient failures (5xx, network errors), use exponential backoff with jitter, set maximum retries. See [Asynchronous Operations](./asynchronous-operations.md) for request cancellation. See [Consistency and Failure Handling](./consistency-and-failure-handling.md) for idempotency keys to make retries safe.

5. **What's the difference between HTTP/2 and HTTP/3?**
   HTTP/2 multiplexes requests over single TCP connection. HTTP/3 uses QUIC (UDP-based), each stream independent. HTTP/3 performs better on lossy mobile networks. For CDN considerations, see [Distributed Systems](./distributed-systems.md).

6. **How do I use Cache-Control headers effectively?**
   Common patterns: `max-age=31536000, immutable` for versioned static assets. `no-store` for sensitive data (see [Security Boundaries](./security-boundaries.md)). See [Caching Strategies](./caching-strategies.md) for application-level caching.

7. **What's the difference between timeout, abort, and error in fetch?**
   Timeout: you set via AbortController. Abort: you call manually. Error: network failure. fetch doesn't have built-in timeout—see [Asynchronous Operations](./asynchronous-operations.md) for AbortController patterns.

8. **How do connection costs affect frontend performance?**
   New connection cost: DNS (20-120ms) + TCP handshake + TLS = 300-700ms. See [Performance Optimization](./performance-optimization.md) for the critical rendering path. See [Distributed Systems](./distributed-systems.md) for CDN edge locations that reduce latency.

9. **When should I use WebSocket vs. Server-Sent Events vs. polling?**
   WebSocket: bidirectional, real-time (chat). SSE: server→client only (notifications). For state synchronization over these protocols, see [State Management at Scale](./state-management-at-scale.md). For cache invalidation via events, see [Caching Strategies](./caching-strategies.md).

10. **How do I debug network issues in production?**
    Instrument with: request/response logging, timing data, correlation IDs. See [Observability](./observability.md) for distributed tracing. Use Server-Timing header to expose backend timing. Monitor error rates by endpoint.

---

### 8. security-boundaries.md

**Current Title:** "Security Boundaries"

**Suggested Title:** "Frontend Security Architecture: XSS, CSRF, CSP, and Token Storage Patterns"

**Current Description:** "Blast radius design for frontend security - XSS, CSRF, CSP, token storage, and minimizing attack impact."

**Suggested Description:** "Security isn't prevention—it's blast radius design. Learn XSS mitigation, CSRF protection, Content Security Policy, and where to store JWT tokens in SPAs."

**Current Keywords:**
```
security, xss, csrf, csp, authentication, token storage
```

**Suggested Keywords:**
```
frontend security best practices,
xss prevention react,
csrf protection spa,
content security policy guide,
jwt token storage spa,
httponly cookie vs localstorage,
same origin policy explained,
oauth pkce spa
```

**Suggested FAQs:**

1. **What's "blast radius design" for security?**
   Security isn't just preventing attacks—it's minimizing damage when attacks succeed. Design layers of defense where each limits blast radius. For related failure handling patterns, see [Consistency and Failure Handling](./consistency-and-failure-handling.md).

2. **Where should I store JWT tokens in a React SPA?**
   Recommended pattern: short-lived access tokens in memory, refresh tokens in HTTPOnly cookies with SameSite=Strict. For state management of auth state, see [State Management at Scale](./state-management-at-scale.md) for cross-tab synchronization of logout.

3. **What's the difference between XSS and CSRF?**
   XSS: attacker injects code that runs in your site's context. CSRF: attacker tricks browser into making authenticated requests. For validating user input, see [Data Contracts](../best-practices/data-contracts.md) for validation boundaries.

4. **Does HTTPOnly prevent XSS attacks?**
   No. HTTPOnly prevents cookie theft but XSS can still make authenticated requests. HTTPOnly limits blast radius; it doesn't prevent XSS. For caching implications of authentication, see [Caching Strategies](./caching-strategies.md).

5. **How do I implement Content Security Policy (CSP)?**
   Start with report-only mode to find violations. Remove inline scripts. Tighten progressively. For bundle optimization that reduces script sources, see [Performance Optimization](./performance-optimization.md).

6. **What's the SameSite cookie attribute?**
   SameSite controls when cookies are sent cross-site. `Strict`: never sent cross-site. `Lax`: sent on top-level navigation. Use `Strict` for auth cookies. For related CORS patterns, see [Network Protocols](./network-protocols.md).

7. **How do I protect against third-party script risks?**
   Third-party scripts run with your origin's privileges. Mitigations: Subresource Integrity (SRI), sandboxed iframes, strict CSP. For bundle size implications of third-party scripts, see [Performance Optimization](./performance-optimization.md).

8. **What's the principle of least privilege for frontend?**
   Give each part of the system minimum necessary access: short-lived tokens, scoped API permissions, restricted CSP. For how this applies to component design, see [Component API Design](../best-practices/component-api-design.md) for limiting prop exposure.

9. **How do I handle logout securely?**
   Clear all auth state: memory tokens, HTTPOnly cookies (server-side), localStorage. Broadcast logout to other tabs—see [State Management at Scale](./state-management-at-scale.md) for cross-tab communication. Server should invalidate refresh tokens.

10. **What security headers should every frontend set?**
    Essential headers: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options: nosniff`. For caching headers, see [Network Protocols](./network-protocols.md). For CDN header configuration, see [Distributed Systems](./distributed-systems.md).

---

### 9. consistency-and-failure-handling.md

**Current Title:** "Consistency Models & Failure Handling"

**Suggested Title:** "Frontend Consistency: Optimistic UI, Offline-First Patterns, and Intent Preservation"

**Current Description:** "Optimistic UI, intent preservation, offline-first patterns, and reconciliation strategies for resilient frontend applications."

**Suggested Description:** "Networks fail. Users go offline. Learn optimistic UI, intent preservation with idempotency keys, offline queues, and reconciliation strategies for resilient frontends."

**Current Keywords:**
```
consistency, failure handling, optimistic ui, offline first, error recovery
```

**Suggested Keywords:**
```
optimistic ui react,
offline first web app,
idempotency key frontend,
intent preservation pattern,
frontend error handling,
conflict resolution frontend,
eventual consistency ui,
retry queue javascript
```

**Suggested FAQs:**

1. **When should I use optimistic UI vs. wait for the server?**
   Optimistic for reversible, low-stakes actions: likes, toggles, adding to cart. Pessimistic for irreversible, high-stakes actions: payment, delete. See [Human Perception](./human-perception.md) for how optimism affects perceived responsiveness.

2. **What's an idempotency key and why do I need one?**
   A unique ID sent with mutations so the server can deduplicate retries. Without it: network fails → client retries → action happens twice. For retry patterns, see [Asynchronous Operations](./asynchronous-operations.md). For HTTP method semantics, see [Network Protocols](./network-protocols.md).

3. **How do I preserve user intent when the network fails?**
   Intent preservation pattern: persist intent locally (IndexedDB) before network attempt, apply optimistic UI, retry with backoff. See [Caching Strategies](./caching-strategies.md) for offline caching patterns. See [Human Perception](./human-perception.md)—intent preservation is "non-negotiable."

4. **What's the difference between eventual and strong consistency?**
   Strong consistency: every read reflects the most recent write. Eventual consistency: reads may be temporarily stale but converge. For caching implications, see [Caching Strategies](./caching-strategies.md). For user perception of consistency, see [Human Perception](./human-perception.md).

5. **How do I handle version conflicts when multiple users edit the same data?**
   Strategies: last-write-wins, server-authoritative, field-level merge, user-mediated. For state management patterns, see [State Management at Scale](./state-management-at-scale.md). For communicating conflicts to users, see [Human Perception](./human-perception.md).

6. **What causes "time travel" bugs where UI shows older data?**
   Race conditions where older responses arrive after newer ones. Fix: version-gating. See [Asynchronous Operations](./asynchronous-operations.md) for commit guards. See [State Management at Scale](./state-management-at-scale.md) for state consistency patterns.

7. **How do I implement offline-first architecture?**
   Layers: local persistence (IndexedDB), intent queue with idempotency keys, sync engine, conflict resolution. See [Caching Strategies](./caching-strategies.md) for Service Worker patterns. See [State Management at Scale](./state-management-at-scale.md) for sources of truth.

8. **How do I communicate failure states to users?**
   Match communication to failure type: transient → silent retry, recoverable → inline notification, persistent → change UI affordance. See [Human Perception](./human-perception.md) for the six user-facing states every app should handle.

9. **What's the "projection" mental model for state?**
   State = projection of commands under unreliable delivery. This unifies optimistic UI, offline queues, retries, reconciliation. Related: [State Management at Scale](./state-management-at-scale.md) for replication design.

10. **How do I test failure handling in the frontend?**
    Simulate failures: network throttling, mock API errors, disable network. For production monitoring of failure rates, see [Observability](./observability.md). For testing component states, see [Testing and Storybook](../best-practices/testing-and-storybook.md) for error state stories.

---

### 10. observability.md

**Current Title:** "Observability"

**Suggested Title:** "Frontend Observability: RUM, Error Tracking, Distributed Tracing, and SLOs"

**Current Description:** "Telemetry pipelines, Real User Monitoring, distributed tracing, and alerting strategies for frontend applications."

**Suggested Description:** "You can't improve what you can't measure. Learn telemetry pipelines, Real User Monitoring, Core Web Vitals tracking, distributed tracing, and burn-rate alerting."

**Current Keywords:**
```
observability, monitoring, rum, telemetry, alerting, distributed tracing
```

**Suggested Keywords:**
```
frontend observability guide,
real user monitoring rum,
frontend error tracking,
distributed tracing frontend,
core web vitals monitoring,
sentry frontend setup,
frontend slo sli,
burn rate alerting
```

**Suggested FAQs:**

1. **What's the difference between Real User Monitoring (RUM) and synthetic monitoring?**
   RUM measures actual users on real devices—shows what users experience. Synthetic runs controlled tests (Lighthouse)—provides CI baselines. For performance metrics to track, see [Performance Optimization](./performance-optimization.md). For how metrics relate to experience, see [Human Perception](./human-perception.md).

2. **What frontend SLIs (Service Level Indicators) should I track?**
   Core SLIs: crash-free sessions (≥99.5%), error rate (<0.5%), LCP p75 (<2.5s), INP p75 (<200ms), CLS p75 (<0.1). For Core Web Vitals optimization, see [Performance Optimization](./performance-optimization.md). For perception-based targets, see [Human Perception](./human-perception.md).

3. **How do I implement distributed tracing in the frontend?**
   Generate trace IDs client-side, propagate via `traceparent` header. For HTTP header patterns, see [Network Protocols](./network-protocols.md). For async operation tracing, see [Asynchronous Operations](./asynchronous-operations.md).

4. **What's burn-rate alerting and why is it better than threshold alerts?**
   Burn rate measures how fast you're consuming error budget. Catches both spikes and slow leaks. For failure handling that affects error rates, see [Consistency and Failure Handling](./consistency-and-failure-handling.md).

5. **What should I NOT log in frontend telemetry?**
   Never log: passwords, tokens, cookies, full URLs with query strings, free-form user input. See [Security Boundaries](./security-boundaries.md) for sensitive data handling. Use allowlists (only log approved fields), not denylists.

6. **How do I build a telemetry pipeline that doesn't impact performance?**
   Buffer events in memory. Use sendBeacon for delivery. Use requestIdleCallback for non-critical telemetry. For performance budget implications, see [Performance Optimization](./performance-optimization.md).

7. **How do I correlate frontend errors with backend issues?**
   Propagate correlation IDs: generate client-side, send in request headers. See [Network Protocols](./network-protocols.md) for header patterns. See [Asynchronous Operations](./asynchronous-operations.md) for tracking operation lifecycles.

8. **What's the investigation ladder for frontend incidents?**
   Step through: confirm user impact, identify regression start, narrow scope (browsers, devices), correlate to backend (trace IDs), reproduce, fix. For testing failure states, see [Testing and Storybook](../best-practices/testing-and-storybook.md).

9. **How do I avoid alert fatigue?**
   Use burn-rate alerts instead of threshold alerts. Every alert should have a runbook. Alert on user-impacting symptoms—see [Human Perception](./human-perception.md) for what impacts user experience.

10. **What observability tools should a frontend team use?**
    Error tracking: Sentry, Bugsnag. RUM: web-vitals library. Synthetic: Lighthouse CI. Tracing: OpenTelemetry. For performance metrics to instrument, see [Performance Optimization](./performance-optimization.md). For caching metrics, see [Caching Strategies](./caching-strategies.md).

---

### 11. human-perception.md

**Current Title:** "Human Perception"

**Suggested Title:** "Perceived Performance: Loading States, Optimistic UI, and Perception Budgets"

**Current Description:** "The capstone - understanding how technical metrics translate to perceived performance and user experience."

**Suggested Description:** "A 2-second load can feel faster than 3 seconds. Learn perception budgets, phase-based delivery, skeleton screens, and the psychology of waiting in UI design."

**Current Keywords:**
```
human perception, user experience, perceived performance, ux, loading states
```

**Suggested Keywords:**
```
perceived performance optimization,
loading state ux patterns,
skeleton screen best practices,
optimistic ui patterns,
perception budgets frontend,
phase based page load,
ux response time thresholds,
psychological waiting time
```

**Suggested FAQs:**

1. **Why does a 3-second load sometimes feel faster than 2 seconds?**
   Perception depends on feedback, progress, and control—not just duration. A 3-second load with instant input acknowledgment, skeleton, and progressive content feels faster than 2 seconds of blank screen. For technical performance metrics, see [Performance Optimization](./performance-optimization.md).

2. **What are perception budgets?**
   Time allocations for interaction phases: <100ms for input acknowledgment, <300ms for meaningful response, <1s for critical content. For Core Web Vitals targets that align with these budgets, see [Performance Optimization](./performance-optimization.md). For monitoring these, see [Observability](./observability.md).

3. **When should I use a skeleton screen vs. a spinner?**
   Skeleton when layout is predictable and content-heavy. Spinner when layout varies or load is short (<200ms). For testing loading states in Storybook, see [Testing and Storybook](../best-practices/testing-and-storybook.md). For preventing layout shift, see [Performance Optimization](./performance-optimization.md).

4. **Should I show a loading indicator immediately?**
   No. Delay indicators by ~150ms. If the operation completes quickly, users never see the indicator. For async operation patterns that support this, see [Asynchronous Operations](./asynchronous-operations.md).

5. **What's phase-based delivery?**
   Loading in stages with specific budgets: acknowledge input (<100ms), stabilize layout (<300ms), deliver critical content (<1s). For network optimization that supports this, see [Performance Optimization](./performance-optimization.md). For CDN delivery, see [Distributed Systems](./distributed-systems.md).

6. **How do I choose between optimistic and pessimistic UI?**
   Match optimism to stakes. Low stakes + reversible → fully optimistic. High stakes + irreversible → pessimistic, wait for confirmation. For detailed patterns, see [Consistency and Failure Handling](./consistency-and-failure-handling.md).

7. **What's intent preservation and why is it "non-negotiable"?**
   User input is durable before network. The user's work must never be lost due to network issues. Persist intents locally before attempting delivery. See [Consistency and Failure Handling](./consistency-and-failure-handling.md) for idempotency keys. See [Caching Strategies](./caching-strategies.md) for offline persistence.

8. **How do I debug "feels slow" when metrics look fine?**
   Check perception phases: Is input acknowledged within 100ms? Is there visible feedback within 300ms? See [Observability](./observability.md) for RUM that captures real user experience. Check CLS—see [Performance Optimization](./performance-optimization.md).

9. **What are the universal user-facing states every app should handle?**
   Six states: Idle, Working, Pending, Succeeded, Failed, Degraded. See [Testing and Storybook](../best-practices/testing-and-storybook.md) for creating stories that cover these states. See [Consistency and Failure Handling](./consistency-and-failure-handling.md) for failure state patterns.

10. **How does Human Perception connect to the rest of the systems series?**
    Human Perception is the capstone. Every previous document's decisions affect perception: [State Management](./state-management-at-scale.md) (does data feel fresh?), [Caching](./caching-strategies.md) (does content feel instant?), [Async Operations](./asynchronous-operations.md) (does UI feel responsive?), [Performance](./performance-optimization.md) (do metrics reflect experience?), [Failure Handling](./consistency-and-failure-handling.md) (does the system feel reliable?).

---

## Implementation Notes

### How to Apply These Changes

1. **Titles:** Update the `title:` field in each document's frontmatter
2. **Descriptions:** Update the `description:` field (keep under 160 characters)
3. **Keywords:** Replace the `keywords:` array in frontmatter
4. **FAQs:** Add a `## Frequently Asked Questions` section before the Summary section in each document

### FAQ Formatting for Structured Data

Format FAQs as H3 questions for potential structured data extraction:

```markdown
## Frequently Asked Questions

### When should I use optimistic UI vs. wait for the server?

Optimistic for reversible, low-stakes actions (like, toggle, add to cart). Pessimistic for irreversible, high-stakes actions (payment, delete account). If rollback would confuse or harm the user, wait.

### What's an idempotency key and why do I need one?

A unique ID sent with mutations so the server can deduplicate retries...
```

### Keyword Format in Frontmatter

Use multi-line array format for readability:

```yaml
keywords:
  [
    primary keyword phrase,
    secondary keyword phrase,
    long tail keyword one,
    long tail keyword two,
    tool or framework name,
    problem statement keyword,
    solution keyword,
    comparison keyword,
  ]
```

---

*End of SEO metadata recommendations.*
