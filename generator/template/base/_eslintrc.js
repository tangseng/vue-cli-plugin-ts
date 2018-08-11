module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    'no-multi-spaces': 'off',
    'import/first': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}