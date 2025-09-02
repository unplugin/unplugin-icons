import type { Compiler } from './types'

export const EmberCompiler = ((svg: string) => {
  const svgWithProps = svg.replace('<svg', '<svg ...attributes')
  return `import type { TOC } from '@ember/component/template-only';

interface IconSignature {
  Element: SVGElement;
}

<template>${svgWithProps}</template> satisfies TOC<IconSignature>;`
}) as Compiler
