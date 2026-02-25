---
sidebar_position: 9
sidebar_label: Consistency & Failure Handling
title: "Frontend Consistency: Optimistic UI, Offline-First Patterns, and Intent Preservation"
description: "Networks fail. Users go offline. Learn optimistic UI, intent preservation with idempotency keys, offline queues, and reconciliation strategies for resilient frontends."
keywords:
  [
    optimistic ui react,
    offline first web app,
    idempotency key frontend,
    intent preservation pattern,
    frontend error handling,
    conflict resolution frontend,
    eventual consistency ui,
    retry queue javascript,
  ]
---

# Consistency models for the browser

Every distributed system must choose between availability and consistency. Frontend applications are distributed systems where one node—the user's browser—has unreliable connectivity to all other nodes. This isn't an edge case to handle; it's the default operating condition.

## Core mental model

**State = projection of commands under unreliable delivery.**

This builds directly on *State Management at Scale*—the browser as a distributed system, with the client as a replica of server state. This single idea unifies:
- Optimistic UI (apply command locally, project expected result)
- Offline queues (store commands, replay when connected)
- Retries (same command, multiple delivery attempts)
- Deduplication (same command should produce same result)
- Reconciliation (merge projected state with confirmed state)

Every pattern in this document is a variation on this theme.

## What makes frontend unique

- **The user is watching.** Failures must be communicated, not just logged.
- **Rollback is visible.** Undoing an optimistic update feels worse than waiting.
- **Partial success is common.** Some data loads, some doesn't.
- **Intent preservation matters.** The user's action should "stick" even under failure.

## Failure model cheat sheet

Before diving into patterns, establish a unified vocabulary.

| Category | Examples | Default UX | Retryable? |
|----------|----------|------------|------------|
| **Transport failures** | Timeout, DNS failure, offline | "Connection issue" + retry | Yes, with backoff |
| **Server failures** | 500, 502, 503, 504 | "Something went wrong" + auto-retry | Yes, with backoff |
| **Application rejections** | 400, 403, 404, 422 | Specific error + guidance | No (fix request first) |
| **Auth failures** | 401, token expired | Silent refresh → retry | Yes, after token refresh |
| **Rate limiting** | 429 | Backoff per Retry-After | Yes, after delay |
| **Concurrency anomalies** | Out-of-order responses, races | Version-gating | N/A (prevention) |
| **Consistency conflicts** | Version mismatch, concurrent writes | Merge or server-wins | Depends on strategy |

**Key distinctions:**
- **Transient vs. Permanent:** Network hiccup (retry likely succeeds) vs. validation error (retry won't help)
- **Silent vs. Visible recovery:** User doesn't need to know vs. user needs to act

## Opinionated defaults

Rather than just cataloging options, here are recommended defaults:

### Default read consistency: read-your-writes + monotonic reads
- User always sees their own changes immediately
- User never sees data go "backwards" (no time travel)
- Implementation: Version-gating on all reads

### Default write strategy: optimistic for reversible, pessimistic for irreversible
- **Optimistic:** Toggle, like, add to cart, draft save
- **Pessimistic:** Payment, delete account, publish, external consequences
- **Rule:** If rollback would confuse or harm the user, wait for confirmation

### Default failure UX: show stale with age + targeted retry
- Show cached/stale data with staleness indicator
- Failed sections show inline retry, not modal
- Never show blank screen if you have any data

## Consistency models

*Distributed Systems* covers these models as they apply to CDN caching. Here we focus on client-side state.

### Strong consistency
Every read reflects the most recent write. Wait for server confirmation before showing any change.

**When to use:** Financial transactions, inventory counts, anything where showing wrong data is worse than waiting.

**Cost:** Perceived latency, blocked UI.

### Eventual consistency
Updates propagate asynchronously; reads may return stale data temporarily. This is the default reality—server and client drift apart.

**When to use:** Most content, social features, non-critical data.

**Cost:** Must handle stale reads gracefully.

### Causal consistency
Operations that are causally related appear in order; concurrent operations may appear in any order. If operation B depends on A's result, everyone sees A before B.

**Frontend friendly subset:** Read-your-writes + monotonic reads (no time travel).

**When to use:** Collaborative editing, comment threads, messaging.

## Version-based monotonicity

**Timestamps are unreliable. Versions are reliable.**

### Why timestamps fail
- Client clocks drift (sometimes by minutes)
- Server clocks can disagree
- Network latency makes "wall clock time" meaningless

### Version-based approach

**Server-issued versions:**

```javascript
{
  id: "123",
  data: { ... },
  version: 47,  // or ETag, or revision ID
  updatedAt: "2024-01-15T..."  // informational, not for ordering
}
```

**Client tracks versions:**

```javascript
const versions = new Map()

function updateIfNewer(resourceId, newData, newVersion) {
  const currentVersion = versions.get(resourceId) ?? 0

  if (newVersion > currentVersion) {
    versions.set(resourceId, newVersion)
    setState(resourceId, newData)
    return true
  }

  // Reject stale update
  console.log(`Ignoring stale response: v${newVersion} < v${currentVersion}`)
  return false
}
```

### "No time travel" example

The problem: Infinite scroll where page 2 response arrives before page 1, or a refetch overwrites newer cache with older response.

```javascript
// BAD: Just replace state with whatever arrives
async function loadPage(pageNum) {
  const data = await fetch(`/items?page=${pageNum}`)
  setPageData(pageNum, data)  // Might overwrite newer data!
}

// GOOD: Version-gated updates
const feedVersion = { current: 0 }

async function loadPage(pageNum) {
  const { items, version } = await fetch(`/items?page=${pageNum}`)

  if (version >= feedVersion.current) {
    feedVersion.current = version
    setPageData(pageNum, items)
  }
  // Else: stale response, ignore
}
```

## Optimistic UI

Update the UI immediately as if the operation succeeded. Send the request in the background. Reconcile when the server responds. *Human Perception* provides the optimism risk rubric—matching optimism level to stakes.

### Why optimism matters
- Network latency is 100-500ms minimum; users notice delays > 100ms (see *Human Perception* for perception budgets)
- Waiting for confirmation makes apps feel sluggish
- Most operations succeed; optimizing for the happy path improves UX

### Anatomy of an optimistic update

```
1. User action (click, submit)
2. Immediately update local state (optimistic)
3. Send mutation to server
4. On success: confirm optimistic state, merge server changes
5. On failure: rollback optimistic state, notify user
```

### What can go wrong
- Server rejects the operation (validation, permissions, conflicts)
- Server returns different data than expected (concurrent modifications)
- Network fails entirely (no response)
- Request succeeds but response is lost

**Key insight:** Optimism is a bet. Bet on success for fast UX, but always design the rollback experience.

## Intent preservation pattern

This is the concrete architecture that makes "user's action should stick" real.

### Command log / intent queue

```javascript
const intent = {
  id: crypto.randomUUID(),        // Idempotency key
  type: 'ADD_TO_CART',
  payload: { productId: '123', quantity: 2 },
  createdAt: Date.now(),
  status: 'pending',              // pending | confirmed | failed
  attempts: 0
}

const intentLog = new PersistentStore('intents')  // IndexedDB

async function captureIntent(type, payload) {
  const intent = {
    id: crypto.randomUUID(),
    type,
    payload,
    createdAt: Date.now(),
    status: 'pending',
    attempts: 0
  }

  // 1. Persist intent (survives refresh/crash)
  await intentLog.add(intent)

  // 2. Apply optimistic state (projection)
  applyOptimistic(intent)

  // 3. Attempt delivery
  deliverIntent(intent)

  return intent.id
}
```

### State as projection

```javascript
function computeCurrentState(serverState, pendingIntents) {
  let state = serverState

  for (const intent of pendingIntents) {
    state = applyIntent(state, intent)  // Project pending changes
  }

  return state
}
```

### Intent delivery with idempotency

```javascript
async function deliverIntent(intent) {
  try {
    const result = await fetch('/api/command', {
      method: 'POST',
      headers: {
        'Idempotency-Key': intent.id  // Server deduplicates
      },
      body: JSON.stringify(intent)
    })

    if (result.ok) {
      await intentLog.update(intent.id, { status: 'confirmed' })
    } else if (result.status === 409) {
      await handleConflict(intent, result)
    } else {
      await intentLog.update(intent.id, { status: 'failed' })
      notifyUser(intent, result)
    }
  } catch (error) {
    intent.attempts++
    scheduleRetry(intent)
  }
}
```

### Why idempotency keys matter
- Network can fail after server processes but before client receives response
- Retry sends same intent again
- Server recognizes key, returns original result (doesn't double-process)
- Without this: duplicate orders, double charges, repeated actions

*Asynchronous Operations* covers delivery semantics—the frontend can guarantee at-most-once commit, but exactly-once effect requires server-side deduplication.

### Recovery on app restart

```javascript
async function recoverPendingIntents() {
  const pending = await intentLog.getByStatus('pending')

  for (const intent of pending) {
    applyOptimistic(intent)  // Restore optimistic state
    deliverIntent(intent)     // Retry delivery
  }
}
```

## Offline-first architecture

Assume the network is unavailable by default. Design for local-first operation, sync when possible. *Caching Strategies* covers the cache layers (IndexedDB, Service Worker, HTTP cache) that make offline-first possible.

### Offline capability spectrum

| Tier | What User Can Do | Reconnect Guarantee | Conflict Frequency |
|------|------------------|---------------------|-------------------|
| Read-only offline | View cached content | Automatic refresh | None |
| Queued mutations | Make changes (queued) | At-least-once delivery | Rare |
| Full offline-first | Full functionality | Exactly-once via idempotency | Common |

### Key components
1. **Local persistence:** IndexedDB, localStorage
2. **Intent queue:** Pending commands with idempotency keys
3. **Sync engine:** Detect connectivity, process queue
4. **Conflict resolution:** Strategy for when local and server diverge

### Service Worker's role (with caveats)

**Good for:** Caching static assets, serving from cache when offline.

**Background Sync limitations:**
- Not universally supported
- Can be delayed by browser
- **Recommendation:** Treat as enhancement, not backbone

**More reliable approach:**

```javascript
window.addEventListener('load', async () => {
  await recoverPendingIntents()
})

window.addEventListener('online', async () => {
  await processIntentQueue()
})

// Periodic check (backup)
setInterval(async () => {
  if (navigator.onLine) {
    await processIntentQueue()
  }
}, 30000)
```

## Partial failures & data shape resilience

### Types of partial failure
1. **Render partial:** Main content loads, sidebar fails
2. **Data partial:** List loads, one item's details fail
3. **Mutation partial:** Parent succeeds, child fails
4. **Shape partial:** Response missing expected fields

### Data shape resilience

```javascript
// BAD: Assumes shape is always correct
function renderUser(user) {
  return `${user.profile.name} - ${user.profile.email}`
}

// GOOD: Defensive with fallbacks
function renderUser(user) {
  const name = user?.profile?.name ?? 'Unknown'
  const email = user?.profile?.email ?? 'No email'
  return `${name} - ${email}`
}
```

### Schema validation at boundaries

```javascript
function parseUserResponse(data) {
  if (!data?.id) {
    throw new DataShapeError('Missing required field: id')
  }

  return {
    id: data.id,
    name: data.name ?? 'Unknown',
    email: data.email,
    avatarUrl: data.avatarUrl ?? DEFAULT_AVATAR
  }
}
```

### Graceful degradation policy

| Aspect | Options | Example |
|--------|---------|---------|
| Stale tolerance | X minutes/hours | "Show data up to 24h old" |
| Staleness indicator | Badge, timestamp | "Updated 2 hours ago" |
| Retry behavior | Auto, manual, none | "Retry after 3 auto-retries" |
| Mutation during degraded | Allowed, disabled | "Disable Buy while degraded" |
| Fallback content | Skeleton, last known | "Show last known value" |

## Reconciliation strategies

### Conflict detection (versioning is key)

```javascript
async function updateResource(id, changes) {
  const current = getResource(id)

  const response = await fetch(`/api/resources/${id}`, {
    method: 'PATCH',
    headers: { 'If-Match': current.version },
    body: JSON.stringify(changes)
  })

  if (response.status === 412) {  // Precondition Failed
    return { conflict: true, serverState: await response.json() }
  }

  return { conflict: false, data: await response.json() }
}
```

### Conflict resolution strategies

- **Last-Write-Wins (LWW):** Most recent wins (using versions, not timestamps). Use when data loss is acceptable.
- **Server-Authoritative:** Server always wins. Client changes are suggestions. Use when data integrity is critical.
- **Merge Strategies:** Field-level merge (different fields → merge both), set union (both added items → include both), operational transformation (concurrent text edits).
- **User-Mediated:** Present conflict to user. Use sparingly when automatic merge is impossible.

## Multi-step operations (saga pattern)

For operations spanning multiple steps where partial completion is problematic.

### Frontend vs. backend responsibilities

| Aspect | Frontend Owns | Backend Owns |
|--------|----------------|--------------|
| UI state machine | Progress, step visualization | N/A |
| Retry semantics | When to retry, user cancel | Idempotency, deduplication |
| User feedback | Error messages, UX | N/A |
| Atomic boundaries | N/A | Transaction, rollback |
| Compensating transactions | Display rollback, notify | Actual rollback (refund) |

### Frontend saga implementation

```javascript
const checkoutStates = {
  idle: { on: { START: 'validating' } },
  validating: { on: { SUCCESS: 'reserving', FAILURE: 'error' } },
  reserving: { on: { SUCCESS: 'charging', FAILURE: 'error' } },
  charging: { on: { SUCCESS: 'confirming', FAILURE: 'compensating' } },
  confirming: { on: { SUCCESS: 'complete', FAILURE: 'compensating' } },
  compensating: { on: { DONE: 'error' } },
  complete: {},
  error: { on: { RETRY: 'validating' } }
}
```

Frontend shows progress and handles user experience; backend handles atomicity and actual compensations.

## Retry strategies

*Network Protocols* covers the circuit breaker pattern for preventing cascading failures. Here we focus on client-side retry semantics.

### Which failures are retryable
- Network errors: YES
- 5xx server errors: USUALLY YES
- 4xx client errors: USUALLY NO
- 401 Unauthorized: MAYBE (after token refresh—see *Security Boundaries*)
- 409 Conflict: MAYBE (after state refresh)
- 429 Rate limit: YES (after delay)

### Exponential backoff with jitter

```javascript
async function retryWithBackoff(operation, maxAttempts = 3) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      if (!isRetryable(error) || attempt === maxAttempts - 1) {
        throw error
      }

      const baseDelay = 1000
      const exponential = Math.pow(2, attempt)
      const jitter = Math.random() * baseDelay
      await sleep(baseDelay * exponential + jitter)
    }
  }
}
```

## Failure UX principles

These principles connect resilience architecture to user perception. *Human Perception* is the capstone that ties all these decisions together—every choice here affects how the system feels.

**1. Honesty over false confidence.** Don't hide failures that affect user actions. Users trust honest uncertainty more than false certainty.

**2. Rollback feels worse than waiting.** For important actions: pessimistic with good feedback > optimistic with rollback.

**3. Context-appropriate feedback.**
- Silent retry: Background refreshes, non-critical mutations
- Inline status: Pending state, retrying indicator
- Toast: Recoverable errors, stale warnings
- Blocking modal: Irreversible failures

**4. Progressive disclosure of failure.** First "Something went wrong" + retry. If retry fails, more detail. If persistent, guidance and alternatives.

**5. Preserve user work.** Never lose user input to a failure. Queue mutations, persist drafts. On recovery, restore context.

## The trade-offs

### Optimism vs. correctness

**Decision factors:**
- Consequence of showing wrong data temporarily
- Frequency of server rejection
- Reversibility of the action
- User expectation

**Default:** Optimistic for reversible, pessimistic for irreversible.

### Offline capability vs. complexity

**Decision factors:**
- User context (mobile, travel, unreliable networks)
- Data sensitivity
- Development resources

**Default:** Start with read-only offline + queued mutations. Full offline-first only if user context demands it.

### User feedback vs. silent recovery

| Recovery possible | User action needed | Approach |
|-------------------|-------------------|----------|
| Yes | No | Silent retry |
| Yes | Yes | Inform + suggest action |
| No | No | Log, maybe inform later |
| No | Yes | Clear error + guidance |

## Patterns

### Version-gated updates

```javascript
function updateIfNewer(resourceId, data, version) {
  if (version > currentVersions.get(resourceId)) {
    currentVersions.set(resourceId, version)
    setState(resourceId, data)
  }
}
```

### Intent queue with persistence
See Intent Preservation Pattern section.

### Error boundaries with degradation policies
Isolate failures to prevent cascade. Each boundary decides: show error, show fallback, or hide.

## Anti-patterns

### Optimism without rollback capability
Showing changes you can't undo leads to inconsistent state. Always capture previous state.

### Retry without backoff
Hammering a failing server makes things worse. Use exponential backoff with jitter.

### Timestamps for ordering
Clock drift makes "most recent" ambiguous. Use server-issued versions.

### Conflict resolution as afterthought
"We'll handle conflicts later" → they happen in production. Design conflict strategy upfront.

## Real-world scenario: collaborative document editor

- **Consistency:** Causal consistency with OT or CRDTs for concurrent edits.
- **Failure handling:** Network disconnect → continue editing locally, queue operations. Reconnect → send queued operations, receive and transform missed operations.
- **Key insight:** The user should never feel like they're waiting for the network to type.

## Real-world scenario: e-commerce cart and checkout

- **Consistency:** Cart is eventually consistent, optimistic. Checkout is strongly consistent, pessimistic, saga pattern.
- **Failure handling:** Payment fails → clear error, don't lose cart. Price changed → show old vs. new, require confirmation.
- **Key insight:** Optimism in browsing, pessimism in buying.

## Real-world scenario: offline-first field service app

- **Consistency:** Full offline-first with intent queue. Conflict resolution: field trumps office (technician was there).
- **Failure handling:** Extended offline → app works indefinitely. Storage full → prioritize recent work, warn user.
- **Key insight:** The app must be fully functional without network; connectivity is a bonus.

## Design review checklist

**Data Consistency:**
- What consistency model does each data type need?
- Are updates version-gated to prevent time travel?

**Intent Preservation:**
- Are user intents persisted before network delivery?
- Do mutations use idempotency keys?
- Can pending intents survive app restart?

**Optimistic Updates:**
- Which mutations use optimistic updates?
- Can you always rollback?
- Is optimism level matched to consequence severity?

**Failure Handling:**
- Are failures categorized by type and retryability?
- Do components have explicit degradation policies?
- Is data shape validated at boundaries?

**Conflict Resolution:**
- What's the conflict strategy for each data type?
- How do you detect conflicts?

## Red flags

- "We'll handle conflicts later" — They happen in production
- "We use timestamps to order updates" — Clock drift
- "The spinner shows until the server responds" — No optimism for reversible actions
- "Works online" — Not tested offline

## Key takeaways

- **State = projection of commands under unreliable delivery.** This mental model unifies optimistic UI, offline queues, retries, and reconciliation.
- **Version-based monotonicity is your backbone.** Prefer server-issued versions over timestamps.
- **Intent preservation is architecture.** Persist user intents with idempotency keys. Delivery is retry-safe.
- **Optimism is a bet—size it appropriately.** Optimistic for reversible, pessimistic for irreversible.
- **Partial failure is the norm.** Design for independent loading, component-level resilience.
- **Categorize failures early.** Transport vs. application vs. concurrency vs. conflicts. Each has different handling.

---

## Further reading

- [Eventually Consistent — Werner Vogels](https://www.allthingsdistributed.com/2008/12/eventually_consistent.html) — Amazon's CTO explains the consistency models behind large-scale distributed systems; provides the theoretical foundation for the patterns in this document.
- [CRDT.tech](https://crdt.tech/) — A curated collection of CRDT research papers, libraries, and implementations; the starting point for understanding conflict-free replicated data types for collaborative and offline-first applications.
- [Idempotency Keys — Stripe API Docs](https://stripe.com/docs/api/idempotent_requests) — Stripe's production implementation of idempotency keys; the industry reference for making retries safe and preventing duplicate operations.
- [Saga Pattern — Microservices.io](https://microservices.io/patterns/data/saga.html) — Chris Richardson's pattern catalog explains how sagas coordinate multi-step operations with compensating transactions for failure recovery.
- [XState Documentation](https://stately.ai/docs/xstate) — The leading state machine library for JavaScript; ideal for implementing the finite state machines that manage complex failure handling and multi-step workflows.

---

## Frequently Asked Questions (FAQs)

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

*Never lose a user's work — build offline-ready, failure-resilient frontends with [Bitloops](https://bitloops.com).*
