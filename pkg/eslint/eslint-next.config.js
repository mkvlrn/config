// @ts-check
// @ts-expect-error - no types for this plugin
import pluginNext from "@next/eslint-plugin-next";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
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
    name: "eslint plugin react and hooks",
    plugins: {
      "react": pluginReact,
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReact.configs.flat.recommended?.rules,
      ...pluginReact.configs.flat["jsx-runtime"]?.rules,
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  {
    name: "eslint plugin next",
    plugins: { "@next/next": pluginNext },
    rules: {
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
);
