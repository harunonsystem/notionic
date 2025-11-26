import type { ExtendedRecordMap } from 'notion-types'
import { BLOG } from '@/blog.config'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Hero from '@/components/Hero/Home'
import Pagination from '@/components/Pagination'
import { CACHE_CONFIG } from '@/lib/cache'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import type { BlogPageProps } from '@/lib/types'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyPost: true })

  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'index')

  let blockMap: ExtendedRecordMap | null = null
  try {
    if (hero?.id) {
      blockMap = await getPostBlocks(hero.id)
    }
  } catch (err) {
    console.error(err)
  }

  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    props: {
      page: 1,
      postsToShow,
      showNext,
      blockMap
    },
    revalidate: CACHE_CONFIG.ISR.HOME
  }
}

const Blog = ({ postsToShow, page, showNext, blockMap }: BlogPageProps) => {
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <Hero blockMap={blockMap} />
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}

export default Blog
