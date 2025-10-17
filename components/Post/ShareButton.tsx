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

  const copyTitleAndUrl = async (title: string, url: string) => {
    try {
      const text = `${title} ${url}`
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback to execCommand
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        const ok = document.execCommand('copy')
        if (!ok) {
          throw new Error('Copy command was unsuccessful')
        }
        document.body.removeChild(textArea)
      }
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 1000)
    } catch (err) {
      console.error('clipboard write failed: ', err)
    }
  }
  const shareOnTwitter = (title: string, url: string) => {
    const text = encodeURIComponent(title)
    const encodedUrl = encodeURIComponent(url)
    const href = `https://x.com/intent/tweet?text=${text}&url=${encodedUrl}`
    const win = window.open(
      href,
      '_blank',
      'width=600,height=400,noopener,noreferrer'
    )
    if (win) {
      win.opener = null
    }
  }

  return (
    <div className='py-3'>
      <div className='flex flex-wrap gap-3'>
        {showCopied ? (
          <button
            type='button'
            disabled
            className='flex gap-1 bg-gray-200 dark:bg-gray-600 text-sm rounded-lg px-4 py-2 cursor-not-allowed opacity-75'
          >
            <LinkIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_TITLE_AND_URL_BUTTON_TEXT_COPIED}
          </button>
        ) : (
          <button
            type='button'
            onClick={() => copyTitleAndUrl(title, window.location.href)}
            className='flex gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
          >
            <LinkIcon className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_TITLE_AND_URL_BUTTON_TEXT}
          </button>
        )}
        <button
          type='button'
          onClick={() => shareOnTwitter(title, window.location.href)}
          className='flex gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
        >
          <svg
            className='w-5 h-5'
            width='24'
            height='24'
            viewBox='0 0 1800 1800'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Share on X</title>
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
