import { describe, expect, test } from 'vitest'
import filterPublishedPosts, {
  type filterPublishedPostsProps
} from './filterPublishedPosts'

describe('filterPublishedPosts', () => {
  test('successfully filters posts', () => {
    const posts: filterPublishedPostsProps['posts'] = [
      {
        title: 'title',
        slug: 'slug',
        status: ['Published'],
        date: new Date(),
        type: ['Post']
      }
    ]

    const filteredPosts = filterPublishedPosts({
      posts,
      onlyNewsletter: false,
      onlyPost: true,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })

    expect(filteredPosts).toEqual(posts)
  })

  test('not Pushlished posts are filtered out', () => {
    const posts: filterPublishedPostsProps['posts'] = [
      {
        title: 'title',
        slug: 'slug',
        status: ['Draft'],
        date: new Date(),
        type: ['Post']
      }
    ]

    const filteredPosts = filterPublishedPosts({
      posts,
      onlyNewsletter: false,
      onlyPost: true,
      onlyNotes: false,
      onlyHidden: false,
      onlyWeekly: false
    })

    expect(filteredPosts).toEqual([])
  })

  const testCasesByType = ['Newsletter', 'Notes', 'Post', 'Hidden', 'Weekly']
  testCasesByType.forEach((type) => {
    test(`only${type} filters out other types`, () => {
      const posts: filterPublishedPostsProps['posts'] = [
        {
          title: 'title',
          slug: 'slug',
          status: ['Published'],
          date: new Date(),
          type: [type as 'Newsletter' | 'Notes' | 'Post' | 'Hidden' | 'Weekly']
        }
      ]

      const filteredPosts = filterPublishedPosts({
        posts,
        onlyNewsletter: type === 'Newsletter',
        onlyPost: type === 'Post',
        onlyNotes: type === 'Notes',
        onlyHidden: type === 'Hidden',
        onlyWeekly: type === 'Weekly'
      })

      expect(filteredPosts).toEqual(posts)
    })
  })
})
