import type React from 'react'
import { BLOG } from '@/blog.config'
import SEO from '@/components/Common/SEO'

// import PropTypes from 'prop-types'

interface ContainerProps {
  children: React.ReactNode
  fullWidth?: boolean
  customMeta?: {
    title: string
    type: string
  }
  title?: string
  description?: string
}

const Container = ({
  children,
  fullWidth,
  title,
  description,
  ...customMeta
}: ContainerProps) => {
  const meta = {
    title: title || BLOG.title,
    description: description || BLOG.description,
    type: 'website',
    ...customMeta
  }
  return (
    <>
      <SEO meta={meta} />
      <main
        className={`m-auto flex-grow w-full transition-all ${
          !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
        }`}
      >
        {children}
      </main>
    </>
  )
}

// Container.propTypes = {
//   children: PropTypes.node
// }

export default Container
