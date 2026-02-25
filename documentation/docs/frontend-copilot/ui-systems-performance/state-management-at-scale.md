---
sidebar_position: 2
sidebar_label: State Management at Scale
title: "State Management as Replication: Sources of Truth, Sync, and Conflict Resolution"
description: "State management isn't Redux vs. Zustand—it's replication design. Learn sources of truth, client-server sync, cross-tab coordination, and conflict resolution patterns."
keywords:
  [
    react state management patterns,
    frontend state architecture,
    client server state sync,
    zustand vs redux vs tanstack query,
    cross tab state synchronization,
    state replication frontend,
    optimistic state updates,
    source of truth frontend,
  ]
---

# State as a System

State management isn't about Redux vs. Zustand vs. Context. It's about answering a more fundamental question: **What is the source of truth, and how do I keep everything synchronized with it?**

Here's the insight that changes how you think about this problem: frontend state management is replication design. You're constantly replicating server data to the client, keeping replicas fresh, and resolving conflicts when they diverge. This is the same problem that database engineers have been solving for decades—you're just solving it in the browser.

## The browser as a distributed system

Backend engineers think about databases, replication, and consistency guarantees. Frontend engineers face identical problems across different substrates: server responses, client memory, URL parameters, localStorage, IndexedDB, and service workers. The browser is a distributed system with multiple "nodes" that can hold conflicting versions of data.

Consider the concrete mapping:

| Distributed Systems Concept | Browser Equivalent |
|----------------------------|-------------------|
| Nodes | Tabs, iframes, Web Workers, Service Workers |
| Communication channels | BroadcastChannel, postMessage, storage events |
| Network partition | Offline, slow connection, failed requests |
| Coordination service | None built-in (you must design your own) |
| Persistence layer | localStorage, IndexedDB, Cache API |

The CAP theorem applies directly. Partition tolerance isn't optional—the network *will* fail. Requests time out. Users go offline. Given that partitions happen, you must choose between availability and consistency:

- **Show stale cached data immediately** (available, not perfectly consistent)
- **Block UI until fresh data arrives** (consistent, not available during fetch)
- **Queue mutations offline for later sync** (available, eventually consistent)—see *Consistency Models & Failure Handling* for the intent preservation pattern that makes this work

Every refresh, every tab, every network hiccup is a potential consistency problem.

---

## What makes frontend different

Three factors distinguish frontend state management from backend replication:

1. **Perception matters.** Users see the state directly. Inconsistency isn't just a log entry—it's a broken UI. When a user's cart shows 3 items in one tab and 4 in another, they notice.
2. **No default conflict resolver.** The browser provides coordination primitives (BroadcastChannel, storage events, Service Workers), but no automatic consistency or consensus. You must design conflict resolution yourself.
3. **The user is an actor.** Unlike batch processing or queue-based backends, users generate mutations constantly—typing, clicking, dragging. Every user action is a potential write that must be coordinated.

## The four sources of truth

Every frontend application deals with four categories of state. Understanding what each one *is* determines how you should manage it.

### 1) Server state (authoritative)

This is the canonical data that lives on the backend. User profiles, product catalogs, order history—data that must persist and be shared across sessions and devices.

Server state is authoritative, but by the time it arrives at the client, it's already stale. The moment you receive a response, someone else might be modifying that data on the server. This is the fundamental tension of client-server architecture.

### 2) Client state (authoritative for UI)

UI-specific data that doesn't exist on the server: modal open/closed, form in-progress values, drag position, undo stacks. This state is ephemeral—it doesn't need to survive a page refresh.

Client state is authoritative for its domain. There's no need to sync a tooltip's visibility to the server. The mistake is mixing client state with server state management tools, which adds complexity without benefit.

### 3) URL state (shared and shareable)

State that should be bookmarkable and shareable: search filters, pagination, selected tabs, view modes. URL state must be serializable and survives refresh. It affects the browser's back button.

The URL is an underutilized state manager. For state that users might want to share or return to, the URL is the right owner.

### 4) Cache state (non-authoritative)

Previously-fetched server data held locally. React Query cache, Apollo cache, service worker cache—these are **replicas** of server state, not competing sources of truth.

This distinction matters. Cache is a performance optimization. It can be stale. It can be invalidated. Treating cache as authoritative leads to bugs where stale data overwrites fresh data, or where cache updates don't trigger re-fetches when they should.

---

## Ownership: the most important concept

Every piece of data needs exactly one owner—the source that can modify the data and is responsible for its correctness. Readers can have copies (replicas), but replicas must not diverge from the owner indefinitely.

The most common state management mistake is multiple components each fetching and storing the same data independently. This creates uncoordinated replicas that inevitably diverge.

- **Server-owned data:** The client reads a replica, sends mutations, and waits for confirmation (or optimistically updates the replica while the mutation is in flight).
- **Client-owned data:** The client is the source of truth. The server may persist it as a backup, but the client version is canonical.
- **URL-owned data:** The URL is the source of truth. Components read from it and write to it through navigation.
- **Hybrid ownership:** The server owns the canonical version, but the client owns speculative or in-flight mutations until confirmed.

---

## Consistency guarantees that matter

Distributed systems literature has precise vocabulary for consistency. These guarantees translate directly to UI behavior—and to UI bugs when violated.

### a) Read-your-writes

After you write, you immediately see your write. Violation: "I submitted a comment but it's not showing up." This is the minimum expectation users have. If they perform an action, they expect to see the result.

**Implementation:** Optimistic updates (see *Consistency Models & Failure Handling* for patterns), or immediate cache updates after mutation confirmation.

### b) Monotonic reads

You never see older data after seeing newer data. Violation: "The count was 5, now it's 3, now it's 5 again." This makes users distrust the interface.

**Implementation:** Track version numbers. Reject responses with older versions than what you've already displayed.

### c) Bounded staleness

Data is at most X seconds or X versions old. Violation: "This shows yesterday's prices." Users need to know they can trust what they see.

**Implementation:** Stale-while-revalidate with max-age. Show "last updated" timestamps. Trigger re-fetch when data exceeds staleness threshold.

### d) Causal consistency

If A caused B, you see A before B. Violation: "I see the reply but not the parent comment." This creates confusing, incoherent interfaces.

**Implementation:** Include parent references. Order by logical timestamps, not wall-clock time.

### e) Eventual convergence

All replicas eventually agree. Violation: "My two tabs show different cart contents." This is particularly noticeable in multi-tab scenarios.

**Implementation:** Cross-tab synchronization. Background revalidation. Shared cache with invalidation broadcasts.

---

## Race conditions: the #1 bug source

Race conditions cause the most subtle and hard-to-reproduce frontend bugs. The "UI briefly shows wrong data" class of issues almost always traces back to responses arriving out of order, stale closures, or missing cancellation.

**Asynchronous Operations** covers these patterns in depth—operation scopes, commit guards, and the latest-wins pattern that prevents stale results from corrupting state.

### Stale response overwrites fresh data

User types "react" then "redux". The "react" request takes 500ms; "redux" takes 100ms. Without guards, "redux" results arrive first, then "react" results overwrite them—showing results for the wrong query.

### Stale closure captures old state

A closure captures `count = 5`. User clicks, count becomes 6. The async callback runs with the stale value of 5. State goes backward.

### Duplicate requests on rapid interaction

User clicks "Submit" twice quickly. Two identical mutations are sent. Data is duplicated or corrupted.

---

## Preventing race conditions

**Request cancellation** aborts in-flight requests when inputs change:

```javascript
const controller = useRef(null)

async function search(query) {
  controller.current?.abort()
  controller.current = new AbortController()

  try {
    const results = await fetch(`/search?q=${query}`, {
      signal: controller.current.signal
    })
    setResults(await results.json())
  } catch (e) {
    if (e.name !== 'AbortError') throw e
  }
}
```

**Sequence numbers** ensure only the latest response updates state:

```javascript
const requestIdRef = useRef(0)

async function fetchData() {
  const thisRequestId = ++requestIdRef.current
  const data = await api.fetch()

  if (thisRequestId === requestIdRef.current) {
    setState(data)
  }
}
```

**Idempotency keys** make mutations safe to retry (see *Consistency Models & Failure Handling* for the full intent preservation pattern):

```javascript
const idempotencyKey = `${userId}-${action}-${timestamp}`
await api.submit({ data, idempotencyKey })
// Server deduplicates by key
```

**Request deduplication** prevents duplicate in-flight requests:

```javascript
const inFlight = new Map()

function dedupedFetch(key, fetcher) {
  if (inFlight.has(key)) return inFlight.get(key)
  const promise = fetcher()
  inFlight.set(key, promise)
  promise.finally(() => inFlight.delete(key))
  return promise
}
```
---

## Conflict resolution strategies

Conflicts happen when user edits while disconnected and reconnects, two tabs modify the same data, an optimistic update conflicts with the server response, or two requests race and responses arrive out of order.

1. **Last-write-wins** is simple but silently loses data. Use only when data loss is acceptable.
2. **Server-always-wins** discards local changes on conflict. Safe but frustrating for users who lose work.
3. **Merge strategies** combine changes rather than choosing one. Field-level merge works when different fields change. Set union works when both sides add items. This requires semantic understanding of your data.
4. **User-decides** presents the conflict and lets the user resolve it. Use sparingly—only when automatic resolution is impossible. Good for document version conflicts; bad for routine operations.
5. **Version vectors and ETags** detect conflicts so you can choose how to resolve them. The server rejects stale writes, forcing the client to fetch current state before retrying.

---

## The trade-offs

### Single store vs. distributed state

A single store (Redux-style) gives you one place to look, time-travel debugging, and predictable updates. But it adds boilerplate, forces everything through one bottleneck, and doesn't naturally handle async server state. The failure mode is global re-renders on unrelated changes and over-coupling between features.

Distributed state (co-located with components) means state lives near where it's used. It's easier to reason about locally and better for code-splitting. But it's harder to share across components and creates potential for uncoordinated duplicates. The failure mode is the same data fetched and stored in multiple places with no synchronization.

**Decision framework:** How often do distant parts of the UI need to read or write the same data? If frequently, centralize that specific state. If rarely, keep state local. You don't have to choose one approach for everything.

### Normalized vs. denormalized

Normalized storage keeps entities by ID and references by ID. A user entity exists in one place; posts reference `authorId`. Updates propagate automatically because there's only one copy. But selectors become complex, denormalization happens on every read, and hydrating from API responses takes more work.

Denormalized storage keeps data as received from the API. A post contains the full author object nested inside. Reads are simple and match the API shape. But the same entity exists in multiple places, and updates must find all copies. Miss one, and the UI becomes inconsistent.

**Decision framework:** How often is the same entity displayed in multiple places simultaneously? If a user's avatar appears in the header, comment list, and profile sidebar, normalize. If pages are standalone with no entity overlap, denormalize for simplicity.

### Server-authoritative vs. optimistic

Server-authoritative means the client sends a mutation, waits for the response, then updates the UI. The UI is always correct, and the mental model is simple. But it feels slow, and the UI is blocked during the request.

Optimistic updates mean the client updates the UI immediately, sends the mutation, then reconciles the response. This feels instant and creates great UX for most operations. But you must handle rollback on failure, and you might briefly show incorrect data.

**Decision framework:** Consider three factors. How often does the operation fail? If less than 1%, optimistic is safe. How bad is temporarily wrong state? A wrong like count is fine; a wrong account balance is not. How jarring is rollback? Removing a toast is invisible; removing a submitted comment is not. *Human Perception* provides an optimism risk rubric that formalizes this: low stakes (fully optimistic), medium stakes (optimistic with pending indicator), high stakes (pessimistic).

---

## Patterns

### Server state separation

Treat server state fundamentally differently from client state. Use dedicated tools for server state (React Query, SWR, Apollo). These handle caching, deduplication, background refetching, stale detection, and garbage collection.

Server state has a different lifecycle than client state:

```
idle → loading → error | success(fresh) → stale → revalidating → success(fresh)
```

Client state has a simpler lifecycle:

```
initial → set → read → reset
```

Mixing them creates confusion about ownership, staleness, and when to refetch.

### URL as state manager

Use the URL for state that should be shareable or survive refresh. Filters, search queries, pagination, selected items, view modes, sort orders—these belong in the URL.

What doesn't belong in the URL: sensitive data (tokens, PII), large data (base64 blobs), high-frequency state (cursor position, scroll offset), or ephemeral UI state (tooltip visibility).

Debounce URL updates. Don't update on every keystroke in a search input. Canonicalize URL parameters to prevent duplicate history entries.

### Optimistic update with rollback

Save current state as a rollback point. Apply the optimistic update immediately. Send the mutation. On success, confirm (and maybe update with the server response if it differs). On failure, rollback to saved state and show an error.

```javascript
async function toggleLike(postId) {
  const previousState = queryClient.getQueryData(['post', postId])

  queryClient.setQueryData(['post', postId], old => ({
    ...old,
    liked: !old.liked,
    likeCount: old.liked ? old.likeCount - 1 : old.likeCount + 1
  }))

  try {
    const result = await api.toggleLike(postId)
    queryClient.setQueryData(['post', postId], result)
  } catch (error) {
    queryClient.setQueryData(['post', postId], previousState)
    showError('Failed to update. Please try again.')
  }
}
```

### Cross-tab coordination

Use browser primitives to keep tabs synchronized. The `storage` event fires in other tabs when localStorage changes. BroadcastChannel provides explicit messaging between same-origin tabs. See *Security Boundaries* for why logout must propagate across tabs immediately.

Critical for logout: when a user logs out in one tab, all tabs must handle it immediately. Stale tabs with cached auth can make requests that fail or expose data they shouldn't.

```javascript
// Trigger logout in other tabs
function logout() {
  clearAuthToken()
  localStorage.setItem('logout-event', Date.now().toString())
  localStorage.removeItem('logout-event')
}

// Listen in other tabs
window.addEventListener('storage', (event) => {
  if (event.key === 'logout-event') {
    clearLocalState()
    router.push('/login')
  }
})
```

## Anti-patterns

### Prop drilling as state management

Passing state through many component layers instead of lifting or using context creates tight coupling, makes refactoring painful, and causes unnecessary re-renders. Components in the middle don't care about the data they're passing.

Use context for truly global state (theme, auth, locale). Use composition—passing components instead of data. Co-locate state closer to where it's used. Use server state tools that provide cache access anywhere.

### Duplicating server state

Fetching the same data in multiple components and storing it separately means the same data exists in multiple uncoordinated replicas. Updates in one place don't propagate. Wasted network requests. Inconsistent UI.

Use server state management with a shared cache. Multiple components requesting the same data should result in one request and one cached response that all components read.

### Global state for everything

Putting all state in a global store "just in case" creates unnecessary coupling between features, makes components harder to test, and causes performance issues from unnecessary re-renders.

Start local. Elevate only when needed. Most state should be component-local (`useState`) or feature-local (context at the feature boundary). Only truly shared data needs global treatment.

## Real-world scenario: multi-tab session with logout

Consider an application open in three tabs. The user logs out in Tab 1. Tabs 2 and 3 must handle this immediately.

Session invalidation is a cross-tab consistency problem. Stale tabs with cached auth can make requests that fail with 401 errors—or worse, succeed with data they shouldn't see if the user switched accounts.

```javascript
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'logout-event') {
        setUser(null)
        queryClient.clear()
        router.push('/login')
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const logout = async () => {
    await api.logout()
    setUser(null)
    queryClient.clear()
    localStorage.setItem('logout-event', Date.now().toString())
    localStorage.removeItem('logout-event')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

Also handle: tab becomes visible, check if session is still valid. On 401 response, trigger logout in all tabs. On token refresh, update the token in all tabs.

## Design review checklist

**Source of Truth**
- For each piece of data, can you name exactly one authoritative owner?
- Is cache explicitly treated as a replica, not as an authority?
- Is server state separated from client state?

**Consistency Guarantees**
- Do users see their own writes immediately?
- Can data "go backwards," showing older values after newer ones?
- How stale can each data type be before UX suffers?

**Race Conditions**
- Are in-flight requests cancelled when inputs change?
- Is there protection against stale responses overwriting fresh data?
- Are mutations idempotent (safe to retry)?

**Multi-Tab Behavior**
- Does state need to sync across tabs? Which state?
- What happens if the user logs out in one tab?
- Can two tabs make conflicting edits? How is this resolved?

## Red flags

- "I don't know where this data comes from" — Ownership is unclear
- "We fetch the same data in three places" — Missing shared cache
- "The UI flashes wrong data briefly" — Race condition
- "Changes don't show up until refresh" — Cache not invalidating
- "It works until you open two tabs" — No cross-tab sync
- "The old results appear after the new ones" — Missing request cancellation

## Key takeaways

- **State management is replication design.** You're replicating server data to the client, keeping replicas fresh, and resolving divergence when they conflict.
- **Ownership is everything.** Every piece of data needs exactly one authoritative source. Cache is a replica, not an authority.
- **Consistency guarantees matter.** Read-your-writes, monotonic reads, and bounded staleness are UI requirements, not abstract theory.
- **Race conditions are the #1 bug source.** Request cancellation, sequence guards, and deduplication are essential, not optional.
- **Server state is not client state.** They have different lifecycles, different tools, and different mental models.
- **The URL is an underused state manager.** For shareable, bookmarkable state, the URL is the right owner.

Before writing state management code, ask: "Who owns this data, how will I keep replicas fresh, and what happens when they conflict?"

---

## Further reading

- [Local-First Software — Ink & Switch](https://www.inkandswitch.com/local-first/) — The seminal paper on offline-first, CRDT-based applications; rethinks data ownership and sync without a central server as gatekeeper.
- [Consistency Models — Jepsen](https://jepsen.io/consistency) — A rigorous, visual map of consistency guarantees and their relationships, giving you precise vocabulary for the state trade-offs in this document.
- [CAP Theorem — Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem) — The foundational impossibility result explaining why you must choose between consistency and availability during network partitions.
- [TanStack Query Documentation](https://tanstack.com/query/latest) — The most widely-used server state library for React, with built-in caching, deduplication, background refetching, and stale detection patterns.

---

## Frequently Asked Questions (FAQs)

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

## Frequently Asked Questions (FAQs)

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

*Tame state complexity and keep your data consistent across every tab and component with [Bitloops](https://bitloops.com) — your AI-powered frontend copilot.*
