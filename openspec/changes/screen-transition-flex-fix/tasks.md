# Tasks: ScreenTransition flex fix

## Step 1 — Apply the fix

- [x] `src/components/ScreenTransition.tsx` — add `flex: 1` to the animated path root: `style={{ flex: 1, opacity, transform: [{ translateY }] }}`.
- [x] `src/components/ScreenTransition.tsx` — add `flex: 1` to the reduced-motion path: `<Animated.View style={{ flex: 1 }}>`.

## Step 2 — Static verification

- [x] `npx tsc --noEmit` — zero errors.
- [x] `npm test` — all suites pass (13/13).

## Step 3 — Build & serve

- [x] `npm run build:web` — export + postbuild OK.
- [x] Restart static server on `dist/` (`python3 -m http.server 3000` in WSL) if not already running.

## Step 4 — Headless runtime verification (external tooling, not in repo)

- [x] Run the Edge probe (`C:\Users\alans\AppData\Local\Temp\opencode\pptr\diag4.js`) at 1280×900:
  - `scrollables` contains exactly 1 scrollable element (screen ScrollView). ✓ (sh 5253 / ch 774)
  - Wheel event moves its `scrollTop` (internal scroll works); `window.scrollY` stays 0. ✓ (0 → 1500)
  - Tab bar "Carrinho" `top` within viewport height. ✓ (top 857 / winH 900)
- [x] Mobile probe at 390×844: tab bar within viewport (top 801/844); hamburger opens menu; "Sobre" nav link scrolls the ScrollView (scrollTop 1114). ✓
- [x] Real mouse click on tab-bar "Carrinho" lands within viewport and shows "Seu carrinho está vazio". ✓
- [x] No `pageerror` / `console.error` in either viewport. ✓

## Step 5 — Docs

- [x] Update `docs/ui-overhaul-v2-changes.md` — ScreenTransition entry now notes `flex: 1` root preserving the screen scroll chain.

## Step 6 — Review, commit & push

- [x] Run `code-review` subagent.
- [ ] Commit + push implementation, spec updates, and docs.
