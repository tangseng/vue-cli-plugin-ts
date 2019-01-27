const fs = require('fs-extra')

module.exports = (api, { tsPick = [] }) => {
  const selectVueMeta = tsPick.includes('vue-meta')
  const selectPortalVue = tsPick.includes('portal-vue')
  const selectVCharts = tsPick.includes('v-charts')

  api.extendPackage({
    dependencies: {
      ...(selectVueMeta ? {'vue-meta': '^1.5.8'} : {}),
      ...(selectPortalVue ? {'portal-vue': '^1.5.1'} : {}),
      ...(selectVCharts ? {'v-charts': '^1.19.0', 'echarts': '^4.1.0'} : {}),
      '@tangseng/vue-x': '1.0.2',
      'axios': '^0.18.0',
      'vue-router': '^3.0.2',
      'vuex': '^3.1.0'
    },
    devDependencies: {
      'postcss-import': '^12.0.1',
      'postcss-preset-env': '^6.5.0',
      'postcss-url': '^8.0.0'
    }
  })

  api.render('./template/base')
  selectVueMeta && api.render('./template/vue-meta')
  selectPortalVue && api.render('./template/portal-vue')
  selectVCharts && api.render('./template/v-charts')

  api.render(files => {
    let config = {
      baseUrl: '/',
      devServer: {
        port: 8025,
        proxy: {
          '/api': {
            target: '这边请填写mock接口服务地址，不然启动本地服务时候会报错(错误有关键字：upgrade)',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          }
        }
      }
    }
    const configPath = api.resolve('src/vue.config.js')
    if (fs.existsSync(configPath)) {
      Object.assign(config, require(configPath))
    }
    files['vue.config.js'] = api.genJSConfig(config)
  })

  api.postProcessFiles(() => {

  })

  api.onCreateComplete(() => {

  })
}