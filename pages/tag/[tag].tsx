import SearchLayout from '@/layouts/search'
import { i18nConfig } from '@/lib/i18n'
import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'

export default function Tag({ tags, posts, currentTag }) {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
}

export async function getStaticProps({ params, locale }) {
  const currentTag = params.tag
  const posts = await getAllPosts({ onlyNewsletter: false })
  const tags = getAllTagsFromPosts(posts)
  const filteredPosts = posts.filter((post) => post?.tags?.includes(currentTag))
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  const tags = getAllTagsFromPosts(posts)

  // Generate paths for all locales
  const paths = Object.keys(tags).flatMap((tag) =>
    i18nConfig.locales.map((locale) => ({
      params: { tag },
      locale
    }))
  )

  return {
    paths,
    fallback: true
  }
}
