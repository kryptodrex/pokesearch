import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idHistory: []
  },
  mutations: {
    addIdToHistory (state, id) {
      state.idHistory.push(id)
    }
  },
  actions: {

  }
})
