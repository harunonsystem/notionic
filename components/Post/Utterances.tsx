import { useEffect, useId } from 'react'
import { BLOG } from '@/blog.config'

const Utterances = ({ issueTerm, layout }) => {
  const utterancId = useId()
  useEffect(() => {
    const theme =
      BLOG.appearance === 'auto'
        ? 'preferred-color-scheme'
        : BLOG.appearance === 'light'
          ? 'github-light'
          : 'github-dark'
    const script = document.createElement('script')
    const anchor = document.getElementById('comments')
    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', String(true))
    script.setAttribute('repo', BLOG.comment.utterancesConfig.repo)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('theme', theme)
    anchor.appendChild(script)
    return () => {
      anchor.innerHTML = ''
    }
  })
  return (
    <div
      id={utterancId}
      className={layout && layout === 'fullWidth' ? '' : 'md:-ml-16'}
    >
      <div className='utterances-frame'></div>
    </div>
  )
}

export default Utterances
