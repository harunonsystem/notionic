import { defaultMapImageUrl, getDateValue, getTextContent } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { BLOG } from '@/blog.config'
import { BlockMap, CollectionPropertySchemaMap } from 'notion-types'

interface GetPagePropertiesProps {
  id: string
  block: BlockMap
  schema: CollectionPropertySchemaMap
  authToken?: string
}

export default async function getPageProperties({
  id,
  block,
  schema,
  authToken
}: GetPagePropertiesProps) {
  const api = new NotionAPI({ authToken })
  const rawProperties = Object.entries(block?.[id]?.value?.properties || [])
  const excludeProperties = ['date', 'select', 'multi_select', 'person']
  const properties = {
    page_cover: null,
    content: null,
    id: null,
    fullWidth: null,
    date: null
  }
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i] as [string, any]
    properties.id = id
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val as any[])
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const dateProperty = getDateValue(val as any)
          delete dateProperty.type
          properties[schema[key].name] = dateProperty
          break
        }
        case 'select':
        case 'multi_select': {
          const selects = getTextContent(val as any[])
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(',')
          }
          break
        }
        case 'person': {
          const rawUsers = (val as any[]).flat()
          const users = []
          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0]
              const res = await api.getUsers(userId)
              const resValue = (res as any)?.recordMapWithRoles?.notion_user?.[
                userId[1]
              ]?.value
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo
              }
              users.push(user)
            }
          }
          properties[schema[key].name] = users
          break
        }
        default:
          break
      }
    }
  }

  // 从Block获取封面图;优先取PageCover，否则取内容图片
  function getPostCover(id: string, block: BlockMap) {
    const pageCover = block ? block[id]?.value?.format?.page_cover : null

    if (!pageCover) return BLOG?.defaultCover || ''
    else {
      if (pageCover.startsWith('/')) {
        return 'https://www.notion.so' + pageCover
      } else if (pageCover.startsWith('http')) {
        return defaultMapImageUrl(pageCover, block[id].value)
      }
    }
  }

  properties.page_cover = getPostCover(id, block)
  delete properties.content
  return properties
}
