# Design: Web Storybook setup

## 1. Packages to install (devDependencies)

```
@storybook/react-vite@^8.2.0        # Vite builder for web stories, uses React 18
@storybook/addon-essentials@^8.2.0   # controls, actions, viewport, backgrounds, docs, etc.
@storybook/addon-a11y@^8.2.0         # accessibility checker
vite@^5.4.0                         # peer dependency
```

Rationale:
- `@storybook/react-vite@8` uses Vite 5, supports React 18, and works with `babel.config.js` (plugin-react picks up `babel-preset-expo` + nativewind automatically).
- Version 8 is the last stable series with explicit React Native web docs; matches Expo SDK 51 / RN 0.74 / React 18.2.
- `@storybook/addon-essentials` includes the most useful addons; adding `viewport` enables mobile preview at 390×844.
- `@storybook/addon-a11y` reports accessibility violations (important for the new a11y polish in ui-polish-v1).
- `vite` peer: will be installed as `react-vite` dependency, but adding to `devDependencies` explicitly versions it and avoids peer warnings.

## 2. File structure after implementation

```
├─ .storybook/
│   ├─ main.ts           # Vite builder config, stories glob, addons
│   ├─ preview.tsx       # decorators: global.css import; SafeAreaProvider wrapper for all stories
│   └─ preview-head.html # Google Fonts links (Rye, Jost, Cormorant Garamond)
├─ postcss.config.js     # { plugins: { tailwindcss: {}, autoprefixer: {} } } for Vite
├─ src/components/
│   ├─ AppPressable.stories.tsx
│   ├─ BrassButton.stories.tsx
│   ├─ CategoryCard.stories.tsx
│   ├─ Container.stories.tsx
│   ├─ ProductCard.stories.tsx
│   ├─ ProductCardSkeleton.stories.tsx
│   ├─ Reveal.stories.tsx
│   ├─ RopeDivider.stories.tsx
│   ├─ ScreenTransition.stories.tsx
│   ├─ SectionHeading.stories.tsx
│   └─ StickyHeader.stories.tsx
├─ package.json           # updated: storybook script + dependencies
└─ tailwind.config.js     # content array extended: `"./src/**/*.{ts,tsx}" -> "./src/**/*.{ts,tsx}", "./**/*.stories.ts{,x}"`
```

## 3. Configuration details

### `.storybook/main.ts`

```ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "./src/components/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      resolve: {
        alias: {
          "react-native$": "react-native-web",
        },
      },
    });
  },
};

export default config;
```

### `.storybook/preview.tsx`

Wraps all stories with:
- `import "../global.css"` — Tailwind utilities from `@tailwind base/components/utilities`.
- `SafeAreaProvider` (from `react-native-safe-area-context`) — needed by `StickyHeader`.
- Optional: `CartProvider` not required (no stories use cart state yet).

```tsx
import type { Preview } from "@storybook/react-vite";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export const decorators = [
  (Story) => (
    <SafeAreaProvider>
      <Story />
    </SafeAreaProvider>
  ),
];

export const parameters: Preview["parameters"] = {
  controls: { expanded: true },
  a11y: { config: {} },
};
```

### `.storybook/preview-head.html`

Google Fonts links copied from `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Rye&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### `postcss.config.js` (root)

```js
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

## 4. Story file conventions

Each story file exports default:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import componentName from "../...ComponentPath...";

const meta = {
  title: "Components/ComponentName",
  component: componentName,
  parameters: {
    layout: "centered",  // most components
  },
  argTypes: { /* variant controls */ },
} as Meta<typeof componentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const VariantName: Story = { args: { /* variant props */ } };
```

### Component-specific story requirements:

| Component | Variants / Notes |
|---|---|
| **AppPressable** | Default (scale), dim feedback variant; children text + icons; disabled state via `onPress` omit. |
| **BrassButton** | Solid (default), ghost; size md (default), sm; `onPress` stub. |
| **CategoryCard** | Default with icon+title+description; hover animation. |
| **Container** | Default with children (text block), custom maxWidth=800, custom paddingX=16, className padding. |
| **ProductCard** | Uses `products[0]` (emoji fallback if real image) with `onAdd` → console.log; `altText` variant. |
| **ProductCardSkeleton** | Default (no props) — shimmer visible. |
| **Reveal** | Default children; delay 100ms; y offset 48. |
| **RopeDivider** | Default; thin variant. |
| **ScreenTransition** | Default child; reduced motion toggle (via `usePrefersReducedMotion` hook — need to provide a wrapper or just show animated). Simplified: wrap children in an Animated.View with text. |
| **SectionHeading** | All three (eyebrow, title, description) and title-only variants. |
| **StickyHeader** | Provides `onNavPress` stub, `scrolled` true/false, `activeSection` variations. |

## 5. Data dependencies in stories

Stories may import test data:
- `src/data/products.ts` → `products[0]` for ProductCard.
- `src/data/categories.tsx` → `categorias[0]` for CategoryCard (need an icon; renderIcon uses react-native-svg icons).

All imports should be lazy or static; no side effects.

## 6. Tailwind `content` glob update

`t0tailwind.config.js` must include stories so that classNames used in stories are collected:

```diff
  content: [
-   "./src/**/*.{ts,tsx}",
+   "./src/**/*.{ts,tsx}",
+   "./**/*.stories.ts{,x}",
  ],
```

## 7. package.json script

```diff
  "scripts": {
    "start": "expo start",
    "...": "...",
+   "storybook": "storybook dev -p 6006",
+   "storybook:build": "storybook build"
  },
```

## 8. Verification checklist

- [ ] `npm install` completes without peer warnings
- [ ] `npm run storybook` starts, browser opens http://localhost:6006
- [ ] All 11 Stories directories appear in sidebar
- [ ] Each story renders; controls work (BrassButton variants, SectionHeading, etc.)
- [ ] A11y panel shows no violations
- [ ] `npm test` — still 13/13 pass
- [ ] `npx tsc --noEmit` — zero errors
- [ ] `npm run build:web` — dist regenerated, works
- [ ] Manual spot-check: hover on hoverable cards, TabBar navigation in browser, Scroll view behavior not affected