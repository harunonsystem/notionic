import type { ExtendedRecordMap } from 'notion-types'
import { idToUuid } from 'notion-utils'

export default function getAllPageIds(
  collectionQuery: ExtendedRecordMap['collection_query'],
  viewId?: string
) {
  const views = Object.values(collectionQuery)[0]
  let pageIds = []
  if (viewId) {
    const vId = idToUuid(viewId)
    pageIds = views[vId]?.blockIds
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
