import { describe, expect, it } from 'vitest'
import { generateComponent } from '../src/core/loader'
import { resolveOptions } from '../src/core/options'

const logoSvg = '<svg viewBox="0 0 182.06 36.195"><rect width="182.06" height="36.195" /></svg>'

function getRootSvgOpenTag(svg: string) {
  const match = svg.match(/<svg\b[^>]*>/)
  if (!match)
    throw new Error('Expected SVG root tag to be present')
  return match[0]
}

async function renderCustomIcon(options: Parameters<typeof resolveOptions>[0], query: Record<string, string | undefined> = {}) {
  const resolved = await resolveOptions({
    compiler: 'none',
    customCollections: {
      logos: {
        wordmark: logoSvg,
      },
    },
    ...options,
  })

  return generateComponent({
    collection: 'logos',
    icon: 'wordmark',
    query,
  }, resolved)
}

describe('generateComponent dimension suppression', () => {
  it('omits width and height for custom collections via iconCustomizer', async () => {
    const svg = await renderCustomIcon({
      iconCustomizer(collection, icon, props) {
        if (collection === 'logos' && icon === 'wordmark') {
          props.width = 'unset'
          props.height = 'unset'
        }
      },
    })

    const rootTag = getRootSvgOpenTag(svg)
    expect(rootTag).not.toContain(' width=')
    expect(rootTag).not.toContain(' height=')
    expect(svg).toContain('<rect width="182.06" height="36.195" />')
  })

  it('omits width and height for custom collections via query params', async () => {
    const svg = await renderCustomIcon({}, {
      width: 'unset',
      height: 'unset',
    })

    const rootTag = getRootSvgOpenTag(svg)
    expect(rootTag).not.toContain(' width=')
    expect(rootTag).not.toContain(' height=')
  })

  it('keeps explicit sizing when dimensions are set to real values', async () => {
    const svg = await renderCustomIcon({
      iconCustomizer(_, __, props) {
        props.width = '3em'
        props.height = '3em'
      },
    })

    expect(getRootSvgOpenTag(svg)).toContain(' width="3em"')
    expect(getRootSvgOpenTag(svg)).toContain(' height="3em"')
  })

  it('lets query params override iconCustomizer sizing', async () => {
    const svg = await renderCustomIcon({
      iconCustomizer(_, __, props) {
        props.width = 'unset'
        props.height = 'unset'
      },
    }, {
      width: '3em',
      height: '3em',
    })

    expect(getRootSvgOpenTag(svg)).toContain(' width="3em"')
    expect(getRootSvgOpenTag(svg)).toContain(' height="3em"')
  })

  it('lets query params override iconCustomizer suppression', async () => {
    const svg = await renderCustomIcon({
      iconCustomizer(_, __, props) {
        props.width = '3em'
        props.height = '3em'
      },
    }, {
      width: 'unset',
      height: 'unset',
    })

    const rootTag = getRootSvgOpenTag(svg)
    expect(rootTag).not.toContain(' width=')
    expect(rootTag).not.toContain(' height=')
  })

  it('removes both dimensions when only one side is suppressed and the other is not explicit', async () => {
    const svg = await renderCustomIcon({
      iconCustomizer(_, __, props) {
        props.width = 'unset'
      },
    })

    const rootTag = getRootSvgOpenTag(svg)
    expect(rootTag).not.toContain(' width=')
    expect(rootTag).not.toContain(' height=')
  })

  it('removes only the suppressed dimension when the other side is explicit', async () => {
    const svg = await renderCustomIcon({
      iconCustomizer(_, __, props) {
        props.width = 'unset'
        props.height = '3em'
      },
    })

    const rootTag = getRootSvgOpenTag(svg)
    expect(rootTag).not.toContain(' width=')
    expect(rootTag).toContain(' height="3em"')
  })
})
