import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*.ts", "src/**/*.tsx"],
      insertTypesEntry: true,
      outDir: "dist",
      copyDtsFiles: true,
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
      exclude: ["**/*.test.ts", "**/*.test.tsx"],
    }),
  ],
  build: {
    minify: "esbuild",
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-util-hooks",
      fileName: (format) => `react-util-hooks-${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
