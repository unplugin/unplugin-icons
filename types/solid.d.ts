/* eslint-disable import/named */
declare module 'virtual:icons/*' {
  import { JSX } from 'solid-js'
  const component: (props: JSX.StylableSVGAttributes) => JSX.Element
  export default component
}
declare module '~icons/*' {
  import { JSX } from 'solid-js'
  const component: (props: JSX.StylableSVGAttributes) => JSX.Element
  export default component
}
