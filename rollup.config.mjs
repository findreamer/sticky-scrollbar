import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const isDev = process.env.NODE_ENV === "development";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/sticky-scrollbar.js",
      format: "umd",
      name: "StickyScrollbar",
      sourcemap: isDev,
    },
    {
      file: "dist/sticky-scrollbar.esm.js",
      format: "es",
      sourcemap: isDev,
    },
    {
      file: "dist/sticky-scrollbar.cjs.js",
      format: "cjs",
      sourcemap: isDev,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".js", ".ts"],
    }),
    !isDev &&
      terser({
        compress: {
          drop_console: true,
        },
      }),
  ].filter(Boolean),
  external: [],
};
