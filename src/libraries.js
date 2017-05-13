import apiko from './api/index.js'
// used to define any libraries to use inside any vue component
export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$apiko', { value: apiko })
  }
}
