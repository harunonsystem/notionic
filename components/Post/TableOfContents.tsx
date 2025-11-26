import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Block, ExtendedRecordMap, PageBlock } from 'notion-types'
import { getPageTableOfContents, type TableOfContentsEntry } from 'notion-utils'
import { BLOG } from '@/blog.config'

interface TableOfContentsProps {
  blockMap: ExtendedRecordMap
  frontMatter: any
  pageTitle?: string
  className?: string
}

export default function TableOfContents({
  blockMap,
  frontMatter,
  pageTitle,
  className
}: TableOfContentsProps) {
  // Add null checks to prevent crashes when blockMap is invalid
  if (!blockMap || !blockMap.block) {
    return null
  }

  let collectionId: string, page: Block | undefined
  if (pageTitle) {
    const blockKeys = Object.keys(blockMap.block)
    if (blockKeys.length === 0) return null
    collectionId = blockKeys[0]
    const blockValue = blockMap.block[collectionId]
    if (!blockValue) return null
    page = blockValue.value
  } else {
    if (!blockMap.collection) return null
    const collectionKeys = Object.keys(blockMap.collection)
    if (collectionKeys.length === 0) return null
    collectionId = collectionKeys[0]
    const foundBlock = Object.values(blockMap.block).find(
      (block) => block.value.parent_id === collectionId
    )
    if (!foundBlock) return null
    page = foundBlock.value
  }

  if (!page) return null

  const nodes = getPageTableOfContents(page as PageBlock, blockMap)
  if (!nodes || !nodes.length) return null

  /**
   * @param {string} id - The ID of target heading block (could be in UUID format)
   */
  function scrollTo(id: TableOfContentsEntry['id']) {
    id = id.replaceAll('-', '')
    const target = document.querySelector(`.notion-block-${id}`)
    if (!target) return
    // `65` is the height of expanded nav
    // TODO: Remove the magic number
    const top =
      document.documentElement.scrollTop +
      target.getBoundingClientRect().top -
      65
    document.documentElement.scrollTo({
      top,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className={`${className} 'hidden xl:block xl:fixed ml-4 text-sm text-gray-500 dark:text-gray-400 whitespace'`}
    >
      {pageTitle && (
        <Link
          passHref
          href={`${BLOG.path}/${frontMatter.slug}`}
          scroll={false}
          className='block -ml-6 mb-2 p-2 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg'
        >
          <ChevronLeft className='inline-block mb-1 h-5 w-5' />
          <span className='ml-1'>{frontMatter.title}</span>
        </Link>
      )}
      {nodes.map((node) => (
        <div
          key={node.id}
          className='px-2 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg'
        >
          <button
            type='button'
            data-target-id={node.id}
            className='block py-1 cursor-pointer'
            onClick={() => scrollTo(node.id)}
          >
            {node.text}
          </button>
        </div>
      ))}
    </div>
  )
}
