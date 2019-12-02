import colors from 'vuetify/es5/util/colors'
import en from 'vuetify/es5/locale/en'
import id from 'vuetify/es5/locale/id'
import locales from './utils/locales'

require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'

const BASE_API_URL =
  process.env.NODE_ENV !== 'production'
    ? process.env.BASE_API_DEV
    : process.env.BASE_API_PROD

export default {
  modern: !isDev,
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/vee-validate'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    [
      'nuxt-i18n',
      {
        vueI18n: {
          silentTranslationWarn: true
        },
        defaultLocale: 'id',
        vueI18nLoader: true,
        lazy: true,
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true
        },
        langDir: 'locales/',
        locales
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: BASE_API_URL
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#341f97',
          secondary: '#5f27cd',
          accent: '#353b48',
          error: '#e74c3c',
          warning: '#f39c12',
          success: '#4cd137'
        },
        dark: {
          primary: colors.blue.darken4,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    lang: {
      locales: { 'en-us': en, 'en-uk': en, id },
      current: 'id'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: !isDev,
    transpile: ['vee-validate/dist/rules'],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
