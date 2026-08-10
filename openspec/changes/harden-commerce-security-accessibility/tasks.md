# Tasks: Harden commerce, security, and accessibility

## Gate 0 — Coordination

- [ ] Complete/reconcile `openspec/changes/add-storybook-web/{proposal.md,design.md,tasks.md}` independently; preserve all `src/components/*.stories.tsx`, `.storybook/`, and unrelated `src/components/StickyHeader.tsx` edits.
- [ ] Confirm the implementation touches only the files enumerated in this proposal and adds no production dependency.

## Phase 1 — Boundary Tests

- [ ] Extend `tests/CartContext.test.tsx` for blank IDs, negative/`NaN`/infinite prices, zero/negative/fractional/`NaN`/infinite/unsafe quantities, duplicate overflow, unknown IDs, original-state no-ops, and finite totals.
- [ ] Create `tests/usePayment.test.tsx` with approved/declined/rejected/deferred adapters; assert exact discriminated states, reset, one invocation on rapid submit, fixed codes, and no caught-message propagation.
- [ ] Create `tests/CheckoutScreen.test.tsx` for empty cart, missing outcome, note exclusion from requests, approval-only clearing, decline/failure cart preservation, busy/disabled state, fixed localized copy, and secret-looking rejection non-leakage across UI/state/console.
- [ ] Create `tests/checkout-accessibility.test.tsx` for notice/helper links, note label, radiogroup/radio roles and checked state, invalid/busy state, described errors, live alerts, outcome/cart focus, success focus, and exclusion of optional note from invalid-focus ordering.
- [ ] Create `tests/production-boundary.test.ts` for generated font links, exact `vercel.json` route/header/CSP sets, forbidden CSP sources, server traversal rejection, MIME mapping, and served response headers.

## Phase 2 — Commerce Implementation

- [ ] Update `src/context/CartContext.tsx` with product/quantity/overflow helpers and the specified add/update/remove no-op policy.
- [ ] Replace `src/hooks/usePayment.ts` with exported request/result/state/gateway contracts, deterministic demo adapter, synchronous ref guard, fixed failure-code mapping, and no caught-value logging.
- [ ] Replace `src/hooks/useCheckoutForm.ts` with optional 120-character note and required `DemoOutcome`; remove PAN/CVV/cardholder/expiry state and validation.
- [ ] Update `src/screens/CheckoutScreen.tsx` with simulation notice/controls, approval-only clear, allowlisted messages, disabled/busy behavior, and required outcome/cart/success focus refs; keep note outside invalid ordering.
- [ ] Update `src/strings.ts` with fixed `paymentUnavailable`, allowlisted demo decline, simulation labels, helper/error text, and simulated-success copy.
- [ ] Update `docs/SEGURANCA_CHAVES_SECRETAS.md` with the server-authoritative future boundary and prohibitions on client totals, credentials, vendor secrets, caught error details, and `EXPO_PUBLIC_` secrets.

## Phase 3 — Production Boundary

- [ ] Update `postbuild.js` to emit Rye, Jost, and Cormorant Garamond stylesheet/preconnect links.
- [ ] Update `vercel.json` with the exact global headers and CSP directive/source inventory in `design.md`.
- [ ] Create dependency-free `scripts/serve-dist-with-vercel-headers.js` with `--port`, safe dist-only routing, `vercel.json` header application, MIME types, traversal rejection, and graceful shutdown.
- [ ] Run `npm run build:web`, then `node scripts/serve-dist-with-vercel-headers.js --port 4173`; verify document headers in Network, zero CSP console violations, fonts/images, and external Instagram action. Do not substitute an ordinary static server for this enforcement test.
- [ ] Update `docs/ui-overhaul-v2-changes.md` with checkout UI/a11y and production font changes.

## Verification Gate

- [ ] Run `npm test -- --runInBand`; `tests/CartContext.test.tsx`, `tests/usePayment.test.tsx`, `tests/CheckoutScreen.test.tsx`, `tests/checkout-accessibility.test.tsx`, and `tests/production-boundary.test.ts` pass without open handles.
- [ ] Run `npx tsc --noEmit` and `npm run build:web`; zero errors and required font links are present in `dist/index.html`.
- [ ] Run code review, resolve every P0/P1 finding, then commit and push implementation separately from specs.
