import Vue from 'vue'
import axios from 'axios'
// used to define any libraries to use inside any vue component
export default {
  install () {
    Object.defineProperty(Vue.prototype, '$axios', {value: axios})
  }
}
