const context = require.context('./', false, /\.\/(?!index.js)[^/]*\.js$/)

const mixins = context.keys().reduce((result, key) => {
  const matchs = key.match(/\.\/(.*)\.js$/)
  if (!matchs) {
    return
  }
  const keyFileName = matchs[1]
  const keyName = keyFileName.substr(0, 1).toUpperCase() + keyFileName.substr(1) + 'CreaterMix'
  result[keyName] = context(key).default
  return result
}, {})

export default {
  ...mixins
}