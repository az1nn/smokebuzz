## Task Checklist (completed)

1. [x] **Diagnose root cause** — NativeWind's `absolute` class is ignored on `Animated.View`; all three wisps rendered as `position: relative` inside the flex container. Fixed by using `style={{ position: "absolute" }}` inline instead of `className="absolute"`.

2. [x] **Restore HTML-correct positions** — reverted to original HTML positions:
   - Wisp 1: `top: "8%", left: "6%", width: 260, height: 260`
   - Wisp 2: `top: "55%", right: "8%", width: 180, height: 180`
   - Wisp 3: `top: "20%", right: "22%", width: 120, height: 120`

3. [x] **Reduce hero paddingTop** — `isMobile ? 20 : 16` (was 100/80)

4. [x] **Verify TypeScript** — `npx tsc --noEmit` (no errors)

5. [x] **Run tests** — `npm test` (all pass, 10/10)

6. [x] **Puppeteer confirmation** — After fix: wisp 1 renders at `7.7% 6.0%` (HTML ref: `7.9% 6.0%`), `position: absolute` confirmed in computed styles
