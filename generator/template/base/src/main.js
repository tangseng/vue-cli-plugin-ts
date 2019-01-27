import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './ts'
import plugins from './plugins'
import libs from './libs'
import './styles/common.pcss'

Vue.config.productionTip = false

plugins(Vue)
libs(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
