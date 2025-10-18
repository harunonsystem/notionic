import { ClipboardCheck, Mail, Rss } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ExtendedRecordMap } from 'notion-types'
import { useState } from 'react'
import { BLOG } from '@/blog.config'
import NotionRenderer from '@/components/Post/NotionRenderer'
import { lang } from '@/lib/lang'
import Social from '../Common/Social'
import Avatar from './Avatar'

interface HeroProps {
  blockMap: ExtendedRecordMap
}

const Hero = ({ blockMap }: HeroProps) => {
  const [showCopied, setShowCopied] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]

  const clickCopy = async () => {
    setShowCopied(true)
    await navigator.clipboard.writeText(`${BLOG.link}/feed`)
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  return (
    <div className='container mx-auto flex px-5 py-2 mb-10 md:flex-row flex-col items-center'>
      <div className='flex flex-col md:w-3/5 md:items-start mb-6 md:mb-0 text-left'>
        <NotionRenderer
          className='md:ml-0'
          blockMap={blockMap}
          frontMatter={{}}
          subPageTitle={null}
        />
        <Social />
        <div className='flex flex-col sm:flex-row sm:justify-center gap-4 mt-6'>
          <Link passHref href='/contact' scroll={false}>
            <button
              type='button'
              className='w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'
            >
              <Mail className='inline-block text-gray-600 dark:text-day h-7 w-7 mt-1' />
              <span className='ml-4 flex items-start flex-col leading-none'>
                <span className='text-xs text-gray-600 dark:text-day mb-1'>
                  {t.HERO.HOME.CONTACT_BUTTON_DES}
                </span>
                <span className='font-medium'>
                  {t.HERO.HOME.CONTACT_BUTTON}
                </span>
              </span>
            </button>
          </Link>
          {showCopied ? (
            <button
              type='button'
              className='bg-gray-200 dark:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'
            >
              <ClipboardCheck className='inline-block text-gray-600 dark:text-day h-7 w-7' />
              <span className='ml-4 flex items-start flex-col leading-none'>
                <span className='text-xs text-gray-600 dark:text-day mb-1'>
                  {t.HERO.RSS_BUTTON_DES_COPIED}
                </span>
                <span className='font-medium'>{t.HERO.RSS_BUTTON_COPIED}</span>
              </span>
            </button>
          ) : (
            <button
              type='button'
              onClick={() => clickCopy()}
              className='bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 inline-flex py-3 px-5 rounded-lg items-center'
            >
              <Rss className='inline-block text-gray-600 dark:text-day h-7 w-7' />
              <span className='ml-4 flex items-start flex-col leading-none'>
                <span className='text-xs text-gray-600 dark:text-day mb-1'>
                  {t.HERO.RSS_BUTTON_DES}
                </span>
                <span className='font-medium'>{t.HERO.HOME.RSS_BUTTON}</span>
              </span>
            </button>
          )}
        </div>
      </div>
      <div className='w-2/5'>
        <Avatar className='text-gray-600 dark:text-gray-300' />
      </div>
    </div>
  )
}

export default Hero
