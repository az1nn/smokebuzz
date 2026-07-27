# Tasks: Final HTML Gaps

## Step 1 — Export `categorias` data from ProductsScreen

**File:** `src/screens/ProductsScreen.tsx`

- Add `export` keyword before `const categorias` declaration
- Also export the `renderIcon` function so HomeScreen can reuse it

```tsx
export const categorias = [ ... ]; // add export

export function renderIcon(title: string) { ... } // add export
```

## Step 2 — Add scroll view ref to HomeScreen

**File:** `src/screens/HomeScreen.tsx`

- Import `useRef`, `RefObject` from React
- Import `ScrollView` from react-native (it's already imported)
- Import `Linking` from react-native
- Create a `scrollRef = useRef<ScrollView>(null)` at component top
- Pass `ref={scrollRef}` to the root `<ScrollView>`
- Export a helper function or expose scroll methods using `useImperativeHandle` (or simply use `scrollViewRef.current?.scrollTo({ y: targetY, animated: true })` inside a `scrollToSection` function)

## Step 3 — Add Destaques section to HomeScreen

**File:** `src/screens/HomeScreen.tsx`

**Placement:** After the Sobre section's `</View>` closing tag and its `<RopeDivider />`, insert:

```tsx
{/* DESTAQUES */}
<View className={`bg-espresso ${sectionPad} px-7`}>
  <View className="max-w-[1180px] mx-auto">
    <SectionHeading
      eyebrow="Direto do estoque"
      title="Destaques da semana"
      description="Alguns dos itens mais pedidos no Direct — confirme disponibilidade antes de fechar o pedido."
    />
    <View className={`flex-row flex-wrap gap-6 ${isMobile ? "" : ""}`}>
      {products.slice(0, 4).map((item) => (
        <View
          key={item.id}
          className={isMobile ? "w-[calc(50%-12px)]" : "w-[calc(25%-18px)]"}
        >
          {/* Product card content */}
        </View>
      ))}
    </View>
  </View>
</View>
<RopeDivider thin />
```

- Import `useProducts` and `useAddToCart` hooks at top
- Use only first 4 products (`products.slice(0, 4)`)
- Reuse the same ProductCard visual layout from ProductsScreen:
  - White `aspect-square` photo bg with `p-[18px]`
  - Image or emoji display
  - `p-5 pb-6` info area
  - `text-brass-light font-rye text-base` name
  - `text-cream font-rye text-lg` price
  - Optional alt text
  - `BrassButton label="Adicionar" size="sm"` with `addToCart(item)`
- Add hover state (translateY -6px, border-brass) matching existing pattern

## Step 4 — Add Categorias section to HomeScreen

**File:** `src/screens/HomeScreen.tsx`

**Placement:** After the Destaques section and its thin RopeDivider, insert:

```tsx
{/* CATEGORIAS */}
<View className={`${sectionPad} px-7`}>
  <View className="max-w-[1180px] mx-auto">
    <SectionHeading
      eyebrow="O que você encontra aqui"
      title="Categorias"
      description="Uma seleção pensada para todo tipo de fumante — do iniciante ao mais exigente."
    />
    <View className="flex-row flex-wrap" style={{ gap: 24 }}>
      {(categorias).map((cat) => (
        <View
          key={cat.title}
          className={
            width > 900 ? "w-[calc(33.333%-16px)]"
              : width > 560 ? "w-[calc(50%-12px)]"
              : "w-full"
          }
        >
          <CategoryCard
            icon={
              <View className="w-11 h-11 mb-5 items-center justify-center">
                {renderIcon(cat.title)}
              </View>
            }
            title={cat.title}
            description={cat.description}
          />
        </View>
      ))}
    </View>
  </View>
</View>
<RopeDivider thin />
```

- Import `CategoryCard` and `renderIcon` (now exported from ProductsScreen)
- Import the exported `categorias` data
- Responsive grid: 3 columns >900px, 2 columns 560-900px, 1 column <560px

## Step 5 — Wire "Chamar no Direct" buttons to Instagram

**File:** `src/screens/HomeScreen.tsx`

Replace all `onPress={() => {}}` with `onPress={() => Linking.openURL("https://instagram.com/smokebuzztabacaria")}` on:

- Hero "Pedir pelo Instagram" BrassButton
- Contato "Chamar no Direct" BrassButton

**File:** `src/components/StickyHeader.tsx`

Replace `onPress={() => {}}` with `onPress={() => Linking.openURL("https://instagram.com/smokebuzztabacaria")}` on:

- Desktop nav "Chamar no Direct" BrassButton
- Mobile menu "Chamar no Direct" BrassButton

Add `import { Linking } from "react-native"` at top.

## Step 6 — Wire "Enviar e-mail" button

**File:** `src/screens/HomeScreen.tsx`

Replace `onPress={() => {}}` on the Contato section's ghost BrassButton with:

```tsx
onPress={() => Linking.openURL("mailto:contato@smokebuzz.com.br")}
```

## Step 7 — Wire footer nav links to scroll

**File:** `src/screens/HomeScreen.tsx`

Wrap each footer nav link Text in a Pressable. Use `scrollRef` to scroll to section positions.

Create a `scrollToSection` helper:

```tsx
const sectionPositions = {
  produtos: 0,   // will be calculated
  sobre: 0,
  localizacao: 0,
  contato: 0,
};

const scrollToSection = (section: keyof typeof sectionPositions) => {
  // Use onLayout callbacks on each section View to capture Y positions
  scrollRef.current?.scrollTo({ y: sectionPositions[section], animated: true });
};
```

Alternative simpler approach: Use `onLayout` on each section View to capture its Y offset, stored in a ref. Then scroll to that position.

```tsx
<Pressable onPress={() => scrollToSection("produtos")}>
  <Text className="text-cream font-jost text-sm">Produtos</Text>
</Pressable>
```

Map footer link labels to section IDs:
| Text | Section |
|------|---------|
| Produtos | Scroll to Categorias section |
| Sobre | Scroll to Sobre section |
| Localização | Scroll to Localização section |
| Contato | Scroll to Contato section |

## Step 8 — Add nav link hover states (StickyHeader)

**File:** `src/components/StickyHeader.tsx`

- Import `useState` from React (already imported)
- Wrap each desktop nav link Text in a `Pressable` with hover state
- Create a `NavLink` component or use individual state:

```tsx
const [hoveredLink, setHoveredLink] = useState<string | null>(null);

// For each nav link:
<Pressable
  onPress={() => {}}
  onMouseEnter={() => setHoveredLink("destaques")}
  onMouseLeave={() => setHoveredLink(null)}
>
  <Text className={`text-sm font-jost tracking-[0.4px] transition-colors duration-200
    ${hoveredLink === "destaques" ? "text-brass-light" : "text-cream-dim opacity-[0.85]"}`}>
    Destaques
  </Text>
</Pressable>
```

Add matching hover behavior to the mobile menu nav links.

## Step 9 — Clean up ProductsScreen (remove duplicate Categorias if needed)

**File:** `src/screens/ProductsScreen.tsx`

The ProductsScreen still shows Destaques + Categorias sections in its footer. This is correct behavior since ProductsScreen is the full catalog view. **No changes needed.**

However, if the HomeScreen's Categorias section makes the ProductsScreen's duplicate feel redundant, optionally remove the categories footer from ProductsScreen and keep only the product grid. For this pass, keep both.

## Step 10 — Verify

- Run TypeScript check:
  ```bash
  npx tsc --noEmit
  ```
- Run tests:
  ```bash
  npm test
  ```
- Build for web:
  ```bash
  npm run build:web
  ```
- Verify visually:
  - HomeScreen shows Destaques (4 product cards) between Sobre and Diferenciais
  - HomeScreen shows Categorias (6 category cards) between Destaques and Diferenciais
  - All "Chamar no Direct" buttons open Instagram
  - "Enviar e-mail" opens mail client
  - Footer links scroll to correct sections
  - Nav links get brass-light color on hover (web)

## Step 11 — Commit & push

```bash
git add -A
git commit -m "Add missing Destaques/Categorias sections to HomeScreen; wire all dead interactive elements"
git push
```
