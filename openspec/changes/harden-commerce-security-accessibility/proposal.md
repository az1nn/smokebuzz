# Proposal: Harden commerce, security, and accessibility

## Context

The current checkout collects card-shaped data and reports randomized success despite being a local demonstration. Cart inputs also lack a complete trust-boundary policy, production font links are lost during post-build, deployment headers are absent, and checkout error semantics are incomplete.

## Objectives

1. Replace card fields with clearly non-sensitive simulation controls and deterministic outcomes.
2. Define a vendor-neutral payment state/API that can later be backed by a server-authoritative adapter without selecting a vendor.
3. Validate cart products and quantities at the reducer boundary, including overflow behavior.
4. Preserve production fonts and add explicit, tested Vercel security headers.
5. Make checkout controls, errors, progress, and focus behavior accessible and deterministically tested.

## Scope and Dependencies

Implementation scope is limited to `src/context/CartContext.tsx`, `src/hooks/usePayment.ts`, `src/hooks/useCheckoutForm.ts`, `src/screens/CheckoutScreen.tsx`, `src/strings.ts`, `postbuild.js`, `vercel.json`, `scripts/serve-dist-with-vercel-headers.js`, `tests/CartContext.test.tsx`, `tests/usePayment.test.tsx`, `tests/CheckoutScreen.test.tsx`, `tests/checkout-accessibility.test.tsx`, `tests/production-boundary.test.ts`, `docs/SEGURANCA_CHAVES_SECRETAS.md`, and `docs/ui-overhaul-v2-changes.md`. No new production dependency is allowed without approval. The unfinished `add-storybook-web` change must be completed or reconciled independently before implementation commits; its files and current `StickyHeader.tsx` edits are not part of this change.

## Non-Goals

- Collecting PAN, CVV, expiry, cardholder name, or any other payment credential.
- Choosing a payment vendor, charging money, or implementing an order backend.
- Expiry validation: expiry input is removed, so it has no remaining product requirement.
- Changing product presentation, navigation architecture, or performance assets.

## Success Criteria

The browser never receives or handles payment credentials. Simulation approval/decline is user-selected and deterministic; only approval clears a valid cart. Invalid cart data cannot create non-finite or negative totals. Generated production HTML contains required fonts. Header policy tests cover every specified header and CSP source. Checkout passes keyboard and screen-reader-oriented tests, and all Jest, TypeScript, and web-build gates pass.
