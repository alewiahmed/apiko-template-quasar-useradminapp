import store from './store'
export function login (username, password) {
  let p = store.dispatch('login', {
    username,
    password
  })
  p.then(response => {
    store.commit('loggedIn', true)
    store.commit('user', response.data.user)
    store.commit('token', response.data.token)
  })

  return p
}

export function logout () {
  store.commit('logout')
  store.commit('saveUsers', null)
}
