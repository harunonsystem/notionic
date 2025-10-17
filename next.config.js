const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
    localeDetection: false
  },
  transpilePackages: ['dayjs'],
  images: {
    domains: [
      'www.notion.so',
      'images.unsplash.com',
      's3.us-west-2.amazonaws.com'
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  async headers() {
    // Cache configuration
    const CACHE_CONFIG = {
      ASSETS: 31536000, // 1 year
      IMAGES: 86400 // 24 hours
    }

    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${CACHE_CONFIG.ASSETS}, immutable`
          }
        ]
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${CACHE_CONFIG.IMAGES}`
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/notes/:pathname',
        destination: '/api/htmlrewrite?pathname=:pathname'
      },
      {
        source: '/notes/:pathname/b/:slug*',
        destination: '/api/htmlrewrite?pathname=:pathname&slug=/b/:slug*'
      },
      {
        source: '/notes/:pathname/x/:slug*',
        destination: '/api/htmlrewrite?pathname=:pathname&slug=/x/:slug*'
      }
      // {
      //   source: '/api/:slug*',
      //   destination: 'https://www.craft.do/api/:slug*'
      // },
      // {
      //   source: '/share/static/js/:slug*',
      //   destination:
      //     '/api/jsrewrite?url=https://www.craft.do/share/static/js/:slug*'
      // },
      // {
      //   source: '/share/static/css/:slug*',
      //   destination: 'https://www.craft.do/share/static/css/:slug*'
      // },
      // {
      //   source: '/share/static/fonts/:slug*',
      //   destination: 'https://www.craft.do/share/static/fonts/:slug*'
      // },
      // {
      //   source: '/share/static/media/:slug*',
      //   destination: 'https://www.craft.do/share/static/media/:slug*'
      // },
      // {
      //   source: '/share/static/craft.webmanifest',
      //   destination: 'https://www.craft.do/share/static/craft.webmanifest'
      // },
      // {
      //   source: '/assets/js/analytics2.js',
      //   destination: 'https://www.craft.do/404'
      // }
    ]
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'dayjs']
  }
})
