import axios from 'axios'
import store from '../store'
// axios.defaults.baseURL = 'http://zeta.e0.cz:5001/api'
axios.defaults.baseURL = 'http://localhost:5000'

function request (opts) {
  if (!opts.args) {
    opts.args = {}
  }
  if (store.state.account.loggedIn && opts.method === 'get') {
    opts.args.params = {}
    opts.args.params.token = store.state.account.token
  }
  else if (store.state.account.loggedIn) {
    opts.args.token = store.state.account.token
  }

  return axios[opts.method](opts.path, opts.args)
}
export default {
  // AJAX GET
  get (path, args) {
    let opts = {}
    opts.method = 'get'
    opts.path = path
    opts.args = args
    return request(opts)
  },

  // AJAX POST
  post (path, args) {
    let opts = {}
    opts.method = 'post'
    opts.path = path
    opts.args = args
    return request(opts)
  },

  // AJAX PUT
  put (path, args) {
    let opts = {}
    opts.method = 'put'
    opts.path = path
    opts.args = args
    return request(opts)
  },

  // AJAX DELETE
  delete (path, args) {
    let opts = {}
    opts.method = 'delete'
    opts.path = path
    opts.args = args
    return request(opts)
  }
}
