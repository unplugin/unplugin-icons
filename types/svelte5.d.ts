declare module 'virtual:icons/*' {
  import { Component } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'

  export default Component<SvelteHTMLElements['svg']>
}

declare module '~icons/*' {
  import { Component } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'

  export default Component<SvelteHTMLElements['svg']>
}
