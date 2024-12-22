export interface filterPublishedPostsProps {
  posts: Array<{
    title: string
    slug: string
    status: Array<'Published' | 'Draft'>
    date: Date
    type: Array<'Newsletter' | 'Notes' | 'Post' | 'Hidden' | 'Weekly'>
  }>
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
}: filterPublishedPostsProps) {
  if (!posts || !posts.length) return []

  return posts.filter((post) => {
    const type = post?.type?.[0]

    if (
      (onlyNewsletter && type !== 'Newsletter') ||
      (onlyNotes && type !== 'Notes') ||
      (onlyPost && type !== 'Post') ||
      (onlyWeekly && type !== 'Weekly') ||
      (onlyHidden ? type !== 'Hidden' : type === 'Hidden')
    )
      return false

    return (
      post.title &&
      post.slug &&
      post.status?.[0] === 'Published' &&
      post.date <= new Date()
    )
  })
}
