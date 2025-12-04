import { Check, FileText } from 'lucide-react'
import { useRouter } from 'next/router'
import type { ExtendedRecordMap } from 'notion-types'
import { useEffect, useRef, useState } from 'react'
import { lang } from '@/lib/lang'
import { convertNotionToMarkdown } from '@/lib/notion/convertToMarkdown'

interface CopyMarkdownButtonProps {
  blockMap: ExtendedRecordMap
  title: string
}

const CopyMarkdownButton = ({ blockMap, title }: CopyMarkdownButtonProps) => {
  const { locale } = useRouter()
  const t = lang[locale || 'ja']
  const [showCopied, setShowCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const copyAsMarkdown = async () => {
    try {
      const markdown = convertNotionToMarkdown(blockMap)

      // Check if markdown already starts with an H1 heading matching the title
      const trimmedMarkdown = markdown.trim()
      const h1Match = trimmedMarkdown.match(/^#\s+(.+)$/m)
      const hasMatchingTitle =
        h1Match &&
        h1Match[1].trim().toLowerCase() === title.trim().toLowerCase()

      const fullMarkdown = hasMatchingTitle
        ? markdown
        : `# ${title}\n\n${markdown}`

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullMarkdown)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = fullMarkdown
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

      // Clear any existing timer before setting a new one
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        setShowCopied(false)
        timerRef.current = null
      }, 2000)
    } catch (err) {
      console.error('Failed to copy markdown: ', err)
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
            {t.LAYOUT.COPY_MARKDOWN_BUTTON_TEXT_COPIED}
          </button>
        ) : (
          <button
            type='button'
            onClick={copyAsMarkdown}
            className='flex gap-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm rounded-lg px-4 py-2'
          >
            <FileText className='flex flex-col justify-center items-center select-none cursor-pointer relative w-5 h-5' />
            {t.LAYOUT.COPY_MARKDOWN_BUTTON_TEXT}
          </button>
        )}
      </div>
    </div>
  )
}

export default CopyMarkdownButton
