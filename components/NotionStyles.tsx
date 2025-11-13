import { useEffect } from 'react'

export default function NotionStyles() {
  useEffect(() => {
    // Load PrismJS components dynamically only when needed
    const loadPrism = async () => {
      try {
        await import('prismjs')
        await import('prismjs/components/prism-bash')
        await import('prismjs/components/prism-diff')
        await import('prismjs/components/prism-go')
        await import('prismjs/components/prism-yaml')
        await import('prismjs/components/prism-rust')
        await import('prismjs/components/prism-javascript')
        await import('prismjs/components/prism-markup')
        await import('prismjs/components/prism-typescript')
      } catch (error) {
        console.warn('Failed to load PrismJS:', error)
      }
    }

    loadPrism()
  }, [])

  return null
}
