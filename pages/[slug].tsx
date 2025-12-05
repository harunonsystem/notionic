import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'
import Layout from '@/layouts/layout'
import { CACHE_CONFIG } from '@/lib/cache'
import { i18nConfig } from '@/lib/i18n'
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

  // Generate paths for all locales
  const paths = posts.flatMap((row) =>
    i18nConfig.locales.map((locale) => ({
      params: { slug: row.slug },
      locale
    }))
  )

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts({ onlyNewsletter: false })
  const post = posts.find((t) => t.slug === slug)

  if (!post) {
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
    console.error(err)
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
