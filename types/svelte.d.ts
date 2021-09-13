/* eslint-disable import/named */
declare module 'virtual:icons/*' {
  // eslint-disable-next-line import/no-duplicates
  import { SvelteComponentDev } from 'svelte/internal'
  const component: SvelteComponentDev
  export default component
}

declare module '~icons/*' {
  // eslint-disable-next-line import/no-duplicates
  import { SvelteComponentDev } from 'svelte/internal'
  const component: SvelteComponentDev
  export default component
}
