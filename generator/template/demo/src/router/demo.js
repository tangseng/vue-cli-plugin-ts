const Demo = {
  path: '/demo',
  name: 'demo',
  component: () => import(/* webpackChunkName: "demo" */'@/views/Demo.vue')
}

export default [
  Demo
]
