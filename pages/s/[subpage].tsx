import { useRouter } from 'next/router'
import type { ExtendedRecordMap } from 'notion-types'
import {
  defaultMapPageUrl,
  getAllPagesInSpace,
  getPageBreadcrumbs,
  idToUuid
} from 'notion-utils'
import { BLOG } from '@/blog.config'
import Loading from '@/components/Loading'
import NotFound from '@/components/NotFound'
import Layout from '@/layouts/layout'
import { i18nConfig } from '@/lib/i18n'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import type { Post } from '@/lib/types'

interface PostProps {
  post: Post | null
  blockMap: ExtendedRecordMap | null
}

const PostPage = ({ post, blockMap }: PostProps) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading notionSlug={router.asPath.split('/')[2]} />
  }
  if (!post) {
    return <NotFound statusCode={404} />
  }
  return (
    <Layout blockMap={blockMap} frontMatter={post} fullWidth={post.fullWidth} />
  )
}

export async function getStaticPaths() {
  const mapPageUrl = defaultMapPageUrl(BLOG.notionPageId)

  const pages = await getAllPagesInSpace(
    BLOG.notionPageId,
    BLOG.notionSpacesId,
    getPostBlocks,
    {
      traverseCollections: false
    }
  )

  const subpageIds = Object.keys(pages)
    .map((pageId) => `/s${mapPageUrl(pageId)}`)
    .filter((path) => path && path !== '/s/')

  // Remove post id
  const posts = await getAllPosts({ onlyNewsletter: false })
  const postIds = posts.map((post) => `/s${mapPageUrl(post.id)}`)
  const noPostsIds = subpageIds
    .concat(postIds)
    .filter((v) => !subpageIds.includes(v) || !postIds.includes(v))

  const heros = await getAllPosts({ onlyHidden: true })
  const heroIds = heros.map((hero) => `/s${mapPageUrl(hero.id)}`)
  const pathsWithoutLocale = noPostsIds
    .concat(heroIds)
    .filter((v) => !noPostsIds.includes(v) || !heroIds.includes(v))

  // Generate paths for all locales
  const paths = pathsWithoutLocale.flatMap((path) =>
    i18nConfig.locales.map((locale) => ({
      params: { subpage: path.replace('/s/', '') },
      locale
    }))
  )

  return {
    paths,
    fallback: true
  }
  // return {
  //   paths: [],
  //   fallback: true
  // }
}

export async function getStaticProps({ params: { subpage } }) {
  const posts = await getAllPosts({ onlyNewsletter: false })

  let blockMap: ExtendedRecordMap | null = null
  let post: Post | null = null

  try {
    blockMap = await getPostBlocks(subpage)
    const id = idToUuid(subpage)

    const breadcrumbs = getPageBreadcrumbs(blockMap, id)

    // Guard against empty breadcrumbs array to prevent crashes
    if (!breadcrumbs || breadcrumbs.length === 0) {
      console.warn(`No breadcrumbs found for page ${subpage}`)
      return { props: { post: null, blockMap: null } }
    }

    post = posts.find((t) => t.id === breadcrumbs[0].block.id) || null

    // When the page is not in the notion database, manually initialize the post
    if (!post) {
      post = {
        id,
        slug: subpage,
        title: breadcrumbs[0].title,
        type: ['Page'],
        date: Date.now(),
        status: ['Published']
      }
    }
    // console.log("debug: ", breadcrumbs, post)
  } catch (err) {
    console.error(err)
    return { props: { post: null, blockMap: null } }
  }

  // Allow only pages in your own space
  const NOTION_SPACES_ID = BLOG.notionSpacesId
  const pageAllowed = (page) => {
    // Check if page and page.block exist to prevent crashes
    if (!page || !page.block) {
      return false
    }
    // When page block space_id = NOTION_SPACES_ID
    let allowed = false
    Object.values(page.block).forEach((block) => {
      const spaceId = (block as { value: { space_id: string } }).value?.space_id
      if (!allowed && spaceId) {
        allowed = NOTION_SPACES_ID.includes(spaceId)
      }
    })
    return allowed
  }

  if (!pageAllowed(blockMap)) {
    return { props: { post: null, blockMap: null } }
  } else {
    return {
      props: { post, blockMap },
      revalidate: 1
    }
  }
}

export default PostPage
