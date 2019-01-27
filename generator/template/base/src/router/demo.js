const Demo = {
  path: '/',
  name: 'demo',
  component: () => import(/* webpackChunkName: "demo" */'@/views/Demo.vue')
}

export default [
  Demo
]
