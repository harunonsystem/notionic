import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { NotionRenderer as Renderer } from 'react-notion-x'
import Prism from 'prismjs'
import 'prismjs/components/prism-js-templates'
import React, { useEffect } from 'react'
import { ExtendedRecordMap } from 'notion-types'

// Lazy-load some heavy components & override the renderers of some block types
const components = {
  // Code block
  Code: dynamic(() => {
    return import('react-notion-x/build/third-party/code').then(
      async (module) => {
        // Additional prismjs syntax
        await Promise.all([
          import('prismjs/components/prism-bash' as any),
          import('prismjs/components/prism-c' as any),
          import('prismjs/components/prism-cpp' as any),
          import('prismjs/components/prism-docker' as any),
          import('prismjs/components/prism-js-templates' as any),
          import('prismjs/components/prism-diff' as any),
          import('prismjs/components/prism-git' as any),
          import('prismjs/components/prism-go' as any),
          import('prismjs/components/prism-graphql' as any),
          import('prismjs/components/prism-makefile' as any),
          import('prismjs/components/prism-markdown' as any),
          import('prismjs/components/prism-python' as any),
          import('prismjs/components/prism-rust' as any),
          import('prismjs/components/prism-solidity' as any),
          import('prismjs/components/prism-sql' as any),
          import('prismjs/components/prism-swift' as any),
          import('prismjs/components/prism-wasm' as any),
          import('prismjs/components/prism-yaml' as any)
        ])
        return module.Code
      }
    )
  }),
  // Database block
  Collection: dynamic(() => {
    return import('react-notion-x/build/third-party/collection').then(
      (module) => module.Collection
    )
  }),
  // Equation block & inline variant
  Equation: dynamic(() => {
    return import('react-notion-x/build/third-party/equation').then(
      (module) => module.Equation
    )
  })
}

/**
 * Notion page renderer
 *
 * A wrapper of react-notion-x/NotionRenderer with predefined `components` and `mapPageUrl`
 *
 * @param props - Anything that react-notion-x/NotionRenderer supports
 */
interface NotionRendererProps {
  blockMap: ExtendedRecordMap
  frontMatter?: any
  previewImages?: boolean
  props?: React.ComponentProps<typeof NotionRenderer>
  className?: string
  subPageTitle?: null
}

export default function NotionRenderer({
  previewImages,
  blockMap,
  props,
  className,
  subPageTitle
}: NotionRendererProps) {
  const { locale } = useRouter()
  const mapPageUrl = (id) => {
    // console.log('mapPageUrl', BLOG.lang.split('-')[0])
    if (locale === BLOG.lang.split('-')[0]) {
      return '/s/' + id.replace(/-/g, '')
    } else {
      return '/' + locale + '/s/' + id.replace(/-/g, '')
    }
  }

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Renderer
      components={components}
      mapPageUrl={mapPageUrl}
      recordMap={blockMap}
      previewImages={previewImages}
      pageTitle={subPageTitle}
      className={className}
      {...props}
    />
  )
}

// NotionRenderer.propTypes = {
//   frontMatter: PropTypes.object.isRequired,
//   blockMap: PropTypes.object.isRequired
// }
