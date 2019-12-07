const cookieparser = process.server ? require('cookieparser') : undefined

export const types = {
  SET_LOADING: 'SET_LOADING',
  SET_TOKEN: 'SET_TOKEN',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  SET_BOOK_COLLECTION: 'SET_BOOK_COLLECTION'
}

export const state = () => ({
  isLoading: false,
  token: null,
  userData: null,
  bookColection: null,
  notif: {
    isDisplayed: false,
    message: '',
    type: 'info'
  }
})

export const getters = {}

export const mutations = {
  [types.SET_LOADING](state, loading) {
    state.isLoading = loading
  },
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_USER_DATA](state, data) {
    state.userData = data
  },
  [types.SET_BOOK_COLLECTION](state, data) {
    state.bookColection = data
  },
  [types.SET_NOTIFICATION](state, payload) {
    state.notif = payload
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app, $axios, req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      const { userData } = parsed
      $axios.setHeader('Authorization', `Bearer ${userData.jwt}`)

      try {
        commit(types.SET_LOADING, false)
        await commit(types.SET_TOKEN, userData.jwt)
        await commit(types.SET_USER_DATA, userData.user)
        this.$router.replace({ name: 'home' })
      } catch (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log('Unknown error')
        }
      } finally {
        commit(types.SET_LOADING, false)
      }
    }
  }
}
