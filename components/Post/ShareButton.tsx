import { Check, Link } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { TwitterIcon } from '@/components/SvgIcons'
import { lang } from '@/lib/lang'

interface ShareButtonProps {
  title: string
}

const ShareButton = ({ title }: ShareButtonProps) => {
  const { locale } = useRouter()
  const t = lang[locale || 'ja']

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
        try {
          const ok = document.execCommand('copy')
          if (!ok) {
            throw new Error('Copy command was unsuccessful')
          }
        } finally {
          document.body.removeChild(textArea)
        }
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
            <Check className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_TITLE_AND_URL_BUTTON_TEXT_COPIED}
          </button>
        ) : (
          <button
            type='button'
            onClick={() => copyTitleAndUrl(title, window.location.href)}
            className='flex gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
          >
            <Link className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_TITLE_AND_URL_BUTTON_TEXT}
          </button>
        )}
        <button
          type='button'
          onClick={() => shareOnTwitter(title, window.location.href)}
          className='flex gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
        >
          <TwitterIcon className='w-5 h-5' />
          {t.LAYOUT.SHARE_TWITTER_BUTTON_TEXT}
        </button>
      </div>
    </div>
  )
}

export default ShareButton
