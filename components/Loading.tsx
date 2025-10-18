import { ExternalLink, Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BLOG } from '@/blog.config'
import { lang } from '@/lib/lang'
import ProfileFile from '@/public/harunon_refia_crop.png'

interface LoadingProps {
  notionSlug?: string
}

export default function Loading({ notionSlug }: LoadingProps) {
  const { locale } = useRouter()
  const [showNotion, setShowNotion] = useState(false)

  if (notionSlug) {
    setTimeout(() => {
      setShowNotion(true)
    }, 3000)
  }

  const t = lang[locale]
  return (
    <div className='py-6 sm:py-8 lg:py-12'>
      <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
        <div className='flex flex-col items-center'>
          <div className='inline-flex items-center gap-2.5 mb-8'>
            <Image src={ProfileFile} alt={BLOG.title} width={40} height={40} />
          </div>

          <p className='inline-flex items-center text-sm md:text-base font-semibold uppercase mb-4'>
            <Loader className='animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400' />
            {t.ERROR.LOADING}
          </p>
          {showNotion && (
            <Link
              passHref
              href={`https://${BLOG.notionDomain}/${notionSlug}`}
              scroll={false}
              className='text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition duration-100'
            >
              <ExternalLink className='inline-block mb-1 h-5 w-5' />
              <span className='m-1'>{t.ERROR.TIMEOUT_TEXT}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// export default Loading
