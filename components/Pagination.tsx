import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BLOG } from '@/blog.config'
import { lang } from '@/lib/lang'

interface PaginationProps {
  page: string | number
  showNext: boolean
}

const Pagination = ({ page, showNext }: PaginationProps) => {
  const { locale } = useRouter()
  const t = lang[locale || 'ja']
  const currentPage = typeof page === 'number' ? page : +page
  let additionalClassName = 'justify-between'
  if (currentPage === 1 && showNext) additionalClassName = 'justify-end'
  if (currentPage !== 1 && !showNext) additionalClassName = 'justify-start'
  return (
    <div
      className={`flex font-medium text-black dark:text-gray-100 ${additionalClassName}`}
    >
      {currentPage !== 1 && (
        <Link
          scroll={false}
          href={
            currentPage - 1 === 1
              ? `${BLOG.path || '/'}`
              : `/page/${currentPage - 1}`
          }
        >
          <button type='button' rel='prev' className='block cursor-pointer'>
            <ChevronLeft className='inline-block mb-1 h-5 w-5' />{' '}
            {t.PAGINATION.PREV}
          </button>
        </Link>
      )}
      {showNext && (
        <Link href={`/page/${currentPage + 1}`} scroll={false}>
          <button type='button' rel='next' className='block cursor-pointer'>
            {t.PAGINATION.NEXT}{' '}
            <ChevronRight className='inline-block mb-1 h-5 w-5' />
          </button>
        </Link>
      )}
    </div>
  )
}

export default Pagination
