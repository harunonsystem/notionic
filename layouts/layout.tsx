import { useEffect, useState } from 'react'
import { getPageTitle } from 'notion-utils'
import { motion } from 'framer-motion'

import Container from '@/components/Container'
import Content from '@/components/Post/Content'
import Aside from '@/components/Post/Aside'
import Comments from '@/components/Post/Comments'
import PostFooter from '@/components/Post/PostFooter'
import { ExtendedRecordMap } from 'notion-types'

interface LayoutProps {
  blockMap: ExtendedRecordMap
  frontMatter: any
  fullWidth?: boolean
  subPage?: boolean
}

const Layout = ({
  blockMap,
  frontMatter,
  fullWidth = false,
  subPage = false
}: LayoutProps) => {
  const [showSubPageTitle, setShowSubPageTitle] = useState(false)

  const pageTitle = getPageTitle(blockMap)
  useEffect(() => {
    if (frontMatter.title !== pageTitle) {
      setShowSubPageTitle(true)
    }
  }, [frontMatter, pageTitle, subPage])

  return (
    <Container
      title={`${frontMatter.title}${
        frontMatter.title === pageTitle ? '' : ' | ' + pageTitle
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
