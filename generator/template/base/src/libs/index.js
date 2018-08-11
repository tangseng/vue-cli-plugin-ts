const context = require.context('./', true, /index\.js$/)

const libs = context.keys().reduce((libs, key) => {
  if (key !== './index.js' && !key.includes('.delete')) {
    libs.push(context(key).default)
  }
  return libs
}, [])

export default Vue => {
  libs.forEach(lib => lib(Vue))
}
