import type { Decorator, Preview } from "@storybook/react-vite";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export const decorators: Decorator[] = [
  (Story) => (
    <SafeAreaProvider>
      <Story />
    </SafeAreaProvider>
  ),
];

export const parameters: Preview["parameters"] = {
  controls: { expanded: true },
  a11y: { config: {} },
  backgrounds: {
    default: "Noir",
    values: [{ name: "Noir", value: "#0c0a08" }],
  },
};
