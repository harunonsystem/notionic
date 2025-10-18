import { useRouter } from 'next/router'
import { useState } from 'react'
import BlogPost from '@/components/BlogPost'
import Tags from '@/components/Common/Tags'
import Container from '@/components/Container'
import { SearchIcon } from '@/components/SvgIcons'
import { lang } from '@/lib/lang'

interface SearchLayoutProps {
  tags: any[]
  posts: any[]
  currentTag?: string
}

const SearchLayout = ({ tags, posts, currentTag }: SearchLayoutProps) => {
  const [searchValue, setSearchValue] = useState('')
  const { locale } = useRouter()
  const t = lang[locale]

  let filteredBlogPosts = []
  if (posts) {
    filteredBlogPosts = posts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  return (
    <Container>
      <div className='relative'>
        <input
          type='text'
          placeholder={
            currentTag
              ? `${t.SEARCH.ONLY_SEARCH} #${currentTag}`
              : `${t.SEARCH.PLACEHOLDER}`
          }
          className='w-full bg-white dark:bg-gray-600 shadow-md rounded-lg outline-none focus:shadow p-3'
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchIcon className='absolute right-3 top-3 h-5 w-5 text-gray-400' />
      </div>
      <Tags tags={tags} currentTag={currentTag} />
      <div className='article-container my-8'>
        {!filteredBlogPosts.length && (
          <p className='text-gray-500 dark:text-gray-300'>
            {t.SEARCH.NOT_FOUND}
          </p>
        )}
        {filteredBlogPosts.slice(0, 20).map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  )
}
// SearchLayout.propTypes = {
//   posts: PropTypes.array.isRequired,
//   tags: PropTypes.object.isRequired,
//   currentTag: PropTypes.string
// }
export default SearchLayout
