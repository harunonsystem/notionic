interface FilterPublishedPostsProps {
  posts: any[]
  onlyNewsletter: boolean
  onlyPost: boolean
  onlyNotes: boolean
  onlyHidden: boolean
  onlyWeekly: boolean
}

export default function filterPublishedPosts({
  posts,
  onlyNewsletter,
  onlyPost,
  onlyNotes,
  onlyHidden,
  onlyWeekly
}: FilterPublishedPostsProps) {
  if (!posts || !posts.length) return []

  const filtered = posts
    .filter((post) =>
      onlyNewsletter ? post?.type?.[0] === 'Newsletter' : post
    )
    .filter((post) => (onlyNotes ? post?.type?.[0] === 'Notes' : post))
    .filter((post) => (onlyPost ? post?.type?.[0] === 'Post' : post))
    .filter((post) =>
      onlyHidden ? post?.type?.[0] === 'Hidden' : post?.type?.[0] !== 'Hidden'
    )
    .filter((post) => (onlyWeekly ? post?.type?.[0] === 'Weekly' : post))
    .filter((post) => {
      const hasTitle = !!post.title
      const hasSlug = !!post.slug
      const isPublished = post?.status?.[0] === 'Published'
      const isNotFuture = post.date <= new Date()
      const shouldInclude = hasTitle && hasSlug && isPublished && isNotFuture

      if (!shouldInclude && post.slug) {
        console.log(
          `filterPublishedPosts: Filtering out post with slug="${post.slug}":`,
          {
            hasTitle,
            hasSlug,
            status: post?.status?.[0],
            isPublished,
            date: new Date(post.date).toISOString(),
            isNotFuture
          }
        )
      }

      return shouldInclude
    })

  return filtered
}
