/* eslint-disable import/named */
declare module 'virtual:icons/*' {
  // eslint-disable-next-line import/no-duplicates
  import { SVGProps, JSX } from 'preact'
  const component: (props: SVGProps<SVGSVGElement>) => JSX.Element
  export default component
}
declare module '~icons/*' {
  // eslint-disable-next-line import/no-duplicates
  import { SVGProps, JSX } from 'preact'
  const component: (props: SVGProps<SVGSVGElement>) => JSX.Element
  export default component
}
