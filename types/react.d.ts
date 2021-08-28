/* eslint-disable import/named */
declare module 'virtual:icons/*' {
  import { SVGProps, JSX } from 'react'
  const component: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  export default component
}
declare module '~icons/*' {
  import { SVGProps, JSX } from 'react'
  const component: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  export default component
}
