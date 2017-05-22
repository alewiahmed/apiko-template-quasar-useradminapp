export default {
  state: {
    loggedIn: false,
    user: {},
    token: null
  },
  getters: {
    loggedIn (state) {
      return state.loggedIn
    },
    user (state) {
      return state.user
    },
    token (state) {
      return state.token
    },
    isAdmin ({user}) {
      return user.role === 'admin'
    }
  },
  mutations: {
    loggedIn (state, truth) {
      state.loggedIn = truth
    },
    user (state, user) {
      state.user = user
    },
    token (state, token) {
      state.token = token
    },
    updateUser (state, user) {
      for (let value in user.args) {
        state.user[value] = user.args[value]
      }
    },
    logout (state, user) {
      state.user = {}
      state.loggedIn = false
      state.token = null
    }
  },
  actions: {
    login (context, args) {
      let p = window.apikoApi.post('users/login', args)

      return p
    },
    register (context, args) {
      let p = window.apikoApi.post('users', args)

      return p
    },
    userExists (context, username) {
      let p = window.apikoApi.get('users/exists/' + username)
      return p
    },
    updateUser ({commit, state}, payload) {
      let p = window.apikoApi.put('users/' + payload.id, payload.args)
      p.then(response => {
        if (state.user.id === payload.id) {
          commit('updateUser', payload)
        }
        else {
          commit('updateOtherUser', payload)
        }
      })
      return p
    },
    changePassword (context, payload) {
      let p = window.apikoApi.post('/users/password/change/' + payload.id, payload.args)

      return p
    }
  }
}
