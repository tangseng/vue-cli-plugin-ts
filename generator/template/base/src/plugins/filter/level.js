export default {
  install(Vue) {
    const LEVELS = {
      1: '一级',
      2: '二级',
      3: '三级'
    }
    Vue.filter('level', (value) => {
      return LEVELS[value] || '--'
    })
  }
}