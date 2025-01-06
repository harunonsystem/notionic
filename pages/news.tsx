import Container from '@/components/Container'
import NewsletterHero from '@/components/Hero/Newsletter'
import BlogPost from '@/components/BlogPost'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { BLOG } from '@/blog.config'
import { ExtendedRecordMap } from 'notion-types'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyNewsletter: true })

  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'newsletter')

  let blockMap: ExtendedRecordMap = null
  try {
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  return {
    props: {
      posts,
      blockMap
    },
    revalidate: 1
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
