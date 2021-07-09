// compileList 编辑页的列表数据
import Vue from 'vue'
const state = {
  compileList: [1, 2, 3],
  indexList: [1, 2, 3, 4, 5]
}

const mutations = {
  setCompileList (state, compileList) {
    for (let key in compileList) {
      Vue.set(state.compileList, key, compileList[key])
    }
  },
  setIndexList (state, indexList) {
    for (let key in indexList) {
      Vue.set(state.indexList, key, indexList[key])
    }
  }
}

const getters = {
  compileList: state => state.compileList.filter(todo => todo.done),
  indexList: state => state.indexList.filter(todo => todo.done)
}
export default {
  state,
  mutations,
  getters
}
