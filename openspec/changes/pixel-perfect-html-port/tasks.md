# Tasks: Pixel-Perfect HTML Port (COMPLETED)

## Step 1 — Fix Button Component ✓

**File:** `src/components/BrassButton.tsx`

- Change `rounded` to a custom `rounded-[2px]` (border-radius 2px)
- Change padding from `px-5 py-2.5` to `px-[22px] py-[11px]`
- Change font size from `text-xs` to `text-sm`
- Add `Animated.Pressable` or `Pressable` with press state to mimic HTML hover:
  - Solid: pressed → `bg-brass-light` + scale 0.98
  - Ghost: pressed → `bg-brass` + `text-noir`

**Verification:** `npx tsc --noEmit`

---

## Step 2 — Fix SectionHeading Component ✓

**File:** `src/components/SectionHeading.tsx`

- Change description `<Text>` font from `font-jost text-sm` to `font-cormorant text-[19.2px]`
- Change bottom margin from `mb-10` to `mb-[56px]`

**Verification:** `npx tsc --noEmit`

---

## Step 3 — Fix Price Formatting All Screens ✓

**Files:** `src/screens/ProductsScreen.tsx`, `src/screens/CartScreen.tsx`, `src/screens/CheckoutScreen.tsx`

- Find all `R$ {value.toFixed(2)}` patterns
- Replace with `R$ {value.toFixed(2).replace('.', ',')}`

**Verification:** `npx tsc --noEmit`

---

## Step 4 — Create StickyHeader Component ✓

**File:** `src/components/StickyHeader.tsx` (NEW)

- Brand logo (44×44 rounded-full) + "SmokeBuzz" text (Rye, cream, 1.15rem)
- Nav links: Destaques, Produtos, Sobre, Localização, Contato
- "Chamar no Direct" BrassButton (solid) linking to Instagram URL
- Mobile: hamburger menu toggle (☰) — JS toggle for nav visibility
- Background: `bg-noir/86` with `backdrop-filter: blur(8px)` (web only)
- Border-bottom: `1px solid var(--line)`

**Props:** `{ onNavigateProducts: () => void, onNavigateSection: (section: string) => void }`

---

## Step 5 — Add StickyHeader to App.tsx ✓

**File:** `App.tsx`

- Import and render `StickyHeader` at the top of `AppInner`
- Pass navigation callbacks for tab switching
- The header should appear above all screens

---

## Step 6 — Update Hero Section (HomeScreen) ✓

**File:** `src/screens/HomeScreen.tsx`

1. **Eyebrow text:** Change to `"Tabacaria · Desde 2026 · Rio de Janeiro"`
2. **H1:** Change to `"Bem-vindo à\nSmokeBuzz"` (use `{\n}` or multiple `<Text>` with `\n`)
3. **Lede text:** Replace with HTML version
4. **Hero background:** Add two radial gradient overlay Views:
   - `radial-gradient(ellipse at 75% 20%, rgba(217,98,43,0.10), transparent 55%)`
   - `radial-gradient(ellipse at 15% 85%, rgba(201,162,75,0.08), transparent 50%)`
5. **Smoke wisps:** Add 3 animated SVG circles using `react-native-svg` (or View+Animated if SVG not available — create Animated.View circles with border-radius+opacity)
   - Wisp 1: cream (#f2ead6), 260×260, top 8% left 6%, 14s drift
   - Wisp 2: brass (#c9a24b), 180×180, top 55% right 8%, 19s drift, -4s delay
   - Wisp 3: ember (#d9622b), 120×120, top 20% right 22%, 23s drift, -9s delay
6. **CTA buttons:** Swap — "Ver produtos" (solid) first, "Pedir pelo Instagram" (ghost) second
7. **Badge float:** Change range from `-8` to `-14`

**Drift animation (RN Animated):** diagonal translate + scale + opacity over 14-23s loop

---

## Step 7 — Update Sobre Section (HomeScreen) ✓

**File:** `src/screens/HomeScreen.tsx`

1. **Eyebrow:** `"Nossa história"`
2. **H2:** `"Uma tabacaria de bairro, com curadoria de verdade"`
3. **Description:** Replace full paragraph with HTML text
4. **Stats row:** Change to 3-column layout:
   - `2026` / `"Ano de fundação"`
   - `6+` / `"Categorias de produtos"`
   - `100%` / `"Atendimento presencial"`
5. **Stat labels:** Change to uppercase Jost with letter-spacing 0.5px

---

## Step 8 — Update Destaques/Products Section (ProductsScreen) ✓

**File:** `src/screens/ProductsScreen.tsx`

1. **Section description:** Add `<SectionHeading>` with description: "Alguns dos itens mais pedidos no Direct — confirme disponibilidade antes de fechar o pedido."
2. **Grid columns:** Use `numColumns={4}` on desktop, `numColumns={2}` on mobile (or detect width via `Dimensions` / `useWindowDimensions`)
3. **Product alt text:** For products 1 & 2, add `.prod-alt` text: "Avulsa por R$ 1,00" / "Avulsa por R$ 1,50"
4. **Card:** Keep "Adicionar" BrassButton as functional overlay

---

## Step 9 — Create Categorias Section (NEW) ✓

**File:** Add new section to `ProductsScreen.tsx` or create as separate component `src/components/CategoriasSection.tsx`

- Section eyebrow: `"O que você encontra aqui"`
- Section h2: `"Categorias"`
- Section desc: `"Uma seleção pensada para todo tipo de fumante — do iniciante ao mais exigente."`
- 6 category cards in a 3-column grid (→ 2-col ≤900px, → 1-col ≤560px)

**CategoryCard component (`src/components/CategoryCard.tsx`):**

```tsx
type Props = {
  icon: SvgProps; // SVG path data
  title: string;
  description: string;
};
```

- Style: `bg-gradient-to-b from-espresso to-espresso-2 border border-line rounded-lg p-[34px_28px]`
- Icon: 44×44, brass-light color
- Title: Rye, 1.25rem, brass-light
- Description: Jost 300, 0.92rem, cream-dim, line-height 1.55

---

## Step 10 — Update Diferenciais Section (HomeScreen) ✓

**File:** `src/screens/HomeScreen.tsx`

Replace all 3 items with HTML content:

1. **Curadoria** / "Produtos selecionados" / "Cada item do catálogo passa por uma escolha criteriosa..."
2. **Atendimento** / "Quem entende te ajuda" / "Nossa equipe conhece cada produto..."
3. **Ambiente** / "Feito para apreciar" / "Um espaço pensado para quem gosta de tirar um tempo..."

Remove numbered ember prefix ("01", "02", "03") — HTML just uses text labels.

---

## Step 11 — Update Localização Section (HomeScreen) ✓

**File:** `src/screens/HomeScreen.tsx`

Replace entire section:
- Eyebrow: `"Onde entregamos"`
- H2: `"Área de atendimento"`
- 3 info blocks (Cobertura / Horário / Contato) replacing current address
- Map placeholder: "Toda a cidade do Rio de Janeiro" + note text

---

## Step 12 — Update Contato Section (HomeScreen) ✓

**File:** `src/screens/HomeScreen.tsx`

- Eyebrow: `"Fale com a gente"`
- H2: `"Pronto para o seu próximo charuto?"`
- Description: Replace with HTML text
- CTA 2: Change from "Ver Produtos" to "Enviar e-mail" (ghost) linking to `mailto:contato@smokebuzz.com.br`

---

## Step 13 — Update Footer (HomeScreen) ✓

**File:** `src/screens/HomeScreen.tsx`

- Brand text: `"SmokeBuzz Tabacaria"` + `"Since 2026"` below
- Logo size: Change to 36×36
- Links: Add "Localização" between "Sobre" and "Contato"
- Legal text: Replace with HTML version

---

## Step 14 — Update Section Padding ✓

**File:** `src/screens/HomeScreen.tsx`

- Change all section `py-20` (80px) to `py-[104px]`
- Add responsive variant or media query for mobile (72px)

---

## Step 15 — Fix Stat Labels Font ✓

**File:** `src/screens/HomeScreen.tsx`

- Stat `<Text>` elements: add `uppercase tracking-[0.5px]`

---

## Step 16 — Run Verification ✓

```bash
npx tsc --noEmit     # 0 errors
npm test             # all tests pass
npm run build:web    # builds to dist/
```

---

## Step 17 — Update Docs ✓

- Update `docs/code-review.md` to reflect completed pixel-perfect port
- Update `AGENTS.md` if screen structure changes