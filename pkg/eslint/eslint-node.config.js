// @ts-check
import globals from "globals";
import eslintTypescript, { parser } from "typescript-eslint";
import base from "./base.js";

export default eslintTypescript.config(
  {
    name: "typescript parser",
    languageOptions: {
      parserOptions: { parser, ecmaVersion: "latest", project: true },
      globals: {
        ...globals.node,
      },
    },
  },

  ...base,
);
