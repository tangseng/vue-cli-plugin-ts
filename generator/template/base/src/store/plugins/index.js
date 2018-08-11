const context = require.context('./', false, /^\.\/(?!index)[^/]*\.js$/)

const plugins = context.keys().map(key => {
  return context(key).default
})

export default plugins
