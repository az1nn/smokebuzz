# Tasks: ScreenTransition flex fix

## Step 1 — Apply the fix

- [ ] `src/components/ScreenTransition.tsx` — add `flex: 1` to the animated path root: `style={{ flex: 1, opacity, transform: [{ translateY }] }}`.
- [ ] `src/components/ScreenTransition.tsx` — add `flex: 1` to the reduced-motion path: `<Animated.View style={{ flex: 1 }}>`.

## Step 2 — Static verification

- [ ] `npx tsc --noEmit` — zero errors.
- [ ] `npm test` — all suites pass (13/13).

## Step 3 — Build & serve

- [ ] `npm run build:web` — export + postbuild OK.
- [ ] Restart static server on `dist/` (`python3 -m http.server 3000` in WSL) if not already running.

## Step 4 — Headless runtime verification (external tooling, not in repo)

- [ ] Run the Edge probe (`C:\Users\alans\AppData\Local\Temp\opencode\pptr\diag3.js`) at 1280×900:
  - `scrollableInfo` contains exactly 1 scrollable element (screen ScrollView).
  - Wheel event moves its `scrollTop` (internal scroll works); `window.scrollY` may stay 0.
  - Tab bar "Carrinho" `top` is within viewport height (not ~5336).
- [ ] Run mobile probe at 390×844: tab bar within viewport; hamburger opens menu; cart tab navigates to empty cart.
- [ ] Real mouse click on tab-bar "Carrinho" lands within viewport and shows "Seu carrinho está vazio".
- [ ] No `pageerror` / `console.error` in either viewport.

## Step 5 — Docs

- [ ] Update `docs/ui-overhaul-v2-changes.md` if it documents ScreenTransition layout; else mark N/A.

## Step 6 — Review, commit & push

- [ ] Run `code-review` subagent.
- [ ] Commit + push implementation, spec updates, and docs.
