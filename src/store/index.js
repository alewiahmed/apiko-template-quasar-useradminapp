import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import account from './modules/account.js'
import usersManagement from './modules/usersManagement.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    account, usersManagement
  },
  plugins: [createPersistedState()]
})
