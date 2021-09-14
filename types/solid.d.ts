declare module 'virtual:icons/*' {
  import { JSX, ComponentProps } from 'solid-js'
  const component: (props: ComponentProps<'svg'>) => JSX.Element
  export default component
}
declare module '~icons/*' {
  import { JSX, ComponentProps } from 'solid-js'
  const component: (props: ComponentProps<'svg'>) => JSX.Element
  export default component
}
