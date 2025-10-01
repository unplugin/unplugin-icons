/* eslint-disable */
import unplugin from "./dist/index.cjs";
import type { CustomCompiler, CustomIconLoader, IconCustomizer, InlineCollection, Options, ResolvedOptions } from "./dist/types.cjs";

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
  export = _default;
}

export = unplugin;
