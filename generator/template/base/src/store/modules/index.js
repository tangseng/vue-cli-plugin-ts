const context = require.context('./', false, /^\.\/(?!index)[^/]*\.js$/)

const modules = context.keys().reduce((modules, key) => {
  const name = key.replace(/(^\.\/|\.js$)/g, '')
  modules[name] = context(key).default
  return modules
}, {})

export default modules
