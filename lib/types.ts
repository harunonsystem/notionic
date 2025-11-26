import type { ExtendedRecordMap } from 'notion-types'

/**
 * Post type representing a Notion page/post
 */
export interface Post {
  id: string
  slug: string
  title: string
  date: number | string
  type: string[]
  status?: string[]
  tags?: string[]
  summary?: string
  page_cover?: string
  fullWidth?: boolean
  password?: string
}

/**
 * Common page props interface for pages that display posts
 */
export interface PostPageProps {
  posts: Post[]
  blockMap: ExtendedRecordMap | null
}

/**
 * Props for index/blog page
 */
export interface BlogPageProps {
  page: number | string
  postsToShow: Post[]
  showNext: boolean
  blockMap: ExtendedRecordMap | null
}
