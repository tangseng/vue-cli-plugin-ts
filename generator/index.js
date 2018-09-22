const fs = require('fs-extra')

module.exports = (api, { tsPick = [] }) => {
  const selectVueMeta = tsPick.includes('vue-meta')
  const selectPortalVue = tsPick.includes('portal-vue')
  const selectVCharts = tsPick.includes('v-charts')
  const selectDemo = tsPick.includes('demo')

  ;[
    'src/router.js',
    'src/store.js',
    'src/views/About.vue',
    'src/views/Home.vue',
    'src/components/HelloWorld.vue',
    'tests/unit/HelloWorld.spec.js'
  ].forEach(file => {
    const filePath = api.resolve(file)
    if (fs.existsSync(filePath)) {
      fs.remove(filePath)
    }
  })

  api.extendPackage({
    dependencies: {
      ...(selectVueMeta ? {'vue-meta': '^1.5.2'} : {}),
      ...(selectPortalVue ? {'portal-vue': '^1.3.0'} : {}),
      ...(selectVCharts ? {'v-charts': '^1.17.9', 'echarts': '^4.1.0'} : {}),
      'axios': '^0.18.0',
      'vue-router': '^3.0.1',
      'vuex': '^3.0.1'
    },
    devDependencies: {
      'postcss-import': '^12.0.0',
      'postcss-preset-env': '^5.3.0',
      'postcss-url': '^7.3.2'
    }
  })

  api.render('./template/base')
  selectVueMeta && api.render('./template/vue-meta')
  selectPortalVue && api.render('./template/portal-vue')
  selectVCharts && api.render('./template/v-charts')
  selectDemo && api.render('./template/demo')

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