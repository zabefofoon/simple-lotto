const path = require('path')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/style.scss'],
  modules: [
    'nuxt-gtag',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    manifest: {
      id: '/simple-lotto',
      name: 'SimpleLotto',
      short_name: 'Simple Lotto',
      description: 'Simple Lotto PWA',
      screenshots: [
        {
          src: 'screenshot.png',
          sizes: '490x945',
          label: 'screenshot',
          form_factor: 'narrow',
          type: 'image/png'
        },
        {
          src: 'screenshot.png',
          sizes: '490x945',
          label: 'screenshot',
          form_factor: 'wide',
          type: 'image/png'
        }
      ],
      icons: [
        {
          src: '144-144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '192-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '512-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      display: 'standalone'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  gtag: {
    id: 'G-KE4RWDCQS2'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: '/simple-lotto/',
    buildAssetsDir: 'assets',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/simple-lotto/favicon.ico' },
      ]
  },
  },
  routeRules: {
    '/': { prerender: true },
  },
  nitro: {
    output: {
      publicDir: path.join(__dirname, '/docs'),
    },
  },
  experimental: {
    payloadExtraction: false
  }
})