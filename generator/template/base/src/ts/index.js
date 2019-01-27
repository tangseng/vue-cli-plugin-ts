import Vue from 'vue'
import TS from '@tangseng/vue-x'
import initModule from '@tangseng/vue-x/util/context'
import initAxios from '@tangseng/vue-x/util/axios'
import initVuex from '@tangseng/vue-x/util/vuex'

const store = initVuex(Vue)
const source = initAxios({
  baseURL: process.env.VUE_APP_BASE_API
})

Vue.use(TS, {
  modules: initModule(require.context('./modules', true, /\.js$/)),
  source,
  store
})

export {
  source,
  store
}
