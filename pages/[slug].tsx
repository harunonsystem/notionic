import { useRouter } from 'next/router'
import { BLOG } from '@/blog.config'
import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'
import Layout from '@/layouts/layout'
import { CACHE_CONFIG } from '@/lib/cache'
import { getAllPosts, getPostBlocks } from '@/lib/notion'

const Post = ({ post, blockMap }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading notionSlug={post?.slug} />
  }
  if (!post) {
    return <NotFound statusCode={404} />
  }
  return (
    <Layout blockMap={blockMap} frontMatter={post} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug }, locale }) {
  console.log(`[slug].tsx getStaticProps: slug=${slug}, locale=${locale}`)
  const posts = await getAllPosts({ onlyNewsletter: false })
  console.log(`[slug].tsx getStaticProps: Found ${posts.length} posts`)
  console.log(
    `[slug].tsx getStaticProps: Post slugs:`,
    posts.map((p) => p.slug).join(', ')
  )
  const post = posts.find((t) => t.slug === slug)

  if (!post) {
    console.log(`[slug].tsx getStaticProps: Post not found for slug=${slug}`)
    return {
      notFound: true
    }
  }

  try {
    const blockMap = await getPostBlocks(post.id)
    return {
      props: {
        post,
        blockMap
      },
      revalidate: CACHE_CONFIG.ISR.SLUG
    }
  } catch (err) {
    console.error(`[slug].tsx getStaticProps: Error for slug=${slug}:`, err)
    return {
      props: {
        post: null,
        blockMap: null
      },
      revalidate: CACHE_CONFIG.ISR.ERROR
    }
  }
}

export default Post
