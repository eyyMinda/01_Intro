import { defineConfig } from "vitest/config";

export default defineConfig({
    define: {
        "import.meta.vitest": "undefined", //Tests Not visible when compiled
    },
    test: {
        includeSource: ["**/*.{js, ts}"],
        watchExclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', 'vite.config.ts'],
        coverage: {
            reporter: ["text", "html"],
        },
    },
});