declare module 'virtual:icons/*' {
  import type { Component, Snippet } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'

  const component: Component<SvelteHTMLElements['svg']>
  const snippet: Snippet<[SvelteHTMLElements['svg']?]>

  export default component
  export { snippet }
}

declare module '~icons/*' {
  import type { Component, Snippet } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'

  const component: Component<SvelteHTMLElements['svg']>
  const snippet: Snippet<[SvelteHTMLElements['svg']?]>

  export default component
  export { snippet }
}
