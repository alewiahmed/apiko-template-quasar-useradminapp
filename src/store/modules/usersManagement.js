export default {
  state: {
    users: []
  },
  getters: {
    users (state) {
      return state.users
    }
  },
  mutations: {
    saveUsers (state, payload) {
      if (payload) {
        let users = payload.users, id = payload.user.id
        let otherUsers = users.filter(user => user.id !== id)
        state.users.push(...otherUsers)
      }
      else {
        state.users = []
      }
    }
  },
  actions: {
    getUsers ({commit, rootState}) {
      let p = window.apikoApi.get('users')

      p.then((response) => {
        commit('saveUsers', {users: response.data, user: rootState.account.user})
      })

      return p
    }
  }
}
