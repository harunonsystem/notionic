const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
    localeDetection: false
  },
  transpilePackages: ['dayjs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
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
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  }
}
