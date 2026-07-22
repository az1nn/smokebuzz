# Tasks

## Phase 1: HTML Foundation
- [ ] Verify web/index.html is the primary template used by Expo
- [ ] Ensure dist/index.html includes all required PWA meta tags
- [ ] Validate manifest.json is copied to dist/ during build
- [ ] Add service worker for offline caching (optional for now)

## Phase 2: App Functionality
- [ ] Keep existing screens: ProductsScreen, CartScreen, CheckoutScreen
- [ ] Keep CartContext with add/remove/update/clear operations
- [ ] Verify all React components render correctly into the HTML shell

## Phase 3: Build & Deploy
- [ ] Run `npm run build:web` — must succeed with zero errors
- [ ] Verify dist/index.html has proper HTML structure (title, manifest, meta tags)
- [ ] Verify dist/ contains manifest.json, favicon.ico, CSS, JS
- [ ] Push to GitHub
- [ ] Deploy to Vercel — must return 200, not 404

## Phase 4: Verify
- [ ] Run `npx jest` — all tests pass
- [ ] Open deployed URL — app renders correctly in browser
- [ ] PWA install prompt works (manifest is valid)
