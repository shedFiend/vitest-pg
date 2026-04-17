import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    onUnhandledError(error) {
      // Ignore all errors
      return false
    },
    onConsoleLog(log, type) {
      // Ignore all console output
      return false;
    },
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
