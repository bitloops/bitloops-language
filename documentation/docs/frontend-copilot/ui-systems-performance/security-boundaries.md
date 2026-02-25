---
sidebar_position: 8
sidebar_label: Security Boundaries
title: "Frontend Security Architecture: XSS, CSRF, CSP, and Token Storage Patterns"
description: "Security isn't prevention—it's blast radius design. Learn XSS mitigation, CSRF protection, Content Security Policy, and where to store JWT tokens in SPAs."
keywords:
  [
    frontend security best practices,
    xss prevention react,
    csrf protection spa,
    content security policy guide,
    jwt token storage spa,
    httponly cookie vs localstorage,
    same origin policy explained,
    oauth pkce spa,
  ]
---

# Security beyond prevention

The browser is hostile territory. Every line of JavaScript is visible, modifiable, and untrustworthy. But here's the insight that separates security architecture from security theater: **Security isn't about preventing attacks—it's about designing systems where successful attacks cause minimum damage.**

This is blast radius design.

## Security is blast radius design

For each security mechanism, we ask three questions:
1. What does it prevent?
2. What does it NOT prevent?
3. When it fails, what limits the damage?

This framing turns security from a checklist into architecture.

## What makes frontend unique

- **Client is fully compromised by design.** Users can see and modify everything.
- **Attacks come through your own code.** XSS means attacker's code runs as your code.
- **Same-origin policy is your primary defense.** Browser-enforced isolation between origins.
- **Users are the attack surface.** Phishing and social engineering target the human.
- **Third-party code runs with your privileges.** Every script you include can do anything you can.

## Threat model & assets

Before designing security, define what you protect and from whom.

### Assets to protect

- **User accounts:** Credentials, sessions, identity
- **User data:** PII, preferences, content
- **Financial operations:** Payments, balances, transfers
- **Tenant isolation:** In SaaS, preventing cross-tenant access
- **Reputation:** Trust that your app is safe

### Attacker capabilities

- **XSS:** Attacker runs code in your origin
- **CSRF:** Attacker triggers authenticated requests from their site
- **Stolen device/session:** Attacker has valid credentials
- **Malicious browser extension:** Can read/modify page content
- **Compromised third-party:** Script you include becomes malicious

### What HTTPS provides vs. doesn't

| HTTPS Provides | HTTPS Does NOT Provide |
|----------------|------------------------|
| Transport encryption | Client-side code integrity |
| Server authentication | Protection from XSS |
| Message integrity | Protection from CSRF |
| Protection against MITM | Protection from malicious extensions |

HTTPS provides strong transport security. What's untrusted is: all client-provided data, the client environment (extensions, DevTools), and third-party scripts running in your context.

## Trust boundaries

A trust boundary is where you transition from trusted to untrusted (or vice versa). This connects to *State Management at Scale*—the client holds replicas of server data, but the server is always authoritative.

**The fundamental rule:**
```
NEVER trust data from the client (even if your JS sent it)
NEVER put secrets in client-side code
ALWAYS validate and authorize on the server
The client is for UX, not security enforcement
```

**Common trust boundary violations:**

```javascript
// BAD: Client-side authorization check
if (user.role === 'admin') {
  showAdminPanel()  // Attacker changes user.role in DevTools
}

// BAD: Secret in client code
const API_KEY = 'sk_live_abc123'  // Visible in bundle

// BAD: Trusting client-provided IDs
await fetch(`/api/users/${userId}/delete`)  // userId from URL param
```

## Same-origin policy

**Origin = scheme + host + port**

```
https://example.com:443/path
└─┬─┘  └────┬─────┘└┬┘
scheme    host    port
```

| URL A | URL B | Same Origin? |
|-------|-------|--------------|
| `https://example.com/a` | `https://example.com/b` | Yes |
| `https://example.com` | `http://example.com` | No (scheme) |
| `https://example.com` | `https://api.example.com` | No (host) |
| `https://example.com` | `https://example.com:8080` | No (port) |

**What same-origin policy prevents:**
- Script from origin A reading data from origin B
- Script from origin A accessing storage of origin B
- Script from origin A making certain requests to origin B (without CORS)

**What it doesn't prevent:**
- Including resources from other origins (`<img>`, `<script>`, `<link>`)
- Submitting forms to other origins
- Embedding other origins in iframes (unless blocked by headers)

## XSS (cross-site scripting)

Attacker injects malicious script that runs in context of your origin.

### Types of XSS

- **Stored XSS:** Malicious script saved in database, served to other users.
- **Reflected XSS:** Malicious script in URL, reflected in response.
- **DOM-based XSS:** Malicious data processed unsafely by client-side JS.

```javascript
// URL: https://example.com#<img src=x onerror=alert('xss')>
document.getElementById('output').innerHTML = location.hash.slice(1)
```

### XSS prevention

**1. Output encoding (context-aware):**

```javascript
// BAD: Raw insertion
element.innerHTML = userInput

// GOOD: Text content (no HTML parsing)
element.textContent = userInput

// GOOD: Framework auto-escaping
return <div>{userInput}</div>  // React escapes by default
```

**Context matters:**
- HTML body: Escape `<`, `>`, `&`, `"`, `'`
- HTML attributes: Escape quotes, never put in event handlers
- JavaScript: Escape for JS string context
- URLs: Encode for URL context, validate scheme

**2. Content Security Policy (CSP):** See dedicated section below.

**3. HTTPOnly cookies:**

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict
```

### Critical: XSS + HttpOnly

**HttpOnly prevents cookie theft, but XSS can still perform actions as the user.**

If an attacker achieves XSS, they can:
- Read any non-HttpOnly data (localStorage, sessionStorage, DOM)
- Make authenticated requests (cookies are still sent!)
- Modify the page, capture keystrokes, redirect user
- Call any API endpoint the user can access

HttpOnly limits blast radius (attacker can't exfiltrate session for later use), but doesn't stop in-session attacks. This is why CSP + output encoding are essential.

## CSRF (cross-site request forgery)

Attacker tricks user's browser into making authenticated request to your site.

```html
<!-- Attacker's site -->
<form action="https://bank.com/transfer" method="POST" id="exploit">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="1000" />
</form>
<script>document.getElementById('exploit').submit()</script>
```

Browser automatically includes cookies. Request looks legitimate.

### CSRF prevention

**1. SameSite cookies (primary defense):**

```http
Set-Cookie: session=abc123; SameSite=Strict
# Cookie not sent on ANY cross-site request

Set-Cookie: session=abc123; SameSite=Lax
# Cookie sent on top-level GET navigation, but not POST/subresources
```

**2. CSRF tokens (additional layer):**

Server generates unique token per session. Token must be in request body or custom header. Attacker can't know the token (same-origin policy).

**3. Check Origin/Referer headers:**

```javascript
if (request.headers.origin !== 'https://yoursite.com') {
  return 403
}
```

| | XSS | CSRF |
|---|-----|------|
| Attack | Inject code into YOUR page | Trick request FROM attacker's page |
| Runs where | In your origin | In attacker's origin |
| What's exploited | Output encoding failure | Automatic cookie inclusion |
| Prevention | CSP, encoding | SameSite, CSRF tokens |

## Clickjacking & framing protections

Attacker embeds your page in an invisible iframe, tricks user into clicking.

**Prevention:**

**frame-ancestors CSP directive (modern):**

```http
Content-Security-Policy: frame-ancestors 'none';        # No framing
Content-Security-Policy: frame-ancestors 'self';        # Only same origin
```

**X-Frame-Options (legacy):**

```http
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
```

Default to `frame-ancestors 'none'` unless you have a specific reason.

## Security headers

Beyond CSP, several HTTP headers harden security. *Network Protocols* covers HTTP semantics in depth—here we focus on security-specific headers.

**HSTS (HTTP Strict Transport Security):**

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

Forces HTTPS. Prevents protocol downgrade attacks.

**Referrer-Policy:**

```http
Referrer-Policy: strict-origin-when-cross-origin
```

Prevents leaking sensitive URL paths to third parties.

**Permissions-Policy:**

```http
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(self)
```

Restricts which browser features can be used. Blocks feature access by embedded iframes.

**Complete security headers example:**

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self'; frame-ancestors 'none'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Content Security Policy (CSP)

CSP is your primary XSS mitigation. Treat it as essential, not optional.

### CSP as a progression

**Stage 1: Report-only mode (observe)**

```http
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-violations
```

**Stage 2: Remove inline dependencies**
- Move inline `<script>` to external files
- Move inline `onclick` handlers to addEventListener
- Eliminate eval() usage

**Stage 3: Basic enforcement**

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://trusted-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
```

**Stage 4: Nonce-based (eliminate 'unsafe-inline' for scripts)**

```http
Content-Security-Policy: script-src 'nonce-{random}' 'strict-dynamic'
```

```html
<script nonce="{random}">
  // This is allowed
</script>
<script>
  // This is BLOCKED (no nonce)
</script>
```

Server generates random nonce per request. Only scripts with matching nonce execute. `strict-dynamic` allows nonced scripts to load other scripts.

**Important:** `'unsafe-inline'` is a transitional compromise, not acceptable long-term for scripts.

## Token storage

Where do you store authentication tokens? This decision affects both security and failure handling—see *Consistency Models & Failure Handling* for how auth failures fit into the failure taxonomy.

**Option 1: HTTPOnly Cookie**

```http
Set-Cookie: auth_token=xxx; HttpOnly; Secure; SameSite=Strict; Path=/
```

- Blast radius on XSS: Low (can't exfiltrate token), but attacker can still make requests
- CSRF risk: Mitigated by SameSite

**Option 2: localStorage/sessionStorage**

```javascript
localStorage.setItem('auth_token', token)
```

- Blast radius on XSS: High (attacker can steal and reuse token externally)
- CSRF risk: None (must explicitly add to requests)

**Option 3: Memory only**

```javascript
let authToken = null  // Closure or module scope
```

- Blast radius on XSS: Medium (harder to find, but still accessible)
- Persistence: Lost on refresh

**Recommended pattern:**

```
Access token: Short-lived (15min), in memory
Refresh token: HTTPOnly cookie with SameSite=Strict
On page load: Silent refresh to get new access token
```

This minimizes blast radius on both XSS (access token is short-lived, refresh token is HttpOnly) and CSRF (access token is in Authorization header, not automatic).

## Third-party & supply chain risk

This is one of the largest modern frontend security risks. *Distributed Systems* covers CDN security; *Performance Optimization* covers third-party budgets and governance.

Every third-party script you include:
- Runs with your origin's full privileges
- Can read all DOM content, localStorage, non-HttpOnly cookies
- Can make requests as your user
- Can be compromised at any time

### Subresource integrity (SRI)

```html
<script
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"
></script>
```

Browser computes hash of downloaded script. Blocks execution if hash doesn't match.

**Limitation:** Doesn't work for dynamic tag managers that load varying content.

### Third-party isolation patterns

**Sandboxed iframes for untrusted widgets:**

```html
<iframe
  src="https://third-party.com/widget"
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
></iframe>
```

**Strict CSP:**

```http
Content-Security-Policy:
  script-src 'self' https://trusted-cdn.com;
  connect-src 'self' https://api.example.com;
```

**Facades for analytics:**

```javascript
// Proxy through your own endpoint
fetch('/api/analytics', { body: eventData })
// Server forwards to third-party, controls what's sent
```

### Dependency hygiene

- Use lockfiles (package-lock.json)
- Run `npm audit` in CI
- Pin versions for critical dependencies
- Audit what dependencies bundle

## Authentication flows

**Session-based:**

```
1. User submits credentials
2. Server validates, creates session in database
3. Server sends session ID in HTTPOnly cookie
4. Browser includes cookie on subsequent requests
5. Server looks up session, identifies user
```

Pros: Simple, server controls sessions, easy revocation.
Cons: Requires server-side session storage.

**Token-based (JWT):**

```
1. User submits credentials
2. Server validates, creates signed JWT
3. Server sends JWT to client
4. Client stores JWT, sends in Authorization header
5. Server validates JWT signature, extracts user info
```

Pros: Stateless, scales well.
Cons: Can't revoke easily, token contains data.

**OAuth 2.0 with PKCE (for SPAs):**

```
1. App generates code_verifier and code_challenge
2. App redirects user to auth server with code_challenge
3. User logs in, consents
4. Auth server redirects back with authorization code
5. App exchanges code + code_verifier for tokens
```

PKCE prevents authorization code interception. Use this for SPAs, not implicit flow.

## Auth lifecycle & revocation

*State Management at Scale* covers cross-tab coordination—logout is a critical case where tabs must synchronize immediately.

**Logout across tabs:**

```javascript
const authChannel = new BroadcastChannel('auth')

function logout() {
  clearSession()
  authChannel.postMessage({ type: 'logout' })
}

authChannel.onmessage = (event) => {
  if (event.data.type === 'logout') {
    clearSession()
    redirectToLogin()
  }
}
```

**Refresh token rotation + reuse detection:**

Server issues NEW refresh token with each use. Old refresh token becomes invalid. If old token is reused, likely theft—invalidate ALL tokens for user.

**Handling 401 storms:**

```javascript
let refreshPromise = null

async function getValidToken() {
  if (refreshPromise) {
    return refreshPromise  // Reuse in-flight refresh
  }

  refreshPromise = refreshAccessToken()
    .finally(() => { refreshPromise = null })

  return refreshPromise
}
```

## The trade-offs

### Security vs. UX (friction)

This connects to *Human Perception*—security friction is perceived latency. The goal is appropriate friction, not minimum friction.

| Action Sensitivity | Friction Level | Examples |
|-------------------|----------------|----------|
| Low | Minimal | View public content |
| Medium | Single auth | View personal data |
| High | MFA / Re-auth | Change password, transfer money |
| Critical | MFA + Approval | Delete account, change email |

**Step-up authentication:**

```javascript
async function sensitiveAction() {
  const lastAuth = await getLastAuthTime()
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000

  if (lastAuth < fiveMinutesAgo) {
    await promptReAuth()
  }

  await performAction()
}
```

### Token lifetime vs. refresh complexity

**Short-lived tokens (15 minutes):**
- Blast radius: Limited (stolen token expires quickly)
- Complexity: Need refresh logic

**Long-lived tokens (days/weeks):**
- Blast radius: Large (stolen token useful longer)
- Complexity: Simpler

**Recommended:** Short access tokens + long-lived refresh tokens in HTTPOnly cookies. Rotate refresh tokens on use.

### Strict CSP vs. flexibility

**Strict CSP:** Blocks most XSS but may break third-party integrations. Requires refactoring inline scripts.

**Permissive CSP (`'unsafe-inline' 'unsafe-eval'`):** Everything works but provides almost no protection.

**Progressive approach:** Start report-only, fix violations, tighten gradually.

## Patterns

### Defense in depth

```
Layer 1: HTTPS (transport security)
Layer 2: CORS (origin restriction)
Layer 3: Authentication (identity verification)
Layer 4: Authorization (permission check)
Layer 5: Input validation (data integrity)
Layer 6: Rate limiting (abuse prevention)
Layer 7: Audit logging (detection)
```

Each layer independently limits damage when others fail.

### Capability-based links

```javascript
// Authorization embedded in unguessable URL
function generateShareLink(documentId) {
  const token = crypto.randomBytes(32).toString('hex')
  await store.set(`share:${token}`, { documentId, expiresAt: ... })
  return `https://example.com/shared/${token}`
}
```

Use for: Password reset, email verification, file sharing.

## Anti-patterns

### Client-side authorization

```javascript
// BAD: Role check in JavaScript
if (user.role === 'admin') {
  showAdminPanel()
}
```

User modifies `user.role` in DevTools. Always authorize server-side.

### Storing secrets in frontend

```javascript
// BAD: Visible in bundle
const STRIPE_SECRET_KEY = 'sk_live_xxx'
```

Only publishable keys belong in client code.

### Trusting client-provided identity

```javascript
// BAD: Multi-tenant with client-provided tenant
const tenantId = req.headers['x-tenant-id']  // Attacker changes header!
return db.documents.findMany({ where: { tenantId } })
```

**The fix:** Derive tenant from authenticated principal:

```javascript
const tenantId = req.user.currentTenantId  // From validated session/JWT
return db.documents.findMany({ where: { tenantId } })
```

## Real-world scenario: SPA with API backend

**Authentication flow:**
1. Redirect to auth server with PKCE
2. User authenticates
3. Redirect back with authorization code
4. SPA exchanges code for tokens
5. Access token stored in memory
6. Refresh token set as HTTPOnly cookie

**CORS:**

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Authorization, Content-Type
```

**CSP:**

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
```

## Real-world scenario: multi-tenant SaaS

**Security invariants:**
1. No cross-tenant reads or writes
2. No unauthorized state changes
3. Sensitive actions require step-up authentication
4. No secrets in client

**Implementation:**

```javascript
app.use((req, res, next) => {
  // Extract tenant from JWT claims, NOT client header
  const tenantId = req.user.tenantId

  // Optional: Allow user to select from allowed tenants
  const requestedTenant = req.headers['x-tenant-id']
  if (requestedTenant && req.user.allowedTenants.includes(requestedTenant)) {
    req.tenantId = requestedTenant
  } else {
    req.tenantId = tenantId
  }

  next()
})

// All queries scoped to tenant
async function getDocuments(req) {
  return db.documents.findMany({
    where: { tenantId: req.tenantId }  // ALWAYS included
  })
}
```

Client-provided tenant ID is an untrusted selector, not authority. Server validates user has access.

## Design review checklist

**Trust Boundaries:**
- What does the client control vs. server control?
- Where are authorization decisions made? (Must be server)
- What happens if client code is fully compromised?

**Authentication:**
- How are credentials transmitted and stored?
- What's the session/token lifetime?
- How does logout/revocation work across devices?

**Authorization:**
- Is every API endpoint protected?
- Are permissions checked server-side?
- How is tenant isolation enforced?

**XSS/Injection:**
- Is output encoding applied correctly?
- Is CSP configured beyond 'unsafe-inline'?
- Are third-party scripts inventoried?

**Headers:**
- HSTS configured?
- frame-ancestors set?
- Referrer-Policy configured?

## Red flags

- "Admin panel is hidden so it's secure" — Security by obscurity
- "We check permissions in the React component" — Client-side authorization
- "The API key is fine, it's minified" — Secrets in bundle
- "We use JWT so sessions are stateless" — Can't revoke, where's refresh token?
- "Tenant comes from the request header" — Derive from auth instead

## Key takeaways

- **Security is blast radius design.** Each mechanism limits damage when others fail.
- **Never trust the client.** Every security decision must be enforced server-side.
- **XSS is the frontend's worst enemy.** Even with HttpOnly cookies, XSS can make requests as the user. CSP + output encoding are essential.
- **Third-party scripts are privileged code.** Every script runs with your origin's full access.
- **Token storage is a trade-off.** HttpOnly cookies prevent theft but need CSRF protection. Memory-based tokens need careful refresh logic.

The client is not a security boundary—it's an attack surface. Design assuming it's compromised, and limit the damage it can cause.

---

## Further reading

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — The industry-standard ranking of web application security risks; use this as your baseline checklist for the most common and critical vulnerabilities.
- [The Tangled Web — Michal Zalewski](https://lcamtuf.coredump.cx/tangled/) — The definitive book on browser security internals; deep-dives into same-origin policy, XSS, and the subtle ways browsers handle trust boundaries.
- [Web Security — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Security) — Mozilla's comprehensive guide to web security fundamentals including CSP, HTTPS, secure contexts, and common attack vectors.
- [CSP Evaluator — Google](https://csp-evaluator.withgoogle.com/) — Paste your Content Security Policy and get instant feedback on weaknesses and bypasses; essential for iterating toward a strict, effective CSP.
- [JWT Best Practices — RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) — The IETF's official recommendations for securely using JSON Web Tokens; covers algorithm selection, claim validation, and common implementation pitfalls.

---

## Frequently Asked Questions (FAQs)

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

*Build frontends where security is architecture, not afterthought — start with [Bitloops](https://bitloops.com).*
