import BLOG from '@/blog.config'
import { HashtagIcon, LinkIcon } from '@heroicons/react/outline'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ShareButton = (props) => {
  const { title } = props
  const { locale } = useRouter()
  const t = lang[locale]

  const [showCopied, setShowCopied] = useState(false)
  const copyTitleAndUrl = (title, url) => {
    setShowCopied(true)
    const text = `${title} ${url}`
    navigator.clipboard.writeText(text).then((r) => r)
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }
  const shareOnTwitter = (title, url) => {
    const text = encodeURIComponent(title)
    const href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(href, 'twitter', 'width=600,height=400')
  }

  return (
    <div className='py-3'>
      <div className='flex flex-wrap gap-3'>
        {showCopied ? (
          <button
            disabled
            className='flex gap-1 bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-sm rounded-lg px-4 py-2'
          >
            <LinkIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_TITLE_AND_URL_BUTTON_TEXT_COPIED}
          </button>
        ) : (
          <button
            onClick={() => copyTitleAndUrl(title, window.location.href)}
            className='flex gap-1 bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-sm rounded-lg px-4 py-2'
          >
            <LinkIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_TITLE_AND_URL_BUTTON_TEXT}
          </button>
        )}
        <button
          onClick={() => shareOnTwitter(title, window.location.href)}
          className='flex gap-1 bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-sm rounded-lg px-4 py-2'
        >
          <HashtagIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
          {t.LAYOUT.SHARE_TWITTER_BUTTON_TEXT}
        </button>
      </div>
    </div>
  )
}

export default ShareButton
