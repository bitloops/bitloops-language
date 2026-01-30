---
sidebar_position: 4
sidebar_label: Asynchronous Operations
title: "Async Operations in React: Race Conditions, Cancellation, and Commit Guards"
description: "Async bugs are state bugs—stale results overwriting fresh data. Learn operation scopes, commit guards, request cancellation, and deduplication patterns."
keywords:
  [
    react race condition fix,
    abort controller react,
    async state management,
    request deduplication pattern,
    stale closure react,
    cancel fetch request,
    async operation lifecycle,
    concurrent request handling,
  ]
---

# Async without chaos

JavaScript is single-threaded, but your application is not. Every fetch, every timer, every user interaction creates concurrent operations that can complete in any order. The question isn't whether you'll have race conditions—it's whether you'll handle them or let them corrupt your UI.

Here's the insight that reframes how you think about async bugs: **async bugs are state bugs**. When async operations corrupt your UI, they do so by committing stale results to state. The fix isn't just "add AbortController"—it's ensuring that every async result commits only when it's still valid. This connects directly to *State Management at Scale*—ownership and consistency guarantees matter here too.

## The browser's concurrency model

Backend engineers design for concurrent access using locks, transactions, queues, and idempotency keys. Frontend faces the same problems with different primitives.

**Concurrency vs. parallelism:** Parallelism means multiple things happening at the exact same time—multiple threads or cores. JavaScript has this only through Web Workers, which have restricted communication. Concurrency means multiple things in progress, interleaved on one thread. This is how async/await, Promises, and event handlers work. While waiting for a fetch, other code runs. Operations can complete in any order.

The distinction matters. You don't need operating system synchronization primitives (semaphores, mutexes). But you do need to handle interleaving and ordering. And you can build coordination constructs—single-flight, queues, latest-wins gates—they just aren't built into the language.

## What makes frontend unique

**Single thread, multiple timelines.** One thread runs your code, but many async operations are in progress simultaneously, completing whenever the network or timer decides.

**The user is the chaos monkey.** Users click rapidly, navigate mid-request, open multiple tabs, lose network connection, and regain it at unpredictable times.

**Component lifecycles complicate everything.** Components mount, unmount, and re-render while requests are in flight. A response might arrive for a component that no longer exists.

**User intent changes.** By the time a response arrives, the user may have moved on. They typed a new search query. They navigated to a different page. Their intent changed, but your response didn't know.

## Ordering boundaries

The event loop details (microtask vs. macrotask) are less important than understanding these ordering boundaries:

| Boundary | What It Means | Design Implication |
|----------|---------------|-------------------|
| User events | User actions arrive in order but async consequences don't | User clicks A then B; A's response may arrive after B's |
| Navigation transitions | Route change invalidates current intent | Pending requests become stale when route changes |
| Component lifetimes | Mount/unmount define validity scope | Results for unmounted components should not commit |
| Request/response identity | Each request has identity; response must match | Response for request A must not be committed if request B is now current |

Focus on these boundaries, not microtask trivia.

## Operation scopes: the core model

This is the conceptual glue that ties all async patterns together.

**Definition:** An operation scope is a boundary that owns async operations and determines their validity.

A scope owns: abort controllers, request identifiers, retry state, and commit permissions. When a scope ends, it cancels children, drops queued work, and ignores late arrivals. Only results from an active scope should commit to state.

**Common scopes:**

| Scope Type | Lifecycle | Examples |
|------------|-----------|----------|
| Component | Mount → Unmount | Data fetching in a component |
| Route | Navigation start → Navigation away | Page-level data loading |
| User intent | Action start → New action | Search query, form submission |
| Workflow step | Step start → Step complete/cancel | Multi-step wizard |

**Implementation:**

```javascript
function createOperationScope() {
  const controller = new AbortController()
  let isActive = true

  return {
    signal: controller.signal,
    isActive: () => isActive,

    commit: (fn) => {
      if (isActive) fn()
    },

    dispose: () => {
      isActive = false
      controller.abort()
    }
  }
}

// Usage in component
useEffect(() => {
  const scope = createOperationScope()

  fetchData({ signal: scope.signal })
    .then(data => scope.commit(() => setData(data)))
    .catch(err => {
      if (err.name !== 'AbortError') {
        scope.commit(() => setError(err))
      }
    })

  return () => scope.dispose()
}, [])
```

## Commit points

The moment you mutate UI state or cache is the **commit point**. Most UI corruption comes from committing stale results.

**The commit rule:** Only commit if (scope is active) AND (result matches current intent) AND (version still valid).

**Three types of invalid commits:**

1. **Stale scope:** Component unmounted, route changed, user navigated away
2. **Stale intent:** User changed input; this result is for old input
3. **Stale version:** Data was updated elsewhere; this version is outdated

```javascript
async function fetchWithCommitGuard(key, fetcher, commit) {
  const requestId = generateId()
  currentRequestId.current = requestId

  const data = await fetcher()

  // Commit only if this is still the current request
  if (requestId === currentRequestId.current) {
    commit(data)
  }
  // Otherwise: silently drop (not an error, just stale)
}
```

## Cancellation semantics

AbortController doesn't magically stop everything. Understand what cancellation actually means:

**Abort Delivery (Latest-Wins Gate):** Ignore results from superseded requests. The request may still complete server-side. Use for search-as-you-type, autocomplete. Implementation: Request ID comparison, drop if stale.

**Abort Execution (Cooperative Cancellation):** Actually cancel the in-flight operation. `AbortController.abort()` stops fetch, but the server may still process. Use for user cancels, navigation, unmount. Requires passing the signal through the async chain.

**Abort Commit (Scope Invalidation):** Let the operation complete, but don't commit the result. Use for component lifecycle, route changes. Implementation: `scope.isActive()` check before commit.

**What AbortController actually does:**
- Cancels the fetch (client-side network abort)
- Does NOT cancel server processing (request may still execute)
- Does NOT automatically prevent stale commits (you must check)
- Does NOT work on arbitrary Promises (only cooperatively cancellable operations)

```javascript
function SearchComponent() {
  const scopeRef = useRef(createOperationScope())
  const latestQueryRef = useRef('')

  async function search(query) {
    // 1. Abort execution: Cancel previous request
    scopeRef.current.dispose()
    scopeRef.current = createOperationScope()

    // Track current intent
    latestQueryRef.current = query

    try {
      const results = await fetchSearch(query, {
        signal: scopeRef.current.signal
      })

      // 2. Abort delivery: Check if this query is still current
      if (query !== latestQueryRef.current) return

      // 3. Abort commit: Check if scope is still active
      scopeRef.current.commit(() => setResults(results))

    } catch (err) {
      if (err.name !== 'AbortError') {
        scopeRef.current.commit(() => setError(err))
      }
    }
  }

  useEffect(() => () => scopeRef.current.dispose(), [])
}
```

## Three deduplication patterns

These are distinct patterns, not interchangeable.

### Single-flight (share in-flight promise)

Multiple callers request the same data simultaneously. Return the same Promise to all callers—one network request, multiple consumers. *Caching Strategies* uses this pattern to prevent cache stampedes.

```javascript
const inFlight = new Map()

function singleFlight(key, fetcher) {
  if (inFlight.has(key)) {
    return inFlight.get(key)
  }

  const promise = fetcher().finally(() => inFlight.delete(key))
  inFlight.set(key, promise)
  return promise
}
```

### Latest-wins (discard stale results)

Rapid requests where only the latest matters. Track request ID, ignore old responses. Many requests fire, only the latest commits.

```javascript
function latestWins() {
  let currentId = 0

  return async function fetch(fetcher) {
    const thisId = ++currentId
    const result = await fetcher()

    if (thisId === currentId) {
      return result
    }
    return null // Stale, discard
  }
}
```

### Queue/serialize (ordered execution)

Mutations that must execute in order. Queue operations, process sequentially. Guaranteed ordering, no concurrent execution.

```javascript
class SerialQueue {
  #queue = []
  #processing = false

  async add(operation) {
    return new Promise((resolve, reject) => {
      this.#queue.push({ operation, resolve, reject })
      this.#process()
    })
  }

  async #process() {
    if (this.#processing) return
    this.#processing = true

    while (this.#queue.length > 0) {
      const { operation, resolve, reject } = this.#queue.shift()
      try {
        resolve(await operation())
      } catch (e) {
        reject(e)
      }
    }

    this.#processing = false
  }
}
```

**When to use each:**

| Pattern | Use When | Example |
|---------|----------|---------|
| Single-flight | Same data, multiple consumers | Multiple components fetch user profile |
| Latest-wins | Superseding requests | Search autocomplete |
| Queue/serialize | Order matters | Offline mutation sync |

## Timeouts and deadlines

Timeouts are first-class concerns, not afterthoughts.

**AbortSignal.timeout()** (modern browsers):

```javascript
const response = await fetch('/api/slow', {
  signal: AbortSignal.timeout(5000)
})
```

**Manual timeout with Promise.race:**

```javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms)
  })
  return Promise.race([promise, timeout])
}
```

**User-level deadlines (UX timeouts):** Show fallback if data doesn't arrive quickly enough.

```javascript
function useFetchWithDeadline(fetcher, deadline = 2000) {
  const [state, setState] = useState({ loading: true, data: null, timedOut: false })

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(s => s.loading ? { ...s, timedOut: true } : s)
    }, deadline)

    fetcher()
      .then(data => setState({ loading: false, data, timedOut: false }))
      .catch(() => setState({ loading: false, data: null, timedOut: false }))

    return () => clearTimeout(timer)
  }, [])

  return state
}

// Show skeleton for 2s, then fallback UI
const { data, timedOut } = useFetchWithDeadline(fetchDashboard, 2000)
if (timedOut && !data) return <FallbackDashboard />
```

**Server vs. client timeout mismatch:** The client times out after 5 seconds. The server might still be processing. The client shows an error, but the server completed the work. Solution: Idempotency keys, status checks on reconnect.

## Delivery semantics

Borrowed from backend message systems—applies directly to UI updates:

| Semantic | Frontend Meaning | Implementation |
|----------|------------------|----------------|
| At-most-once commit | UI state updated 0 or 1 times per operation | Scope guards, latest-wins |
| At-least-once request | Request retried until acknowledged | Retry with backoff |
| Exactly-once effect | Business action happens exactly once | Requires idempotency key + server support |

**What frontend can guarantee:**
- At-most-once commit: Yes, through scope guards
- At-least-once request: Yes, through retries

**What frontend cannot guarantee alone:**
- Exactly-once effect: Requires server to deduplicate via idempotency key (see *Consistency Models & Failure Handling* for the intent preservation pattern)

```javascript
const idempotencyKey = `${userId}-${action}-${crypto.randomUUID()}`

await fetch('/api/payment', {
  headers: { 'Idempotency-Key': idempotencyKey },
  body: JSON.stringify(paymentData)
})
```

The server checks: "Have I processed this key before?" If yes, return cached response. If no, process and store response with key.

## Retries

**When to retry:** Network failures, server errors (5xx), rate limiting (429 with backoff). See *Network Protocols* for the circuit breaker pattern that prevents hammering failing services.

**When not to retry:** Client errors (4xx except 429), business logic failures, non-idempotent operations without idempotency key.

**Exponential backoff with jitter** prevents thundering herd:

```javascript
async function fetchWithRetry(url, options = {}) {
  const { maxAttempts = 3, baseDelay = 1000 } = options

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fetch(url)
    } catch (error) {
      if (attempt === maxAttempts - 1) throw error

      const delay = baseDelay * Math.pow(2, attempt)
      const jitter = Math.random() * delay * 0.1
      await sleep(delay + jitter)
    }
  }
}
```

### Retry UX patterns

**Progressive disclosure:** Don't show retry immediately—try silently first.

```javascript
const SILENT_RETRY_LIMIT = 2
const USER_VISIBLE_RETRY_LIMIT = 3

async function fetchWithProgressiveRetry(fetcher, onRetryVisible) {
  for (let attempt = 0; attempt < SILENT_RETRY_LIMIT + USER_VISIBLE_RETRY_LIMIT; attempt++) {
    try {
      return await fetcher()
    } catch (error) {
      if (attempt >= SILENT_RETRY_LIMIT) {
        onRetryVisible(attempt - SILENT_RETRY_LIMIT + 1)
      }
      await backoff(attempt)
    }
  }
  throw new Error('All retries exhausted')
}
```

**Retry budgets:** Cap total retry time, not just attempts.

```javascript
function retryWithBudget(fetcher, { maxTime = 30000, maxAttempts = 5 }) {
  const startTime = Date.now()
  let attempt = 0

  async function tryOnce() {
    if (Date.now() - startTime > maxTime || attempt >= maxAttempts) {
      throw new Error('Retry budget exhausted')
    }

    try {
      return await fetcher()
    } catch {
      attempt++
      await backoff(attempt)
      return tryOnce()
    }
  }

  return tryOnce()
}
```

**User intent cancels retries:** If the user changes input, stop retrying the old request.

## Backpressure and streaming

Modern frontends handle streams, not just request-response. *Performance Optimization* covers the producer/consumer model and how to maintain 60fps under high-frequency updates.

**Backpressure** occurs when the producer is faster than the consumer: WebSocket messages arriving faster than UI can render, SSE events flooding state, real-time data feeds overwhelming the update cycle.

**Throttle consumption:**

```javascript
const throttledHandler = throttle((messages) => {
  const latest = messages[messages.length - 1]
  updateUI(latest)
}, 100)

socket.onmessage = (event) => {
  messageBuffer.push(JSON.parse(event.data))
  throttledHandler(messageBuffer)
}
```

**Buffer and batch:**

```javascript
const buffer = []
const flush = debounce(() => {
  const batch = buffer.splice(0, buffer.length)
  processBatch(batch)
}, 200)

socket.onmessage = (event) => {
  buffer.push(JSON.parse(event.data))
  flush()
}
```

**Streaming responses:**

```javascript
async function streamingFetch(url, onChunk) {
  const response = await fetch(url)
  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    onChunk(chunk)
  }
}
```

## The trade-offs

### Eager vs. lazy loading

**Eager loading** fetches data before it's needed. Instant when the user needs it, but wasted bandwidth if never used. **Lazy loading** fetches when needed. No wasted requests, but the user waits.

Decision factors: How likely will this data be needed? How expensive is the request? How quickly does data go stale? What's the UX impact of waiting?

### Parallel vs. sequential

*Performance Optimization* covers how parallel vs. waterfall loading affects the performance pipeline. The decision here has direct impact on LCP and TTI.

**Parallel execution:**

```javascript
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
])
```

Faster total time, but all-or-nothing error handling.

**Sequential execution:**

```javascript
const user = await fetchUser()
const posts = await fetchPosts(user.id)
```

Can use previous results, per-step error handling. Total time equals sum of all requests.

**Decision:** "Does B depend on A?" → Yes = sequential.

**Partial success pattern:**

```javascript
const results = await Promise.allSettled([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
])

results.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    commit(result.value)
  } else {
    handlePartialFailure(i, result.reason)
  }
})
```

## Patterns

### Scoped async operations

Every async operation belongs to a scope that determines its validity.

```javascript
function useAsyncOperation() {
  const scopeRef = useRef()

  useEffect(() => {
    scopeRef.current = createOperationScope()
    return () => scopeRef.current.dispose()
  }, [])

  return useCallback(async (asyncFn) => {
    const scope = scopeRef.current
    if (!scope.isActive()) return null

    try {
      const result = await asyncFn({ signal: scope.signal })
      if (scope.isActive()) {
        return result
      }
      return null
    } catch (error) {
      if (error.name === 'AbortError') return null
      throw error
    }
  }, [])
}
```

### Debounce with cleanup

```javascript
function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef()
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return useCallback((...args) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }, [delay])
}
```

### Optimistic concurrency control

Allow concurrent edits, detect conflicts at save time.

```javascript
async function saveDocument(doc) {
  try {
    return await api.save({
      id: doc.id,
      content: doc.content,
      expectedVersion: doc.version
    })
  } catch (e) {
    if (e.code === 'VERSION_CONFLICT') {
      const latest = await api.fetch(doc.id)
      return handleConflict(doc, latest)
    }
    throw e
  }
}
```

## Anti-patterns

### Fire and forget

Starting async operations without handling completion, errors, or cancellation.

```javascript
// BAD
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData)
}, [])
```

Errors are silently swallowed. No loading indication. Memory leak if component unmounts. No retry mechanism.

### Stale closure commits

Committing results using stale closure values.

```javascript
// BAD
useEffect(() => {
  fetchResults(query).then(results => {
    console.log(`Results for: ${query}`) // May be stale
    setResults(results)
  })
}, [query])
```

Don't reference changing values in callbacks. Use request identity instead.

### Async in loop without control

```javascript
// BAD: 1000 simultaneous requests
for (const id of ids) {
  fetch(`/api/item/${id}`).then(process)
}
```

Browser limits concurrent connections. Server may rate-limit or crash. No way to cancel. Memory pressure from pending promises.

**Fix: Controlled concurrency:**

```javascript
async function processWithConcurrency(items, fn, concurrency = 5) {
  const results = []
  const executing = new Set()

  for (const item of items) {
    const promise = fn(item).then(result => {
      executing.delete(promise)
      return result
    })
    executing.add(promise)
    results.push(promise)

    if (executing.size >= concurrency) {
      await Promise.race(executing)
    }
  }

  return Promise.all(results)
}
```

## Real-world scenario: search-as-you-type

**The situation:** User types in a search box. Results update as they type. Fast typers generate many requests. Responses arrive out of order.

**Solution using operation scopes:**

```javascript
function useSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const scopeRef = useRef(createOperationScope())

  const search = useDebouncedCallback(async (query) => {
    if (!query) {
      setResults([])
      return
    }

    scopeRef.current.dispose()
    scopeRef.current = createOperationScope()
    const scope = scopeRef.current

    setLoading(true)
    try {
      const data = await fetchSearch(query, { signal: scope.signal })
      scope.commit(() => {
        setResults(data.results)
        setLoading(false)
      })
    } catch (e) {
      if (e.name !== 'AbortError') {
        scope.commit(() => {
          setResults([])
          setLoading(false)
        })
      }
    }
  }, 250)

  useEffect(() => () => scopeRef.current.dispose(), [])

  return { search, results, loading }
}
```

## Real-world scenario: multi-step form

**The situation:** A 4-step wizard form. Each step validates with the server before proceeding. Final submit creates a record.

**State machine:**

```
STEP_1 → [validate] → STEP_1_VALIDATING → [success] → STEP_2
                                        → [failure] → STEP_1 (errors)
STEP_4 → [submit] → SUBMITTING → [success] → COMPLETE
```

**Key patterns:**
- Per-step validation scope (cancel on back navigation)
- Submit with idempotency key (prevent duplicate creation)
- Optimistic step advance with rollback on failure

## Real-world scenario: real-time collaboration

**The situation:** Multiple users editing the same document. Changes sync in real-time. Offline editing must work.

Collaborative editing isn't just fetch/response—it's concurrent operations across replicas. Each user's client is a replica that must apply local changes immediately, queue operations for sync, receive remote operations, and merge without conflicts.

**Operation flow:**

```
User types "hello"
  → Create operation: INSERT("hello", position: 0)
  → Apply locally (instant)
  → Queue for sync
  → Send when connected
  → Server broadcasts
  → Other clients receive, transform, apply
```

This bridges to *Consistency Models & Failure Handling*. The solutions—Operational Transform and CRDTs—are specialized techniques for handling concurrent async operations across distributed replicas. That document covers reconciliation strategies in depth.

## Design review checklist

**Operation Scopes:**
- Does every async operation have a defined scope?
- Do scopes cancel children on disposal?
- Are commit guards checking scope validity?

**Commit Points:**
- Is scope active?
- Does result match current intent?
- Is version still valid?

**Cancellation:**
- What type of cancellation is needed? (delivery, execution, commit)
- Is AbortController passed through the async chain?
- Are scope guards preventing stale commits?

**Deduplication:**
- Which pattern applies? (single-flight, latest-wins, queue)
- Are concurrent requests for same data deduplicated?
- Are mutations serialized when order matters?

**Retries & Idempotency:**
- Which failures trigger retry?
- Is there a retry budget?
- Are mutations idempotent or keyed?
- Does user intent cancel retries?

**Timeouts:**
- Is there a client-side timeout?
- Is there a user-level deadline?
- How is server processing after client timeout handled?

## Red flags

- "Sometimes wrong data shows up" — Stale commit, missing scope guard
- "Memory keeps growing" — Not cleaning up scopes
- "Works on fast network" — Not tested with latency
- "Duplicate entries" — Non-idempotent without protection

## Key takeaways

- **Async bugs are state bugs.** Corruption happens when stale results commit. Guard commits with scopes.
- **Operation scopes are the architecture.** Every async operation belongs to a scope. Scopes cancel children; only scoped results commit.
- **Cancellation has three meanings.** Abort delivery (ignore), abort execution (stop request), abort commit (scope check). Know which you need.
- **Deduplication is three patterns.** Single-flight (share), latest-wins (discard old), queue (serialize). They're not interchangeable.
- **Exactly-once requires backend.** Frontend can guarantee at-most-once commit and at-least-once request, but exactly-once effect needs idempotency keys.
- **Timeouts are UX.** Client timeouts protect users from waiting forever.

For every async result, ask: "Is the scope still active? Is this the current intent? Should I commit?"

---

## Connections to other documents

- **← State Management:** Async operations update state. Race conditions corrupt state. Scopes prevent invalid commits.
- **← Caching:** Single-flight is cache deduplication. SWR is async pattern + cache.
- **→ Performance:** Parallel vs. waterfall affects load time. Timeouts affect perceived performance.
- **→ Network Protocols:** Timeouts, connection limits, streaming.
- **→ Consistency & Failure:** Retries, offline handling, OT/CRDTs for collaborative editing.

## Further reading

- [Notes on Structured Concurrency — Nathaniel J. Smith](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/) — The foundational article on structured concurrency; the operation scope pattern in this document is a frontend adaptation of these ideas.
- [Concurrency Is Not Parallelism — Rob Pike (video)](https://www.youtube.com/watch?v=oV9rvDllKEg) — A clear explanation of why concurrent design matters even on a single thread, directly applicable to JavaScript's event loop model.
- [Designing Data-Intensive Applications — Martin Kleppmann](https://dataintensive.net/) — Chapter 8 covers distributed timing, ordering, and the impossibility results that explain why async coordination is fundamentally hard.
- [AbortController — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) — The browser's built-in cancellation primitive; essential API reference for implementing the cancellation patterns in this document.
- [p-limit](https://github.com/sindresorhus/p-limit) / [p-queue](https://github.com/sindresorhus/p-queue) — Battle-tested utilities for limiting concurrency and serializing async operations in JavaScript.
- [Idempotency Keys — Stripe API Docs](https://stripe.com/docs/api/idempotent_requests) — Stripe's production implementation of idempotency keys, the industry reference for making retries safe.

---

## Frequently Asked Questions (FAQs)

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

*Handle every race condition, cancellation, and retry gracefully — build resilient frontends with [Bitloops](https://bitloops.com).*
