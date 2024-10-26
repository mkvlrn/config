// @ts-check
// @ts-expect-error, no types for this plugin
import pluginNext from "@next/eslint-plugin-next";
import { default as base } from "./eslint-base.config.js";

/** @type {import("typescript-eslint").ConfigWithExtends[]} */
export default [
  ...base,

  {
    name: "eslint plugin next",
    files: ["*.tsx"],
    plugins: { "@next/next": pluginNext },
    rules: {
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
];
