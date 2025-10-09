// @ts-check
import antfu from '@antfu/eslint-config'

export default [
  ...(await antfu()),
  {
    name: 'array-callback-return-override',
    files: ['examples/*-ember/**'],
    rules: {
      // This rule assumes that all map() calls are from Array.protoype.
      // In the ember examples, the Router uses map() to mean "sitemap"
      'array-callback-return': 'off',
    },
  },
]
