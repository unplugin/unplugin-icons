/* eslint-disable import/named */
declare module 'virtual:icons/*' {
  // eslint-disable-next-line import/no-duplicates
  import { JSX, ComponentProps } from 'solid-js'
  const component: (props: ComponentProps<'svg'>) => JSX.Element
  export default component
}
declare module '~icons/*' {
  // eslint-disable-next-line import/no-duplicates
  import { JSX, ComponentProps } from 'solid-js'
  const component: (props: ComponentProps<'svg'>) => JSX.Element
  export default component
}
