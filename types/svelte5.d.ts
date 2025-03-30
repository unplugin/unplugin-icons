declare module 'virtual:icons/*' {
  import type { Component } from 'svelte'

  const component: Component<SvelteHTMLElements['svg']>

  export default component
}

declare module '~icons/*' {
  import type { Component } from 'svelte'

  const component: Component<SvelteHTMLElements['svg']>

  export default component
}
