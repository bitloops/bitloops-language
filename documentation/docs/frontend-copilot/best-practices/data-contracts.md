---
sidebar_position: 4
sidebar_label: Data Contracts
title: "Frontend Data Contracts: API Boundaries, Mapping Layers, and Schema Ownership"
description: "Who owns the data shape—API, CMS, or component? Learn mapping layers, validation boundaries, and contracts that prevent backend changes from breaking your UI."
keywords:
  [
    frontend data contracts,
    api response mapping react,
    cms frontend integration,
    typescript api validation,
    zod schema validation,
    backend frontend contract,
    data transformation layer,
    api schema ownership,
  ]
---

# Where data shape is decided

Components consume data. But who decides the shape of that data? The CMS? The backend API? The frontend? When this question goes unanswered, you get fragile components that break when data changes, duplicated transformation logic, and arguments about where "the data should be fixed."

This document covers data ownership, the contracts between systems, and how to design boundaries that make change manageable.

## The Data Ownership Question

Every piece of data displayed in your UI has an origin. Understanding who owns the shape of that data—and where transformations happen—prevents architectural confusion.

### Three sources, three owners

**1. CMS-owned data**

Content managed by editors in a CMS (Contentful, Sanity, Strapi, etc.). The CMS schema defines the shape.

- Blog posts, product descriptions, marketing copy
- Images with metadata
- Structured content blocks

**2. Backend-owned data**

Data from your application's API. The backend team defines the shape.

- User accounts, orders, transactions
- Real-time data, computed values
- Aggregated or processed data

**3. Frontend-owned data**

State that exists only in the browser. The frontend defines the shape.

- UI state (modals open, tabs selected)
- Form input before submission
- Derived or computed display values

### The ownership principle

**The source of truth owns the schema. Consumers adapt.**

If the CMS defines a `BlogPost` with `title`, `body`, and `publishedAt`, your frontend doesn't get to demand a `formattedDate` field. The CMS owns the shape. Your frontend transforms `publishedAt` into a display format.

This sounds obvious, but violations are common:

- Backends that format data "for the frontend" (mixing concerns)
- Frontends that assume CMS fields will be renamed (wishful thinking)
- Components that accept raw API shapes and pray they don't change

## Contracts Between Systems

A data contract is an explicit agreement about shape. It can be:

- A TypeScript type shared between systems
- An API specification (OpenAPI, GraphQL schema)
- A CMS schema definition
- Documentation that both sides commit to

### Why explicit contracts matter

Without contracts:

```tsx
// Frontend assumes this shape
const UserCard = ({ user }) => (
  <div>
    <img src={user.avatar} alt={user.name} />
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </div>
);

// Backend changes shape without notice
// user.avatar → user.profileImage
// user.name → user.fullName
// Frontend breaks in production
```

With contracts:

```tsx
// Shared contract (or generated from API spec)
interface User {
  id: string;
  fullName: string;
  email: string;
  profileImage: string | null;
}

// Frontend uses the contract
const UserCard = ({ user }: { user: User }) => (
  <div>
    <img src={user.profileImage ?? '/default-avatar.png'} alt={user.fullName} />
    <h3>{user.fullName}</h3>
    <p>{user.email}</p>
  </div>
);

// Backend changes break at compile time, not production
```

### Contract boundaries

Define contracts at system boundaries:

```
┌─────────────┐     contract     ┌─────────────┐
│     CMS     │ ───────────────► │   Frontend  │
└─────────────┘                  └─────────────┘
       │                               ▲
       │ CMS types                     │ API types
       ▼                               │
┌─────────────┐     contract     ┌─────────────┐
│   Backend   │ ───────────────► │   Frontend  │
└─────────────┘                  └─────────────┘
```

Each arrow is a contract. Each contract has an owner (the source) and consumers (the destinations).

## The Mapping Layer

Raw API data rarely matches what components need. A mapping layer transforms source shapes into component-friendly shapes.

### Why mapping matters

**Raw API shape:**

```tsx
interface APIProduct {
  product_id: string;
  product_name: string;
  price_cents: number;
  currency_code: string;
  main_image_url: string;
  is_available: boolean;
  stock_quantity: number;
}
```

**Component-friendly shape:**

```tsx
interface Product {
  id: string;
  name: string;
  formattedPrice: string;  // "$19.99"
  imageUrl: string;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
}
```

The component doesn't need to know about `price_cents` vs `currency_code`, or calculate stock thresholds. The mapping layer handles that once.

### Where mapping lives

**Option 1: API layer (recommended for apps)**

```tsx
// api/products.ts
import { APIProduct } from './types';
import { Product } from '@/types';

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  const raw: APIProduct = await response.json();
  return mapProduct(raw);
}

function mapProduct(raw: APIProduct): Product {
  return {
    id: raw.product_id,
    name: raw.product_name,
    formattedPrice: formatPrice(raw.price_cents, raw.currency_code),
    imageUrl: raw.main_image_url,
    availability: getAvailability(raw.stock_quantity),
  };
}
```

Components never see `APIProduct`. They work with `Product`.

**Option 2: Data fetching hooks**

```tsx
// hooks/useProduct.ts
export function useProduct(id: string) {
  return useQuery(['product', id], async () => {
    const raw = await fetchProduct(id);
    return mapProduct(raw);
  });
}
```

**Option 3: Dedicated mapping module**

```tsx
// mappers/product.ts
export function mapProduct(raw: APIProduct): Product { ... }
export function mapProducts(raw: APIProduct[]): Product[] {
  return raw.map(mapProduct);
}
```

### The mapping principle

**Transform once, at the boundary. Use the transformed shape everywhere.**

Don't let raw API shapes leak into components. Don't transform in multiple places.

## CMS Content Modeling

CMS data has unique characteristics: it's often edited by non-developers, may be partially filled, and changes frequently. Defensive modeling is essential.

### Structured vs. freeform content

**Structured content** has a defined schema:

```tsx
interface BlogPost {
  title: string;        // Required
  slug: string;         // Required
  body: RichText;       // Required
  author: Author;       // Required reference
  publishedAt: string;  // Required date
  tags: string[];       // Optional array
}
```

**Freeform content** is loosely defined:

```tsx
interface PageSection {
  type: string;
  content: Record<string, unknown>;
}
```

### When to use each

| Use structured when... | Use freeform when... |
|------------------------|----------------------|
| Shape is predictable | Content editors need flexibility |
| Validation is important | Schema evolves rapidly |
| Type safety matters | You're building a page builder |
| Content is authored by developers | Content is authored by marketers |

### Defensive CMS consumption

CMS data is often partially filled or unexpectedly shaped. Defend against it:

```tsx
// Dangerous: assumes all fields exist
const BlogCard = ({ post }) => (
  <div>
    <img src={post.coverImage.url} alt={post.coverImage.alt} />
    <h3>{post.title}</h3>
    <p>{post.excerpt}</p>
    <span>{post.author.name}</span>
  </div>
);

// Defensive: handles missing data
const BlogCard = ({ post }: { post: CMSBlogPost }) => {
  const coverImage = post.coverImage ?? { url: '/placeholder.jpg', alt: '' };
  const authorName = post.author?.name ?? 'Unknown Author';

  return (
    <div>
      <img src={coverImage.url} alt={coverImage.alt} />
      <h3>{post.title}</h3>
      {post.excerpt && <p>{post.excerpt}</p>}
      <span>{authorName}</span>
    </div>
  );
};
```

### CMS types: partial by default

Model CMS types to reflect reality:

```tsx
// Reflects actual CMS behavior
interface CMSBlogPost {
  title: string;           // Required fields are actually required
  slug: string;
  body: RichText;
  coverImage?: {           // Optional: editors might not add it
    url: string;
    alt?: string;          // Alt text often forgotten
  };
  author?: {               // Reference might be broken
    name: string;
    avatar?: string;
  };
  publishedAt?: string;    // Draft posts won't have this
  tags?: string[];         // Optional array
}
```

## Validation Strategies

Data should be validated at boundaries. But which boundaries, and how?

### Build-time vs. runtime validation

**Build-time validation (TypeScript):**

- Catches shape mismatches during development
- Zero runtime cost
- Only works for statically known shapes

**Runtime validation (Zod, io-ts, yup):**

- Catches actual data errors
- Works with dynamic data
- Has runtime cost
- Provides detailed error messages

### When to validate at runtime

Runtime validation is worth the cost when:

1. **Data comes from untrusted sources** — User input, external APIs, webhooks
2. **Data shape is critical** — Payment data, authentication, form submissions
3. **Debugging matters** — Clear validation errors beat "cannot read property of undefined"
4. **CMS data is unpredictable** — Editors make mistakes

```tsx
// Runtime validation for CMS data
import { z } from 'zod';

const BlogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  body: z.string(),
  coverImage: z.object({
    url: z.string().url(),
    alt: z.string().optional(),
  }).optional(),
  publishedAt: z.string().datetime().optional(),
});

type BlogPost = z.infer<typeof BlogPostSchema>;

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const raw = await cmsClient.getPost(slug);

  const result = BlogPostSchema.safeParse(raw);
  if (!result.success) {
    console.error('Invalid blog post data:', result.error);
    return null;
  }

  return result.data;
}
```

### Where validation lives

```
┌──────────────┐
│   External   │
│   Source     │
└──────┬───────┘
       │ raw data
       ▼
┌──────────────┐
│  Validation  │  ← Validate at the boundary
│    Layer     │
└──────┬───────┘
       │ validated & typed data
       ▼
┌──────────────┐
│  Application │  ← Trust the data from here on
│    Code      │
└──────────────┘
```

Validate once at entry. Trust within the boundary.

## Component Data Expectations

Components should declare exactly what data they expect—no more, no less.

### Props as explicit contracts

```tsx
// Clear data contract
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;  // Already formatted
    imageUrl: string;
    inStock: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => (
  // Component can trust these fields exist and are typed correctly
);
```

### Rejecting bad data

Components should fail clearly when data is wrong:

```tsx
const ProductCard = ({ product }: ProductCardProps) => {
  // Development-time assertion
  if (process.env.NODE_ENV === 'development') {
    if (!product.id || !product.name) {
      console.error('ProductCard: missing required product fields', product);
    }
  }

  return (
    // ...
  );
};
```

### The "transform then consume" pattern

Don't let components do data transformation:

```tsx
// Bad: component does transformation
const ProductCard = ({ apiProduct }) => {
  const formattedPrice = `$${(apiProduct.price_cents / 100).toFixed(2)}`;
  const imageUrl = apiProduct.images?.[0]?.url ?? '/placeholder.jpg';
  // ...
};

// Good: component receives transformed data
const ProductCard = ({ product }) => {
  // product.formattedPrice and product.imageUrl already exist
  // ...
};
```

Why? Because:
- Transformation logic is duplicated if multiple components need the same data
- Components become coupled to API shape
- Testing requires mocking complex API shapes instead of simple display shapes

## How this connects to Bitloops

One of the most common sources of frontend fragility is components that are tightly coupled to raw API or CMS shapes. [Bitloops](https://bitloops.com) helps enforce clean data boundaries by generating components that expect already-transformed, display-ready props — not raw backend payloads. When turning designs into code, Bitloops produces typed component interfaces that match what the UI actually needs, making it natural to introduce a mapping layer between the data source and the component. The "transform then consume" pattern becomes the default workflow, not an afterthought.

---

## Summary

Data contracts define boundaries. The principles:

| Principle | Application |
|---|---|
| Source owns the schema | Treat the origin as authoritative: CMS fields follow the CMS schema, API responses follow the backend contract, and client-only state follows frontend rules. Don’t “negotiate” shapes in components—adapt at the boundary. |
| Contracts are explicit | Define the contract where systems meet (CMS → frontend, API → frontend). Use generated types (OpenAPI/GraphQL), shared TypeScript models, or documented schemas so shape changes fail at build time, not in production. |
| Transform at boundaries | Introduce a mapping layer (API module, data hooks, or dedicated mappers) that converts raw shapes into component-friendly models (e.g., `price_cents` → `formattedPrice`). Components should never see raw `APIProduct` or raw CMS records. |
| CMS data is partial by default | Model CMS fields with real-world optionality (missing images, empty alt text, broken references, drafts without dates). Provide sensible fallbacks and conditional rendering so editorial mistakes don’t become UI crashes. |
| Validate external data | Validate at ingress when inputs are untrusted or unpredictable (CMS payloads, external APIs, user input). Use runtime schemas (e.g., Zod) at the boundary so everything inside the app can assume data is well-formed. |
| Components declare expectations | Keep component props tight and explicit: accept only what the UI needs (already formatted, already derived). If a component needs `formattedPrice`, make it a prop—don’t compute it inside the component. |
| Prevent raw-shape leakage | Enforce “transform then consume” as a rule: no ad-hoc formatting in views, no `apiProduct.*` access in UI components, no duplicated transformations across multiple components. This reduces breakage and makes testing fixtures simpler. |

Clear data boundaries prevent the ripple effects of change. When the API changes, you update one mapping function—not fifty components.

---

## Further reading

- [Zod Documentation](https://zod.dev/) — The TypeScript-first schema validation library referenced throughout this document; covers parsing, inference, transforms, and error handling for runtime data contracts.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — The standard for defining HTTP API contracts; combined with code generators (e.g., `openapi-typescript`), it automates the typed boundary between backend and frontend.
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) — Generates TypeScript types and hooks directly from your GraphQL schema, eliminating manual type definitions and ensuring frontend code stays in sync with the API contract.
- [Data Fetching Patterns in Single-Page Applications — Juntao Qiu (martinfowler.com)](https://martinfowler.com/articles/data-fetch-spa.html) — Explores how to structure data-fetching and transformation layers in SPAs, including the "transform then consume" pattern central to this document.
- [Parse, Don't Validate — Alexis King](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/) — The foundational article on why parsing data at the boundary (turning unstructured input into typed values) is safer than scattering validation checks throughout your code.

---

## Frequently Asked Questions (FAQs)

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

*Build frontends with clear data boundaries. Start building with [Bitloops](https://bitloops.com).*