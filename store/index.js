export const types = {
  SET_LOADING: 'SET_LOADING'
}

export const state = () => ({
  isLoading: false
})

export const getters = {
  getExampleState(state) {
    return state.exampleState
  }
}

export const mutations = {
  [types.SET_LOADING](state, loading) {
    state.isLoading = loading
  }
}

export const actions = {
  [types.SET_EXAMPLE_STATE]({ commit }, payload) {
    commit(types.SET_EXAMPLE_STATE, payload)
  }
}
