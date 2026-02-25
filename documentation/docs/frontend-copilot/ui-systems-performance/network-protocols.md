---
sidebar_position: 7
sidebar_label: Network Protocols
title: "HTTP for Frontend Developers: Methods, Caching Headers, CORS, and Failure Handling"
description: "HTTP isn't just transport—it's a contract. Learn method semantics, status codes, Cache-Control headers, CORS preflight, and retry patterns for frontend applications."
keywords:
  [
    http methods frontend,
    cors explained simply,
    fetch api best practices,
    cache control headers guide,
    http status codes frontend,
    retry with exponential backoff,
    preflight request cors,
    http 2 http 3 frontend,
  ]
---

# HTTP contracts and failures

The network is the most unreliable part of your system, yet every feature depends on it. But here's what most frontend developers miss: **HTTP is not just transport—it's a contract**. Every header, method, and status code carries semantic meaning that caches, proxies, browsers, and servers use to make decisions. Understanding these contracts is the difference between an app that survives the real world and one that dies on the first slow connection.

## Protocols define behavior, not just move bytes

Backend engineers obsess over protocols: TCP tuning, connection pooling, keep-alives, retries. Frontend often treats the network as magic: call `fetch()`, get data (eventually). Every HTTP decision affects performance, reliability, and cacheability. The browser is a protocol enforcement point—it makes decisions based on headers you send.

Protocol as contract means:
- Method choice determines cacheability and retry safety
- Status codes tell clients (and intermediaries) how to behave
- Headers are instructions to all parties in the chain
- Breaking these contracts breaks caching, security, and reliability

## What makes frontend unique

- **The network is maximally hostile.** Mobile, WiFi, 3G, flaky coffee shop connections.
- **Users see failures directly.** Backend errors go to logs. Frontend errors create angry users.
- **Limited control over transport.** Can't tune TCP, limited HTTP/2 prioritization control.
- **Browser is the client.** Browser implements HTTP; you configure it via headers and fetch options.
- **Cross-origin is default.** Most API calls cross origin, triggering CORS.

## HTTP semantics as contract

HTTP methods have meaning beyond "send request." Caches, proxies, CDNs, and browsers behave differently based on method. Misusing methods breaks caching, causes bugs, and creates security issues.

### Methods and their semantics

**GET — Retrieve resource**
- Safe: No side effects on server
- Idempotent: Multiple identical requests produce same result
- Cacheable: By default (this is why caches can store it)
- Body: Technically allowed but semantically meaningless—avoid
- Use for: Reading data, page loads, search queries

**POST — Create resource or trigger action**
- NOT safe: Has side effects
- NOT idempotent: Each request may create new resource
- NOT cacheable: By default
- Use for: Creating records, form submissions, anything with side effects
- Warning: Never use for reads—breaks caching, back button, prefetch

**PUT — Replace resource entirely**
- NOT safe: Has side effects
- Idempotent: Multiple identical requests produce same final state (key difference from POST)
- Use for: Full resource replacement, upload entire document

**PATCH — Partial update**
- NOT safe: Has side effects
- NOT necessarily idempotent: Depends on patch format
- Use for: Partial updates when sending full resource is wasteful
- Warning: Increment operations (`{"count": "+1"}`) are NOT idempotent

**DELETE — Remove resource**
- NOT safe: Has side effects
- Idempotent: Deleting already-deleted resource returns success
- Use for: Removing records

| Method | Safe | Idempotent | Cacheable | Body Semantics | Typical Use |
|--------|------|------------|-----------|----------------|-------------|
| GET | Yes | Yes | Yes (see *Caching Strategies*) | Ignored | Read data |
| POST | No | No | No* | Request body | Create, actions |
| PUT | No | Yes | No | Complete resource | Full replace |
| PATCH | No | Maybe | No | Partial changes | Partial update |
| DELETE | No | Yes | No | Optional | Remove |

*POST responses can be cached with explicit Cache-Control, but requests cannot be deduplicated

## Status codes as communication

Status codes tell clients (and intermediaries) what happened and what to do next.

**2xx — Success**
- `200 OK`: Standard success, response has body
- `201 Created`: Resource created (POST success), should include Location header
- `204 No Content`: Success, no body (common for DELETE, PUT)

**3xx — Redirection**
- `301 Moved Permanently`: Resource URL changed forever (cacheable)
- `302 Found` / `307 Temporary Redirect`: Temporary redirect (307 preserves method)
- `304 Not Modified`: Conditional request valid, use cached version

**4xx — Client Error (don't retry with same request)**
- `400 Bad Request`: Malformed request syntax
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Authenticated but not permitted
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: State conflict (optimistic concurrency failure)
- `422 Unprocessable Entity`: Syntactically valid but semantically wrong
- `429 Too Many Requests`: Rate limited—check Retry-After header

**5xx — Server Error (potentially retryable)**
- `500 Internal Server Error`: Generic server failure
- `502 Bad Gateway`: Upstream server failed
- `503 Service Unavailable`: Server overloaded—check Retry-After header
- `504 Gateway Timeout`: Upstream server timeout

**Client-side handling:**

```javascript
async function fetchWithErrorHandling(url) {
  const response = await fetch(url)

  if (response.ok) {
    return response.json()
  }

  switch (response.status) {
    case 401:
      throw new AuthError('Authentication required')
    case 403:
      throw new ForbiddenError('Access denied')
    case 400:
    case 404:
    case 422:
      throw new ClientError(response.status, await response.json())
    case 429:
      const retryAfter = response.headers.get('Retry-After')
      throw new RateLimitError(retryAfter)
    case 500:
    case 502:
    case 503:
    case 504:
      throw new ServerError(response.status, true)
    default:
      throw new HttpError(response.status)
  }
}
```

## CORS and cross-origin semantics

Browsers enforce same-origin policy by default. Most modern apps call APIs on different origins. CORS is the browser's mechanism for controlled cross-origin access. **CORS is enforced by the browser, not the server**—the server just declares what's allowed. *Security Boundaries* covers the same-origin policy and broader security implications.

### Simple requests vs. preflighted requests

**Simple Request (no preflight)** requires all of:
- Method: GET, HEAD, or POST
- Headers: Only safe headers (Accept, Accept-Language, Content-Language)
- Content-Type: Only text/plain, multipart/form-data, or application/x-www-form-urlencoded

**Preflighted Request** when any criteria above is NOT met:
- Non-simple methods (PUT, DELETE, PATCH)
- Custom headers (Authorization, X-Custom-Header)
- Content-Type: application/json (most API calls)

### The preflight flow

```
1. Browser sends OPTIONS request (preflight)
   → Origin: https://app.example.com
   → Access-Control-Request-Method: POST
   → Access-Control-Request-Headers: Content-Type, Authorization

2. Server responds with permissions
   ← Access-Control-Allow-Origin: https://app.example.com
   ← Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   ← Access-Control-Allow-Headers: Content-Type, Authorization
   ← Access-Control-Max-Age: 86400

3. If allowed, browser sends actual request
4. If denied, browser blocks request (never sent to server)
```

### Key CORS headers

**Request headers (sent by browser):**
- `Origin`: Where the request comes from
- `Access-Control-Request-Method`: What method will be used
- `Access-Control-Request-Headers`: What custom headers will be sent

**Response headers (set by server):**
- `Access-Control-Allow-Origin`: Which origins can access
- `Access-Control-Allow-Methods`: Which methods are permitted
- `Access-Control-Allow-Headers`: Which request headers are permitted
- `Access-Control-Allow-Credentials`: Whether cookies/auth can be sent
- `Access-Control-Max-Age`: How long to cache preflight response
- `Access-Control-Expose-Headers`: Which response headers JS can read

### Common CORS mistakes

**Using `*` with credentials:**
```http
# INVALID - browser will reject
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```
Must specify exact origin when credentials are allowed.

**Forgetting exposed headers:**
```javascript
// Can't read custom headers without Access-Control-Expose-Headers
const customId = response.headers.get('X-Request-Id')  // null!
```

**Missing preflight cache:** Without `Access-Control-Max-Age`, every request triggers preflight.

## Credentials and session semantics

The `credentials` option controls whether cookies and auth headers are sent. *Security Boundaries* covers token storage trade-offs (HTTPOnly cookies vs. localStorage vs. memory) and CSRF protection:

```javascript
// Omit: Never send cookies (default for cross-origin)
fetch(url, { credentials: 'omit' })

// Same-origin: Send cookies only to same origin (default)
fetch(url, { credentials: 'same-origin' })

// Include: Always send cookies (needed for cross-origin auth)
fetch(url, { credentials: 'include' })
```

Cross-origin requests don't include cookies by default. Even with `credentials: 'include'`, server must allow with `Access-Control-Allow-Credentials: true` and respond with specific origin (not `*`).

| Aspect | Cookies | Authorization Header |
|--------|---------|---------------------|
| Sent automatically | Yes (if credentials included) | No (must add manually) |
| HttpOnly possible | Yes (secure) | No (visible to JS) |
| CSRF risk | High (sent automatically) | Low (must be added) |
| Preflight trigger | No | Yes |

## HTTP headers for caching

**Cache-Control** is a directive, not a guarantee. It tells caches what they're allowed to do. *Caching Strategies* covers the full cache stack and how HTTP headers interact with application-level caching. *Distributed Systems* covers CDN behavior.

```http
# Cache publicly (CDN + browser) for 1 hour
Cache-Control: public, max-age=3600

# Cache only in browser for 10 minutes
Cache-Control: private, max-age=600

# Don't store anywhere (sensitive data)
Cache-Control: no-store

# Can cache but must revalidate before each use
Cache-Control: no-cache

# Serve stale while revalidating in background
Cache-Control: max-age=60, stale-while-revalidate=600

# Never changes (use ONLY with fingerprinted URLs)
Cache-Control: public, max-age=31536000, immutable
```

**Important distinction:**
- `no-cache`: Cache can store but must revalidate before serving
- `no-store`: Cache must not store at all (use for sensitive data)

### Conditional requests

**ETag — Content fingerprint:**
```http
# Server response includes fingerprint
ETag: "abc123"

# Client includes in subsequent request
If-None-Match: "abc123"

# Server responds
304 Not Modified  (if same)
200 OK + new body (if different)
```

**Last-Modified — Time-based validation:**
```http
# Server response
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT

# Client request
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
```

ETag is more precise (content-based). Last-Modified has 1-second resolution. Use both for maximum compatibility.

**Vary — Cache key modification:**
```http
# Different response per encoding
Vary: Accept-Encoding

# DON'T: Vary on Cookie (every user gets separate cache)
```

## Connection establishment costs

Every new connection has overhead before data transfers. Understanding costs explains why keep-alive and multiplexing matter.

- **DNS Resolution:** 20-120ms to resolve hostname to IP address. Cached by OS and browser.
- **TCP Handshake:** 1 RTT (50-100ms good networks, 200-400ms mobile). SYN → SYN-ACK → ACK.
- **TLS Handshake:** 1-2 RTT for certificate exchange and key negotiation. TLS 1.3 reduces to 1 RTT.
- **Total new connection cost:** 300-700ms before first byte.
- **Optimization strategies:**

```html
<!-- Establish connection early -->
<link rel="preconnect" href="https://api.example.com">

<!-- Just do DNS lookup -->
<link rel="dns-prefetch" href="https://cdn.example.com">
```

## HTTP/2 and HTTP/3

**HTTP/1.1 limitations:**
- One request/response at a time per connection (HTTP-level head-of-line blocking)
- Browsers open 6 connections per domain as workaround
- Headers repeated every request

### HTTP/2 features

- **Multiplexing:** Multiple requests/responses on single connection. Solves HTTP-level head-of-line blocking.
- **But TCP HOL blocking remains:** HTTP/2 runs over TCP. Lost packet blocks ALL streams until retransmitted. On lossy mobile networks, can be worse than HTTP/1.1.
- **Header compression (HPACK):** Headers compressed and deduplicated across requests. First request sends full headers, subsequent send diffs.
- **Server Push (largely deprecated):** Browsers disabled it, HTTP/3 dropped it. Better alternatives: `<link rel="preload">`, Early Hints (103).

### HTTP/3 (QUIC)

- **UDP-based, solves TCP HOL:** Each stream independent at transport layer. Lost packet only blocks affected stream.
- **Faster connection establishment:** 0-RTT for repeat connections, 1-RTT for new connections (vs. 2-3 RTT for TCP+TLS).
- **Better mobile performance:** Connection migration survives IP changes. More resilient to packet loss.
- **Frontend implications:** Mostly transparent. Check if your CDN supports HTTP/3. Benefits most apparent on lossy mobile networks.

## Compression

Text compresses extremely well (70-90% reduction). Less data means faster transfer, especially on slow networks.

- **gzip:** Universal support, ~70% compression for text, fast.
- **Brotli:** Better compression than gzip (~15-20% smaller), slower to compress at high levels, modern browser support.

```http
# Request: Client advertises support
Accept-Encoding: gzip, deflate, br

# Response: Server indicates what's used
Content-Encoding: br
```

**When to compress:**
- Text formats: HTML, CSS, JS, JSON, SVG — Always
- Images: JPEG, PNG, WebP — Already compressed, skip
- Small files (< 1KB): Overhead may exceed benefit

## Streaming and real-time

*Asynchronous Operations* covers backpressure handling when streams produce faster than you can consume. Here we focus on the protocol-level patterns.

**Traditional Request/Response:** Client sends request, server sends complete response. Simple, cacheable, stateless. Use for most data fetching.

**Server-Sent Events (SSE):**
```javascript
const eventSource = new EventSource('/events')
eventSource.onmessage = (event) => console.log(event.data)
eventSource.onerror = (e) => console.log('SSE error/reconnecting')
```
- Unidirectional: Server → Client only
- Automatic reconnection with Last-Event-ID
- HTTP-based (works through proxies)
- Use for: Notifications, live feeds, real-time updates

**WebSocket:**
```javascript
const ws = new WebSocket('wss://example.com/socket')
ws.onopen = () => ws.send(JSON.stringify({ type: 'subscribe' }))
ws.onmessage = (event) => console.log(JSON.parse(event.data))
ws.onclose = (event) => {
  if (!event.wasClean) scheduleReconnect()
}
```
- Bidirectional: Full duplex communication
- Binary or text supported
- Manual reconnection logic needed
- Use for: Chat, collaborative editing, gaming

**Long Polling (fallback):**
```javascript
async function longPoll(signal) {
  while (!signal.aborted) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await fetch('/poll', { signal: controller.signal })
      clearTimeout(timeoutId)
      if (response.ok) handleUpdate(await response.json())
    } catch (error) {
      if (error.name !== 'AbortError') await sleep(1000)
    }
  }
}
```

| Pattern | Direction | Reconnect | Binary | Proxy-Friendly | Best For |
|---------|-----------|-----------|--------|----------------|----------|
| Polling | Request-driven | N/A | Yes | Yes | Infrequent updates |
| Long Polling | Simulated push | Manual | Yes | Usually | Fallback option |
| SSE | Server → Client | Auto | No | Yes | Notifications, feeds |
| WebSocket | Bidirectional | Manual | Yes | Maybe | Chat, collaboration |

## Failure behavior

*Consistency Models & Failure Handling* covers failure handling from a state perspective—how to preserve user intent and handle partial failures. Here we focus on the network layer.

**Failure taxonomy by retryability:**
- **Transient (retry):** 503, 504, network hiccup, timeout
- **Permanent (don't retry):** 400, 401, 403, 404, 422
- **Ambiguous (retry with idempotency):** 500, 502, connection reset mid-request

**Important:** `fetch` does not have a native timeout option. Use AbortController.

```javascript
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new TimeoutError(`Request timed out after ${timeout}ms`)
    }
    throw error
  }
}
```

**Timeout guidelines:**
- Fast operations (cache hit likely): 2-5 seconds
- Normal operations: 5-10 seconds
- Slow operations (reports, exports): 30-60 seconds
- **Always set a timeout** — browser may wait 2+ minutes by default

## Observability headers

*Observability* covers the full telemetry pipeline—here we focus on the protocol-level headers that enable distributed tracing.

**Request correlation:**
```http
# Request includes correlation ID
X-Request-Id: abc-123-def-456

# Response echoes it
X-Request-Id: abc-123-def-456
```

Trace requests through CDN → load balancer → server. Correlate client-side errors with server logs.

**Server Timing API:**
```http
Server-Timing: db;dur=53, cache;desc="Cache Read";dur=23.2
```

```javascript
const entry = performance.getEntriesByType('resource')[0]
entry.serverTiming.forEach(t => console.log(`${t.name}: ${t.duration}ms`))
```

## The trade-offs

### Request batching vs. granular caching

**Batched requests:**
```javascript
const data = await fetch('/api/products?ids=1,2,3,4,5')
```
Fewer requests, less overhead, but all-or-nothing caching.

**Granular requests:**
```javascript
const products = await Promise.all([
  fetch('/api/products/1'),
  fetch('/api/products/2'),
])
```
Individual caching, parallel with HTTP/2, but more overhead.

| Factor | Favor Batching | Favor Granular |
|--------|---------------|----------------|
| Protocol | HTTP/1.1 | HTTP/2+ |
| Cache TTL | Items have same TTL | Items change at different rates |
| Access pattern | Always need all together | Often need subset |
| Error handling | All-or-nothing OK | Need individual error handling |

### Polling vs. push

**Cost analysis:**
```
Polling every 5s, 10K users:
  = 10,000 × 12 requests/min × 60 min = 7.2M requests/hour

WebSocket, 10K users:
  = 10,000 persistent connections
  = Minimal requests, but memory per connection
```

## Patterns

### Circuit breaker

Stop calling failing services, fail fast instead of waiting.

**States:**
1. **Closed:** Normal operation, requests go through
2. **Open:** Service known to be down, fail immediately
3. **Half-Open:** Test if service recovered with single request

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5
    this.resetTimeout = options.resetTimeout || 30000
    this.state = 'CLOSED'
    this.failures = 0
    this.lastFailureTime = null
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF_OPEN'
      } else {
        throw new CircuitOpenError('Service unavailable')
      }
    }

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  onSuccess() {
    this.failures = 0
    this.state = 'CLOSED'
  }

  onFailure() {
    this.failures++
    this.lastFailureTime = Date.now()
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN'
    }
  }
}
```

### Retry with exponential backoff and jitter

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options)

      // Don't retry client errors
      if (response.status >= 400 && response.status < 500) {
        return response
      }

      if (response.ok) return response

    } catch (error) {
      if (attempt === maxRetries - 1) throw error
    }

    // Exponential backoff with jitter
    const baseDelay = Math.pow(2, attempt) * 1000
    const jitter = Math.random() * 1000
    await sleep(baseDelay + jitter)
  }
}
```

Jitter prevents "thundering herd" where all clients retry at same time.

### Request deduplication

```javascript
const pendingRequests = new Map()

async function deduplicatedFetch(url, options = {}) {
  const key = `${options.method || 'GET'}:${url}`

  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)
  }

  const promise = fetch(url, options)
    .finally(() => pendingRequests.delete(key))

  pendingRequests.set(key, promise)
  return promise
}
```

## Anti-patterns

### Ignoring HTTP caching

```javascript
// Duplicating HTTP cache in app code
const cache = new Map()

async function fetchData(url) {
  if (cache.has(url)) return cache.get(url)
  const data = await fetch(url).then(r => r.json())
  cache.set(url, data)
  return data
}
```

Missing 304 Not Modified optimization. Server can't control your cache. Configure proper cache headers, let HTTP work.

### POST for everything

```javascript
// "It works"
await fetch('/api/user/123', { method: 'POST' })
await fetch('/api/search', { method: 'POST', body: query })
```

GETs are cacheable, POSTs are not. Browsers won't prefetch POST. Back button re-triggers POST. CDNs won't cache POST responses.

### Unbounded retries

```javascript
// DANGEROUS: Never stops
async function fetchForever(url) {
  while (true) {
    try { return await fetch(url) } catch (e) { await sleep(1000) }
  }
}
```

Hammers failing server, user waits forever, battery drain, memory leak.

## Real-world scenario: dashboard with mixed update patterns

**The situation:** Dashboard with 8 widgets. Some data updates every minute (metrics). Some rarely changes (user profile). Some needs real-time (alerts).

**Layer 1: HTTP caching for stable data**
```http
# User profile - changes rarely
Cache-Control: private, max-age=300, stale-while-revalidate=600

# Static configuration
Cache-Control: public, max-age=3600
```

**Layer 2: Parallel fetch for varied TTL**
```javascript
const [user, metrics, config] = await Promise.all([
  fetch('/api/user'),
  fetch('/api/metrics'),
  fetch('/api/config'),
])
```

**Layer 3: SSE for real-time**
```javascript
const alerts = new EventSource('/api/alerts/stream')
alerts.onmessage = (e) => updateAlertWidget(JSON.parse(e.data))
```

## Real-world scenario: cross-origin API with authentication

**Server configuration:**
```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type, X-CSRF-Token
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Max-Age: 86400
```

**Client configuration:**
```javascript
async function apiRequest(path, options = {}) {
  return fetch(`https://api.example.com${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'X-CSRF-Token': getCsrfToken(),
    }
  })
}
```

## Design review checklist

**HTTP Usage:**
- Are HTTP methods used semantically?
- Are appropriate status codes returned?
- Are cache headers configured correctly?
- Is CORS configured correctly for cross-origin calls?

**Failure Handling:**
- What happens when requests fail?
- Are retries implemented with exponential backoff and jitter?
- Is there a timeout on all requests?
- Are non-idempotent operations protected with idempotency keys?

**Performance:**
- Are requests parallelized where possible?
- Is the API chatty?
- Is compression enabled?
- Are connections prewarmed with preconnect hints?

## Red flags

- "We POST everything" — Caching broken
- "Retries are disabled because duplicates" — Need idempotency keys
- "It works locally" — Not tested on slow networks
- "We poll every second" — Use SSE or WebSocket
- "The timeout is 5 minutes" — User has left

## Key takeaways

- **HTTP is a contract, not just transport.** Methods, status codes, and headers carry semantic meaning that caches, proxies, and browsers rely on.
- **CORS is browser enforcement of server declarations.** Understand preflight, credentials, and what triggers non-simple requests.
- **The network will fail.** Design for timeout, retry, and graceful degradation. Use AbortController for timeouts.
- **HTTP caching is powerful.** Learn Cache-Control, ETags, and conditional requests. Don't reinvent caching in JavaScript.
- **HTTP/2 and HTTP/3 change assumptions.** Many small requests are fine. HTTP/3 eliminates TCP HOL blocking.

Protocols define what happens at each layer—use them correctly and you get caching, retry-safety, and observability for free. Fight them and you'll reimplement everything yourself, badly.

---

## Further reading

- [HTTP/2 — RFC 9113](https://datatracker.ietf.org/doc/html/rfc9113) — The current HTTP/2 specification (obsoletes RFC 7540); understanding multiplexing, header compression, and stream prioritization is essential for modern frontend networking.
- [QUIC — RFC 9000](https://datatracker.ietf.org/doc/html/rfc9000) — The HTTP/3 transport protocol specification; explains how QUIC solves TCP's head-of-line blocking and improves mobile performance.
- [High Performance Browser Networking — Ilya Grigorik](https://hpbn.co/) — Freely available; the definitive reference on browser networking, covering TCP, TLS, HTTP/2, and the full request lifecycle.
- [Fetch API — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) — Complete reference for the Fetch API including request/response objects, headers, AbortController integration, and streaming.
- [CORS — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) — The definitive guide to Cross-Origin Resource Sharing; covers preflight, credentials, and the headers that control cross-origin access.
- [Chrome DevTools Network Panel](https://developer.chrome.com/docs/devtools/network/) — Learn to inspect requests, analyze waterfall timings, throttle connections, and debug CORS issues with Chrome's built-in network tools.

---

## Frequently Asked Questions (FAQs)

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

*Make every request count — design reliable, cacheable API interactions with [Bitloops](https://bitloops.com).*
