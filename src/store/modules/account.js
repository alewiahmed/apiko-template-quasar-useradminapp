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
    }
  }
}
