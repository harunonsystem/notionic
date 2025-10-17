import NotFound from '@/components/NotFound'

function ErrorPage({ statusCode }: { statusCode: number }) {
  return <NotFound statusCode={statusCode} />
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
