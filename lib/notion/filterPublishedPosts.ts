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

  
  return posts
    .filter(post => {
      const type = post?.type?.[0]
      
      if (onlyNewsletter && type !== 'Newsletter') return false
      if (onlyNotes && type !== 'Notes') return false  
      if (onlyPost && type !== 'Post') return false
      if (onlyWeekly && type !== 'Weekly') return false
      if (onlyHidden ? type !== 'Hidden' : type === 'Hidden') return false

      return (
        post.title &&
        post.slug &&
        post?.status?.[0] === 'Published' &&
        post.date <= new Date()
      )
    })
}
