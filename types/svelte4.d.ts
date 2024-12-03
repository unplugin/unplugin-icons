declare module 'virtual:icons/*' {
  import type { SvelteHTMLElements } from 'svelte/elements'
  import { SvelteComponent } from 'svelte'

  export default class extends SvelteComponent<SvelteHTMLElements['svg']> {}
}

declare module '~icons/*' {
  import type { SvelteHTMLElements } from 'svelte/elements'
  import { SvelteComponent } from 'svelte'

  export default class extends SvelteComponent<SvelteHTMLElements['svg']> {}
}
