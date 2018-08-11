import axios from 'axios'
// import store from '@/store'
// import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return data
}, error => {
  return Promise.reject(error)
})

const serviceHelper = (service => {
  const help = (config, type, result = {}) => Object.keys(config).reduce((result, current) => {
    if (typeof config[current] === 'string') {
      result[current] = (params) => service[type](config[current], params) 
    } else {
      result[current] = config[current]
    }
    return result
  }, result)

  const helper = config => Object.keys(config).reduce((result, type) => {
    return help(config[type], type, result)
  }, {})

  helper.get = config => help(config, 'get')

  helper.post = config => help(config, 'post')

  helper.service = service

  return helper
})(service)

const context = require.context('./', false, /^\.\/(?!index)[^/]*\.js$/)
const apis = context.keys().reduce((apis, key) => {
  const name = key.replace(/(^\.\/|\.js$)/g, '')
  const api = context(key).default
  apis[name] = api(serviceHelper)
  return apis
}, {})

export default {
  ...apis
}
