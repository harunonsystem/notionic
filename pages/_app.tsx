import dynamic from 'next/dynamic'
import 'katex/dist/katex.min.css'
import '@/styles/globals.css'
import '@/styles/notion.css'
import { Analytics } from '@vercel/analytics/react'

// Dynamic imports for better bundle splitting
const NotionStyles = dynamic(() => import('@/components/NotionStyles'), {
  ssr: false,
  loading: () => null
})

import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { BLOG } from '@/blog.config'
import { Scripts } from '@/components/Common/Scripts'
import TransitionEffect from '@/components/Common/TransitionEffect'
import '@/styles/nprogress.css'
import Footer from '@/components/NavBar/Footer'
import Header from '@/components/NavBar/Header'

const Gtag = dynamic(() => import('@/components/Common/Gtag'), { ssr: false })

function MyApp({ Component, pageProps }) {
  // https://github.com/vercel/next.js/blob/canary/examples/with-loading/pages/_app.js
  const router = useRouter()

  useEffect(() => {
    const handleStart = (_url) => {
      // console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Scripts />
      <NotionStyles />
      {BLOG.isProd && BLOG?.analytics?.provider === 'ga' && <Gtag />}
      <ThemeProvider attribute='class'>
        <Header
          navBarTitle={pageProps.post ? pageProps.post.title : null}
          fullWidth={pageProps.post ? pageProps.post.fullWidth : false}
        />
        <TransitionEffect>
          <div
            className={`min-h-[calc(100vh-14rem)] md:min-h-[calc(100vh-18rem)] ${
              BLOG.font === 'serif' ? 'font-serif' : 'font-sans'
            }`}
          >
            <Component {...pageProps} />
          </div>
        </TransitionEffect>
        <Footer fullWidth={pageProps.post ? pageProps.post.fullWidth : false} />
      </ThemeProvider>
      <Analytics />
    </>
  )
}

export default MyApp
