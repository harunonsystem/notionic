import { ChevronLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import type { ExtendedRecordMap } from 'notion-types'
import React from 'react'
import { BLOG } from '@/blog.config'
import FormattedDate from '@/components/Common/FormattedDate'
import TagItem from '@/components/Common/TagItem'
import NotionRenderer from '@/components/Post/NotionRenderer'
import PastOneYear from '@/components/Post/PastOneYear'

interface ContentProps {
  frontMatter: any
  blockMap: ExtendedRecordMap
  pageTitle?: string
  props?: React.ComponentProps<typeof NotionRenderer>
}

const Content = React.memo(function Content({
  frontMatter,
  blockMap,
  pageTitle,
  props
}: ContentProps) {
  return (
    <article className='flex-none md:overflow-x-visible overflow-x-scroll w-full'>
      {pageTitle && (
        <Link
          passHref
          href={`${BLOG.path}/${frontMatter.slug}`}
          scroll={false}
          className='block md:-ml-6 mb-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'
        >
          <ChevronLeftIcon className='inline-block mb-1 h-5 w-5' />
          <span className='m-1'>{frontMatter.title}</span>
        </Link>
      )}
      <h1 className='font-bold text-3xl text-black dark:text-white'>
        {pageTitle ? pageTitle : frontMatter.title}
      </h1>
      {frontMatter.type[0] !== 'Page' && (
        <nav className='flex mt-5 mb-10 items-start text-gray-500 dark:text-gray-400'>
          <div className='mr-2 mb-4 md:ml-0'>
            <FormattedDate date={frontMatter.date} />
          </div>
          {frontMatter.tags && (
            <div className='flex flex-nowrap max-w-full overflow-x-auto article-tags'>
              {frontMatter.tags.map((tag) => (
                <TagItem key={tag} tag={tag} />
              ))}
            </div>
          )}
        </nav>
      )}
      <PastOneYear date={frontMatter.date} />
      <div className='-mt-4 relative'>
        <NotionRenderer
          blockMap={blockMap}
          previewImages={BLOG.previewImagesEnabled}
          {...props}
        />
      </div>
    </article>
  )
})

export default Content
