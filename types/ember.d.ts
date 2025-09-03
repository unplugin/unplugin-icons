declare module 'virtual:icons/*' {
  import type { ComponentLike } from '@glint/template'

  const IconComponent: ComponentLike<{
    Element: SVGElement
  }>
  export default IconComponent
}
declare module '~icons/*' {
  import type { ComponentLike } from '@glint/template'

  const IconComponent: ComponentLike<{
    Element: SVGElement
  }>
  export default component
}
