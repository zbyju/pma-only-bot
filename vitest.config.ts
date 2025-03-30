import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    deps: {
      inline: true,
    },
    // Add these settings:
    globals: true,
    isolate: false, // Prevent test isolation that can cause module duplication
    restoreMocks: true,
  },
});
