import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client'
import { getPreviewImageMap } from './previewImages'

export async function getPostBlocks(id: string) {
  const authToken = BLOG?.notionAccessToken
  const api = new NotionAPI({ authToken })
  const pageBlock = await api.getPage(id)
  if (BLOG.previewImagesEnabled) {
    pageBlock.preview_images = await getPreviewImageMap(pageBlock)
  }
  return pageBlock
}
