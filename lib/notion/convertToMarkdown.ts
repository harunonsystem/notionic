import type { ExtendedRecordMap } from 'notion-types'
import { getBlockTitle, getPageTitle } from 'notion-utils'

export function convertNotionToMarkdown(
  blockMap: ExtendedRecordMap,
  rootId?: string
): string {
  if (!blockMap || !blockMap.block) {
    return ''
  }

  const blocks = blockMap.block
  const root = rootId || Object.keys(blocks)[0]
  const markdown: string[] = []

  const processBlock = (blockId: string, level = 0): void => {
    const block = blocks[blockId]?.value
    if (!block) return

    const type = block.type
    const properties = block.properties
    const content = properties ? getBlockTitle(block, blockMap) : ''

    switch (type) {
      case 'page':
        markdown.push(`# ${getPageTitle(blockMap)}\n`)
        break

      case 'header':
        markdown.push(`# ${content}\n`)
        break

      case 'sub_header':
        markdown.push(`## ${content}\n`)
        break

      case 'sub_sub_header':
        markdown.push(`### ${content}\n`)
        break

      case 'quote':
        markdown.push(`> ${content}\n`)
        break

      case 'callout':
        markdown.push(`> 💡 ${content}\n`)
        break

      case 'text':
        if (content) {
          markdown.push(`${content}\n`)
        } else {
          markdown.push('\n')
        }
        break

      case 'bulleted_list':
        markdown.push(`${'  '.repeat(level)}- ${content}\n`)
        break

      case 'numbered_list':
        markdown.push(`${'  '.repeat(level)}1. ${content}\n`)
        break

      case 'to_do': {
        const checked = block.properties?.checked?.[0]?.[0] === 'Yes'
        markdown.push(`- [${checked ? 'x' : ' '}] ${content}\n`)
        break
      }

      case 'toggle':
        markdown.push(`<details>\n<summary>${content}</summary>\n\n`)
        break

      case 'divider':
        markdown.push('---\n')
        break

      case 'code': {
        const language = block.properties?.language?.[0]?.[0] || ''
        markdown.push(`\`\`\`${language}\n${content}\n\`\`\`\n`)
        break
      }

      case 'image': {
        const imageUrl =
          block.properties?.source?.[0]?.[0] ||
          block.format?.display_source ||
          ''
        const caption = block.properties?.caption?.[0]?.[0] || ''
        markdown.push(`![${caption}](${imageUrl})\n`)
        break
      }

      case 'bookmark': {
        const url = block.properties?.link?.[0]?.[0] || ''
        markdown.push(`[${content}](${url})\n`)
        break
      }

      case 'column_list':
      case 'column':
        break

      default:
        if (content) {
          markdown.push(`${content}\n`)
        }
    }

    if (block.content) {
      for (const childId of block.content) {
        processBlock(childId, type === 'toggle' ? level : level)
      }
    }

    if (type === 'toggle') {
      markdown.push('</details>\n')
    }
  }

  processBlock(root)

  return markdown.join('\n')
}
