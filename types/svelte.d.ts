declare module 'virtual:icons/*' {
  import { SvelteComponentDev } from 'svelte/internal'
  const component: SvelteComponentDev
  export default component
}

declare module '~icons/*' {
  import { SvelteComponentDev } from 'svelte/internal'
  const component: SvelteComponentDev
  export default component
}
