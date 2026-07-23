## Task Checklist

### Phase 1: Hero Badge Order on Mobile
- [ ] In `src/screens/HomeScreen.tsx`, find the parent View wrapping text + badge (line 171-218)
- [ ] Add `flexDirection: isMobile ? "column-reverse" : "row"` to its style

### Phase 2: Small Button Variant
- [ ] In `src/components/BrassButton.tsx`, add `size?: "md" | "sm"` prop
- [ ] Add size styles: `sm` → `px-4 py-2 text-xs`, `md` → current `px-[22px] py-[11px] text-sm`
- [ ] Update default prop to `size="md"`
- [ ] Update test file if needed

### Phase 3: Fix Product Grid Layout
- [ ] In `src/screens/ProductsScreen.tsx`:
  - [ ] Change `contentContainerClassName="p-2 pb-4"` to `contentContainerStyle={{ gap: 24 }}` and remove `className` padding
  - [ ] Remove `m-2` from product card View (line 77)
  - [ ] Change ScrollView bg from `bg-noir` to `bg-espresso`

### Phase 4: Fix Sobre Image
- [ ] In `src/screens/HomeScreen.tsx`, change sobre image maxWidth from `Math.min(280, width * 0.4)` to `Math.min(420, width * 0.38)`

### Phase 5: Use Small Button in Products
- [ ] In `src/screens/ProductsScreen.tsx`, change `<BrassButton label="Adicionar" ...>` to include `size="sm"`

### Phase 6: Verify
- [ ] Run `npx tsc --noEmit` — zero errors
- [ ] Run `npm test` — all pass
- [ ] Verify `BrassButton` test coverage
- [ ] Commit & push
