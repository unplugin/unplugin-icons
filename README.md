# vite-plugin-icons

Access thousands of icons as Vue components in Vite

- 90+ iconsets powered by [Iconify](https://github.com/iconify/iconify)
- [Browser the icons](https://icones.js.org/)

## Install

> ℹ️ **Vite 2 is supported from `v0.2.x`, Vite 1's support is discontinued.**

Install the plugin and peer dependency `@iconify/json`

```bash
npm i -D vite-plugin-icons @iconify/json
```

Add it to `vite.config.js`

```ts
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Icons from 'vite-plugin-icons'

export default {
  plugins: [
    Vue(),
    Icons()
  ],
}
```

```vue
<script setup>
import IconAccessibility from 'virtual:vite-icons/carbon/accessibility'
import IconAccountBox from 'virtual:vite-icons/mdi/account-box'
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
import Icons from 'vite-plugin-icons'

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
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'

export default {
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
  ],
}
```

Then you can use any icons as you want without explicit importing (only the used icons will be bundled)

```vue
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
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: 'icon' // <--
      }),
    }),
    ViteIcons(),
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
ViteIconsResolver({
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
import { createVuePlugin } from 'vite-plugin-vue2'
import ViteIcons from 'vite-plugin-icons'

export default {
  plugins: [
    createVuePlugin(),
    ViteIcons(),
  ],
}
```

## Comparsion with [Purge Icons](https://github.com/antfu/purge-icons)

### `vite-plugin-icons`

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

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
