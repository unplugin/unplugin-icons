# unplugin-icons

[![NPM version](https://img.shields.io/npm/v/unplugin-icons?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-icons)

Access thousands of icons as components on-demand. Works for Vite, Webpack, Rollup, Nuxt, and more, powered by [unplugin](https://github.com/unjs/unplugin).

- 90+ iconsets powered by [Iconify](https://github.com/iconify/iconify)
- [Browser the icons](https://icones.js.org/)

## Install

Install the plugin and peer dependency `@iconify/json`

```bash
npm i -D unplugin-icons @iconify/json
```

Add it to `vite.config.js`

```ts
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'

export default {
  plugins: [
    Vue(),
    Icons()
  ],
}
```

```html
<script setup>
import IconAccessibility from 'virtual:icons/carbon/accessibility'
import IconAccountBox from 'virtual:icons/mdi/account-box'
</script>

<template>
  <icon-accessibility/>
  <icon-account-box style="font-size: 2em; color: red"/>
</template>
```

## Options

You can set default styling for all icons. 
The following config shows the default values of each option:

```ts
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'

export default {
  plugins: [
    Vue(),
    Icons({
      scale: 1.2, // Scale of icons against 1em
      defaultStyle: '', // Style apply to icons
      defaultClass: '', // Class names apply to icons
      compiler: null, // Compiler 'vue2' or 'vue3', by default detected automatically
    })
  ],
}
```

## Auto Importing

Use with [`vite-plugin-components`](https://github.com/antfu/vite-plugin-components) (`>= v0.5.5`)

```js
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-components'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default {
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: IconsResolver(),
    }),
    Icons(),
  ],
}
```

Then you can use any icons as you want without explicit importing (only the used icons will be bundled)

```html
<template>
  <i-carbon-accessibility/>
  <i-mdi-account-box style="font-size: 2em; color: red"/>
</template>
```

### Name Conversion

When using component resolver, you have to follow the name conversion for icons to be properly inferred.

```
{prefix}-{collection}-{icon}
```

The `collection` field follows [Iconify's collection IDs](https://iconify.design/icon-sets/).

By default, the prefix is set to `i` while you can customize via config

```ts
export default {
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: IconsResolver({
        componentPrefix: 'icon' // <--
      }),
    }),
    Icons(),
  ],
}
```

```vue
<template>
  <icon-mdi-account />
</template>
```

Non-prefix mode is also supported

```ts
IconsResolver({
  componentPrefix: '', // <--
  // this is optional, default enabling all the collections supported by Iconify
  enabledCollections: ['mdi']
})
```

```vue
<template>
  <mdi-account />
</template>
```

## Vue 2 Support

```bash
npm i -D vue-template-compiler vite-plugin-vue2
```

And it just works.

```ts
// vite.config.js
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
import Icons from 'unplugin-icons/vite'

export default {
  plugins: [
    Vue2(),
    Icons(),
  ],
}
```

## Comparsion with [Purge Icons](https://github.com/antfu/purge-icons)

### `unplugin-icons`

#### Pros

- SSR/SSG friendly
- On-demanded bunding
- Works with Vue 3

#### Cons

- No Iconify runtime, no web fetching (string icon IDs)
- Updates are sync with other content

### `purge-icons`

#### Pros

- Iconify runtime
- On-demanded bundling combining with runtime web fetching
- Framework agnostic

#### Cons
- Icons show up after the Iconify runtime loaded
- Not SSR/SSG friendly

## Sponsors

This project is part of my <a href='https://github.com/antfu-sponsors'>Sponsor Program</a>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

MIT License © 2020-PRESENT [Anthony Fu](https://github.com/antfu)
