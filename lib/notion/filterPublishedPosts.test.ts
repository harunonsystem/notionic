import { describe, expect, it } from 'vitest'
import filterPublishedPosts from './filterPublishedPosts'

interface Post {
  title?: string
  slug?: string
  date?: Date
  status?: string[]
  type?: string[]
}

describe('filterPublishedPosts', () => {
  const mockPosts: Post[] = [
    {
      title: 'Published Post',
      slug: 'published-post',
      date: new Date('2023-01-01'),
      status: ['Published'],
      type: ['Post']
    },
    {
      title: 'Newsletter Post',
      slug: 'newsletter-post',
      date: new Date('2023-01-02'),
      status: ['Published'],
      type: ['Newsletter']
    },
    {
      title: 'Notes Post',
      slug: 'notes-post',
      date: new Date('2023-01-03'),
      status: ['Published'],
      type: ['Notes']
    },
    {
      title: 'Hidden Post',
      slug: 'hidden-post',
      date: new Date('2023-01-04'),
      status: ['Published'],
      type: ['Hidden']
    },
    {
      title: 'Draft Post',
      slug: 'draft-post',
      date: new Date('2023-01-05'),
      status: ['Draft'],
      type: ['Post']
    },
    {
      title: 'Future Post',
      slug: 'future-post',
      date: new Date('2100-01-01'),
      status: ['Published'],
      type: ['Post']
    },
    {
      title: 'Incomplete Post',
      slug: '',
      date: new Date('2023-01-06'),
      status: ['Published'],
      type: ['Post']
    }
  ]

  it('should return empty array when posts array is empty', () => {
    const result = filterPublishedPosts({
      posts: [],
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result).toEqual([])
  })

  it('should return empty array when posts is undefined', () => {
    const result = filterPublishedPosts({
      posts: undefined,
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result).toEqual([])
  })

  it('should filter only newsletter posts', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: true,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result).toHaveLength(1)
    expect(result[0].type).toEqual(['Newsletter'])
  })

  it('should filter only post articles', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: false,
      onlyPost: true,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result).toHaveLength(1)
    expect(result[0].type).toEqual(['Post'])
  })

  it('should filter only notes', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: true,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result).toHaveLength(1)
    expect(result[0].type).toEqual(['Notes'])
  })

  it('should exclude hidden posts by default', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result).toHaveLength(3) // Published Post, Newsletter Post, Notes Post - Hidden excluded
    expect(result.every((post) => post.type?.[0] !== 'Hidden')).toBe(true)
  })

  it('should include only hidden posts when onlyHidden is true', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: true,
      onlyWeekly: false
    })
    expect(result).toHaveLength(1)
    expect(result[0].type).toEqual(['Hidden'])
  })

  it('should filter out draft posts', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result.every((post) => post.status?.[0] !== 'Draft')).toBe(true)
  })

  it('should filter out future dated posts', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(
      result.every((post) =>
        post.date ? post.date.valueOf() <= Date.now() : true
      )
    ).toBe(true)
  })

  it('should filter out posts without title or slug', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result.every((post) => post.title && post.slug)).toBe(true)
  })

  it('should return all valid posts when no filters are specified', () => {
    const result = filterPublishedPosts({
      posts: mockPosts,
      onlyNewsletter: false,
      onlyPost: false,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })
    expect(result).toHaveLength(3) // Published Post, Newsletter Post, and Notes Post (excluding Hidden, Draft, Future, and Incomplete)
  })
})
