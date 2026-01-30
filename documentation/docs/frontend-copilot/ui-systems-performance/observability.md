---
sidebar_position: 10
sidebar_label: Observability
title: "Frontend Observability: RUM, Error Tracking, Distributed Tracing, and SLOs"
description: "You can't improve what you can't measure. Learn telemetry pipelines, Real User Monitoring, Core Web Vitals tracking, distributed tracing, and burn-rate alerting."
keywords:
  [
    frontend observability guide,
    real user monitoring rum,
    frontend error tracking,
    distributed tracing frontend,
    core web vitals monitoring,
    sentry frontend setup,
    frontend slo sli,
    burn rate alerting,
  ]
---

# Frontend observability as a control loop

You can't improve what you can't measure, and you can't fix what you can't see. But observability is more than measurement—it's a **control system**. Sensors (telemetry) detect state, a controller (alerting + budgets) decides what to do, and actuators (rollbacks, feature flags) take action. If any part is missing, the system fails—either outages go unnoticed, or alert fatigue makes the whole system useless.

## The control system framing

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    SENSORS      │ →  │   CONTROLLER    │ →  │   ACTUATORS     │
│   (Telemetry)   │    │(Alerting+Budgets)│    │   (Actions)     │
│                 │    │                 │    │                 │
│ - RUM metrics   │    │ - SLO thresholds│    │ - Rollbacks     │
│ - Error tracking│    │ - Burn rates    │    │ - Feature flags │
│ - Traces        │    │ - Alert rules   │    │ - Cache purge   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

Without actuators, you just know you're on fire. Without sensors, you don't know you're on fire. Without a controller, you either ignore fires or run around extinguishing campfires.

## What makes frontend unique

- **Execution happens on devices you don't control.** Environment diversity: browsers, devices, networks, screen sizes.
- **Privacy constraints.** What data can you collect?
- **Scale.** Millions of clients generating telemetry.
- **The user is the final arbiter.** Perception matters as much as metrics—see *Human Perception* for why a page that loads in 2 seconds can feel slower than one that loads in 3 seconds.
- **Correlation challenge.** Connecting frontend events to backend systems.

## The three pillars of observability

- **Metrics:** Aggregated numerical measurements over time. Low cardinality, pre-aggregated, cheap to store. Use for dashboards, alerting, trends.
- **Logs:** Discrete events with context. High cardinality, detailed, expensive to store. Use for debugging specific issues, audit trails.
- **Traces:** Connected spans showing request flow. Sampled, high context. Use for understanding latency breakdown, debugging distributed issues.
- **How they work together:**
  1. Metrics alert you to a problem (error rate spike)
  2. Logs help you identify affected users/flows
  3. Traces show you exactly where time is spent

## Telemetry pipeline architecture

Before measuring anything, you need a system that won't break, drown you in data, or violate privacy.

### Delivery mechanism

```javascript
function sendTelemetry(events) {
  const payload = JSON.stringify(events)
  const blob = new Blob([payload], { type: 'application/json' })

  // sendBeacon survives page unload
  if (navigator.sendBeacon('/telemetry', blob)) {
    return true
  }

  // Fallback: fetch with keepalive
  fetch('/telemetry', {
    method: 'POST',
    body: payload,
    keepalive: true
  })
}
```

**Why sendBeacon:** Doesn't block unload. Browser handles retry. Low priority, won't compete with user requests.

### Batching and buffering

```javascript
class TelemetryBuffer {
  constructor(options = {}) {
    this.buffer = []
    this.maxSize = options.maxSize || 100
    this.flushInterval = options.flushInterval || 5000

    setInterval(() => this.flush(), this.flushInterval)

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush()
      }
    })

    window.addEventListener('pagehide', () => this.flush())
  }

  add(event) {
    if (this.buffer.length >= this.maxSize) {
      if (event.priority === 'low') return
      const lowIndex = this.buffer.findIndex(e => e.priority === 'low')
      if (lowIndex >= 0) this.buffer.splice(lowIndex, 1)
    }

    this.buffer.push({ ...event, timestamp: Date.now() })
  }

  flush() {
    if (this.buffer.length === 0) return
    const events = this.buffer.splice(0, this.buffer.length)
    sendTelemetry(events)
  }
}
```

### Offline behavior

*Consistency Models & Failure Handling* covers intent queues for user actions—the same pattern applies to telemetry.

```javascript
const offlineQueue = new PersistentQueue('telemetry')

async function queueEvent(event) {
  if (navigator.onLine) {
    telemetryBuffer.add(event)
  } else {
    await offlineQueue.add(event)
  }
}

window.addEventListener('online', async () => {
  const queued = await offlineQueue.drain()
  queued.forEach(event => telemetryBuffer.add(event))
})
```

### Avoiding jank

```javascript
function reportMetricWhenIdle(metric) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => telemetryBuffer.add(metric), { timeout: 2000 })
  } else {
    setTimeout(() => telemetryBuffer.add(metric), 0)
  }
}
```

## Frontend SLIs (what to measure)

### Reliability SLIs

| SLI | What It Measures | How to Capture |
|-----|------------------|----------------|
| Crash-free sessions % | Sessions without fatal error | Session start/end + errors |
| Error rate per route | Errors / page views | Error count / pageviews |
| Blank screen rate | Pages that never render | LCP = 0 or timeout |
| API success rate | Non-error responses | `response.ok` tracking |

### Performance SLIs

*Performance Optimization* covers these metrics in depth—what affects them and how to optimize. Here we focus on measuring them in production.

| SLI | What It Measures | Good Target | Metric Type |
|-----|------------------|-------------|-------------|
| LCP p75 | Largest content paint | < 2.5s | Field |
| INP p75 | Interaction responsiveness | < 200ms | Field |
| CLS p75 | Visual stability | < 0.1 | Field |
| TTFB p75 | Server responsiveness | < 800ms | Field |

**Lab metrics (Lighthouse, controlled tests):**

| Metric | Notes |
|--------|-------|
| TBT (Total Blocking Time) | Lab only |
| TTI (Time to Interactive) | Deprecated, use INP |
| Speed Index | Lab only |

**Use lab metrics for CI gates. Use field metrics for production SLOs.**

### Network SLIs

| SLI | What It Measures |
|-----|------------------|
| API failure rate | % of calls returning error |
| API timeout rate | % of calls timing out |
| Retry rate | % needing retry |
| CDN cache hit/miss | Cache effectiveness |

## Frontend SLOs with defaults

| SLI | Default SLO | Window | Alert Threshold |
|-----|-------------|--------|-----------------|
| Crash-free sessions | ≥ 99.5% | 7-day | < 99% |
| Error rate | < 0.5% | 1-hour | > 1% |
| LCP p75 | < 2.5s | 24-hour | > 3.5s |
| INP p75 | < 200ms | 24-hour | > 350ms |
| CLS p75 | < 0.1 | 24-hour | > 0.2 |
| API success rate | ≥ 99.5% | 1-hour | < 99% |

These are starting points. Adjust based on user expectations and baseline measurements.

## Real User Monitoring (RUM)

RUM captures actual user experience from real devices on real networks.

### Core Web Vitals

**LCP (Largest Contentful Paint):** Time until largest content element renders. Good: < 2.5s.

**INP (Interaction to Next Paint):** Responsiveness to user interactions. Good: < 200ms. Replaced FID.

**CLS (Cumulative Layout Shift):** Visual stability. Good: < 0.1.

### Custom metrics

```javascript
performance.mark('search-started')
const results = await searchAPI(query)
performance.mark('search-complete')
performance.measure('search-duration', 'search-started', 'search-complete')

const measure = performance.getEntriesByName('search-duration')[0]
reportMetricWhenIdle({ name: 'search_latency', value: measure.duration })
```

### Resource timing for CDN monitoring

```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'resource') {
      const cacheStatus = entry.responseStatus === 0 ? 'failed' :
                         (entry.transferSize === 0 ? 'cache_hit' : 'cache_miss')

      reportMetricWhenIdle({
        name: 'resource_load',
        url: sanitizeUrl(entry.name),
        duration: entry.duration,
        cacheStatus
      })
    }
  }
})

observer.observe({ entryTypes: ['resource'] })
```

## Client-side error tracking

### Error types to capture
1. JavaScript errors: Uncaught exceptions, promise rejections
2. Network errors: Failed requests, timeouts
3. Resource errors: Failed image/script loads
4. Framework errors: React error boundaries

### Global error handling

```javascript
window.addEventListener('error', (event) => {
  reportError({
    type: 'uncaught',
    message: event.message,
    filename: sanitizeUrl(event.filename),
    lineno: event.lineno,
    stack: event.error?.stack,
    context: gatherContext()
  })
})

window.addEventListener('unhandledrejection', (event) => {
  reportError({
    type: 'unhandled_rejection',
    message: event.reason?.message || String(event.reason),
    stack: event.reason?.stack,
    context: gatherContext()
  })
})

// Resource loading errors
window.addEventListener('error', (event) => {
  if (event.target !== window) {
    reportError({
      type: 'resource_error',
      element: event.target.tagName,
      url: sanitizeUrl(event.target.src || event.target.href)
    })
  }
}, true)
```

## Privacy hard rules

This is not optional. These are engineering requirements. *Security Boundaries* covers the broader threat model—here we focus on what telemetry should never capture.

### Never capture

| Data Type | Why |
|-----------|-----|
| Passwords, auth headers, tokens | Obviously sensitive |
| Cookie contents | May contain session tokens |
| localStorage contents | May contain tokens, PII |
| Full URLs with query strings | Often contain tokens, emails |
| Free-form text field values | May contain anything |

### Always do

**1. Strip query strings from URLs:**

```javascript
function sanitizeUrl(url) {
  try {
    const parsed = new URL(url)
    return `${parsed.origin}${parsed.pathname}`
  } catch {
    return '[invalid-url]'
  }
}
```

**2. Use allowlist for captured fields (not denylist):**

```javascript
const ALLOWED_FIELDS = ['route', 'duration', 'errorCode', 'browser', 'deviceType']

function sanitizeEvent(event) {
  return Object.fromEntries(
    Object.entries(event).filter(([key]) => ALLOWED_FIELDS.includes(key))
  )
}
```

**3. Anonymize identifiers:**

```javascript
function anonymizeUserId(userId) {
  const salt = getCurrentWeeklySalt()
  return hash(`${userId}:${salt}`)
}
```

**4. Respect consent:**

```javascript
function shouldCollect() {
  if (navigator.doNotTrack === '1') return false
  if (!hasUserConsent()) return false
  return true
}
```

## Distributed tracing for frontend

*Network Protocols* covers the protocol-level headers (X-Request-Id, Server-Timing). *Distributed Systems* covers trace propagation through CDN/edge. Here we focus on the client-side implementation.

### The correlation problem
User reports "The page is slow." Backend sees thousands of requests. Without correlation: guessing and log diving.

### W3C trace context

```
traceparent: 00-<trace-id>-<span-id>-<flags>
```

### Correct ID generation

```javascript
function generateTraceId() {
  // 16 random bytes = 32 hex chars
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}

function generateSpanId() {
  // 8 random bytes = 16 hex chars
  const bytes = crypto.getRandomValues(new Uint8Array(8))
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}
```

### Propagation boundaries

| Boundary | Challenge | Solution |
|----------|-----------|----------|
| CDN/Edge | May not forward headers | Configure to preserve `traceparent` |
| Service Worker | Intercepts requests | Preserve headers in fetch handler |
| Third-party APIs | Won't accept headers | Log span locally |

### Frontend span vocabulary

| Span Type | When to Create |
|-----------|----------------|
| `navigation` | Route change |
| `interaction` | User click/input |
| `http.client` | API request |
| `render` | Component render |
| `longtask` | Main thread blocking |

## Burn-rate alerting

Error budgets alone are not enough. You need burn-rate alerts.

### The problem with budget-exhaustion alerts
- "Budget exhausted" fires after 30 days of slow burn
- 2% budget burned in 1 hour = incident, but 30-day budget looks fine
- You need to catch spikes AND slow leaks

### Multi-window alerting

| Window | Burn Rate | What It Catches | Action |
|--------|-----------|-----------------|--------|
| 5 min | > 14x | Spike, sudden incident | Page immediately |
| 1 hour | > 6x | Significant incident | Page |
| 6 hour | > 1.5x | Slow leak | Alert, investigate |
| 24 hour | > 1x | Sustained degradation | Review |

**Why both windows matter:** Short window alone is too noisy. Long window alone is too slow. Both confirms spike is sustained.

## Debugging workflow (investigation ladder)

### Step 1: confirm user impact
Which routes affected? What % of users? When did it start?

**Tools:** Error dashboard, RUM metrics, alert history

### Step 2: identify regression start
What deployed? Feature flag changes? Third-party updates?

**Tools:** Deployment history, feature flag logs

### Step 3: narrow scope
All browsers or specific? Mobile vs. desktop? Specific geography?

**Tools:** Error segmentation, RUM segmentation

### Step 4: correlate to backend
Get trace ID. Look up in backend tracing. Any upstream issues?

**Tools:** Distributed tracing

### Step 5: reproduce
Locally? In staging? Session replay?

**Tools:** Session replay, browser dev tools

### Step 6: fix + verify + postmortem
Deploy fix. Verify metrics return to baseline. Run postmortem.

**Document this ladder.** New team members should follow it.

## The trade-offs

### Observability overhead vs. insight

**Rule of thumb:** Instrument heavily in development, sample intelligently in production. Use feature flags to adjust sampling without redeploying.

### Privacy vs. debugging capability

**Default:** Minimal capture with allowlist. Turn up detail only for specific debugging with appropriate controls.

### Alert coverage vs. alert fatigue

**Alert hygiene:**
- Review and prune alerts quarterly
- Every alert should have runbook
- Track alert → action rate
- Use burn-rate alerts, not threshold alerts

## Patterns

### Structured logging

```javascript
log({
  level: 'error',
  message: 'Failed to load user',
  userId: anonymize(userId),
  errorCode: error.code,
  duration: duration,
  traceId: traceId
})
```

### Error boundary instrumentation

```javascript
class InstrumentedErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    reportError({
      error: error,
      componentStack: errorInfo.componentStack,
      route: getCurrentRoute(),
      context: this.props.name
    })
  }
}
```

### Correlation ID propagation

```javascript
function withCorrelation(fetchFn) {
  return async function(url, options = {}) {
    const correlationId = getOrCreateCorrelationId()
    return fetchFn(url, {
      ...options,
      headers: {
        ...options.headers,
        'X-Correlation-ID': correlationId,
        'traceparent': generateTraceparent()
      }
    })
  }
}
```

## Anti-patterns

### Alerting on causes instead of symptoms
Alert on "CPU high" instead of "users affected." Fix: Alert on user-facing symptoms.

### No runbooks
Alert fires, no one knows what to do. Fix: Every alert has documented response.

### Threshold alerts instead of burn-rate
Too sensitive or too slow. Fix: Multi-window burn-rate alerts.

### Logging URLs with query strings
Leaking tokens, PII. Fix: Strip query strings before logging.

## Real-world scenario: performance regression detection

**Implementation:**
1. Lighthouse CI runs on every PR (lab metrics—see *Performance Optimization*)
2. RUM tracks field metrics by page type
3. Canary deployment compares metrics (see *Distributed Systems* for canary by region)
4. Burn-rate alert catches regressions

Lab metrics catch regressions in CI; RUM catches what synthetic tests miss.

## Real-world scenario: debugging user-reported issue

**Apply the investigation ladder:**
1. Get anonymized user ID from support
2. Search errors by user ID in time window
3. Examine breadcrumbs
4. Check scope
5. Find root cause
6. Fix + add guardrail metric

## Design review checklist

**Telemetry Pipeline:**
- Is telemetry batched and buffered?
- Does it use sendBeacon?
- Is there backpressure?
- Does offline mode queue events?

**SLIs and SLOs:**
- Are canonical SLIs defined?
- Are SLO targets documented?
- Are lab vs. field metrics distinguished?

**Privacy:**
- Are query strings stripped?
- Is field capture allowlisted?
- Are identifiers anonymized?

**Alerting:**
- Do alerts use burn-rate?
- Are multi-window alerts configured?
- Does every alert have a runbook?

## Red flags

- "We alert on 500 errors" — Should alert on user impact
- "We capture everything for debugging" — Privacy violation
- "We'll add observability later" — Flying blind
- "Lighthouse is green" — Lab doesn't equal field

## Key takeaways

- **Observability is a control system.** Sensors + Controller + Actuators. All three required.
- **Build the telemetry pipeline first.** Batching, sendBeacon, backpressure, offline—then decide what to measure.
- **Define canonical SLIs.** Crash-free sessions, error rate, Core Web Vitals, API success rate.
- **Alert on burn rate, not thresholds.** Multi-window alerts catch spikes and slow leaks.
- **Privacy is engineering, not policy.** Strip query strings, allowlist fields, anonymize IDs.
- **Document the investigation ladder.** Repeatable process from alert to resolution.

---

## Further reading

- [Site Reliability Engineering — Google](https://sre.google/sre-book/table-of-contents/) — The foundational SRE book, freely available online; covers SLIs, SLOs, error budgets, and the monitoring philosophy that inspired this document's approach.
- [Observability Engineering — Charity Majors, Liz Fong-Jones, George Miranda](https://www.oreilly.com/library/view/observability-engineering/9781492076438/) — Goes beyond traditional monitoring to explain how observability enables debugging novel failures you've never seen before in distributed systems.
- [Web Vitals — web.dev](https://web.dev/articles/vitals) — Google's definitive guide to Core Web Vitals; explains what each metric measures, why it matters, and how to instrument it in the field.
- [W3C Trace Context Specification](https://www.w3.org/TR/trace-context/) — The standard for propagating trace context across services; essential for implementing the distributed tracing patterns discussed in this document.
- [OpenTelemetry JavaScript SDK](https://opentelemetry.io/docs/languages/js/) — The vendor-neutral instrumentation standard; provides auto-instrumentation for fetch, document load, and user interactions out of the box.

---

## Frequently Asked Questions (FAQs)

1. **What's the difference between Real User Monitoring (RUM) and synthetic monitoring?**
   RUM measures actual users on real devices—shows what users experience. Synthetic runs controlled tests (Lighthouse)—provides CI baselines. For performance metrics to track, see [Performance Optimization](./performance-optimization.md). For how metrics relate to experience, see [Human Perception](./human-perception.md).

2. **What frontend SLIs (Service Level Indicators) should I track?**
   Core SLIs: crash-free sessions (≥99.5%), error rate (&lt;0.5%), LCP p75 (&lt;2.5s), INP p75 (&lt;200ms), CLS p75 (&lt;0.1). For Core Web Vitals optimization, see [Performance Optimization](./performance-optimization.md). For perception-based targets, see [Human Perception](./human-perception.md).

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

*See what your users see — build observable, measurable frontends with [Bitloops](https://bitloops.com).*
