// @ts-check
import pluginReact from "eslint-plugin-react";
// @ts-expect-error, no types for this package
import pluginReactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error, no types for this package
import pluginRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import eslintTypescript, { parser } from "typescript-eslint";
import base from "./base.js";

export default eslintTypescript.config(
  {
    name: "typescript parser",
    languageOptions: {
      parserOptions: { parser, ecmaVersion: "latest", project: true, ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
      },
    },
  },

  ...base,

  {
    name: "eslint plugin react, hooks, and refresh",
    plugins: {
      // @ts-expect-error, TODO - figure out this error; works fine but complains
      "react": pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginRefresh,
    },
    rules: {
      ...pluginReact.configs.flat?.recommended.rules,
      ...pluginReact.configs.flat?.["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
);
