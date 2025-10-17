import { LinkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { lang } from '@/lib/lang'

interface ShareButtonProps {
  title: string
}

const ShareButton = ({ title }: ShareButtonProps) => {
  const { locale } = useRouter()
  const t = lang[locale]

  const [showCopied, setShowCopied] = useState(false)
  const copyTitleAndUrl = (title: string, url: string) => {
    setShowCopied(true)
    const text = `${title} ${url}`
    navigator.clipboard.writeText(text).then((r) => r)
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }
  const shareOnTwitter = (title: string | number | boolean, url: string) => {
    const text = encodeURIComponent(title)
    const href = `https://x.com/intent/tweet?text=${text}&url=${url}`
    window.open(href, 'twitter', 'width=600,height=400')
  }

  return (
    <div className='py-3'>
      <div className='flex flex-wrap gap-3'>
        {showCopied ? (
          <button
            type='button'
            disabled
            className='flex gap-1 bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-sm rounded-lg px-4 py-2'
          >
            <LinkIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_TITLE_AND_URL_BUTTON_TEXT_COPIED}
          </button>
        ) : (
          <button
            type='button'
            onClick={() => copyTitleAndUrl(title, window.location.href)}
            className='flex gap-1 bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-sm rounded-lg px-4 py-2'
          >
            <LinkIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_TITLE_AND_URL_BUTTON_TEXT}
          </button>
        )}
        <button
          type='button'
          onClick={() => shareOnTwitter(title, window.location.href)}
          className='flex gap-1 bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-sm rounded-lg px-4 py-2'
        >
          <svg
            className='w-5 h-5'
            width='24'
            height='24'
            viewBox='0 0 1800 1800'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Share on Twitter</title>
            <rect height='100%' width='100%' fill='none' />
            <path d='m714.163 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.2396h162.604l304.797 435.9906 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z' />
          </svg>
          {t.LAYOUT.SHARE_TWITTER_BUTTON_TEXT}
        </button>
      </div>
    </div>
  )
}

export default ShareButton
