// compileList 编辑页的列表数据
const state = {
  compileList: [1, 2, 3],
  indexList: [1, 2, 3, 4, 5],
  isMask: true
}

const mutations = {
  setCompileList (state, compileList) {
    state.compileList = compileList
  },
  setIsMask (state, isMask) {
    state.isMask = isMask
  }
}

const getters = {
  compileList: state => state.compileList,
  indexList: state => state.indexList,
  isMask: state => state.isMask
}
export default {
  state,
  mutations,
  getters
}
