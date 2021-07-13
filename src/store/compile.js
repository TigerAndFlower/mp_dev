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
      list: [],
      liveImg: '',
      title: '',
      time: '',
      corporation: '',
      intro: ''
    },
    {
      type: 4,
      name: '文档下载',
      list: []
    },
    {
      type: 5,
      name: '产品介绍',
      list: []
    }
  ],
  indexList: [1, 2, 3, 4, 5],
  isMask: false

}

const mutations = {
  setCompileList (state, obj) {
    let { type, setName, arr } = obj
    state.compileList.forEach((item, index) => {
      if (item.type === type) {
        for (var p in item) {
          if (p === setName) {
            state.compileList[index][setName] = arr
            return
          }
        }
      }
    })
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
