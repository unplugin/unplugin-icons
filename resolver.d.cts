/* eslint-disable */
import { ComponentResolverOption, default as resolver } from './dist/resolver.cjs';

declare namespace resolver {
  export type { ComponentResolverOption };
  const _default = resolver;
  export { _default as default };
}

export = resolver;
