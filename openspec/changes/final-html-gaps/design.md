# Design: Final HTML Gaps

## Section Order (HomeScreen)

After this change, the HomeScreen scroll order will match the HTML:

```
Header → Hero → RopeDivider → Sobre → RopeDivider(normal)
  → Destaques (4 product cards) → RopeDivider(thin)
  → Categorias (6 category cards) → RopeDivider(thin)
  → Diferenciais → RopeDivider → Localização → RopeDivider → Contato → Footer
```

## HomeScreen Layout Changes

### New: Destaques Section (inserted between Sobre and Diferenciais)

```
src/screens/HomeScreen.tsx
  - Import useProducts, useAddToCart, the 4 product cards' data
  - Add new section after Sobre's closing RopeDivider:

  <View className="bg-espresso py-[104px] px-7">
    <View className="max-w-[1180px] mx-auto">
      <SectionHeading
        eyebrow="Direto do estoque"
        title="Destaques da semana"
        description="Alguns dos itens mais pedidos no Direct — confirme disponibilidade antes de fechar o pedido."
      />
      <View className="flex-row flex-wrap gap-6">
        {products.slice(0, 4).map(product => (
          // product card matching ProductsScreen style
        ))}
      </View>
    </View>
  </View>
  <RopeDivider thin />
```

- Reuse the same `ProductCard` visual style from ProductsScreen (white photo bg, brass-light Rye title, Rye price, alt text, "Adicionar" button)
- Only show first 4 products from `useProducts`
- Use responsive grid: 4 columns on desktop (>900px), 2 columns on mobile

### New: Categorias Section (between Destaques and Diferenciais)

```
  <View className="py-[104px] px-7">
    <View className="max-w-[1180px] mx-auto">
      <SectionHeading
        eyebrow="O que você encontra aqui"
        title="Categorias"
        description="Uma seleção pensada para todo tipo de fumante — do iniciante ao mais exigente."
      />
      <View className="flex-row flex-wrap gap-6">
        {categorias.map(cat => (
          // CategoryCard component, reused from ProductsScreen
        ))}
      </View>
    </View>
  </View>
  <RopeDivider thin />
```

- Reuse existing `CategoryCard` component and `categorias` data from ProductsScreen
- Responsive grid: 3 cols (>900px), 2 cols (560-900px), 1 col (<560px)

## Interactive Elements

### Opening External URLs

Use `Linking.openURL` from `react-native` to open external links:

| Element | URL | Platform |
|---------|-----|----------|
| "Chamar no Direct" | `https://instagram.com/smokebuzztabacaria` | Web + Native |
| "Pedir pelo Instagram" | `https://instagram.com/smokebuzztabacaria` | Web + Native |
| "Enviar e-mail" | `mailto:contato@smokebuzz.com.br` | Web + Native |

### Footer Nav Links

Wrap each footer nav link Text in a Pressable that scrolls the ScrollView to the corresponding section using `scrollViewRef`:

| Link Text | Scroll Target |
|-----------|---------------|
| Produtos | Categorias section (HomeScreen) |
| Sobre | Sobre section |
| Localização | Localização section |
| Contato | Contato section |

### Nav Link Hover States (StickyHeader)

Add `Pressable` hover effect to desktop nav links in `StickyHeader.tsx`:
- Default: `opacity-[0.85]`
- Hover: `opacity-1 text-brass-light`

## Files to Modify

| File | Changes |
|------|---------|
| `src/screens/HomeScreen.tsx` | Add Destaques + Categorias sections; add scrollViewRef; wire footer links |
| `src/screens/ProductsScreen.tsx` | Export `categorias` array for reuse |
| `src/components/StickyHeader.tsx` | Wire "Chamar no Direct" to `Linking.openURL`; add hover states on nav links; make nav links Pressable with scroll behavior |
| `src/App.tsx` | Pass `scrollToSection` handler down to StickyHeader (optional — StickyHeader could use Linking for external + internal anchors) |
