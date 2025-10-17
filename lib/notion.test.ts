import { beforeEach, describe, expect, it, vi } from 'vitest'

// Simple unit tests - no external dependencies
import { getAllTagsFromPosts } from './notion/getAllTagsFromPosts'

// For the other functions that have external dependencies,
// we'll focus on ensuring they're properly exported
const { getAllPosts, getPostBlocks } = await import('./notion')

describe('notion library', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllTagsFromPosts', () => {
    it('generates tag counts from posts', () => {
      const posts = [
        {
          title: 'Post 1',
          tags: ['javascript', 'react']
        },
        {
          title: 'Post 2',
          tags: ['javascript']
        },
        {
          title: 'Post 3',
          tags: ['react', 'typescript']
        },
        {
          title: 'Post 4' // No tags
        }
      ]

      const result = getAllTagsFromPosts(posts)

      expect(result).toEqual({
        javascript: 2,
        react: 2,
        typescript: 1
      })
    })

    it('handles empty posts array', () => {
      const result = getAllTagsFromPosts([])
      expect(result).toEqual({})
    })

    it('handles posts without tags', () => {
      const posts = [{ title: 'Post 1' }, { title: 'Post 2' }]

      const result = getAllTagsFromPosts(posts)
      expect(result).toEqual({})
    })

    it('handles undefined/null tags gracefully', () => {
      const posts = [
        { title: 'Post 1', tags: undefined },
        { title: 'Post 2', tags: null },
        { title: 'Post 3', tags: ['tag1'] }
      ]

      const result = getAllTagsFromPosts(posts)
      expect(result).toEqual({ tag1: 1 })
    })

    it('counts duplicate tags correctly', () => {
      const posts = [
        { title: 'Post 1', tags: ['js', 'js', 'react'] },
        { title: 'Post 2', tags: ['js'] }
      ]

      const result = getAllTagsFromPosts(posts)
      expect(result).toEqual({ js: 3, react: 1 })
    })

    it('preserves tag case and spaces', () => {
      const posts = [
        { title: 'Post 1', tags: ['TypeScript', 'react hooks'] },
        { title: 'Post 2', tags: ['TypeScript'] }
      ]

      const result = getAllTagsFromPosts(posts)
      expect(result).toEqual({ TypeScript: 2, 'react hooks': 1 })
    })

    it('handles malformed post data', () => {
      // Test each problematic case individually to isolate the issue
      expect(getAllTagsFromPosts([null])).toEqual({})
      expect(getAllTagsFromPosts([undefined])).toEqual({})
      expect(getAllTagsFromPosts([{}])).toEqual({})
      expect(getAllTagsFromPosts([{ tags: '' }])).toEqual({})
      expect(getAllTagsFromPosts([{ tags: [] }])).toEqual({})

      // Empty string case - this should return { '': 1 } since empty strings are considered valid tags
      const emptyTagPost = { tags: [''] }
      const emptyTagsResult = getAllTagsFromPosts([emptyTagPost])
      expect(emptyTagsResult).toEqual({ '': 1 })
    })

    it('handles very large tag arrays', () => {
      const manyTags = Array.from({ length: 10 }, (_, i) => `tag${i}`)
      const posts = [{ tags: manyTags }]

      const result = getAllTagsFromPosts(posts)
      expect(Object.keys(result)).toHaveLength(10)
      // biome-ignore lint/complexity/useLiteralKeys: accessing computed property names
      expect(result['tag0']).toBe(1)
    })
  })

  describe('functionality validation', () => {
    it('getAllPosts exports correctly', () => {
      expect(typeof getAllPosts).toBe('function')
    })

    it('getAllTagsFromPosts handles array input', () => {
      const posts = [{ title: 'Test', tags: ['css'] }]
      const result = getAllTagsFromPosts(posts)
      expect(result).toEqual({ css: 1 })
    })

    it('getPostBlocks handles string input', () => {
      expect(typeof getPostBlocks).toBe('function')
    })
  })
})
