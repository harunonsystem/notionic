import { ArrowUp, ChevronLeft, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import type { ExtendedRecordMap } from 'notion-types'
import { useEffect, useState } from 'react'

interface FrontMatter {
  slug: string
  [key: string]: unknown
}

import { BLOG } from '@/blog.config'
import TableOfContents from '@/components/Post/TableOfContents'
import WechatPay from '@/components/Post/WechatPay'

interface AsideProps {
  pageTitle: string
  blockMap: ExtendedRecordMap
  frontMatter: FrontMatter
}

const Aside = ({ pageTitle, blockMap, frontMatter }: AsideProps) => {
  const [showPay, setShowPay] = useState(false)
  const [showScrollElement, setShowScrollElement] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setShowScrollElement(true)
      } else {
        setShowScrollElement(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <aside className='hidden sticky md:flex md:flex-col md:items-center md:self-start md:ml-8 md:inset-y-1/2'>
        <div className='flex flex-col items-center text-center'>
          <div className='bg-gray-100 dark:bg-gray-700 rounded-lg block p-2 gap-y-5 nav'>
            {BLOG.showWeChatPay && (
              <button
                type='button'
                onClick={() => setShowPay((showPay) => !showPay)}
                className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'
              >
                <ThumbsUp className='w-5 h-5' />
              </button>
            )}
            {pageTitle && (
              <Link
                passHref
                href={`${BLOG.path}/${frontMatter.slug}`}
                scroll={false}
                className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'
              >
                <ChevronLeft className='w-5 h-5' />
              </Link>
            )}
            {showScrollElement && (
              <button
                type='button'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className='text-gray-600 dark:text-day hover:text-gray-400 dark:hover:text-gray-400'
              >
                <ArrowUp className='w-5 h-5' />
              </button>
            )}
          </div>
        </div>
        {showScrollElement && (
          <div className='absolute left-full toc-fade-in'>
            <TableOfContents
              className='sticky'
              blockMap={blockMap}
              pageTitle={pageTitle}
              frontMatter={frontMatter}
            />
          </div>
        )}
      </aside>
      {showPay && <WechatPay />}
      {showScrollElement && (
        <button
          type='button'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='md:hidden fixed inline-flex bottom-5 right-5 p-2 rounded-lg z-10 shadow bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
        >
          <ArrowUp className='text-gray-600 dark:text-day w-5 h-5' />
        </button>
      )}
    </>
  )
}

export default Aside
