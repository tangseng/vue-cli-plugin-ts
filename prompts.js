const { chalk } = require('@vue/cli-shared-utils')

module.exports = [
  {
    type: 'checkbox',
    name: 'tsPick',
    message: 'Pick additional ts part',
    choices: [
      {
        name: 'base',
        value: 'base',
        disabled: chalk.blue('necessary'),
        checked: true
      },
      {
        name: 'add vue-meta',
        value: 'vue-meta',
        checked: true
      },
      {
        name: 'add portal-vue',
        value: 'portal-vue',
        checked: true
      },
      {
        name: 'add v-charts',
        value: 'v-charts',
        checked: true
      }
    ]
  }
]