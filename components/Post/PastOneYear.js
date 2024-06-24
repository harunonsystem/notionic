import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { ExclamationCircleIcon } from '@heroicons/react/outline'

function isOneYearPassed(setDate) {
  const now = new Date()
  const targetDate = new Date(setDate)
  const oneYearInMillis = 365 * 24 * 60 * 60 * 1000
  const diffInMillis = now.getTime() - targetDate.getTime()
  return diffInMillis >= oneYearInMillis
}

export default function PastOneYear({ date }) {
  const { locale } = useRouter()
  const t = lang[locale]

  return isOneYearPassed(date) ? (
    <div className='w-full pb-12 justify-between font-medium text-gray-500 dark:text-gray-400'>
      <div className='flex flex-wrap sm:flex-nowrap sm:justify-between items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 relative gap-3 px-4 py-3'>
        <div className='w-full sm:w-auto max-w-screen-sm inline-block text-sm font-light md:text-base mb-2 sm:mb-0'>
          <div className='flex gap-1'>
            <ExclamationCircleIcon className='inline-block h-8 w-8 my-auto mx-2' />
            <div className='my-auto'>
                {t.LAYOUT.PAST_ONE_YEAR_COMMENT}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
