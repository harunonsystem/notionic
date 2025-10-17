import { motion } from 'framer-motion'
import type { ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'
import { useEffect, useState } from 'react'
import Container from '@/components/Container'
import Aside from '@/components/Post/Aside'
import Comments from '@/components/Post/Comments'
import Content from '@/components/Post/Content'
import PostFooter from '@/components/Post/PostFooter'

interface LayoutProps {
  blockMap: ExtendedRecordMap
  frontMatter: any
  fullWidth?: boolean
}

const Layout = ({ blockMap, frontMatter, fullWidth = false }: LayoutProps) => {
  const [showSubPageTitle, setShowSubPageTitle] = useState(false)

  const pageTitle = getPageTitle(blockMap)
  useEffect(() => {
    if (frontMatter.title !== pageTitle) {
      setShowSubPageTitle(true)
    }
  }, [frontMatter, pageTitle])

  return (
    <Container
      title={`${frontMatter.title}${
        frontMatter.title === pageTitle ? '' : ` | ${pageTitle}`
      }`}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type='article'
      fullWidth={fullWidth}
      {...frontMatter}
    >
      <motion.div className='flex flex-row'>
        <Content
          frontMatter={frontMatter}
          blockMap={blockMap}
          pageTitle={showSubPageTitle ? pageTitle : null}
        />
        <Aside
          frontMatter={frontMatter}
          blockMap={blockMap}
          pageTitle={showSubPageTitle ? pageTitle : null}
        />
      </motion.div>
      <PostFooter title={frontMatter.title} />
      <Comments frontMatter={frontMatter} />
    </Container>
  )
}

export default Layout
