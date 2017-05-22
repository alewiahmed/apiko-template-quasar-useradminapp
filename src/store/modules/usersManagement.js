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
    },
    removeUser (state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    },
    updateOtherUser (state, payload) {
      let index = state.users.findIndex(user => user.id === payload.id)
      if (index !== -1) {
        for (let value in payload.args) {
          state.users[index][value] = payload.args[value]
        }
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
    },
    deleteUser ({commit}, userId) {
      let p = window.apikoApi.delete('users/' + userId)

      p.then(response => {
        commit('removeUser', userId)
      })

      return p
    }
  }
}
