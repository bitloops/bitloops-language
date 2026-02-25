---
sidebar_position: 3
sidebar_label: Caching Strategies
title: "Frontend Caching: Browser Cache Stack, Invalidation Strategies, and Security Boundaries"
description: "Every cache is a bet. Learn the browser cache stack (memory, HTTP, Service Worker, CDN), stale-while-revalidate, cache invalidation, and security implications."
keywords:
  [
    frontend caching strategy,
    browser cache explained,
    stale while revalidate pattern,
    service worker cache api,
    http cache headers frontend,
    cache invalidation strategies,
    tanstack query cache,
    indexeddb caching patterns,
  ]
---

# Caching as a system

Every cache is a bet: you're betting that the cost of serving stale data is lower than the cost of fetching fresh data. The art of caching is knowing when that bet pays off—and when it bankrupts user trust.

Caching isn't just about storing data for later. It's **lifecycle design**. You're deciding how data ages, when it dies, how it's reborn, and what guarantees you make about its freshness. This connects directly to state management: cache is the persistence layer for replicated state. If you haven't read about [state ownership and replication](./state-management-at-scale.md), start there.

## The browser's cache stack

Backend engineers obsess over Redis hit rates and Memcached eviction policies. Frontend engineers face the same problems across more layers, with less coordination between them.

The browser doesn't have one cache—it has several:

| Layer | What it stores | Who controls it | Lifetime |
|-------|---------------|-----------------|----------|
| In-Memory (JS heap) | Parsed data, computed values | Your application code | Page session |
| localStorage | Strings (serialized JSON) | Your application code | Persistent |
| IndexedDB | Structured records, blobs | Your application code | Persistent |
| Service Worker Cache | Request/Response pairs | Your Service Worker code | Until explicitly cleared |
| HTTP Cache | Full HTTP responses | Response headers | Browser-managed |
| CDN Cache | Full HTTP responses | Response headers + CDN config | Server/CDN-managed |

These layers don't coordinate automatically. Invalidating your React Query cache doesn't touch the HTTP cache. Purging the CDN doesn't clear what's in the browser. You're managing a distributed system where the nodes can't talk to each other.


## Response caches vs. data stores

Before going deeper, understand a critical distinction: some caches store **responses**, others store **data**. They behave differently.

- **Response caches** (HTTP cache, CDN, Service Worker CacheStorage) store complete HTTP responses, keyed by URL. You influence them through headers. When you call `fetch()`, the browser might return a cached response without hitting the network. You control this indirectly—via `Cache-Control` headers, not imperative code.
- **Data stores** (React Query cache, Apollo cache, IndexedDB, localStorage) store parsed, structured data. You key it however you want. You control it directly through your application code. When you call `queryClient.invalidateQueries()`, you're talking to your application's cache, not the browser's HTTP cache.

Here's why this matters: a "cache miss" in React Query might still be an HTTP cache hit. Your application requests fresh data, but `fetch()` returns a stale cached response from the browser. You've invalidated the wrong layer.

## The request lifecycle

Understanding how a request flows through cache layers prevents debugging nightmares.

```
Application calls fetch()
         ↓
Service Worker intercepts (if registered)
    → SW can respond from CacheStorage
    → Or call fetch() itself (passing through)
         ↓
Browser HTTP Cache
    → Checks Cache-Control, ETag, Expires
    → May return cached response instantly
         ↓
Network Request → CDN
    → CDN checks its cache (see *Distributed Systems* for CDN architecture)
    → Returns cached response or forwards to origin
         ↓
Origin Server
    → Generates fresh response
```

A critical detail: **Service Worker intercepts before HTTP cache**. If your Service Worker calls `fetch()`, that request still goes through the browser's HTTP cache. To bypass it, you'd need `cache: 'no-store'` in the fetch options.

This layering creates power and complexity. You can serve from CacheStorage while the HTTP cache has a different version. You can have stale data at four different layers simultaneously, each with different ages.

## Read policies

Every cache access involves a decision: use the cache, hit the network, or both? These policies formalize that decision.

- **Network-Only:** Always fetch from the network. Never use cache. Use this for data that must be current—real-time stock prices, security-sensitive content, personalized responses that must reflect the latest permissions.
- **Network-First:** Try the network. If it fails, fall back to cache. Fresher data when available, but resilient to network issues. Use for frequently-changing data where offline access matters. See *Consistency Models & Failure Handling* for graceful degradation patterns when the network fails.
- **Stale-While-Revalidate (SWR):** Return cached data immediately. Fetch fresh data in the background. Update cache for next time. The user sees potentially stale data instantly, then fresh data on their next interaction.
- **Cache-First:** Check cache first. Only hit the network on cache miss. Fastest for cached content, but risky if the cache isn't properly invalidated. Use for static assets or data that rarely changes.
- **Cache-Only:** Never hit the network. Only works if data was pre-cached. Use for offline mode after initial sync, or for app shell assets.

### When SWR is right—and when it's not

SWR is the right default for most data. It provides instant UI while ensuring eventual freshness. But it's not appropriate for everything.

**Use SWR when:**
- Bounded staleness is acceptable (users can tolerate seconds or minutes of old data)
- You show data age ("Updated 2 minutes ago") so users know what they're seeing
- The data doesn't have correctness invariants
- Showing stale data briefly causes no harm

**Avoid SWR when:**
- **Audit-sensitive contexts:** "Why does the dashboard show yesterday's numbers?" destroys trust
- **Financial data:** Account balances, prices, transaction status must be current
- **Permissions and access control:** Users must not see content they no longer have access to
- **Legal compliance:** Displayed information has contractual weight

When you do use SWR for sensitive data, pair it with staleness indicators:

```javascript
<Dashboard data={data} />
{isStale && <span>Last updated: {formatRelative(dataUpdatedAt)}</span>}
{isFetching && <RefreshIndicator />}
```

The `stale-if-error` pattern is a resilience variant: serve stale data only during outages, not all the time. Show an error indicator alongside the data so users know something is wrong.

## Write policies

How do writes flow through the cache stack? Three main approaches:

**Write-Through:** Write to cache and origin simultaneously. The cache is always consistent with the origin when the write succeeds. But writes are slow—you wait for the origin.

**Write-Behind (Write-Back):** Write to cache immediately, sync to origin asynchronously. Writes feel instant. But if sync fails, data is lost. This requires conflict resolution when the origin has changed in the meantime. *Consistency Models & Failure Handling* covers the intent preservation pattern that makes write-behind reliable.

**Write-Around:** Write directly to origin, bypass cache. Invalidate or ignore the cache on write. Simpler, but the next read might miss the cache and hit the network.

| Policy | Speed | Consistency | Data Loss Risk | Use Case |
|--------|-------|-------------|----------------|----------|
| Write-Through | Slow | Strong | Low | Critical data, payments |
| Write-Behind | Fast | Eventual | Medium | Offline-first, drafts |
| Write-Around | Medium | Varies | Low | Simple CRUD |

## Invalidation: the hard part

Adding a cache is easy. Knowing when to clear it is the real design challenge.

Phil Karlton famously said there are only two hard things in computer science: cache invalidation and naming things. He wasn't joking. Incorrect invalidation causes stale data bugs that are intermittent, hard to reproduce, and erode user trust.

### Time-based (TTL)

Data expires after a fixed duration. Simple to implement, but blunt. If TTL is too long, users see stale data. If too short, you lose the cache benefit.

Tuning depends on data change frequency and staleness tolerance. A product description might have a 1-hour TTL. A notification count might have 30 seconds. A user's avatar might cache for days.

### Event-based (active invalidation)

Invalidate when you know data changed. After a mutation, invalidate the related queries. More precise than TTL, but requires modeling dependencies explicitly.

The risk: miss an invalidation, and the cache is permanently stale until TTL expires or the user refreshes. This is why explicit dependency maps are essential.

### Version-based (ETags)

The cache includes a version identifier. On each request, check if the version changed. If not, return the cached data. If so, fetch fresh.

Conditional requests (`If-None-Match` with an ETag) are efficient: the server returns 304 Not Modified with no body if the data hasn't changed. You validate freshness without transferring the payload again.

### Manual/on-demand

Pull-to-refresh. Logout invalidation. The user or app explicitly triggers a cache clear. This is the escape hatch when automatic strategies fail.

## Modeling invalidation dependencies

Event-based invalidation only works if you can name which cache keys depend on which mutations. This requires explicit modeling.

**Dependency maps:** Define relationships upfront.

```javascript
const INVALIDATION_MAP = {
  createPost: (post) => [
    ['posts', 'list'],
    ['user', post.authorId, 'posts'],
    ['feed'],
  ],
  updatePost: (postId) => [
    ['post', postId],
    ['posts', 'list'],
  ],
  deletePost: (postId, authorId) => [
    ['post', postId],
    ['posts', 'list'],
    ['user', authorId, 'posts'],
  ],
}

async function mutate(type, fn, ...args) {
  const result = await fn(...args)
  const keys = INVALIDATION_MAP[type]?.(...args) ?? []
  keys.forEach(key => queryClient.invalidateQueries({ queryKey: key }))
  return result
}
```

**Entity tagging:** Tag queries with the entities they contain.

```javascript
const { data } = useQuery({
  queryKey: ['product', productId],
  queryFn: () => fetchProduct(productId),
  meta: { tags: [`product:${productId}`, 'products'] }
})

// On mutation, invalidate by tag
async function updateProduct(productId, data) {
  await api.updateProduct(productId, data)
  queryClient.invalidateQueries({
    predicate: (query) =>
      query.meta?.tags?.includes(`product:${productId}`)
  })
}
```

Document these relationships explicitly. Undocumented invalidation logic is a bug waiting to happen.

## Cache keys: the schema you don't think about

A cache key is the identifier for stored data. It must be unique for unique data, and identical for requests that should share cache.

**Key patterns:**

```javascript
// Simple resource
['user', userId]

// Resource with parameters
['users', { page: 1, filter: 'active', sort: 'name' }]

// Dependent resource
['posts', postId, 'comments']

// User-scoped (response varies by user)
['recommendations', currentUserId]
```

**Normalization prevents fragmentation.** The requests `/users?page=1&sort=name` and `/users?sort=name&page=1` should share a cache entry. If your keys include raw query strings, you get fragmentation—the same data stored under multiple keys.

```javascript
function normalizeParams(params) {
  const sorted = Object.keys(params).sort()
  return sorted.reduce((acc, key) => {
    if (params[key] !== undefined && params[key] !== DEFAULT_VALUES[key]) {
      acc[key] = params[key]
    }
    return acc
  }, {})
}
```

**Include all factors that affect the response.** If the API returns different data based on the Authorization header, include the user ID in your cache key. Otherwise, you risk serving User A's cached data to User B.

## Concurrency: preventing thundering herds

Without coordination, caching systems create their own problems.

**Cache stampede:** A cache entry expires. 100 concurrent requests hit the origin simultaneously. The origin is overwhelmed. In frontend terms: 10 components mount, all requesting the same data, and 10 network requests fire.

**Tab storm:** User switches back to an app after it's been backgrounded. Every component refetches on focus. The server sees a burst of requests.

### Request deduplication

Multiple requests for the same key in flight should result in one network call. React Query, SWR, and Apollo do this automatically. This is the "single-flight" pattern—see *Asynchronous Operations* for how it differs from latest-wins and queue patterns. If building manually:

```javascript
const inFlight = new Map()

async function dedupedFetch(key, fetcher) {
  const keyStr = JSON.stringify(key)
  if (inFlight.has(keyStr)) {
    return inFlight.get(keyStr)
  }
  const promise = fetcher()
  inFlight.set(keyStr, promise)
  promise.finally(() => inFlight.delete(keyStr))
  return promise
}
```

### SWR with locking

Only one revalidation should be in flight at a time. If a revalidation is already running, don't start another.

```javascript
const revalidating = new Set()

async function swr(key, fetcher, cache) {
  const keyStr = JSON.stringify(key)
  const cached = cache.get(keyStr)

  if (cached) {
    if (!revalidating.has(keyStr)) {
      revalidating.add(keyStr)
      fetcher()
        .then(fresh => cache.set(keyStr, fresh))
        .finally(() => revalidating.delete(keyStr))
    }
    return cached
  }

  return fetcher().then(data => {
    cache.set(keyStr, data)
    return data
  })
}
```

### Jitter

When multiple clients might refetch at the same time (e.g., on a polling interval), add randomness to prevent synchronized requests:

```javascript
function scheduleRefetch(baseInterval) {
  const jitter = Math.random() * baseInterval * 0.2
  return baseInterval + jitter
}
```

## Security: when caching goes wrong

Caching bugs aren't just UX problems—they can be security incidents. *Security Boundaries* covers the broader context of trust boundaries and blast radius design.

### Shared vs. private caches

**Shared caches** (CDN, proxy caches) serve responses to multiple users. They must never cache user-specific content. Control this with `Cache-Control: private` or `Cache-Control: public`.

**Private caches** (browser HTTP cache) serve responses to a single user. They can cache user-specific content safely.

**The rule:** If the response contains user-specific data, it must include `Cache-Control: private` or `Cache-Control: no-store`. Missing this means the CDN might serve User A's response to User B.

```http
# User-specific response
GET /api/me
Cache-Control: private, max-age=60

# Shared content
GET /api/products/123
Cache-Control: public, max-age=3600
```

### The Vary header

`Vary` tells caches that the response depends on specific request headers. Without proper `Vary`, shared caches might key responses incorrectly.

```http
# Response varies by auth
GET /api/dashboard
Vary: Authorization
Cache-Control: private, max-age=60

# Response varies by language
GET /api/content
Vary: Accept-Language
Cache-Control: public, max-age=3600
```

If you don't `Vary` on Authorization but your API returns user-specific data, a shared cache might serve cached responses to the wrong users.

### Authorization and cookies

Cookies and Authorization headers are implicit cache key inputs. A response that varies by auth but doesn't declare it is a security bug.

**Dangerous:**
```http
GET /api/recommendations
Cache-Control: max-age=300
# No private, no Vary
# CDN might cache User A's recommendations and serve to User B
```

**Safe:**
```http
GET /api/recommendations
Cache-Control: private, max-age=300
Vary: Authorization
```

In application code, include user context in cache keys when needed:

```javascript
const { data } = useQuery({
  queryKey: ['recommendations', currentUserId],
  queryFn: fetchRecommendations,
})
```

## Observability: knowing what's cached

"We're not sure if this is cached" should be a solved problem. *Observability* covers the broader telemetry pipeline and debugging workflows.

### Identifying cache layers

**Browser DevTools (Network panel):**
- "from disk cache" or "from memory cache" indicates an HTTP cache hit
- "from ServiceWorker" means the SW served from CacheStorage
- "(ServiceWorker)" in the initiator column means the SW intercepted the request
- The Size column shows actual transfer vs. cached

**Response headers to check:**
```http
# CDN cache status (varies by provider)
X-Cache: HIT
CF-Cache-Status: HIT
Age: 120

# Server timing for debugging
Server-Timing: cdn;desc="HIT", origin;dur=0
```

**Application cache state:**
```javascript
const { data, isStale, isFetching, dataUpdatedAt } = useQuery(...)

console.log({
  isFromCache: !isFetching && !!data,
  isStale,
  cacheAge: Date.now() - dataUpdatedAt,
})
```

### Debugging checklist

**When data seems stale:**
1. Check DevTools Network—is the response from cache?
2. Check response `Cache-Control` headers
3. Check if Service Worker is intercepting
4. Check application cache (React Query DevTools)
5. Check CDN cache status headers

**When cache isn't working:**
1. Check if `Cache-Control` allows caching
2. Check for `Vary` header mismatches
3. Check if cache key is fragmenting (different params)
4. Check if mutations are properly invalidating

## The trade-offs

### Freshness vs. performance

This is the fundamental tension. Fresh data requires network requests—slower and bandwidth-intensive. Cached data is fast but potentially stale.

**Decision factors:**
1. How often does this data change?
2. What's the cost of staleness?
3. Can the user tell?

For product descriptions that change weekly, cache aggressively. For stock prices that change every second, barely cache at all. For notification counts, cache briefly and show indicators when stale.

### Memory vs. persistent vs. HTTP

**Memory caching:** Instant access, no I/O. But lost on refresh, consumes heap, limited to 50-500MB practically.

**Persistent storage (IndexedDB):** Survives refresh, available offline, large capacity. But async access, storage limits, and API complexity.

**HTTP caching:** Survives refresh, shared across tabs, managed by browser. But still requires network roundtrip for validation.

Choose based on access patterns. High-frequency access within a session: memory. Must survive refresh or work offline: persistent. Static assets shared across users: HTTP/CDN.

### Complexity vs. correctness

**Simple caching (TTL only):** Easy to implement, predictable. But either data is stale or you're refetching unnecessarily.

**Smart caching (invalidation + SWR + normalization):** Fresh when needed, efficient. But complex logic, more potential bugs, harder to debug.

Every cache layer adds complexity. Every invalidation rule adds complexity. Sometimes "just refetch" is the right answer—simpler and correct. The question is whether users will notice the latency—see *Human Perception* for when the perception budget allows network round-trips.

## Patterns

### Optimistic cache updates with rollback

Update the cache immediately on mutation, before the server confirms. Snapshot current state for rollback.

```javascript
async function likePost(postId) {
  const previous = queryClient.getQueryData(['post', postId])

  queryClient.setQueryData(['post', postId], old => ({
    ...old,
    likeCount: old.likeCount + 1,
    liked: true
  }))

  try {
    const result = await api.likePost(postId)
    queryClient.setQueryData(['post', postId], result)
  } catch (error) {
    queryClient.setQueryData(['post', postId], previous)
    throw error
  }
}
```

### Cache warming

Pre-populate the cache before users need the data. Prefetch on hover, on likely navigation paths, or based on behavioral prediction.

```javascript
function ProductLink({ productId, children }) {
  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', productId],
      queryFn: () => fetchProduct(productId),
      staleTime: 60_000,
    })
  }

  return (
    <Link
      to={`/product/${productId}`}
      onMouseEnter={prefetch}
      onFocus={prefetch}
    >
      {children}
    </Link>
  )
}
```

Don't prefetch aggressively. Respect data caps. Only prefetch cache-appropriate data.

## Anti-patterns

### Caching without invalidation strategy

Adding caching without planning invalidation leads to permanently stale data. The symptom: "Have you tried clearing your cache?" becomes a support response.

Before adding cache, document: What triggers invalidation? What's the maximum acceptable staleness? How will you know if invalidation is broken?

### Ignoring HTTP cache when using application cache

You implement React Query but ignore what HTTP headers the API returns. Your app invalidates the query, but `fetch()` returns a stale HTTP-cached response.

```javascript
// App thinks it's refetching
queryClient.invalidateQueries(['user'])
// But response has Cache-Control: max-age=3600
// Browser returns stale HTTP cache hit
```

Coordinate with backend on cache headers. Use `cache: 'no-cache'` in fetch to force revalidation when needed.

### User-specific data in shared caches

Missing `Cache-Control: private` or `Vary: Authorization` means user A's data might be served to user B. This is intermittent (only when the cache is warm), hard to reproduce, and a privacy violation.

## Real-world scenario: e-commerce product catalog

**The situation:** Product listing and detail pages are CDN-cached. Prices and inventory change frequently. Product descriptions change rarely.

**The correctness invariant:** Displayed price must match checkout price. Users must not be charged more than what was shown.

**Strategy shaped by the invariant:**

Product info (name, description, images): CDN cache, 1-hour TTL. Staleness is cosmetic.

Price and inventory: Either no CDN cache (fetch fresh on each view), or cache with short TTL plus client-side verification before checkout.

```javascript
async function initiateCheckout(cart) {
  const currentPrices = await api.getPrices(cart.items.map(i => i.productId))

  const priceChanges = cart.items.filter(item =>
    item.displayedPrice !== currentPrices[item.productId]
  )

  if (priceChanges.length > 0) {
    return showPriceChangeModal(priceChanges)
  }

  return proceedToPayment(cart)
}
```

The trade-off: complexity at checkout enables aggressive caching elsewhere. The correctness invariant is enforced at the point of commitment, not at every display.

## Real-world scenario: offline-first notes

**The situation:** Users create and edit notes. The app must work offline. Notes sync across devices.

**Cache layer mapping:**

| Layer | Contents | Purpose |
|-------|----------|---------|
| Memory | Currently open note | Instant access while editing |
| IndexedDB | All user's notes | Primary storage, survives refresh, offline access |
| Service Worker | App shell, assets | Enables offline launch |
| Server | Sync target | Cross-device source of truth |

**Write path:**

```javascript
async function saveNote(note) {
  memoryCache.set(note.id, { ...note, status: 'local' })

  await db.notes.put({
    ...note,
    pendingSync: true,
    localUpdatedAt: Date.now()
  })

  if (navigator.onLine) {
    syncQueue.add(note.id)
  }
}
```

IndexedDB is the primary store. The server is the sync target. Conflicts are resolved on sync—either last-write-wins or surfaced to the user. See *Consistency Models & Failure Handling* for reconciliation strategies and conflict detection using version vectors.

## Design review checklist

**Cache Placement:**
- Which cache layers are you using?
- For each data type, which layer is appropriate?
- Are layers coordinated?

**Invalidation:**
- Is invalidation strategy documented for each cached entity?
- What's the maximum time a user might see stale data?
- Are mutation → invalidation dependencies explicit?

**Cache Keys:**
- Are keys unique for unique data?
- Are keys normalized (param order, defaults removed)?
- Do keys include all factors that affect the response?

**Security:**
- Is user-specific data marked `Cache-Control: private`?
- Are `Vary` headers correct for headers that affect response?
- Is there a correctness invariant for critical data?

**Concurrency:**
- Is request deduplication in place?
- Are focus/refetch storms handled?

**Observability:**
- Can you determine which cache layer served a response?
- Is cache hit/miss ratio tracked?

## Red flags

- "We cache everything for 24 hours" — One-size-fits-all TTL ignores data diversity
- "Just add a cache-buster param" — Symptom of broken invalidation
- "Users need to hard refresh" — Cache not invalidating properly
- "It works locally but not in production" — CDN cache not considered
- "We're not sure if this is cached" — Missing observability

## Key takeaways

- **Caching is lifecycle design.** You're designing how data ages, when it expires, and what guarantees you make about freshness.
- **Response caches and data stores are different.** HTTP cache stores responses by URL. React Query stores data by keys you define. They don't coordinate automatically.
- **Invalidation is the hard part.** Adding a cache is easy. Knowing when to clear it requires explicit dependency modeling.
- **SWR is the right default—with guardrails.** Stale-while-revalidate works for most data. Financial and audit-sensitive data needs stricter freshness.
- **Security is a caching concern.** Wrong headers can leak data across users.
- **Observability is not optional.** If you can't tell what's cached, you can't debug caching problems.

Before caching anything, ask: "What's the correctness invariant for this data, and how will I know when the cache is wrong?"

---

## Further reading

- [HTTP Caching — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) — The authoritative reference for `Cache-Control`, `ETag`, `Vary`, and conditional requests; understand these before designing any cache layer.
- [High Performance Browser Networking — Ilya Grigorik](https://hpbn.co/) — Freely available online; deep-dive into the browser's cache hierarchy, HTTP/2 optimizations, and network-level caching behavior.
- [Workbox Documentation](https://developer.chrome.com/docs/workbox/) — Google's toolkit for Service Worker caching, making it straightforward to implement cache-first, network-first, and stale-while-revalidate strategies.
- [TanStack Query Documentation](https://tanstack.com/query/latest) — Application-level cache with built-in SWR, background refetching, request deduplication, and fine-grained invalidation patterns.

---

## Frequently Asked Questions (FAQs)

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

*Serve content instantly and keep it fresh with smart caching — build faster frontends with [Bitloops](https://bitloops.com).*
