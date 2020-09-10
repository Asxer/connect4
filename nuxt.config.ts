import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  build: {},
  buildModules: [
    '@nuxtjs/composition-api',
    '@nuxt/typescript-build'
  ],
  css: [
    '~/assets/styles/index.scss'
  ],
  env: {},
  head: {
    title: 'Connect four',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Test game' }
    ],
    link: []
  },
  loading: { color: '#0c64c1' },
  modules: [],
  plugins: []
}

export default config
