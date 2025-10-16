import Script from 'next/script'
import { useId } from 'react'
import { BLOG } from '@/blog.config'

export const Scripts = () => {
  const googleAnalyticsId = useId()

  const hasCfProvider = BLOG.analytics && BLOG.analytics.provider === 'cf'
  const hasGaProvider = BLOG.analytics && BLOG.analytics.provider === 'ga'

  if (!hasCfProvider && !hasGaProvider) {
    return null
  }

  return (
    <>
      {hasCfProvider && (
        <Script
          src={BLOG.analytics.cfConfig.scriptUrl}
          strategy='afterInteractive'
          data-cf-beacon={BLOG.analytics.cfConfig.token}
        />
      )}

      {hasGaProvider && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
            strategy='afterInteractive'
          />
          <Script strategy='afterInteractive' id={googleAnalyticsId}>
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
                page_path: window.location.pathname,
              });`}
          </Script>
        </>
      )}
    </>
  )
}
