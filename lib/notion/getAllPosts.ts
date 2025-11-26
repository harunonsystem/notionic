import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import pMemoize from 'p-memoize'
import { BLOG } from '@/blog.config'
import { dateToUnixTimestamp } from '@/lib/timezone'
import filterPublishedPosts from './filterPublishedPosts'
import getAllPageIds from './getAllPageIds'
import getPageProperties from './getPageProperties'

interface GetAllPostsProps {
  onlyNewsletter?: boolean
  onlyPost?: boolean
  onlyNotes?: boolean
  onlyHidden?: boolean
  onlyWeekly?: boolean
}

const rawGetAllPosts = async ({
  onlyNewsletter,
  onlyPost,
  onlyWeekly,
  onlyNotes,
  onlyHidden
}: GetAllPostsProps) => {
  let id = BLOG.notionPageId
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })

  try {
    const response = await api.getPage(id)

    // Validate response structure to prevent crashes on API errors
    if (!response || !response.block || !response.collection) {
      console.error('getAllPosts: Invalid response structure from Notion API')
      return []
    }

    id = idToUuid(id)
    const collection = Object.values(response.collection)[0]?.value
    const collectionQuery = response.collection_query
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = block[id]?.value

    if (!rawMetadata) {
      console.error(`getAllPosts: Block metadata not found for id '${id}'`)
      return []
    }

    // Check Type
    if (
      rawMetadata?.type !== 'collection_view_page' &&
      rawMetadata?.type !== 'collection_view'
    ) {
      console.log(`pageId '${id}' is not a database`)
      return []
    } else {
      // Construct Data
      const pageIds = getAllPageIds(collectionQuery)
      const data = []
      for (let i = 0; i < pageIds.length; i++) {
        const id = pageIds[i]
        const properties =
          (await getPageProperties({ id, block, schema })) || null

        // Add fullwidth to properties
        properties.fullWidth = block[id].value?.format?.page_full_width ?? false
        // Convert date (with timezone) to unix milliseconds timestamp
        const dateInput =
          properties.date?.start_date || block[id].value?.created_time
        const timestamp = dateToUnixTimestamp(dateInput, BLOG.timezone)
        properties.date = timestamp ?? 0

        data.push(properties)
      }

      // remove all the items doesn't meet requirements
      const posts = filterPublishedPosts({
        posts: data,
        onlyNewsletter,
        onlyPost,
        onlyNotes,
        onlyHidden,
        onlyWeekly
      })

      if (BLOG.sortByDate) {
        posts.sort((a, b) => b.date - a.date)
      }
      return posts
    }
  } catch (error) {
    console.error('getAllPosts: Error fetching posts from Notion:', error)
    return []
  }
}

// Enhanced memoization with cache control
export const getAllPosts = pMemoize(rawGetAllPosts, {
  cache: new Map(),
  cacheKey: (...args) => JSON.stringify(args)
})
