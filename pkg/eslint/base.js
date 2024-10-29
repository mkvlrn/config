// @ts-check
// @ts-expect-error, no types for this package
import eslint from "@eslint/js";
// @ts-expect-error, no types for this package
import configPrettier from "eslint-config-prettier";
// @ts-expect-error, no types for this package
import pluginImport from "eslint-plugin-import";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginVitest from "eslint-plugin-vitest";
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
    // only needed while https://github.com/nodejs/node/issues/51292 is open
    // TODO - remove this rule when it's fixed
    name: "allow floating promises from node:test's describe and test",
    rules: {
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          allowForKnownSafeCalls: [
            {
              from: "package",
              name: ["describe", "test", "suite", "it"],
              package: "node:test",
            },
          ],
        },
      ],
    },
  },

  {
    name: "eslint plugin import",
    plugins: { import: pluginImport },
    settings: { "import/resolver": { typescript: {} } },
    rules: {
      ...pluginImport.flatConfigs.recommended.rules,
      ...pluginImport.flatConfigs.typescript.rules,
      ...pluginImport.flatConfigs.react.rules,
      // allows for the use of devDependencies in test files
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      // doesn't require default exports on files with single exports
      "import/prefer-default-export": "off",
      // another not-so-brilliant rule
      "import/no-named-as-default": "off",
      // another not-so-brilliant rule redux
      "import/no-named-as-default-member": "off",
      // don't know about this one either, chief
      "import/namespace": "off",
    },
  },

  {
    name: "eslint plugin unicorn",
    plugins: { unicorn: pluginUnicorn },
    rules: {
      ...pluginUnicorn.configs["flat/recommended"].rules,
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
    },
  },

  {
    name: "eslint plugin vitest",
    files: ["*.test.ts", "*.spec.ts", "*.test.tsx", "*.spec.tsx"],
    plugins: { vitest: pluginVitest },
    rules: { ...pluginVitest.configs.recommended.rules },
  },

  {
    name: "disable rules that are controlled by prettier",
    ...configPrettier,
  },
);
