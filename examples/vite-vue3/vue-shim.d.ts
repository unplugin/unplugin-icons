declare module '*.vue' {
  // eslint-disable-next-line import/no-duplicates
  import { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  // eslint-disable-next-line import/no-duplicates
  import { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
