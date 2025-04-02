# @mkvlrn/config

## what

custom, opinionated configurations for `biome`, `commitlint`, and `typescript` (`tsconfig.json`) to be used in my node and possibly bun (deno does its own thing) projects - aimed at modern, type-safe, non-spaghetti codebases

created to work with `esm` projects **only**. if you're still using `cjs` you are wrong and you will be sent to the gulag

## how

works exactly the same for `npm`, `yarn`, `pnpm`, and `bun` - exemplified with `yarn` here:

```bash
yarn add @mkvlrn/config -D
```

then import the configurations from the package on your config files:

### biome

a base config is exposed, so import that and go from there

installing bioime separately is **required**

create/edit your configuration file as below:

<details>
<summary><code>biome.json</code></summary>

```json
{
  "extends": ["@mkvlrn/config/biome"]
}
```

</details>

### commitlint

exactly the same as with `@commitlint/config-conventional`, but in here, because adding a single package just for that is whack

installing commitlint (the cli) separately is **required**

create/edit your configuration file as below:

<details>
<summary><code>.commitlintrc.json</code></summary>

```json
{
  "extends": ["@mkvlrn/config/commitlint"]
}
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
    "noEmit": false
  }
}
```

for vite/react projects:

```jsonc
{
  "extends": "@mkvlrn/config/tsconfig-vite",
  "compilerOptions": {
    // add your custom rules here
    "noUncheckedIndexedAccess": true
  }
}
```

for nextjs projects:

```jsonc
{
  "extends": "@mkvlrn/config/tsconfig-next",
  "compilerOptions": {
    // add your custom rules here
    "noUncheckedIndexedAccess": true
  }
}
```

</details>
