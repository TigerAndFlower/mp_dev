// compileList 编辑页的列表数据
const state = {
  compileList: [
    // 企业介绍
    {
      type: 1,
      name: '企业介绍',
      interName: '我是谁',
      interText: '',
      imgList: [],
      target_link: ''
    },
    // 企业动态
    {
      type: 2,
      name: '企业动态',
      dynamicList: [],
      videoList: []
    },
    // live:
    {
      type: 3,
      name: '直播',
      liveList: []
    },
    {
      type: 4,
      name: '文档下载',
      documentList: []
    },
    {
      type: 5,
      name: '产品介绍',
      productList: []
    }
  ],
  isMask: false

}

const mutations = {
  setCompileList (state, obj) {
    let { type, setName, arr } = obj
    // debugger
    if (type === 'all') {
      state.compileList = arr
    } else if (type === 'item') {
      state.compileList.push(arr)
    } else {
      state.compileList.forEach((item, index) => {
        if (item.type === type) {
          for (var p in item) {
            if (p === setName) {
              // console.log(arr)
              // console.log(state.compileList[index][setName])
              // debugger
              state.compileList[index][setName] = arr
              return
            }
          }
        }
      })
    }
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
