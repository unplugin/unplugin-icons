# vite-plugin-md

Markdown for Vite

- Use Markdown as Vue components
- Use Vue components in Markdown

## Install

Install

```bash
npm i vite-plugin-md -D # yarn add vite-plugin-md -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import Markdown from 'vite-plugin-md'

export default {
  plugins: [
    Markdown()
  ],
}
```

And import it as a normal Vue component

## Import Markdown as Vue components

```html
<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from './README.md'

export default {
  components: {
    HelloWorld,
  },
}
</script>
```

## Use Vue Components inside Markdown

You can even use Vue inside your markdown, for example

```html
<Counter :init='5'/>
```

<Counter :init='5'/>

Note you need to register the components globally to use them in Markdown

```ts
import { createApp } from 'vue'
import App from './App.vue'
import Counter from './Counter.vue'

const app = createApp(App)

app.component('Counter', Counter) // <--

app.mount()
```

Use [`vite-plugin-components`](#work-with-vite-plugin-components) for auto components registration.

## Frontmatter

Frontmatter will be parsed and inject into Vue's instance data `frontmatter` field. 

For example:

```md
---
title: My Cool App
---

# Hello World

This is {{frontmatter.title}}
```

Will be rendered as

```html
<h1>Hello World</h1>
<p>This is My Cool App</p>
```

It will also be passed to the wrapper component's props if you have set `wrapperComponent` option.

## Options

`vite-plugin-md` uses [`markdown-it`](https://github.com/markdown-it/markdown-it) under the hood, see [`markdown-it`'s docs](https://markdown-it.github.io/markdown-it/) for more details

```ts
// vite.config.js
import Markdown from 'vite-plugin-md'

export default {
  plugins: [
    Markdown({
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      markdownItSetup(md) {
        // for example
        md.use(require('markdown-it-anchor'))
        md.use(require('markdown-it-prism'))
      },
      // Class names for the wrapper div
      wrapperClasses: 'markdown-body'
    })
  ],
}
```

See [the tsdoc](./src/types.ts) for more advanced options

## Example

See the [/example](./example).

Or the pre-configured starter template [Vitesse](https://github.com/antfu/vitesse).

## Integrations

### Work with [vite-plugin-voie](https://github.com/vamplate/vite-plugin-voie)

```ts
import Markdown from 'vite-plugin-md'
import Voie from 'vite-plugin-voie'

export default {
  plugins: [
    Voie({
      extensions: ['vue', 'md'],
    }),
    Markdown()
  ],
}
```

Put your markdown under `./src/pages/xx.md`, then you can access the page via route `/xx`.


### Work with [vite-plugin-components](https://github.com/antfu/vite-plugin-components)

`vite-plugin-components` allows you to do on-demand components auto importing without worrying about registration.

```ts
import Markdown from 'vite-plugin-md'
import ViteComponents from 'vite-plugin-components'

export default {
  plugins: [
    Markdown(),
    // should be placed after `Markdown()`
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: ({ path }) => path.endsWith('.md'),
    })
  ],
}
```

Components under `./src/components` can be directly used in markdown components, and markdown components can also be put under `./src/components` to be auto imported.

## License

MIT License © 2020 [Anthony Fu](https://github.com/antfu)
