# @mkvlrn/config

## what

custom, opinionated configurations for `eslint`, `prettier`, and `typescript` (`tsconfig.json`) to be used in my node and bun (deno doesn't want anything to do with eslint, prettier, or even tsconfig files so yeah) projects - aimed at modern, type-safe, non-spaghetti codebases

created to work with `esm` projects **only**. if you're still using `cjs` you are wrong and you will be sent to the gulag

## how

works exactly the same for `npm`, `yarn`, `pnpm`, and `bun` - exemplified with `yarn` here:

```bash
yarn add typescript eslint prettier @mkvlrn/config -D
```

then import the configurations from the package on your config files:

<details>
<summary><code>eslint.config.js</code></summary>

for base node, nest, or vite/react projects:

```js
export { default } from "@mkvlrn/config/eslint-base";
```

for nextjs projects:

```js
export { default } from "@mkvlrn/config/eslint-next";
```

if you want to add rules to the config, you export it as default while adding your rules to the config array:

```js
import { default as base } from "@mkvlrn/config/eslint-base";

export default {
  ...base,

  rules: {
    // add your custom rules here
    "no-console": "error",
    // or ignores
    "ignores": ["dist"],
  },
};
```

</details>

<details>
<summary><code>prettier.config.js</code></summary>

for all projects, using the config without modifying it:

```js
export { default } from "@mkvlrn/config/prettier";
```

and if you want to modify any of the rules, you can do so:

```js
import { default as base } from "@mkvlrn/config/prettier";

export default {
  ...base,

  // add your custom rules here
  printWidth: 80,
};
```

</details>

<details>
<summary><code>tsconfig.json</code></summary>

for base node, nest, or vite/react projects:

```jsonc
{
  "extends": "@mkvlrn/config/tsconfig-base",
  "compilerOptions": {
    // add your custom rules here
    "noUncheckedIndexedAccess": true,
  },
}
```

for nextjs projects:

```jsonc
{
  "extends": "@mkvlrn/config/tsconfig-next",
  "compilerOptions": {
    // add your custom rules here
    "noUncheckedIndexedAccess": true,
  },
}
```

</details>

## details

### eslint

two eslint flat configs: one for whatever node project (node, nest, react with vite, etc) and another for nextjs projects (which requires some special rules)

ALL rulesets/plugins are installed with the package, it's a flat config, so it's fancy that way

installing eslint separately is **required**

### prettier

a packaged prettier configuration with some opinionated defaults

also brings tailwindcss support (order of classes) and imports sorting, both via plugins

installing prettier separately is **required**

### typescript (tsconfig)

a packaged `tsconfig.json` with some opinionated defaults for both base node (which includes nest and vite/react projects) and nextjs projects

anything related to files except needs to be set: `rootDir`, `outDir`, `baseUrl`, `paths`, etc

this prevents path confusion because the "original" tsconfig will be in `node_modules`

defaults to `noemit` because I use esbuild so you might want to change that if you still want to use `tsc`

installing typescript separately is **required**
