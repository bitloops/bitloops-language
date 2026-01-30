---
sidebar_position: 6
sidebar_label: Distributed Systems
title: "Edge Computing for Frontend: CDN Architecture, Cache Keys, and Execution Location"
description: "Where should code execute—client, edge, or origin? Learn CDN cache architecture, cache key design, edge computing patterns, and latency optimization."
keywords:
  [
    cdn caching frontend,
    edge computing patterns,
    vercel edge functions,
    cloudflare workers frontend,
    cdn cache key design,
    origin shield cdn,
    edge vs serverless,
    global latency optimization,
  ]
---

# Edge and CDN systems

Every millisecond of latency costs conversion. Physics dictates that data traveling from Virginia to Tokyo takes ~150ms minimum—speed of light through fiber. You can't beat physics, but you can move your code and data closer to users. That's what distributed frontend systems are about.

**Core framing: Edge is a policy layer.** It's less "run code near users" and more "enforce routing, caching, and safety policies close to users." This is more precise than generic edge hype.

## The browser as part of a distributed system

Classic distributed systems deal with data replication, consistency, and partition tolerance. Frontend distribution is the same: code, assets, and data replicated across geographic regions. The browser is just one node in a distributed system spanning client → edge → origin.

SSR, SSG, ISR, edge functions—these are distributed systems patterns with new names. "Read replicas near users" is what CDNs do for static assets. "Write to primary, read from replica" is edge caching with origin fallback.

## What makes frontend unique

**Assets are naturally cacheable.** JS, CSS, and images rarely change—perfect for CDN distribution.

**Personalization breaks caching.** User-specific content can't use shared caches naively.

**The client is the final execution environment.** Edge can pre-process, but the browser renders.

**Propagation time is visible.** Backend replication lag is internal. Frontend users see stale content.

## The execution spectrum

### Client (browser)

Executes on user's device. Full access to DOM and browser APIs. Network latency is zero—it's already there. But CPU, memory, and I/O latency still apply; main thread contention is often the bottleneck. Personalization is unlimited. Cost is free (user's resources). Limitations: device capability, requires JS.

### Edge (CDN PoP)

Executes at CDN point of presence near user. Limited runtime (Cloudflare Workers, Vercel Edge, etc.). Latency: 10-50ms typically. Personalization via cookies, headers, geo data. Cost is per-request billing—can add up with fragmented cache keys. State is expensive and constrained at edge; design as if state is costly.

### Origin (your server)

Executes at your data center or cloud region. Full server capabilities. Latency: 50-300ms+ depending on user location. Unlimited personalization with database access. Limitations: distance from users, scaling challenges.

**The spectrum:**

```
                Client          Edge            Origin
                ─────────────────────────────────────────>
Network         Zero            Low             High
latency

Data/State      Local only      Constrained     Full
access                          (KV, cache)     (DB, files)

Statefulness    Full            Limited/        Full
                                Expensive
```

## Consistency models by resource type

Instead of abstract CAP theorem discussions, define consistency per resource. *Consistency Models & Failure Handling* covers these models in depth—here we focus on their application to CDN caching:

| Resource Type | Consistency Model | Invariant | Implementation |
|---------------|-------------------|-----------|----------------|
| Static assets | Strong (via immutability) | Content matches hash | Immutable URLs, cache forever |
| HTML shell | Bounded staleness | Fresh within N minutes | TTL + SWR |
| Catalog data | Eventually consistent | Acceptable lag | Short TTL, SWR at edge |
| Price/inventory | Must be authoritative | Checkout price = displayed price | No cache or verify at commit |
| User-specific | Private, fresh | Never show another user's data | `Cache-Control: private` |

**The invariant question for each resource:**
- What must never be wrong? (Price at checkout, permissions)
- What can be stale? (Product descriptions, images)
- What must be labeled as stale? (Dashboards showing "Last updated: 2 min ago")

## CDN fundamentals

A **Content Delivery Network** is a geographically distributed set of servers caching and serving content. A **PoP (Point of Presence)** is an individual CDN location. The **Origin** is your actual server where content originates.

**How CDN caching works:**
1. User requests resource
2. Request routed to nearest PoP (via DNS/anycast)
3. PoP checks cache:
   - Cache HIT: Return cached response (fast)
   - Cache MISS: Fetch from origin, cache response, return

**Cache Key** uniquely identifies a cached response. Default is URL path + query string. Can include headers (Accept, Accept-Language), cookies, geo. Key principle: every factor in the key fragments the cache and increases cost.

## Routing vs. caching order

Where you execute edge logic affects hit rate and correctness.

**Pattern 1: Edge function BEFORE cache lookup**

```
Request → Edge Function → (modifies cache key) → Cache Lookup → Origin
```

Use for: A/B test assignment, geo-routing, auth checks. Effect: Edge runs on every request; can affect cache key.

**Pattern 2: Edge function AFTER cache hit (transform only)**

```
Request → Cache Lookup → (if hit) → Edge Function (transform) → Response
```

Use for: Response modification, header injection. Effect: Only runs on cached responses; preserves cache hit rate.

**Pattern 3: Edge function on cache miss only**

```
Request → Cache Lookup → (if miss) → Edge Function → Origin → Cache → Response
```

Use for: Origin request modification. Effect: Only on misses; cached responses untouched.

**Choose based on:**
- Need to run on every request? → Before cache
- Just transforming responses? → After cache
- Only affecting origin requests? → On miss only

## Cache key design

Cache keys determine what's cached separately vs. shared. Too broad: wrong content served to users. Too narrow: every request is cache miss, costs explode.

**Cache key fragmentation and cost:**

```
URL alone:               1 cache entry      → Low cost
URL + Accept-Encoding:   3 entries          → Acceptable
URL + Language:          10 entries         → Watch it
URL + Country:           200+ entries       → Expensive, low hit rate
URL + Cookie:            ∞ entries          → No caching, high origin load
```

Per-request billing at edge plus low hit rate from fragmented keys equals budget surprise.

## Personalization: variant cardinality

The cardinality rule: personalization strategy must bound the number of variants. Unbounded variants equals no effective caching.

**Cardinality spectrum:**

| Strategy | Variants | Hit Rate | Example |
|----------|----------|----------|---------|
| Same for all | 1 | ~95% | Static marketing page |
| By country | ~200 | ~90% | Localized content |
| By segment | 5-20 | ~80% | New/returning/premium |
| By user | ∞ | ~0% | Dashboard data |

**Flash of generic content:** Client-side personalization shows generic first, then fetches personalized. User sees generic content briefly. Mitigate with skeleton UI, below-fold personalization, or edge personalization.

## Security & isolation at the edge

Where CDN/edge systems fail in production is often security. *Security Boundaries* covers the broader threat model—here we focus on CDN-specific concerns.

### Shared vs. private caching

*Caching Strategies* covers the full cache stack and security implications. Here's the CDN-specific guidance:

**Shared caches (CDN):** `Cache-Control: public`—OK to cache for multiple users. Must never contain user-specific data. Must never leak between users.

**Private caches (browser):** `Cache-Control: private`—Cache only in user's browser. Safe for user-specific data.

**Rule:** If the response contains any user-specific data, it must be `Cache-Control: private` or `no-store`.

### The Vary header and cross-user safety

```http
Vary: Authorization
Cache-Control: public, max-age=60
```

Without Vary, CDN might cache User A's response and serve it to User B.

**Safe Vary values:**
- `Accept-Encoding` (gzip, br)—Low cardinality, safe
- `Accept-Language` (if supporting few languages)—Bounded, OK
- `Authorization` or `Cookie`—Unbounded, effectively uncacheable at CDN

### Token handling at edge

**Don't log secrets:**

```javascript
// BAD
console.log(`Processing request with token: ${token}`)

// GOOD
console.log(`Processing request for user: ${userId}`)
```

**Don't include tokens in cache keys:**

```javascript
// BAD
const cacheKey = `${url}::${token}`

// GOOD
const cacheKey = `${url}::user=${userId}`
```

### Cache poisoning prevention

Cache poisoning happens when an attacker tricks the cache into storing a malicious response. An attacker sends a request with malicious headers, the origin generates a response influenced by that input, the response is cached without the influencing factor in the key, and legitimate users get the poisoned cached response.

**Prevention:**
- Validate and sanitize inputs that influence response
- Include influencing factors in cache key (or don't cache)
- Use proper Vary headers
- Don't reflect untrusted input in cacheable responses

### Multi-tenant isolation

For SaaS serving multiple tenants from one CDN:

| Isolation Method | Implementation | Trade-off |
|------------------|----------------|-----------|
| Subdomain per tenant | `tenant1.app.com` | Strong isolation, DNS management |
| Path prefix | `/tenant1/*` | Simpler, requires careful routing |
| Header-based | `X-Tenant-ID` in cache key | Flexible, must validate |

**Requirement:** Tenant A must never see Tenant B's cached data.

## Origin protection patterns

CDN isn't just for speed—it protects your origin.

### Tiered caching / shield PoP

The problem: N PoPs × cache miss = N origin requests for same content.

**Shield pattern:**

```
User → Regional PoP → Shield PoP → Origin
                         ↑
                    One cache miss
                    hits origin once
```

Regional PoPs check their cache, then forward miss to shield. Shield PoP is the only one that talks to origin. Origin sees shield PoP count, not regional PoP count.

### Request coalescing

The problem: 1000 requests arrive at PoP simultaneously for uncached resource = 1000 origin requests.

**Coalescing pattern:**

```
1000 requests → PoP sees miss → Sends ONE request to origin
                             → Holds other 999 requests
                             → Origin responds
                             → PoP responds to all 1000
```

Most CDNs do this automatically, but verify your configuration.

### Circuit breaker: stale-if-error

```http
Cache-Control: max-age=60, stale-if-error=86400
```

If origin returns error, serve stale cache up to 24 hours. Users see slightly old content instead of error page. Buys time to fix origin. *Network Protocols* covers the circuit breaker pattern in detail—the same principle applies here at the CDN layer.

```javascript
async function fetchWithFallback(request, cache) {
  try {
    const response = await fetch(origin)
    if (response.ok) {
      await cache.put(request, response.clone())
      return response
    }
    const stale = await cache.match(request)
    if (stale) {
      const headers = new Headers(stale.headers)
      headers.set('X-Served-Stale', 'true')
      return new Response(stale.body, { headers })
    }
    return response
  } catch (e) {
    const stale = await cache.match(request)
    if (stale) return stale
    throw e
  }
}
```

### Rate limiting at edge

Move rate limiting to edge to protect origin:

```javascript
async function rateLimitedHandler(request, env) {
  const ip = request.headers.get('CF-Connecting-IP')
  const key = `ratelimit:${ip}`

  const count = await env.KV.get(key) || 0
  if (count > 100) {
    return new Response('Rate limited', { status: 429 })
  }

  await env.KV.put(key, count + 1, { expirationTtl: 60 })
  return fetch(request)
}
```

## Observability & debugging

"How do I prove what happened?" is essential for distributed systems. *Observability* covers the full telemetry pipeline—here we focus on CDN-specific concerns.

### Cache status headers

Every CDN provides cache status information:

| CDN | Header | Values |
|-----|--------|--------|
| Cloudflare | `CF-Cache-Status` | HIT, MISS, EXPIRED, BYPASS, DYNAMIC |
| Fastly | `X-Cache` | HIT, MISS, PASS |
| Akamai | `X-Cache` | TCP_HIT, TCP_MISS |
| Vercel | `X-Vercel-Cache` | HIT, MISS, STALE |

Also check:
- `Age`: Seconds since cached (0 = fresh from origin)
- `X-Cache-Hits`: Number of times served from cache
- Region/PoP identifiers: `CF-Ray`, `X-Served-By`

### Trace correlation across layers

Propagate request IDs. See *Observability* for W3C Trace Context and full distributed tracing implementation:

```javascript
export default async function handler(request) {
  const requestId = request.headers.get('X-Request-ID')
    || crypto.randomUUID()

  const modifiedRequest = new Request(request)
  modifiedRequest.headers.set('X-Request-ID', requestId)

  const response = await fetch(modifiedRequest)

  const modifiedResponse = new Response(response.body, response)
  modifiedResponse.headers.set('X-Request-ID', requestId)

  return modifiedResponse
}
```

### Debugging geo-specific issues

**How to reproduce "Tokyo sees X, London sees Y":**

1. Force PoP via headers (if CDN supports)
2. Use CDN's debug tools (Cloudflare Trace, Fastly Fiddle)
3. Purge, then request from multiple locations
4. Compare Age headers across regions
5. Look for version mismatches in responses

## Rollout safety patterns

Propagation delay means deploys are distributed operations.

### Immutable assets + versioned APIs

**The safest pattern:**

```
Deploy sequence:
1. Deploy new assets with new hashes: /app.abc123.js
2. Deploy new API with backwards compatibility
3. Deploy new HTML referencing new assets
4. Old assets still served until HTML propagates
5. After propagation: Remove old API support (optional)
```

No purge needed. No propagation race conditions.

### Canary by region

For edge functions with state or complexity:

```javascript
const canaryRegions = ['SFO', 'LAX']
const isCanary = canaryRegions.includes(request.cf?.colo)

if (isCanary) {
  return newImplementation(request)
} else {
  return currentImplementation(request)
}
```

Monitor canary metrics before expanding.

## The trade-offs

### Latency vs. consistency

| Data Type | Latency Priority | Consistency Need | Strategy |
|-----------|-----------------|------------------|----------|
| Static assets | High | Via immutability | Long TTL, immutable URLs |
| Product catalog | Medium | Bounded staleness | Short TTL + SWR |
| Inventory/price | Low | Authoritative at commit | No cache or verify fresh |
| User-specific | N/A | Private | Don't cache at CDN |

### Cache hit rate vs. personalization

```
← Higher hit rate                              More personalized →

Same for       Same per      Same per      Same per      Unique per
everyone    →  country   →   segment   →   session   →   request
(95%+ hit)     (90% hit)     (80% hit)     (10% hit)     (0% hit)
```

**Bound your cardinality.** If variants are unbounded, don't cache.

### Edge logic vs. origin complexity

**Put at edge:**
- Authentication/authorization checks
- A/B test assignment (bounded variants)
- Geo-routing decisions
- Header manipulation
- Rate limiting

**Keep at origin:**
- Database queries
- Complex business logic
- Heavy computation
- Unbounded personalization

## Patterns

### Immutable assets with content hash

```
// Build output
app.3a7b9c.js
styles.8f2e1d.css

// HTTP headers
Cache-Control: public, max-age=31536000, immutable
```

Content changes = new hash = new URL = no purge needed. Maximum cache hit rate. *Network Protocols* covers the full set of HTTP caching headers and how they interact.

### Stale-while-revalidate at CDN

```http
Cache-Control: public, max-age=60, stale-while-revalidate=600
```

Users always get fast response. Content refreshes in background. Origin protected from thundering herd.

### Surrogate keys for targeted purging

```http
Surrogate-Key: product-123 category-electronics homepage-featured
```

Update product → purge one tag → all URLs invalidated. More precise than purge-all. Faster than purging each URL.

## Anti-patterns

### Caching responses with Set-Cookie

Session hijacking if cached response with `Set-Cookie` served to another user. Never cache responses with `Set-Cookie`. Use `Cache-Control: private` for personalized responses.

### Vary on high-cardinality headers

```http
// DON'T
Vary: Cookie           // ∞ variants
Vary: User-Agent       // 1000s of variants
Vary: Authorization    // ∞ variants
```

Vary only on bounded values. For user-specific content, use `Cache-Control: private`.

## Real-world scenario: global e-commerce

**Invariants defined:**
- Checkout price must equal displayed price (verify fresh at checkout)
- User cart must never show another user's items
- Product images can be 1 hour stale

**Architecture:**
- Static assets: Immutable, cached forever
- Product pages: SSG + SWR (1 hour)
- Price/inventory: Edge fetch with 30s cache or client-side fresh fetch
- Cart: `Cache-Control: private`, no CDN

## Real-world scenario: news site with breaking news

**Invariants defined:**
- Breaking news must appear within 60 seconds
- Article edits should propagate within 5 minutes
- Traffic spikes must not kill origin

**Architecture:**
- Home page: TTL 60s, SWR 600s, surrogate key `homepage`
- Articles: TTL 1 hour, surrogate key `article-{id}`
- Breaking news: Purge `homepage` tag
- Origin protection: Shield PoP, stale-if-error

## Real-world scenario: multi-tenant SaaS

**Invariants defined:**
- Tenant A must never see Tenant B's data
- Auth failures must be fast (don't hit origin)
- Dashboard data is user-specific, not cacheable at CDN

**Architecture:**
- Tenant isolation: Subdomain per tenant in cache key
- Auth at edge: JWT validation, reject invalid before origin
- App shell: Cached (no user data)
- Dashboard data: Client-side fetch, `Cache-Control: private`

## Design review checklist

**Execution Placement:**
- What logic runs on client vs. edge vs. origin?
- Does edge logic run before or after cache lookup?
- Is edge logic within runtime constraints?

**Consistency & Invariants:**
- For each resource type, what's the consistency model?
- What invariants must never be violated?
- Is price/permission data verified fresh when it matters?

**Security & Isolation:**
- Is user-specific data marked `Cache-Control: private`?
- Are Vary headers correct?
- Is multi-tenant isolation enforced in cache keys?
- Are tokens excluded from cache keys and logs?

**Origin Protection:**
- Is tiered caching / shield configured?
- Is stale-if-error configured for outages?
- Is rate limiting at edge?

**Observability:**
- Can you identify which PoP served a request?
- Is request ID propagated edge → origin?
- Can you reproduce geo-specific issues?

## Red flags

- "We cache based on cookie" — No effective caching
- "Purge all on every deploy" — Missing targeted invalidation
- "Users sometimes see old content" — Propagation delay not handled
- "Origin keeps crashing on traffic spikes" — CDN not protecting origin
- "Works in US but slow in Asia" — Not using CDN effectively

## Key takeaways

- **Edge is a policy layer.** Enforce routing, caching, and safety policies close to users. Not just "run code faster."
- **Consistency models by resource type.** Define invariants: what must be correct, what can be stale, what must be labeled as stale.
- **Security is where edge systems fail.** Cache poisoning, cross-user leakage, token exposure. Treat security as first-class.
- **Origin protection is required.** Tiered caching, request coalescing, stale-if-error. CDN is your shield.
- **Observability enables debugging.** Cache status headers, request IDs, PoP identification. "Tokyo sees X, London sees Y" must be reproducible.
- **Cache key fragmentation has cost.** Unbounded personalization means no caching plus high bills.

Every distribution decision should answer: What can be stale? What must be correct? What's the blast radius if this goes wrong?

---

## Further reading

- [Designing Data-Intensive Applications — Martin Kleppmann](https://dataintensive.net/) — Chapter 5 covers data replication, consistency, and partition handling; the concepts map directly to CDN and edge caching behavior.
- [Cloudflare Learning Center — What Is a CDN?](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) — A clear, approachable introduction to CDN architecture, caching, and edge networking concepts from one of the largest CDN providers.
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/) — The leading edge runtime; covers KV storage, Durable Objects, and patterns for building stateful edge applications.
- [Vercel Edge Functions Documentation](https://vercel.com/docs/functions/edge-functions) — Edge computing integrated with Next.js; practical guide to running server-side logic at the edge with framework-level support.
- [Fastly Compute Documentation](https://www.fastly.com/products/edge-compute) — High-performance edge compute platform; useful for understanding how different providers approach edge execution constraints and trade-offs.

---

## Frequently Asked Questions (FAQs)

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

*Move your code closer to your users and deliver globally with [Bitloops](https://bitloops.com) — your AI-powered frontend copilot.*
