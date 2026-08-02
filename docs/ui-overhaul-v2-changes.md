# Changelog do UI Overhaul — SmokeBuzz Tabacaria

Documento vivo que registra as mudanças de visual/layout do design system. **Consulte e atualize este arquivo** sempre que modificar layouts visuais, temas, estilos (Tailwind/global.css) ou componentes core.

## Design tokens

### Cores (definidas em `tailwind.config.js`)

| Classe Tailwind | Hex | Uso |
|-----------------|-----|-----|
| `noir` | `#0c0a08` | Fundo primário |
| `espresso` | `#1e150e` | Seções, tab bar |
| `espresso-2` | `#2b1d12` | Gradientes de cards |
| `cream` | `#f2ead6` | Texto primário, títulos |
| `cream-dim` | `#cfc3a4` | Texto secundário/muted |
| `brass` | `#c9a24b` | Bordas, botões, acentos |
| `brass-light` | `#e6c878` | Títulos, tab ativo, hover |
| `ember` | `#d9622b` | Acento terciário, badge do carrinho, remover |
| `line` | `rgba(201,162,75,0.28)` | Bordas, divisores, contornos |

### Tipografia (chaves `fontFamily` do Tailwind)

| Fonte | Uso |
|-------|-----|
| `font-rye` | Títulos (h1-h3), preços, branding |
| `font-jost` | Corpo, botões, nav, eyebrow labels |
| `font-cormorant` | Itálicos, ledes, citações |

## Componentes reutilizáveis (`src/components/`)

- `RopeDivider` — divisor diagonal de linhas repetidas (`h-[10px]` normal, `h-[4px]` fino)
- `SectionHeading` — eyebrow + título Rye + descrição opcional
- `BrassButton` — variantes `solid` (preenchimento brass, texto noir) e `ghost` (borda brass, texto cream)
- `CategoryCard` — card de categoria com hover animado (easing 250ms)
- `StickyHeader` — header fixo com estado `scrolled` e seção ativa
- `Container` — limita largura (`maxWidth` 1180, `paddingX` 28, `w-full mx-auto`)
- `ProductCard` — card de produto compartilhado (foto, nome, preço, botão "Adicionar")
- `AppPressable` — wrapper de press feedback (`scale`/`dim`) sobre `Pressable`
- `ScreenTransition` — transição de entrada por tela (fade 220ms + rise 280ms); raiz com `flex: 1` para preservar a cadeia de altura e o scroll interno das telas
- `Reveal` — entrada por scroll (`IntersectionObserver` no web; fallback nativo)
- `ProductCardSkeleton` — placeholder shimmer idêntico ao `ProductCard`

## Estrutura de telas

| Tela | Arquivo | Rota | Tab |
|------|---------|------|-----|
| Home | `src/screens/HomeScreen.tsx` | "home" | Home |
| Products | `src/screens/ProductsScreen.tsx` | "products" | Produtos |
| Cart | `src/screens/CartScreen.tsx` | "cart" | Carrinho |
| Checkout | `src/screens/CheckoutScreen.tsx` | "checkout" | (oculta da tab bar) |

## Changelog

### v1.1 — `ui-polish-v1` (polish)

Polish sobre o design system v1:

- **Responsividade** — hook `useBreakpoints` (tiers 560/900), `Container` com caps de largura (1180px) em todas as telas (incl. Cart/Checkout), SafeArea end-to-end (header, tab bar, hero).
- **Hovers com easing** — `ProductCard`/`CategoryCard` com hover animado (250ms `cubic-bezier(0.22,1,0.36,1)`, lift -6px).
- **Sistema de motion** — `usePrefersReducedMotion` em todas as plataformas; `ScreenTransition` por tela; `Reveal` com stagger (80ms) por seção; herói com wisps radiais suaves + parallax; bump do badge do carrinho (spring 1→1.25→1).
- **Press feedback** — `AppPressable` (scale 0.96 / dim) nos itens interativos (tab bar, hamburger, steppers, remover, links).
- **Skeleton loaders** — `ProductCardSkeleton` (shimmer ~40% opacity) em Destaques e Produtos durante o load.
- **Estados pt-BR** — painéis de erro (Rye title + Cormorant sub + "Tentar novamente" → `refetch()`) e carrinho vazio (motivo ember + "Ver produtos").
- **Fix checkout** — snapshot do total antes do `clearCart()` (corrige "R$ 0,00" no sucesso).
- **L10n** — `src/strings.ts` centraliza todas as strings pt-BR ("Código de segurança", validações do formulário, "Pagamento recusado…").
- **PWA theming** — `manifest.json`, meta tags (`postbuild.js`) e `app.json` com cores noir (`#0c0a08`).
- **Acessibilidade** — roles/labels em tabs, hamburger, steppers, remover, adicionar; foco-visible com anel brass (offset 2); `aria-hidden`/`accessibilityElementsHidden` em wisps e rope dividers.

### v1 — `ui-overhaul-v2` (design system)

- Porte do design system do HTML de referência para RN/NativeWind.
- Paleta e tipografia definidas em `tailwind.config.js` (ver tokens acima).
- Componentes `RopeDivider`, `SectionHeading`, `BrassButton`, `StickyHeader`, `CategoryCard`, `ProductCard`, `Container`.
- Layout das 4 telas (Home/Products/Cart/Checkout) alinhado ao HTML de referência.
