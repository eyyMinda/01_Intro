import { defineConfig } from "vitest/config";

export default defineConfig({
    define: {
        "import.meta.vitest": "undefined", //Tests Not visible when compiled
    },
    test: {
        includeSource: ["**/*.{js,ts}"],
        watchExclude: ["**/node_modules/**, **/dist/**"],
        coverage: {
            reporter: ["text", "html"],
        },
    },
});