import axios from 'axios'

// axios.defaults.baseURL = 'http://zeta.e0.cz:5001/api'
axios.defaults.baseURL = 'http://localhost:5000'

function request (opts) {
  if (!opts.args) {
    opts.args = {}
  }

  let p = axios[opts.method](opts.path, opts.args)
  p.then((response) => {
    console.log('HTTP OK:', response)
  })

  p.catch((error) => {
    console.warn('HTTP ERR:', error)
  })

  return p
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
