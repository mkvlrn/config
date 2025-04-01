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

### eslint

three eslint flat configs are exposed:

- `eslint-node` for whatever node project (inlcuding nestjs) without react
- `eslint-vite` for vite/react projects
- `eslint-next` for nextjs projects (which requires some special rules)

**all** rulesets/plugins are installed with the package, it's a flat config, so it's fancy that way

installing eslint separately is **required**

create/edit your configuration file as below:

<details>
<summary><code>eslint.config.ts</code></summary>

for simple node or nestjs projects (pretty much anything that doesn't use react):

```ts
export { default } from "@mkvlrn/config/eslint-node";
```

for vite/react projects:

```ts
export { default } from "@mkvlrn/config/eslint-vite";
```

for nextjs projects:

```ts
export { default } from "@mkvlrn/config/eslint-next";
```

if you want to add rules to the config, you export it as default while adding your rules to the config array:

```ts
import base from "@mkvlrn/config/eslint-node";

export default [
  ...base,

  {
    rules: {
      // add your custom rules here
      "no-console": "error",
    },
    // or ignores
    ignores: ["dist"],
  },
];
```

</details>

### prettier

a packaged prettier configuration with some opinionated defaults that works in any kind of typescript project

also brings tailwindcss support (order of classes) and imports sorting, both via plugins

installing prettier separately is **required**

create/edit your configuration file as below:

<details>
<summary><code>prettier.config.js</code></summary>

for all projects, using the config without modifying it:

```js
export { default } from "@mkvlrn/config/prettier";
```

and if you want to modify any of the rules, you can do so:

```js
import base from "@mkvlrn/config/prettier";

export default {
  ...base,

  // add your custom rules here
  printWidth: 80,
};
```

</details>

### typescript (tsconfig)

three typescript configurations are exposed:

- `tsconfig-node` for whatever node project (inlcuding nestjs) without react
- `tsconfig-vite` for vite/react projects
- `tsconfig-next` for nextjs projects (which requires some special rules)

anything related to files needs to be set: `rootDir`, `outDir`, `baseUrl`, `paths`, etc

this prevents path confusion because the "original" tsconfig will be in `node_modules`

installing typescript separately is **required**

create/edit your configuration file as below:

<details>
<summary><code>tsconfig.json</code></summary>

for simple node or nestjs projects (pretty much anything that doesn't use react):

```jsonc
{
  "extends": "@mkvlrn/config/tsconfig-node",
  "compilerOptions": {
    // add your custom rules here
    "noEmit": false,
  },
}
```

for vite/react projects:

```jsonc
{
  "extends": "@mkvlrn/config/tsconfig-vite",
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
