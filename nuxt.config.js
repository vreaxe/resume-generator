export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'resume-generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@mdi/font/css/materialdesignicons.css',
    
    // quill themes
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    
    '@/assets/css/custom.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/register-themes', 
    { src: '@/plugins/quill-plugin', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          file: 'en.js',
          name: 'English',
        },
        {
          code: 'es',
          file: 'es.js',
          name: 'Español'
        },
      ],
      defaultLocale: 'en',
      detectBrowserLanguage: {
        useCookie: false
      },
      strategy: 'no_prefix',
      lazy: true,
      langDir: 'lang/'
    }]
    
  ],

  axios: {
    baseURL: 'http://localhost:2020/api',
  },

  server: {
    port: 2020
  },

  // Server Middleware
  serverMiddleware: {
    '/api': '~/api'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
      }
    }
  }
}
