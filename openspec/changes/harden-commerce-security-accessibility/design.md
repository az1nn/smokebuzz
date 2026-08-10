# Design: Commerce, security, and accessibility hardening

## 1. Non-Sensitive Checkout Simulation

Remove card number, expiry, CVV, and cardholder-name fields. Replace them with:

- an always-visible notice: this is a demonstration, no payment is processed, and no payment data should be entered;
- an accessible `order note` text field capped at 120 characters, optional and explicitly stating not to enter sensitive information;
- a required outcome choice, `approved` or `declined`, labeled “Resultado da simulação”; and
- one “Simular pedido” action.

The note is local ephemeral UI state, is never logged or passed to the gateway, and resets on approved completion. The gateway receives only canonical cart identifiers and validated quantities:

```ts
export type DemoOutcome = "approved" | "declined";
export type PaymentRequest = {
  items: ReadonlyArray<{ productId: string; quantity: number }>;
  outcome: DemoOutcome;
};
export type PaymentResult =
  | { status: "approved"; reference: string }
  | { status: "declined"; code: "DEMO_DECLINED" };
export type PaymentState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "approved"; reference: string }
  | { status: "declined"; code: "DEMO_DECLINED" }
  | { status: "failed"; code: "PAYMENT_UNAVAILABLE" };
export interface PaymentGateway {
  submit(request: PaymentRequest): Promise<PaymentResult>;
}
```

`usePayment(gateway = demoPaymentGateway)` returns `{ state, submit, reset }`. A synchronous ref guard is set before awaiting so rapid presses cannot start a second request; concurrent `submit` returns without invoking the gateway. The injected demo adapter maps the selected outcome deterministically and generates a non-secret local reference without `Math.random`. Every thrown/rejected value, including an `Error`, string, or secret-looking object, maps to the fixed code `PAYMENT_UNAVAILABLE`; state, UI, logs, and analytics never include the caught value or its message. UI maps that code to the fixed localized `strings.paymentUnavailable`. Demo decline accepts only `DEMO_DECLINED`, mapped to the fixed allowlisted `strings.paymentDeclined`; arbitrary adapter decline text is not part of the contract. Checkout snapshots validated item IDs/quantities, submits once, and clears the cart only for `approved`. Decline/failure preserves cart and inputs. A future production adapter must post only IDs, quantities, and an idempotency token to a same-origin server; the server authorizes, reads canonical price/inventory, calculates totals, and owns vendor credentials.

## 2. Cart Trust Boundary

A product is valid only when `id.trim().length > 0`, `Number.isFinite(price)`, and `price >= 0`. Quantity is valid only when `Number.isSafeInteger(quantity) && quantity > 0`.

- Invalid new or duplicate `ADD_ITEM` is ignored with the original state identity.
- Adding to an existing line is ignored if the sum is not a safe integer or exceeds `Number.MAX_SAFE_INTEGER`.
- `UPDATE_QUANTITY` with `quantity <= 0` removes the line only when quantity is a finite safe integer; fractional, `NaN`, infinity, and unsafe values are ignored.
- Unknown product IDs are no-ops.
- Derived `itemCount` and `total` use validated lines. If addition/multiplication would become non-finite or exceed `Number.MAX_SAFE_INTEGER`, the offending action is rejected rather than clamped.

## 3. Accessibility Mapping

| Element/state | Required semantics |
|---|---|
| Demo notice | readable static text, referenced by the simulation group on web |
| Order note | visible label, `accessibilityLabel`, 120-character limit, helper description |
| Outcome choices | radiogroup semantics on web; each choice has radio role, checked state, and keyboard activation |
| Submit | button role; disabled for empty cart, missing outcome, or submitting; busy state during submission |
| Validation error | stable native ID, alert/live-region semantics, linked with `aria-describedby` on web |
| Gateway decline/failure | alert/live-region; sanitized message only |
| First invalid field | required outcome receives focus after submit; empty-cart error focuses/announces the cart summary/action area; optional note is never in invalid-focus ordering |
| Success | heading plus live status; focus moves to success heading |

React Native props provide cross-platform labels/state; web-only ARIA props are narrowly applied using existing project patterns. Invalid-focus refs map only `outcome -> outcome group` and `cart -> cart summary`. The optional note has its normal input ref but is excluded from validation and invalid-focus ordering.

## 4. Fonts and Deployment Headers

`postbuild.js` must emit preconnect and stylesheet links for Rye, Jost, and Cormorant Garamond, retaining system fallbacks and the existing CSP inventory. A generated-output test builds into `dist/`, parses `index.html`, and asserts all families.

`vercel.json` adds headers for `/(.*)`:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Content-Security-Policy` with `default-src 'self'`; `base-uri 'self'`; `object-src 'none'`; `frame-ancestors 'none'`; `form-action 'self'`; `script-src 'self'`; `connect-src 'self'`; `img-src 'self' data: blob:`; `font-src 'self' https://fonts.gstatic.com`; and `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`.

The explicit exceptions are Google Fonts and inline styles required by Expo/React Native Web. `tests/production-boundary.test.ts` parses JSON and compares directive/source sets, rejecting wildcards and unsafe script evaluation. `scripts/serve-dist-with-vercel-headers.js` is a dependency-free Node HTTP server: it reads `vercel.json`, matches `/(.*)`, applies its headers to every response, safely serves only files below `dist/`, maps `/` to `index.html`, uses explicit MIME types, and rejects traversal. Run `node scripts/serve-dist-with-vercel-headers.js --port 4173`, open `http://127.0.0.1:4173`, and verify in browser Network that the document response contains the exact CSP and other headers, no CSP console violation occurs during app boot, fonts/images load, and Instagram navigation remains an external user action. An ordinary static server is not evidence of CSP enforcement because it does not apply `vercel.json`. If generated Expo behavior requires another source, stop and update the spec rather than weakening CSP ad hoc.

## 5. Deterministic Verification

Use injected deferred promises to test the concurrency guard and fixed demo outcomes to test transitions. Mock no randomness and use fake timers only when a deliberate adapter delay exists. Tests cover approved/declined/failed transitions, reset, one gateway invocation on rapid presses, cart clearing only on approval, note exclusion from requests and invalid-focus ordering, all invalid product/quantity/overflow cases, focus destinations, labels/roles/linked errors/live announcements, exact headers, and generated font links. A rejected error containing a fake token/password marker must prove that marker is absent from rendered text, serialized state, `console` calls, and gateway-facing output.
