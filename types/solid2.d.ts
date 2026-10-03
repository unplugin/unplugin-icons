declare module 'virtual:icons/*' {
  import type { ComponentProps, JSX } from '@solidjs/web'

  const component: (props: ComponentProps<'svg'>) => JSX.Element
  export default component
}
declare module '~icons/*' {
  import type { ComponentProps, JSX } from '@solidjs/web'

  const component: (props: ComponentProps<'svg'>) => JSX.Element
  export default component
}
