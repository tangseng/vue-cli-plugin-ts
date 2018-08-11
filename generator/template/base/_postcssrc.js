const path = require('path')

const getPath = (p = '') => {
  return path.join(__dirname, 'src', p.substr(1))
}

module.exports = {
  plugins: {
    "postcss-import": {
      resolve(id) {
        return id.indexOf('@') === 0 ? getPath(id) : id
      }
    },
    "postcss-url": {
      url({ url = '' }, info) {
        return url.indexOf('@') !== 0 ? url : path.relative(info.file, getPath(url)).replace(/\\/g, '\/')
      }
    },
    "postcss-preset-env": {
      stage: 3,
      features: {
        'nesting-rules': true
      },
      autoprefixer: {}
    }
  }
}