# Design: Pixel-Perfect HTML Port

## Color System

Already defined in `tailwind.config.js` — matches HTML exactly. No changes needed.

## Typography Changes

| Element | Current RN | HTML Target | Change |
|---------|-----------|-------------|--------|
| Section descriptions | `font-jost text-sm` | Cormorant Garamond, 1.2rem (~19.2px) | Add `font-cormorant text-base` |
| Stat labels | `font-jost text-sm` | Jost, 0.82rem (~13.1px), uppercase, letter-spacing 0.5px | Change to `font-jost text-xs tracking-[0.5px] uppercase` |
| Button text | `font-jost text-xs tracking-[0.8px]` | Jost, 0.85rem (~13.6px), letter-spacing 0.8px | Change to `font-jost text-sm tracking-[0.8px]` |
| Product alt text | Missing | Jost, 0.78rem (~12.5px), cream-dim, letter-spacing 0.3px | Add new `<Text>` with `.prod-alt` styling |
| Hero lede | `font-cormorant italic text-lg` | Cormorant Garamond, 1.35rem (~21.6px), cream-dim, max-width 46ch | Keep font, adjust size to `text-[21.6px]`, remove `italic` |

## Spacing Changes

| Element | Current RN | HTML Target | Change |
|---------|-----------|-------------|--------|
| Section vertical padding | `py-20` (80px) | 104px desktop, 72px mobile | `py-[104px]` or responsive variant |
| Product card info padding | `p-5 pb-6` (20/24) | `20px 20px 24px` | Already matches (p-5=20px, pb-6=24px) |
| Button padding | `px-5 py-2.5` (20/10) | `11px 22px` | `px-[22px] py-[11px]` |
| Section heading bottom margin | `mb-10` (40px) | 56px | `mb-14` or `mb-[56px]` |
| Product grid gap | `m-2` + `gap-6` | 24px | `gap-6` |
| RopeDivider slim | `h-[4px]` | 4px | Already matches |
| RopeDivider normal | `h-[10px]` | 10px | Already matches |
| Badge width | `w-[200px] h-[200px]` | `min(360px, 80%)` | Change to responsive |
| Nav brand logo | Missing | 44px × 44px, border-radius 50% | Add |
| Footer logo | `w-12 h-12` | 36px × 36px, border-radius 50% | Change `w-12 h-12` → `w-9 h-9` |

## Text Content Changes — All Sections

### Header Navbar (NEW — currently missing)

Add sticky header at top:
```tsx
<View className="sticky top-0 z-50 bg-noir/86 border-b border-line px-7 py-[14px]">
  <View className="max-w-[1180px] mx-auto flex-row items-center justify-between">
    <View className="flex-row items-center gap-3">
      <Image source={logo} className="w-11 h-11 rounded-full" />
      <Text className="text-cream font-rye text-lg">SmokeBuzz</Text>
    </View>
    {/* Desktop nav links — hidden on mobile */}
    <View className="hidden lg:flex-row items-center gap-7">
      <Text>Destaques</Text>
      <Text>Produtos</Text>
      <Text>Sobre</Text>
      <Text>Localização</Text>
      <Text>Contato</Text>
      {/* Chamar no Direct solid button */}
    </View>
    {/* Hamburger — visible on mobile */}
  </View>
</View>
```

### Hero Section

| Field | Current RN | HTML Target |
|-------|-----------|-------------|
| Eyebrow | `"Tabacaria desde 2026"` | `"Tabacaria · Desde 2026 · Rio de Janeiro"` |
| H1 | `"SmokeBuzz"` | `"Bem-vindo à\nSmokeBuzz"` |
| Lede | `"Sua tabacaria de confiança..."` | `"Charutos, tabacos e acessórios selecionados para quem aprecia cada baforada. Atendemos toda a cidade do Rio de Janeiro, com pedidos direto pelo Instagram."` |
| CTA 1 | `"Chamar no Direct"` (ghost) | `"Ver produtos"` (solid) |
| CTA 2 | `"Ver Produtos"` (ghost) | `"Pedir pelo Instagram"` (ghost) |
| BG gradients | none | 2 radial gradients (ember top-right, brass bottom-left) |
| Smoke wisps | none | 3 SVG circles (cream, brass, ember) with drift animation |
| Badge float range | `-8` to `0` | `-14px` to `0` |

### Sobre Section

| Field | Current RN | HTML Target |
|-------|-----------|-------------|
| Eyebrow | `"Quem somos"` | `"Nossa história"` |
| H2 | `"Sobre Nós"` | `"Uma tabacaria de bairro, com curadoria de verdade"` |
| Description | `"A SmokeBuzz é mais que uma tabacaria..."` | `"A SmokeBuzz nasceu para ser aquele lugar de confiança: um balcão onde você encontra do charuto ao isqueiro certo, e alguém que entende do assunto para te ajudar a escolher. Sem pressa, sem enrolação — só o que há de bom para quem gosta de fumar bem."` |
| Stats | `6+ Categorias`, `100% Atendimento` | `2026 Ano de fundação`, `6+ Categorias de produtos`, `100% Atendimento presencial` |

### Destaques Section (Product Grid)

- Section eyebrow: `"Direto do estoque"` — matches current
- Section H2: `"Destaques da semana"` — matches current
- Section desc: `"Alguns dos itens mais pedidos no Direct — confirme disponibilidade antes de fechar o pedido."` (currently missing in RN — add)
- Grid: 4 columns desktop → 2 columns mobile (currently RN is always 2 columns)
- Cards: no "Adicionar" button in HTML; RN should keep the button as functional layering
- Add `.prod-alt` text under price where applicable (e.g., "Avulsa por R$ 1,00" for Seda Zomo Branca)

### Produtos/Categorias Section (NEW)

Add 6 category cards in 3-column grid (→ 2-col at 900px → 1-col at 560px):
1. **Charutos** — SVG pipe icon — "Linha selecionada de charutos nacionais e importados, para todos os paladares."
2. **Cigarros** — SVG cigarette icon — "Principais marcas do mercado, sempre com estoque em dia."
3. **Sedas & Piteiras** — SVG rolling icon — "Sedas de diversas marcas e piteiras em vidro, metal e madeira."
4. **Tabacos** — SVG leaf icon — "Tabacos soltos e para cachimbo, com origem e curas variadas."
5. **Acessórios para fumo** — SVG clock icon — "Cortadores, cinzeiros, humidores e tudo que compõe o ritual."
6. **Isqueiros** — SVG lighter icon — "Do básico ao colecionável — sempre um isqueiro à altura do momento."

Each card: gradient bg (`espresso` → `espresso-2`), brass-light SVG icon, Rye h3, Jost p.

### Diferenciais Section

| Field | Current RN | HTML Target |
|-------|-----------|-------------|
| Eyebrow | `"Por que nos escolher"` | `"Por que a SmokeBuzz"` |
| H2 | `"Nossos Diferenciais"` | `"O que nos diferencia"` |
| Item 1 num | `"01"` | `"Curadoria"` |
| Item 1 title | `"Curadoria Premium"` | `"Produtos selecionados"` |
| Item 1 desc | `"Selecionamos a dedo..."` | `"Cada item do catálogo passa por uma escolha criteriosa — nada de prateleira lotada só por lotar."` |
| Item 2 num | `"02"` | `"Atendimento"` |
| Item 2 title | `"Atendimento Personalizado"` | `"Quem entende te ajuda"` |
| Item 2 desc | `"Nossa equipe é treinada..."` | `"Nossa equipe conhece cada produto e ajuda você a encontrar o que combina com o seu gosto."` |
| Item 3 num | `"03"` | `"Ambiente"` |
| Item 3 title | `"Ambiente Acolhedor"` | `"Feito para apreciar"` |
| Item 3 desc | `"Um espaço pensado..."` | `"Um espaço pensado para quem gosta de tirar um tempo para escolher e experimentar com calma."` |

### Localização Section

| Field | Current RN | HTML Target |
|-------|-----------|-------------|
| Eyebrow | `"Onde estamos"` | `"Onde entregamos"` |
| H2 | `"Localização"` | `"Área de atendimento"` |
| Block 1 | missing | **Cobertura**: `"Atendemos toda a cidade do Rio de Janeiro. Sem loja física — pedidos feitos direto pelo Instagram."` |
| Block 2 | missing | **Horário**: `"Segunda a sábado: 10h às 20h\nDomingo: 12h às 18h"` + `(ajuste para o seu horário real)` |
| Block 3 | missing | **Contato**: `"Instagram: @smokebuzztabacaria\nE-mail: contato@smokebuzz.com.br"` |
| Current address block | Rua Augusta, 1500 — Consolação, SP | Remove (HTML is RJ-based, no physical store) |
| Map placeholder | `"Mapa Interativo"` | `"Toda a cidade do Rio de Janeiro\nConfirme a área e o prazo de entrega do seu bairro direto no Direct"` |

### Contato Section

| Field | Current RN | HTML Target |
|-------|-----------|-------------|
| Eyebrow | `"Fale conosco"` | `"Fale com a gente"` |
| H2 | `"Entre em Contato"` | `"Pronto para o seu próximo charuto?"` |
| Description | `"Tem alguma dúvida ou quer fazer um pedido especial?..."` | `"Manda uma mensagem no Direct e a gente te ajuda a escolher — entregamos em toda a cidade do Rio de Janeiro."` |
| CTA 1 | `"Chamar no Direct"` (solid) | `"Chamar no Direct"` (solid) |
| CTA 2 | `"Ver Produtos"` (ghost) | `"Enviar e-mail"` (ghost) → mailto:contato@smokebuzz.com.br |

### Footer

| Field | Current RN | HTML Target |
|-------|-----------|-------------|
| Brand | `"SmokeBuzz"` | `"SmokeBuzz Tabacaria"` + `"Since 2026"` below |
| Logo size | `w-12 h-12` | `w-9 h-9` (36px) |
| Links | `Produtos`, `Sobre`, `Contato` | `Produtos`, `Sobre`, `Localização`, `Contato` |
| Legal | `"2026 SmokeBuzz Tabacaria..."` | `"Venda destinada exclusivamente a maiores de 18 anos. © 2026 SmokeBuzz Tabacaria. Todos os direitos reservados."` |

## Animation Additions

### Smoke Wisps (3 SVG circles)

```tsx
<View className="absolute top-[8%] left-[6%] w-[260px] h-[260px] opacity-35" style={{ animation: drift 14s ease-in-out infinite }}>
  <Svg viewBox="0 0 200 200"><Circle cx="100" cy="100" r="70" fill="#f2ead6" /></Svg>
</View>
<View className="absolute top-[55%] right-[8%] w-[180px] h-[180px] opacity-35" style={{ animation: drift 19s ease-in-out infinite, animationDelay: -4s }}>
  <Svg viewBox="0 0 200 200"><Circle cx="100" cy="100" r="60" fill="#c9a24b" /></Svg>
</View>
<View className="absolute top-[20%] right-[22%] w-[120px] h-[120px] opacity-35" style={{ animation: drift 23s ease-in-out infinite, animationDelay: -9s }}>
  <Svg viewBox="0 0 200 200"><Circle cx="100" cy="100" r="50" fill="#d9622b" /></Svg>
</View>
```

With `Animated.Value` based drift (translate + scale + opacity over 14-23s loop).

### Badge Float Animation

Change from current `-8px` to `-14px` range to match HTML.

## Button Changes

| Property | Current RN | HTML Target |
|----------|-----------|-------------|
| Border radius | `rounded` (default RN ~4px) | 2px |
| Padding | `px-5 py-2.5` (20px × 10px) | `px-[22px] py-[11px]` |
| Font size | `text-xs` (12px) | `text-sm` (~14px) |
| Ghost hover | none | Fills with brass background, noir text |
| Solid hover | none | brass-light background, translateY(-1px) |

## SVG Icons for Categories

6 inline SVGs (viewBox 48×48, stroke-width 1.6, fill none, color brass-light, size 44×44):

1. **Charutos** — pipe: `<rect x="4" y="21" width="34" height="7" rx="3.5"/><path d="M38 24h4a2 2 0 0 1 0 6l-4-1"/>`
2. **Cigarros** — cigarette: `<rect x="10" y="6" width="10" height="36" rx="4"/><path d="M13 6c0-2 1-4 2-4s2 2 2 4"/>`
3. **Sedas & Piteiras** — rolling: `<rect x="6" y="14" width="30" height="20" rx="2"/><path d="M6 20h30M6 28h30"/>`
4. **Tabacos** — leaf: `<path d="M14 40c-4-8-2-16 4-22 3 4 3 8 1 11 5-1 8-6 7-12 6 5 8 14 3 21-3 4-9 5-15 2z"/>`
5. **Acessórios** — clock: `<circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 4"/>`
6. **Isqueiros** — lighter: `<rect x="16" y="16" width="16" height="24" rx="3"/><path d="M20 16c0-4 2-8 4-8s4 4 4 8"/>`

## Navigation Architecture

Keep both navigation systems:
1. **Bottom TabBar** (existing) — Home | Produtos | Carrinho — for mobile app navigation
2. **Sticky Header Nav** (new) — brand + anchor links + "Chamar no Direct" CTA — as visual match to HTML

The sticky header is primarily decorative/fidelity matching. Its links can scroll to sections on the HomeScreen or navigate between screens.

## Price Formatting

Change all price displays from `R$ {value.toFixed(2)}` (period: R$ 3.00) to `R$ {value.toFixed(2).replace('.', ',')}` (comma: R$ 3,00).

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/BrassButton.tsx` | border-radius 2px, padding 11px 22px, font-size 0.85rem, add press/hover state |
| `src/components/SectionHeading.tsx` | Description font → Cormorant Garamond, bottom margin → 56px |
| `src/components/RopeDivider.tsx` | No changes needed |
| `src/screens/HomeScreen.tsx` | Major content update: all text, hero gradients/wisps, sobre stats, diferenciais reword, localização blocks, contato CTAs, footer |
| `src/screens/ProductsScreen.tsx` | Add 4-column grid (mobile: 2-col), add `.prod-alt` text, add section description, add "Categorias" section below products |
| `tailwind.config.js` | No changes needed (colors/fonts already defined) |
| `App.tsx` | Add sticky header navbar at top |

## New Files to Create

| File | Purpose |
|------|---------|
| `src/components/CategoryCard.tsx` | SVG icon + title + description card for Categorias section |
| `src/components/StickyHeader.tsx` | Sticky nav bar matching HTML header |