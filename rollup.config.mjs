import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.jsx",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "framer-motion",
  ],
  plugins: [
    resolve({ extensions: [".js", ".jsx"] }),
    json(),
    babel({
      babelHelpers: "bundled",
      presets: [
        ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
        ["@babel/preset-react", { runtime: "automatic" }],
      ],
      extensions: [".js", ".jsx"],
      exclude: "node_modules/**",
    }),
    commonjs(),
    postcss({
      extract: "styles.css",
      minimize: true,
    }),
    terser(),
  ],
};
