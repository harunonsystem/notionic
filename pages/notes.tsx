import { BLOG } from '@/blog.config'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import { getAllPosts } from '@/lib/notion'
import type { Post } from '@/lib/types'

export async function getStaticProps() {
  const posts = await getAllPosts({ onlyNotes: true })
  return {
    props: { posts },
    revalidate: 1
  }
}

const Notes = ({ posts }: { posts: Post[] }) => {
  return (
    <Container title={BLOG.notes} description={BLOG.description}>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default Notes
