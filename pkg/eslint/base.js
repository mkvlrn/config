// @ts-check
import eslint from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import pluginUnicorn from "eslint-plugin-unicorn";
import eslintTypescript from "typescript-eslint";

export default eslintTypescript.config(
  {
    name: "eslint recommended",
    ...eslint.configs.recommended,
  },

  ...eslintTypescript.configs.strictTypeChecked,
  ...eslintTypescript.configs.stylisticTypeChecked,

  {
    /**
     * temporarily disable while most npm packages
     * still export unsafe types all over the place
     * so I'm guessing until 2034 or something
     */
    name: "disable unsafe temporarily",
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },

  {
    // disables the original, uses the one from typescript-eslint
    // also allows unused vars with names starting with _ or unused rest params
    name: "use typescript-eslint version of no-unused-vars",
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  {
    // backticks only in templates
    name: "backticks only in templates",
    rules: {
      "quotes": ["warn", "double", { avoidEscape: true }],
      "no-template-curly-in-string": "error",
    },
  },

  {
    // reminds you to remove scattered console statements
    name: "console warn",
    rules: { "no-console": "warn" },
  },

  {
    // forces type-safe equality checks
    name: "strict equality checks",
    rules: { eqeqeq: "error" },
  },

  {
    // by default it assumes numbers won't be properly cast to strings
    name: "allow numbers in template literals",
    rules: {
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
    },
  },

  {
    name: "eslint plugin unicorn",
    plugins: { unicorn: pluginUnicorn },
    rules: {
      ...pluginUnicorn.configs.recommended.rules,
      // null is fine
      "unicorn/no-null": "off",
      // some names come from external sources, gotta allow those
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            ProcessEnv: true,
            ImportMetaEnv: true,
            generateStaticParams: true,
            Props: true,
          },
          ignore: ["next-env", "vite-env"],
        },
      ],
      // default import from node:util is fine
      "unicorn/import-style": ["error", { styles: { "util": false, "node:util": false } }],
      // no need to hoist arrow functions to the top (testing thanks you)
      "unicorn/consistent-function-scoping": ["error", { checkArrowFunctions: false }],
    },
  },

  {
    name: "disable rules that are controlled by prettier",
    ...configPrettier,
  },
);
