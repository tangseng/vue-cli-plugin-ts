const context = require.context('./', true, /\.js$/)

const plugins = context.keys().reduce((plugins, key) => {
  if (key !== './index.js') {
    plugins.push(context(key).default)
  }
  return plugins
}, [])

export default Vue => {
  plugins.forEach(plugin => Vue.use(plugin))
}
