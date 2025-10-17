import { useRouter } from 'next/router'
import { useEffect, useId } from 'react'
import { BLOG } from '@/blog.config'

const SupaComments = () => {
  const commentsId = useId()
  const { locale } = useRouter()
  useEffect(() => {
    const script = document.createElement('script')
    const anchor = document.getElementById(commentsId)
    script.setAttribute('src', `/comments/comments-${locale}.js`)
    script.setAttribute('crossorigin', 'anonymous')
    anchor.appendChild(script)
  }, [locale, commentsId])
  return (
    <>
      {/* SupaComments share existing tailwind css styles, don't need to import an additional css file. */}
      <div className='hidden mt-10 space-y-4 rounded-full w-8 h-8' />
      <div className='hidden animate-pulse space-x-4 flex-1 h-2 w-20 rounded grid-cols-3 gap-4 col-span-1' />
      <div
        id={commentsId}
        // data-url='localhost:3000'
        data-url={BLOG.link.split('/').slice(2)}
        supabase-url={BLOG.comment.supaCommentsConfig.supabaseUrl}
        anon-key={BLOG.comment.supaCommentsConfig.supabaseAnonKey}
      ></div>
    </>
  )
}

export default SupaComments
