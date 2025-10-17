import { NotionAPI } from 'notion-client'
import pMemoize from 'p-memoize'
import { BLOG } from '@/blog.config'
import { getPreviewImageMap } from './previewImages'

const rawGetPostBlocks = async (id: string) => {
  const authToken = BLOG?.notionAccessToken
  const api = new NotionAPI({ authToken })
  const pageBlock = await api.getPage(id)
  if (BLOG.previewImagesEnabled) {
    pageBlock.preview_images = await getPreviewImageMap(pageBlock)
  }
  return pageBlock
}

// Enhanced memoization with longer cache for static content
export const getPostBlocks = pMemoize(rawGetPostBlocks, {
  cache: new Map(),
  cacheKey: (id) => `post-blocks-${id}`
})
