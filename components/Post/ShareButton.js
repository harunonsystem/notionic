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
          <svg
            className='w-5 h-5'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M15.3 5.55a2.9 2.9 0 0 0-2.9 2.847l-.028 1.575a.6.6 0 0 1-.68.583l-1.561-.212c-2.054-.28-4.022-1.226-5.91-2.799-.598 3.31.57 5.603 3.383 7.372l1.747 1.098a.6.6 0 0 1 .034.993L7.793 18.17c.947.059 1.846.017 2.592-.131 4.718-.942 7.855-4.492 7.855-10.348 0-.478-1.012-2.141-2.94-2.141zm-4.9 2.81a4.9 4.9 0 0 1 8.385-3.355c.711-.005 1.316.175 2.669-.645-.335 1.64-.5 2.352-1.214 3.331 0 7.642-4.697 11.358-9.463 12.309-3.268.652-8.02-.419-9.382-1.841.694-.054 3.514-.357 5.144-1.55C5.16 15.7-.329 12.47 3.278 3.786c1.693 1.977 3.41 3.323 5.15 4.037 1.158.475 1.442.465 1.973.538z' />
          </svg>
          {t.LAYOUT.SHARE_TWITTER_BUTTON_TEXT}
        </button>
      </div>
    </div>
  )
}

export default ShareButton
