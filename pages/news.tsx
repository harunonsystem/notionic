import type { ExtendedRecordMap } from 'notion-types'
import { BLOG } from '@/blog.config'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import NewsletterHero from '@/components/Hero/Newsletter'
import { CACHE_CONFIG } from '@/lib/cache'
import { getAllPosts, getPostBlocks } from '@/lib/notion'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyNewsletter: true })

  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'newsletter')

  let blockMap: ExtendedRecordMap = null
  try {
    if (hero?.id) {
      blockMap = await getPostBlocks(hero.id)
    }
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  return {
    props: {
      posts,
      blockMap
    },
    revalidate: CACHE_CONFIG.ISR.NEWS
  }
}

const News = ({ posts, blockMap }) => {
  return (
    <Container title={BLOG.news} description={BLOG.description}>
      <NewsletterHero blockMap={blockMap} />
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default News
