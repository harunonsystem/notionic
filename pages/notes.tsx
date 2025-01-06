import Container from '@/components/Container'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { BLOG } from '@/blog.config'
import BlogPost from '@/components/BlogPost'
import { ExtendedRecordMap } from 'notion-types'

export async function getStaticProps() {
  const allowSlug = ['notes', 'weekly']
  const notes = await getAllPosts({ onlyNotes: true })
  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => allowSlug.includes(t.slug))

  let blockMap: ExtendedRecordMap = null
  try {
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  const posts = [...notes]
  // const posts = [...notes, ...weekly]
  return {
    props: {
      posts,
      blockMap
    },
    revalidate: 1
  }
}

const Notes = ({ posts }) => {
  return (
    <Container title={BLOG.notes} description={BLOG.description}>
      {posts?.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default Notes
