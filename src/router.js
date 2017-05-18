import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

let router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   *
   * Use onlyLogged & onlyNotLogged to control who can view your routes.
   * Use onlyLogged = true for those routes you want only logged in users to view.
   * Use onlyNotLogged = true for those routes you want only not logged in users to view.
   */

  routes: [
    {
      path: '/',
      component: load('Index'),
      children: [
      { name: 'home', path: '', component: load('home') },
      { name: 'login', path: 'login', component: load('login'), meta: { onlyNotLogged: true } },
      { name: 'registration', path: 'register', component: load('registration'), meta: { onlyNotLogged: true } },
      { name: 'passwordRecovery', path: 'password-recovery', component: load('passwordRecovery'), meta: { onlyNotLogged: true } },
      { name: 'dashboard', path: 'dashboard', component: load('dashboard'), meta: { onlyLogged: true } },
      { name: 'accountSettings', path: 'account-settings', component: load('accountSettings'), meta: { onlyLogged: true } }
      ] },
  { path: '*', component: load('Error404') } // Not found
  ]
})
router.beforeEach((to, from, next) => {
  // check if the route requires login
  if (to.matched.some(m => m.meta.onlyLogged)) {
    if (!store.state.account.loggedIn) {
      console.log('Redirecting to the Login, because this page (' + to.fullPath + ') is protected. And the user is not logged in. User:', store.state.account.user)
      next('login')
    }
    else {
      next()
    }
  }
  else if (store.state.account.loggedIn && to.matched.some(m => m.meta.onlyNotLogged)) {
    next('dashboard')
  }
  else {
    next()
  }
})

export default router
