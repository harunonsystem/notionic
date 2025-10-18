import Link from 'next/link'
import { BLOG } from '@/blog.config'
import { GitHubIcon, KeybaseIcon, TwitterIcon } from '@/components/SvgIcons'

const Social = () => {
  return (
    <div className='flex gap-4'>
      <Link
        href={`${BLOG.socialLink.twitter}`}
        scroll={false}
        target='_blank'
        className='text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100'
      >
        <TwitterIcon className='w-5 h-5' />
      </Link>
      <Link
        href={`${BLOG.socialLink.github}`}
        scroll={false}
        target='_blank'
        className='text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100'
      >
        <GitHubIcon className='w-5 h-5' />
      </Link>
      <Link
        href={`${BLOG.socialLink.keybase}`}
        scroll={false}
        target='_blank'
        className='text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100'
      >
        <KeybaseIcon className='w-5 h-5' />
      </Link>
    </div>
  )
}

export default Social
