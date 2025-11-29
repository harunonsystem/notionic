import { BLOG } from '@/blog.config'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import Pagination from '@/components/Pagination'
import { i18nConfig } from '@/lib/i18n'
import { getAllPosts } from '@/lib/notion'

const Page = ({ postsToShow, page, showNext }) => {
  return (
    <Container>
      {postsToShow?.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      <Pagination page={page} showNext={showNext} />
    </Container>
  )
}

export async function getStaticProps(context: {
  params: { page: number }
  locale: string
}) {
  const { page } = context.params // Get Current Page No.
  const posts = await getAllPosts({ onlyNewsletter: false })
  const postsToShow = posts.slice(
    BLOG.postsPerPage * (page - 1),
    BLOG.postsPerPage * page
  )
  const totalPosts = posts.length
  const showNext = page * BLOG.postsPerPage < totalPosts
  return {
    props: {
      page, // Current Page
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ onlyNewsletter: false })
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / BLOG.postsPerPage)

  // Generate paths for all locales
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => i + 2).flatMap(
    (pageNum) =>
      i18nConfig.locales.map((locale) => ({
        params: { page: `${pageNum}` },
        locale
      }))
  )

  return {
    // remove first page, we're not gonna handle that.
    paths,
    fallback: true
  }
}

export default Page
