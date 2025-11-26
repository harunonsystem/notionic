import type { ExtendedRecordMap } from 'notion-types'
import { idToUuid } from 'notion-utils'

export default function getAllPageIds(
  collectionQuery: ExtendedRecordMap['collection_query'],
  viewId?: string
) {
  // Add null/undefined checks to prevent crashes when Notion API fails
  if (!collectionQuery || typeof collectionQuery !== 'object') {
    console.warn('getAllPageIds: collectionQuery is null or invalid')
    return []
  }

  const viewsArray = Object.values(collectionQuery)
  if (viewsArray.length === 0) {
    console.warn('getAllPageIds: no views found in collectionQuery')
    return []
  }

  const views = viewsArray[0]
  if (!views || typeof views !== 'object') {
    console.warn('getAllPageIds: views object is invalid')
    return []
  }

  let pageIds = []
  if (viewId) {
    const vId = idToUuid(viewId)
    pageIds = views[vId]?.blockIds || []
  } else {
    const pageSet = new Set()
    Object.values(views).forEach((view) => {
      view?.collection_group_results?.blockIds?.forEach((id: string) => {
        pageSet.add(id)
      })
      // view?.blockIds?.forEach((id) => pageSet.add(id))
    })
    pageIds = [...(pageSet as any)]
  }
  return pageIds
}
