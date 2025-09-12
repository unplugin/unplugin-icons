declare module 'virtual:icons/*' {
  import type { ForwardRefExoticComponent, SVGProps } from 'react'

  const component: ForwardRefExoticComponent<SVGProps<SVGSVGElement> & { title?: string }>
  export default component
}
declare module '~icons/*' {
  import type { ForwardRefExoticComponent, SVGProps } from 'react'

  const component: ForwardRefExoticComponent<SVGProps<SVGSVGElement> & { title?: string }>
  export default component
}
