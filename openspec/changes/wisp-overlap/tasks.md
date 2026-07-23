## Task Checklist

1. [ ] **Update wisp positions in HomeScreen.tsx**
   - Wisp 1: change `top: "8%", left: "6%"` → `top: "5%", left: "15%"`
   - Wisp 2: change `top: "55%", right: "8%"` → `top: "18%", left: "32%"`
   - Wisp 3: change `top: "20%", right: "22%"` → `top: "12%", left: "22%"`
   - Remove `right` property from wisp 2 and wisp 3 (use `left` instead)

2. [ ] **Add zIndex to each wisp Animated.View**
   - Wisp 1: `zIndex: 3`
   - Wisp 2: `zIndex: 5`
   - Wisp 3: `zIndex: 4`

3. [ ] **Verify TypeScript** — `npx tsc --noEmit` (no errors)

4. [ ] **Run tests** — `npm test` (all pass)

5. [ ] **Commit & push** after all checks pass
