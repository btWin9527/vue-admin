const state = {
  test: '',
}

const mutations = {
  TEST: (state, test) => {
    state.test = test;
  }
}

const actions = {
  testVuexAlong({commit}, data) {
    commit('TEST', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

