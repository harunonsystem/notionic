import Container from '@/components/Container'
import NotesHero from '@/components/Hero/Notes'
import { getPostBlocks, getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'
import BlogPost from '@/components/BlogPost'

export async function getStaticProps() {
  const notes = await getAllPosts({ onlyNotes: true })
  const heros = await getAllPosts({ onlyHidden: true })
  const hero = heros.find((t) => t.slug === 'notes')

  let blockMap
  try {
    blockMap = await getPostBlocks(hero.id)
  } catch (err) {
    console.error(err)
    // return { props: { post: null, blockMap: null } }
  }

  return {
    props: {
      notes,
      blockMap
    },
    revalidate: 1
  }
}

const Notes = ({ notes, blockMap }) => {
  return (
    <Container title={BLOG.news} description={BLOG.description}>
      <NotesHero blockMap={blockMap} />
      {notes.map((note) => (
        <BlogPost key={note.id} post={note} />
      ))}
    </Container>
  )
}

export default Notes
