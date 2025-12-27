import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: [
    "../public"
  ],
  viteFinal: async (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          "next/navigation": path.resolve(__dirname, "./mocks/next-navigation.ts"),
        },
      },
    }),
};
export default config;
