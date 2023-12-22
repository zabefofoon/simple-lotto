const path = require('path')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/style.scss'],
  modules: [
    'nuxt-gtag'
  ],
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