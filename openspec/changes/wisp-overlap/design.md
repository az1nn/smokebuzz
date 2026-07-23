## Wisp Repositioning & Z-Index Layering

### Current Positions (scattered, no overlap)

| Wisp | Color  | Size    | Position              | zIndex |
|------|--------|---------|-----------------------|--------|
| 1    | Cream  | 260×260 | `top: "8%"`, `left: "6%"` | none |
| 2    | Brass  | 180×180 | `top: "55%"`, `right: "8%"` | none |
| 3    | Ember  | 120×120 | `top: "20%"`, `right: "22%"` | none |

### New Positions (clustered for overlap)

All wisps positioned relative to the hero container (`min-h-[92vh]`, flex centered).

| Wisp | Color  | Size    | Position                          | zIndex | Rationale |
|------|--------|---------|-----------------------------------|--------|-----------|
| 1    | Cream  | 260×260 | `top: "5%"`, `left: "15%"`        | 3      | Largest, sits behind the others as a base layer |
| 2    | Brass  | 180×180 | `top: "18%"`, `left: "32%"`       | 5      | Medium, layered highest so it drifts over both |
| 3    | Ember  | 120×120 | `top: "12%"`, `left: "22%"`       | 4      | Smallest, layered between 1 and 2 |

### Visual Layout (ASCII)

```
+------------------------------------------+
|          Hero Container (92vh)            |
|                                           |
|   Wisp1 (cream, z3)  ───┐                |
|    ┌─────┐              │                |
|    │     │  Wisp3 (ember, z4)             |
|    │  ○  │   ┌───┐     │                |
|    │     │   │ ○ │ Wisp2 (brass, z5)     |
|    └─────┘   └───┘  ┌───┐              |
|              ────────│ ○ │              |
|                      └───┘              |
|  (all three overlap near upper-center)   |
|                                           |
|  [Badge Logo centered below]             |
+------------------------------------------+
```

### Layering Logic

- **zIndex: 3** — Wisp 1 cream (largest, background haze)
- **zIndex: 4** — Wisp 3 ember (smallest, accent in middle)
- **zIndex: 5** — Wisp 2 brass (medium, highest foreground pop)

As the drift animation moves all three upward and leftward simultaneously, the overlapping positions and differing z-index values create a layered smoke-churning effect. The different animation durations (14s / 19s / 23s) and staggered start delays keep the overlap dynamic.

### Unchanged

- All animation keyframes (opacity, translateX, translateY, scale)
- Animation durations and delays
- Wisp colors, sizes (260/180/120), SVG circle radii (70/60/50)
- Hero container layout (`min-h-[92vh] items-center justify-center`)
