import type { ExtendedRecordMap } from 'notion-types'
import { getBlockTitle, getPageContentBlockIds } from 'notion-utils'

export function convertNotionToMarkdown(blockMap: ExtendedRecordMap): string {
  if (!blockMap || !blockMap.block) {
    return ''
  }

  const blockIds = getPageContentBlockIds(blockMap)
  const lines: string[] = []

  for (const blockId of blockIds) {
    const block = blockMap.block[blockId]?.value
    if (!block) continue

    const text = getBlockTitle(block, blockMap)
    if (!text || text.trim() === '') continue

    const type = block.type

    // Skip media blocks
    if (
      type === 'image' ||
      type === 'video' ||
      type === 'audio' ||
      type === 'file' ||
      type === 'embed' ||
      type === 'bookmark'
    ) {
      continue
    }

    // Format based on block type
    switch (type) {
      case 'header':
        lines.push(`# ${text}`)
        break

      case 'sub_header':
        lines.push(`## ${text}`)
        break

      case 'sub_sub_header':
        lines.push(`### ${text}`)
        break

      case 'quote':
        lines.push(`> ${text}`)
        break

      case 'callout':
        lines.push(`> ${text}`)
        break

      case 'bulleted_list':
        lines.push(`- ${text}`)
        break

      case 'numbered_list':
        lines.push(`1. ${text}`)
        break

      case 'to_do': {
        const checked = block.properties?.checked?.[0]?.[0] === 'Yes'
        lines.push(`- [${checked ? 'x' : ' '}] ${text}`)
        break
      }

      case 'code': {
        const language = block.properties?.language?.[0]?.[0] || ''
        lines.push(`\`\`\`${language}`)
        lines.push(text)
        lines.push('```')
        break
      }

      case 'divider':
        lines.push('---')
        break

      default:
        lines.push(text)
    }
  }

  return lines.join('\n\n')
}
