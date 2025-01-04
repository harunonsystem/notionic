import NotFound from '@/components/NotFound'

function Error({ statusCode }: { statusCode: number }) {
  return <NotFound statusCode={statusCode} />
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
