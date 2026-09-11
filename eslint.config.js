// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({}, {
  name: 'array-callback-return-override',
  files: ['examples/*-ember/**'],
  rules: {
    // This rule assumes that all map() calls are from Array.protoype.
    // In the ember examples, the Router uses map() to mean "sitemap"
    'array-callback-return': 'off',
  },
}, {
  name: 'pnpm-workspace-catalog-override',
  files: ['pnpm-workspace.yaml'],
  rules: {
    // Several examples intentionally pin legacy/divergent versions (e.g. next, qwik) that
    // share a dependency name with a different catalog's version — that's expected, not a mistake.
    'pnpm/yaml-no-duplicate-catalog-item': ['error', { checkDuplicates: 'exact-version' }],
  },
})
