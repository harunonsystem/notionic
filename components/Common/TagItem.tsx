import Link from 'next/link'

interface TagItemProps {
  tag: string
}

const TagItem = ({ tag }: TagItemProps) => (
  <Link href={`/tag/${encodeURIComponent(tag)}`} scroll={false}>
    <p className='mr-2 rounded-full px-2 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 leading-none text-sm'>
      {tag}
    </p>
  </Link>
)

export default TagItem
