# unplugin-icons

[![NPM version](https://img.shields.io/npm/v/unplugin-icons?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-icons)

Access thousands of icons as components **on-demand** universally.

### Features

- 🌏 Universal
  - 🤹 **Any** icon sets - ~150 popular sets with over 200,000 icons, logos, emojis, etc. Powered by [Iconify](https://github.com/iconify/iconify).
  - 📦 **Major** build tools - Vite, Webpack, Rollup, Nuxt, Rspack, etc. Powered by [unplugin](https://github.com/unjs/unplugin).
  - 🚀 **Major** frameworks - Vanilla, Web Components, React, Vue 3, Solid, Svelte, and more. [Contribute](./src/core/compilers).
  - 🍱 **Any** combinations of them!
- ☁️ On-demand - Only bundle the icons you really use, while having all the options.
- 🖨 SSR / SSG friendly - Ship the icons with your page, no more FOUC.
- 🌈 Stylable - Change size, color, or even add animations as you would with styles and classes.
- 📥 [Custom icons](#custom-icons) - load your custom icons to get universal integrations at ease.
- 📲 [Auto Importing](#auto-importing) - Use icons as components directly in your template.
- 🦾 TypeScript support.
- 🔍 [Browse Icons](https://icones.js.org/)

<table><tr><td><br>

&nbsp;&nbsp;&nbsp;💡 **Story behind this tool**: [Journey with Icons Continues](https://antfu.me/posts/journey-with-icons-continues) - a blog post by Anthony&nbsp;&nbsp;&nbsp;

</td></tr></table>

> **`vite-plugin-icons` has been renamed to `unplugin-icons`**, see the [migration guide](#migration-from-vite-plugin-icons)

## Quick Start

### Basic Usage

Import icons using the convention `~icons/{collection}/{icon}` and use them as components. [Auto importing](#auto-importing) is also supported.

**React Example:**

```jsx
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'

function App() {
  return (
    <div>
      <IconAccessibility />
      <IconAccountBox style={{ fontSize: '2em', color: 'red' }} />
    </div>
  )
}
```

**Vue Example:**

```vue
<script setup>
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'
</script>

<template>
  <icon-accessibility />
  <icon-account-box style="font-size: 2em; color: red" />
</template>
```

## Installation

> **Note**: This package is ESM-only. Make sure your project uses ES modules (`"type": "module"` in `package.json` or `.mjs` file extensions).

### Step 1: Install the Plugin

```bash
npm i -D unplugin-icons
```

### Step 2: Install Icon Data

We use [Iconify](https://iconify.design/) as the icons data source (supports 100+ icon sets).

> [!TIP]
> ✨ **VS Code Users**: Install the [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) extension for inlay preview, auto-completion, and hover information.

**Option A: Install Full Collection** (Recommended for flexibility)

```bash
npm i -D @iconify/json
```

This installs all icon sets (~120MB). Only icons you actually use will be bundled in production.

**Option B: Install Individual Icon Sets**

Install only the icon sets you need:

```bash
npm i -D @iconify-json/mdi @iconify-json/carbon
```

**Option C: Auto Install** (Experimental)

Let `unplugin-icons` automatically install icon sets when you import them:

```ts
Icons({
  autoInstall: true, // Auto-detects npm/yarn/pnpm
})
```

## Examples

Check out the [playgrounds page](./examples/README.md) to try examples online in StackBlitz.

Available examples:
- [Vite + Vue 3](examples/vite-vue3)
- [Vite + React](examples/vite-react)
- [Next.js](examples/next)
- [Nuxt 4](examples/nuxt4)
- [SvelteKit](examples/sveltekit)
- [Astro](examples/astro)
- And more...

## Configuration

This section covers how to configure `unplugin-icons` for different build tools and frameworks.

### Build Tools

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    Icons({ /* options */ }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Icons from 'unplugin-icons/rollup'

export default {
  plugins: [
    Icons({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.mjs
import Icons from 'unplugin-icons/webpack'

export default {
  /* ... */
  plugins: [
    Icons({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

Nuxt 2 and [Nuxt Bridge](https://github.com/nuxt/bridge)

```ts
// nuxt.config.ts
export default {
  buildModules: [
    ['unplugin-icons/nuxt', { /* options */ }],
  ],
}
```

Nuxt 3/4

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    ['unplugin-icons/nuxt', { /* options */ }]
  ],
})
```

Or work with [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) resolvers

```ts
import IconsResolver from 'unplugin-icons/resolver'
import ViteComponents from 'unplugin-vue-components/vite'

// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'unplugin-icons/nuxt',
  ],
  vite: {
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({/* options */}),
        ],
      }),
    ],
  },
})
```

See [the Nuxt example](examples/nuxt4) for a working example project.

<br></details>

<details>
<summary>Rspack</summary>

```ts
import Icons from 'unplugin-icons/rspack'

// rspack.config.mjs
export default defineConfig({
  plugins: [
    // ...
    Icons({/* options */}),
  ]
})
```
</details>

<details>
<summary>Vue CLI</summary><br>

> **Note**: This package is ESM-only. You need to use `vue.config.mjs` with ES module syntax (requires `@vue/cli-service ^5.0.8`).

```ts
// vue.config.mjs
import Icons from 'unplugin-icons/webpack'

export default {
  configureWebpack: {
    plugins: [
      Icons({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>SvelteKit</summary><br>

Add to your `vite.config.ts`:

```ts
import { sveltekit } from '@sveltejs/kit/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    })
  ]
})
```

Check instructions in the `Frameworks -> Svelte` section below if you faced module import errors.

See [the SvelteKit example](examples/sveltekit) for a working example project.

<br></details>

<details>
<summary>Svelte + Vite</summary><br>

Svelte support requires the `@sveltejs/vite-plugin-svelte` plugin:
```shell
npm i -D @sveltejs/vite-plugin-svelte
```

Add to your `vite.config.ts`:

```ts
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    svelte(),
    Icons({
      compiler: 'svelte',
    }),
  ],
})
```

Check instructions in the `Frameworks -> Svelte` section below if you faced module import errors.

See [the Svelte + Vite example](examples/vite-svelte) for a working example project.

<br></details>

<details>
<summary>Next.js</summary><br>

> **Note**: This package is ESM-only. You need to use `next.config.mjs` with ES module syntax.

Add to your `next.config.mjs`:

```ts
// next.config.mjs
import Icons from 'unplugin-icons/webpack'

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: 'jsx',
        jsx: 'react'
      })
    )

    return config
  }
}
```

Check instructions in the `Frameworks -> React` section below if you faced module import errors.

⚠️ **Warning:** to import an icon is necessary to explicitly add the `.jsx` extension to the import path, so that Next.js knows how to load it, by example:

<!-- eslint-skip -->

```ts
import IconArrowRight from '~icons/dashicons/arrow-right.jsx';
                                                     // ^-- write `.jsx` to avoid
                                                     // https://github.com/antfu/unplugin-icons/issues/103
// ...some code later
<IconArrowRight />
```

See [the Next.js example](examples/next) for a working example project.

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Icons from 'unplugin-icons/esbuild'

build({
  /* ... */
  plugins: [
    Icons({
      /* options */
    }),
  ],
})
```

<br></details>

<details>
<summary>Astro</summary><br>

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
})
```

See [the Astro example](examples/astro) for a working example project.

<br></details>

<details>
<summary>Astro + Vue</summary><br>

Required [@astrojs/vue](https://docs.astro.build/es/guides/integrations-guide/vue/) installed.

```ts
import Vue from '@astrojs/vue'
// astro.config.mjs
import { defineConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [
    Vue(),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
      }),
    ],
  },
})
```

See [the Astro + Vue example](examples/astro-vue) for a working example project.

<br></details>

### Frameworks

Configure the `compiler` option based on your framework. Some frameworks may require additional peer dependencies.

<details>
<summary>Vue 3</summary><br>

**Configuration:**

```ts
Icons({ compiler: 'vue3' })
```

**Peer Dependency:**

> **Note**: As of Vue 3.2.13+, `@vue/compiler-sfc` is included in the main `vue` package, so no additional installation is needed.

If you're using an older version:

```bash
npm i -D @vue/compiler-sfc
```

**TypeScript Support:**

Add to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/vue"
    ]
  }
}
```

See [the Vue 3 example](examples/vite-vue3) for a complete setup.

<br></details>

<details>
<summary>React</summary><br>

**Configuration:**

```ts
Icons({ compiler: 'jsx', jsx: 'react' })
```

**Peer Dependencies:**

```bash
npm i -D @svgr/core @svgr/plugin-jsx
```

**TypeScript Support:**

Add to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/react"
    ]
  }
}
```

See [the React example](examples/vite-react) for a complete setup.

<br></details>

<details>
<summary>Preact</summary><br>

**Configuration:**

```ts
Icons({ compiler: 'jsx', jsx: 'preact' })
```

**Peer Dependencies:**

```bash
npm i -D @svgr/core @svgr/plugin-jsx
```

**TypeScript Support:**

Add to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/preact"
    ]
  }
}
```

See [the Preact example](examples/vite-preact) for a complete setup.

<br></details>

<details>
<summary>Solid</summary><br>

**Configuration:**

```ts
Icons({ compiler: 'solid' })
```

**TypeScript Support:**

Add to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/solid"
    ]
  }
}
```

See [the Solid example](examples/vite-solid) for a complete setup.

<br></details>

<details>
<summary>Svelte</summary><br>

**Configuration:**

```ts
Icons({ compiler: 'svelte' })
```

**TypeScript Support:**

**For SvelteKit**, add to `src/app.d.ts`:

```ts
import 'unplugin-icons/types/svelte'
```

**For Svelte + Vite**, add to `src/vite-env.d.ts`:

```ts
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte" />
```

**For Svelte 4**, use:

```ts
/// <reference types="unplugin-icons/types/svelte4" />
```

**For Svelte 3**, use:

```ts
/// <reference types="unplugin-icons/types/svelte3" />
```

See [the Svelte example](examples/vite-svelte) for a complete setup.

<br></details>

<details>
<summary>Astro</summary><br>

**Configuration:**

```ts
Icons({ compiler: 'astro' })
```

**TypeScript Support:**

Add to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/astro"
    ]
  }
}
```

See [the Astro example](examples/astro) for a complete setup.

<br></details>

<details>
<summary>Astro + Vue</summary><br>

**Configuration:**

```ts
Icons({ compiler: 'vue3' })
```

**Requirements:**

Requires [@astrojs/vue](https://docs.astro.build/es/guides/integrations-guide/vue/) to be installed.

**TypeScript Support:**

Add to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/vue"
    ]
  }
}
```

See [the Astro + Vue example](examples/astro-vue) for a complete setup.

<br></details>

<details>
<summary>Qwik</summary><br>

**Option 1: Native Qwik Compiler** (Recommended)

**Configuration:**

```ts
Icons({ compiler: 'qwik' })
```

**Peer Dependency:**

```bash
npm i -D @svgx/core
```

**Option 2: JSX Compiler**

**Configuration:**

```ts
Icons({ compiler: 'jsx', jsx: 'qwik' })
```

**Peer Dependencies:**

```bash
npm i -D @svgr/core @svgr/plugin-jsx
```

**TypeScript Support:**

Add to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/qwik"
    ]
  }
}
```

See [the Qwik example](examples/vite-qwik) for a complete setup.

<br></details>

<details>
<summary>Ember</summary><br>

**Configuration:**

```ts
Icons({ compiler: 'ember' })
```

**Build Tool Support:**

Ember works with either Webpack or Vite.

**For Vite applications**, add to `vite.config.mjs`:

```ts
import { ember, extensions } from '@embroider/vite'
import { babel } from '@rollup/plugin-babel'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    ember(),
    Icons({
      compiler: 'ember',
    }),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
})
```

**TypeScript Support:**

Add to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/ember"
    ]
  }
}
```

<details><summary>Ember + Webpack</summary>

Assuming your app was generated with `--embroider`, or manually migrated to embroider following the instructions on [the old embroider readme](https://github.com/embroider-build/embroider/tree/stable?tab=readme-ov-file#how-to-try-it)

Add the Icon plugin to the webpack plugins array in `ember-cli-build.js`:

<!-- eslint-skip -->

```ts
import { compatBuild } from '@embroider/compat'
import Icons from 'unplugin-icons/webpack'

return compatBuild(app, Webpack, {
    packagerOptions: {
      webpackConfig: {
        plugins: [
          Icons({
            compiler: 'ember',
          }),
        ],
      },
    },
    // ...other options
```

</details>

See the [Ember (with Webpack)](examples/webpack-ember) or [Ember vite example](examples/vite-ember) for a working example project.

<br></details>

## Raw SVG Import

> Available from `v0.13.2+`

Import icons as raw SVG strings by adding `?raw` to the import path. Useful for embedding SVG directly in HTML templates.

**Example (Vue 3):**

```vue
<script setup lang='ts'>
import RawMdiAlarmOff from '~icons/mdi/alarm-off?raw&width=4em&height=4em'
import RawMdiAlarmOff2 from '~icons/mdi/alarm-off?raw&width=1em&height=1em'
</script>

<template>
  <!-- raw example -->
  <pre>
    import RawMdiAlarmOff from '~icons/mdi/alarm-off?raw&width=4em&height=4em'
    {{ RawMdiAlarmOff }}
    import RawMdiAlarmOff2 from '~icons/mdi/alarm-off?raw&width=1em&height=1em'
    {{ RawMdiAlarmOff2 }}
  </pre>
  <!-- svg example -->
  <span v-html="RawMdiAlarmOff" />
  <span v-html="RawMdiAlarmOff2" />
</template>
```

## Custom Icons

Load your own custom icons and use them with the same universal API.

```ts
import { promises as fs } from 'node:fs'

// loader helpers
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

Icons({
  customCollections: {
    // key as the collection name
    'my-icons': {
      account: '<svg><!-- ... --></svg>',
      // load your custom icon lazily
      settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
      /* ... */
    },
    'my-other-icons': async (iconName) => {
      // your custom loader here. Do whatever you want.
      // for example, fetch from a remote server:
      return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
    },
    // a helper to load icons from the file system
    // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
    // you can also provide a transform callback to change each icon (optional)
    'my-yet-other-icons': FileSystemIconLoader(
      './assets/icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
    ),
  },
})
```

Then use as

```ts
import IconAccount from '~icons/my-icons/account'
import IconFoo from '~icons/my-other-icons/foo'
import IconBar from '~icons/my-yet-other-icons/bar'
```

> 💡 SVG Authoring Tips:
> - To make your icons color adaptable, set `fill="currentColor"` or `stroke="currentColor"` in your SVG.
> - Leave the `height` and `width` unspecified, we will set them for you.

### Auto-Import with Resolver

When using [auto-importing](#auto-importing), register your custom collection names:

```ts
IconResolver({
  customCollections: [
    'my-icons',
    'my-other-icons',
    'my-yet-other-icons',
  ],
})
```

See the [Vue 3 example](examples/vite-vue3) for a complete setup.

### External Collection Packages

Load icons from third-party packages that follow the Iconify format.

**Requirements:**

External packages must include an `icons.json` file in `IconifyJSON` format. See [Exporting icon set as JSON package](https://iconify.design/docs/libraries/tools/export/json-package.html) for details.

For example, you can use `an-awesome-collection` or `@my-awesome-collections/some-collection` to load your custom or third party icons:
```ts
// loader helpers
import { ExternalPackageIconLoader } from 'unplugin-icons/loaders'

Icons({ customCollections: ExternalPackageIconLoader('my-awesome-collection') })
```

When using with resolvers for auto-importing, remember you will need to tell it your custom collection names:
```ts
IconResolver({
  customCollections: [
    'my-awesome-collection',
  ],
})
```

You can also combine it with `FileSystemIconLoader` or with other custom icon loaders:
```ts
// loader helpers
import { ExternalPackageIconLoader, FileSystemIconLoader } from 'unplugin-icons/loaders'

Icons({
  customCollections: {
    ...ExternalPackageIconLoader('an-awesome-collection'),
    ...ExternalPackageIconLoader('@my-awesome-collections/some-collection'),
    ...ExternalPackageIconLoader('@my-awesome-collections/some-other-collection'),
    'my-yet-other-icons': FileSystemIconLoader(
      './assets/icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
    ),
  },
})
```

See the [Vue 3 example](examples/vite-vue3) for a complete setup.

## Icon Customization

Customize individual icons or entire collections using `iconCustomizer` in your config or query parameters when importing.

**Precedence:** Query params > `iconCustomizer` > default configuration

Works with all icon sources: custom loaders, inlined collections, and Iconify collections.

For example, you can configure `iconCustomizer` to change all icons for a collection or individual icons on a collection:

```ts
import { promises as fs } from 'node:fs'

// loader helpers
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

Icons({
  customCollections: {
    // key as the collection name
    'my-icons': {
      account: '<svg><!-- ... --></svg>',
      // load your custom icon lazily
      settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
      /* ... */
    },
    'my-other-icons': async (iconName) => {
      // your custom loader here. Do whatever you want.
      // for example, fetch from a remote server:
      return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
    },
    // a helper to load icons from the file system
    // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
    // you can also provide a transform callback to change each icon (optional)
    'my-yet-other-icons': FileSystemIconLoader(
      './assets/icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
    ),
  },
  iconCustomizer(collection, icon, props) {
    // customize all icons in this collection
    if (collection === 'my-other-icons') {
      props.width = '4em'
      props.height = '4em'
    }
    // customize this icon in this collection
    if (collection === 'my-icons' && icon === 'account') {
      props.width = '6em'
      props.height = '6em'
    }
    // customize this @iconify icon in this collection
    if (collection === 'mdi' && icon === 'account') {
      props.width = '2em'
      props.height = '2em'
    }
  },
})
```

or you can use `query` params to apply to individual icons:

<!-- eslint-skip -->

```vue
<script setup lang='ts'>
import MdiAlarmOff from 'virtual:icons/mdi/alarm-off?width=4em&height=4em'
import MdiAlarmOff2 from 'virtual:icons/mdi/alarm-off?width=1em&height=1em'
</script>

<template>
  <!-- width=4em and height=4em -->
  <mdi-alarm-off />
  <!-- width=4em and height=4em -->
  <MdiAlarmOff />
  <!-- width=1em and height=1em -->
  <MdiAlarmOff2 />
</template>
```

See the [Vue 3 example](examples/vite-vue3) for a complete implementation.

## Global Icon Transformation

Apply transformations to all custom icons during loading. Useful for adding default attributes like `fill="currentColor"`.
```ts
Icons({
  customCollections: {
    // key as the collection name
    'my-icons': {
      account: '<svg><!-- ... --></svg>',
      /* ... */
    },
  },
  transform(svg, collection, icon) {
    // apply fill to this icon on this collection
    if (collection === 'my-icons' && icon === 'account')
      return svg.replace(/^<svg /, '<svg fill="currentColor" ')

    return svg
  },
})
```

## Advanced Custom Icon Set Cleanup

When using this plugin with your custom icons, consider using a cleanup process similar to that done by [Iconify](https://iconify.design/) for any icons sets. All the tools you need are available in [Iconify Tools](https://docs.iconify.design/tools/tools2/).

You can check this repo, using `unplugin-icons` on a `SvelteKit` project: https://github.com/iconify/tools/tree/main/%40iconify-demo/unplugin-svelte.

Read [Cleaning up icons](https://docs.iconify.design/articles/cleaning-up-icons/) article from [Iconify](https://iconify.design/) for more details.

## Migration from `vite-plugin-icons`

If you're upgrading from `vite-plugin-icons`, follow these steps:

**1. Update `package.json`:**

```diff
{
  "devDependencies": {
-   "vite-plugin-icons": "*",
+   "unplugin-icons": "^0.7.0",
  }
}
```

**2. Update your config file:**

```diff
import Components from 'unplugin-vue-components/vite'
- import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
+ import Icons from 'unplugin-icons/vite'
+ import IconsResolver from 'unplugin-icons/resolver'

export default {
  plugins: [
    Vue(),
    Components({
      resolvers: [
        IconsResolver()
      ],
    }),
    Icons(),
  ],
}
```

**3. Update import paths:**

```diff
- import IconComponent from 'virtual:vite-icons/collection/name'
+ import IconComponent from '~icons/collection/name'
```

> **Note**: The `virtual:icons` prefix still works in Vite, but `~icons` is recommended for consistency across all build tools.

## Options

Configure default styling and behavior for all icons:

```ts
Icons({
  // Icon sizing
  scale: 1.2,              // Scale factor relative to 1em (default: 1.2)
  
  // Default styling
  defaultStyle: '',        // CSS styles applied to all icons
  defaultClass: '',       // CSS classes applied to all icons
  
  // Compiler configuration
  compiler: null,         // Framework compiler: 'vue3', 'jsx', 'svelte', 'solid', etc.
  jsx: 'react',           // JSX framework: 'react' or 'preact' (when compiler: 'jsx')
  
  // Custom collections
  customCollections: {},  // See [Custom Icons](#custom-icons)
  
  // Advanced
  iconCustomizer: () => {}, // See [Icon Customization](#icon-customization)
  transform: undefined,   // See [Global Icon Transformation](#global-icon-transformation)
  autoInstall: false,    // Auto-install icon sets on import
})
```

## Auto Importing

<details>
<summary>Vue 3</summary><br>

Use with [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components)

For example in Vite:

```ts
// vite.config.ts
import Vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    Vue(),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons(),
  ],
}
```

Then you can use any icons as you want without explicit importing. Only the used icons will be bundled.

```html
<template>
  <i-carbon-accessibility/>
  <i-mdi-account-box style="font-size: 2em; color: red"/>
</template>
```

</details>

<details>
<summary>React & Solid</summary><br>

Use with [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import)

For example in Vite:

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

export default {
  plugins: [
    AutoImport({
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),
    Icons({
      compiler: 'jsx', // or 'solid'
    }),
  ],
}
```

Then you can use any icons with the prefix `Icon` as you want without explicit importing. Type declarations will be generated on the fly.

<!-- eslint-disable react/jsx-no-undef -->

```js
export function Component() {
  return (
    <div>
      <IconCarbonApps />
      <IconMdiAccountBox style="font-size: 2em; color: red" />
    </div>
  )
}
```

</details>

### Component Naming

Icons are auto-imported following this naming pattern:

```
{prefix}-{collection}-{icon}
```

- `prefix`: Component name prefix (default: `i`)
- `collection`: Iconify collection ID (e.g., `mdi`, `carbon`, `fa-solid`)
- `icon`: Icon name (kebab-case)

**Custom Prefix:**

```ts
IconsResolver({
  prefix: 'icon', // Use 'icon' instead of 'i'
})
```

```vue
<template>
  <icon-mdi-account />
</template>
```

**No Prefix:**

```ts
IconsResolver({
  prefix: false,
  enabledCollections: ['mdi'], // Optional: limit to specific collections
})
```

```vue
<template>
  <mdi-account />
</template>
```

### Collection Aliases

Create shorter aliases for long collection names:

```ts
IconsResolver({
  alias: {
    park: 'icon-park',  // Use <icon-park-* /> instead of <icon-icon-park-* />
    fas: 'fa-solid',    // Use <icon-fas-* /> instead of <icon-fa-solid-* />
  }
})
```

Both the alias and full collection name work:

```vue
<template>
  <icon-park-abnormal />      <!-- Using alias -->
  <icon-icon-park-abnormal /> <!-- Using full name -->
</template>
```

## Sponsors

This project is part of my <a href='https://github.com/antfu-sponsors'>Sponsor Program</a>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2020-PRESENT [Anthony Fu](https://github.com/antfu)
