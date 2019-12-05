import colors from 'vuetify/es5/util/colors'

require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'

const BASE_API_URL =
  process.env.NODE_ENV !== 'production'
    ? process.env.BASE_API_DEV
    : process.env.BASE_API_PROD

export default {
  // https://nuxtjs.org/api/configuration-modern
  modern: !isDev,

  // https://nuxtjs.org/api/configuration-head
  head: {
    titleTemplate(title) {
      if (title) {
        return `${title} - Sahreads`
      }
      return 'Shareads'
    }
  },

  // https://nuxtjs.org/api/configuration-modules
  modules: [
    // https://http.nuxtjs.org/
    '@nuxt/http',

    // https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'

    // https://github.com/nuxt-community/sentry-module
    // "@nuxtjs/sentry",

    // https://github.com/nuxt-community/analytics-module
    // [
    //   "@nuxtjs/google-analytics",
    //   {
    //     // TODO: Change this id to your Google Analytics ID
    //     id: process.env.GOOGLE_ANALYTICS
    //   }
    // ]
  ],
  http: {
    baseURL: BASE_API_URL
    // proxy: true // Can be also an object with default options
  },

  // proxy: {
  //   '': BASE_API_URL
  // },

  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify'
  ],

  vuetify: {
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
    }
  },

  // https://nuxtjs.org/api/configuration-plugins
  plugins: ['~plugins/vee-validate'],

  // https://nuxtjs.org/api/configuration-css
  css: ['~assets/styles/app'],

  // https://nuxtjs.org/api/configuration-build
  build: {
    extractCSS: !isDev,
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
