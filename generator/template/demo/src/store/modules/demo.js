import { mutationHelper, actionHelper } from '../helper'
const actionCreater = actionHelper('demo')

export default {
  namespaced: true,

  state: {
    demo: ''
  },

  mutations: {
    xxx: mutationHelper('xxx'),
    demo: mutationHelper('demo')
  },

  actions: {
    xxx: actionCreater('xxx'),
    demo: actionCreater('demo', ({ commit }, result) => commit('demo', result)) 
  }
}