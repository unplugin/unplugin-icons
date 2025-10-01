/* eslint-disable */
import {
  CustomCompiler,
  CustomIconLoader,
  IconCustomizer,
  InlineCollection,
  Options,
  ResolvedOptions,
  default as unplugin
} from './dist/index.cjs';

declare namespace unplugin {
  export type {
    CustomCompiler,
    CustomIconLoader,
    IconCustomizer,
    InlineCollection,
    Options,
    ResolvedOptions
  };
  const _default = unplugin;
  export { _default as default };
}

export = unplugin;
