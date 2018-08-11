import Vue from 'vue'
import Router from 'vue-router'

const context = require.context('./', false, /^\.\/(?!index)[^/]*\.js$/)
const routes = context.keys().reduce((routes, key) => {
  routes.push(...context(key).default)
  return routes
}, [])

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

router.beforeResolve((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
})

export default router
