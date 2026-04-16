import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        // Unit tests
        extends: "./vite.config.js",
        test: {
          name: "unit",
          environment: "node",
          include: ["packages/*/test/**/*.test.js"],
        },
      },
      {
        // Storybook interaction tests — extends vite.config.js for the React plugin
        extends: "./vite.config.js",
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          onUnhandledError: (err) => {
            return false;
          },
          onConsoleLog(log, type) {
            return false;
          },
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
