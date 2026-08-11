import type { StorybookConfig } from "@storybook/react-vite";
import type { Plugin } from "vite";
import { fileURLToPath } from "node:url";

const resolvePackage = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/components/*.stories.tsx"],
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
    const platformWebPlugin: Plugin = {
      name: "rn-web-platform",
      enforce: "pre",
      async resolveId(source, importer) {
        if (!importer || !source.startsWith(".")) return null;
        const fs = await import("node:fs");
        const path = await import("node:path");
        const base = path.resolve(path.dirname(importer), source);
        for (const ext of [".js", ".jsx", ".ts", ".tsx"]) {
          if (fs.existsSync(base + ".web" + ext)) {
            return base + ".web" + ext;
          }
        }
        return null;
      },
    };
    return mergeConfig(config, {
      optimizeDeps: {
        include: ["react-native-web"],
        exclude: ["react-native-safe-area-context", "react-native-svg"],
      },
      plugins: [platformWebPlugin],
      resolve: {
        alias: [
          {
            find: /^react-native$/,
            replacement: "react-native-web",
          },
          {
            find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent$/,
            replacement: resolvePackage("./codegenNativeComponent.js"),
          },
          {
            find: /^@react-native\/assets-registry\/registry$/,
            replacement: resolvePackage(
              "../node_modules/react-native-web/dist/modules/AssetRegistry/index.js"
            ),
          },
          {
            find: /^react-native-svg$/,
            replacement: "react-native-svg/lib/module/ReactNativeSVG.web",
          },
        ],
      },
    });
  },
};

export default config;
