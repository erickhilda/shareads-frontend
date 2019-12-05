const cookieparser = process.server ? require('cookieparser') : undefined

export const types = {
  SET_LOADING: 'SET_LOADING',
  SET_TOKEN: 'SET_TOKEN',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_NOTIFICATION: 'SET_NOTIFICATION'
}

export const state = () => ({
  isLoading: false,
  token: null,
  userData: null,
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
  [types.SET_NOTIFICATION](state, payload) {
    state.notif = payload
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app, $http, req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      const { token } = parsed
      $http.setHeader('Authorization', `${token}`)
      $http.setToken(`${token}`, 'Bearer')

      try {
        commit(types.SET_LOADING, false)
        await commit(types.SET_TOKEN, token)
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
