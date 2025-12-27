import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "../src/app/globals.css";

import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SpaceBackground } from "../src/components/visuals/SpaceBackground";

const preview: Preview = {
  globalTypes: {
    design: {
      description: "Design direction (token override layer)",
      defaultValue: "baseline",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "baseline", title: "Baseline" },
          { value: "candidate-1", title: "Candidate 1" },
          { value: "candidate-2", title: "Candidate 2" },
          { value: "candidate-3", title: "Candidate 3" },
          { value: "candidate-4", title: "Candidate 4" },
          { value: "candidate-5", title: "Candidate 5" },
        ],
      },
    },
    theme: {
      description: "Theme",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#020204" },
        { name: "light", value: "#E9EDF2" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === "light" ? "light" : "dark";
      const design = typeof context.globals.design === "string" ? context.globals.design : "baseline";
      try {
        localStorage.setItem("theme", theme);
      } catch {
        //
      }
      document.documentElement.dataset.design = design;
      return React.createElement(
        NextThemesProvider,
        {
          attribute: "class",
          defaultTheme: theme,
          forcedTheme: theme,
          enableSystem: false,
          enableColorScheme: true,
          disableTransitionOnChange: true,
        },
        React.createElement(
          "div",
          {
            style: {
              minHeight: "100vh",
              padding: 24,
              background: "var(--ds-bg)",
              color: "var(--ds-text)",
            },
          },
          React.createElement(SpaceBackground),
          React.createElement(
            "div",
            { style: { position: "relative", zIndex: 0 } },
            React.createElement(Story)
          )
        )
      );
    },
  ],
};

export default preview;
