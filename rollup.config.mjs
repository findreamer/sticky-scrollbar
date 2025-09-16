import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

const isDev = process.env.NODE_ENV === "development";
console.log("isDev", isDev);

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
    postcss({
      extract: false,
      minimize: !isDev,
      extensions: [".less", ".css"],
      use: {
        less: {},
      },
      // 不将外部CSS库打包到我们的代码中
      exclude: "node_modules/**",
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
      sourceMap: isDev,
      declarationMap: false,
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
          drop_debugger: true,
          conditionals: true,
          dead_code: true,
          evaluate: true,
          join_vars: true,
          reduce_vars: true,
          passes: 2,
        },
        mangle: {
          // 禁用toplevel，避免类方法名被错误混淆
          toplevel: true,
          // 禁用属性混淆，确保方法名不被改变
          properties: false,
        },
        format: {
          comments: false,
          ascii_only: true,
        },
      }),
  ].filter(Boolean),
  // 将gemini-scrollbar声明为外部依赖，不打包到我们的代码中
  external: ["gemini-scrollbar", "gemini-scrollbar/gemini-scrollbar.css"],
};
