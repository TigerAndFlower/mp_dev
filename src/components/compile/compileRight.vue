<template>
  <div class="content">
    <!-- 编辑页面右侧 -->
    <!-- 列表合起 展示icon -->
    <div v-show="!isShow"
         class="iconWrap"
         @click="isShowClick">
      <img src="../../assets/images/icon/icon_list.png"
           alt="展示列表">
    </div>
    <!-- 点击icon 展示列表 -->
    <div v-show="isShow"
         class="iconWrap">
      <img src="../../assets/images/icon/icon_close.png"
           alt="收起列表"
           class="icon_close"
           @click="isShowClick">
      <h4>添加模块</h4>
      <div class="listWrap">
        <div class="intro">
          <h5>通用模块</h5>
          <p>备注：鼠标点击模块添加到配置页面</p>
        </div>
        <div class="list">
          <div v-for="(item,index) in lists"
               :key="index"
               class="imgWrap "
               @click="addItemFunc(index)">
            <img :src="item.img"
                 alt=""
                 :title="item.title">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'show',
  data () {
    return {
      isShow: false,
      lists: [
        { type: 1, img: require('../../assets/images/compileRightList01.png'), title: '企业介绍' },
        { type: 2, img: require('../../assets/images/compileRightList02.png'), title: '企业动态' },
        { type: 3, img: require('../../assets/images/compileRightList03.png'), title: '直播' },
        { type: 4, img: require('../../assets/images/compileRightList04.png'), title: '文档下载' },
        { type: 5, img: require('../../assets/images/compileRightList05.png'), title: '产品介绍' }
      ],
      staging: []
    }
  },
  computed: {
    ...mapGetters(['compileList'])
  },
  methods: {
    ...mapMutations(['setCompileList']),
    isShowClick () {
      this.isShow = !this.isShow
    },
    addItemFunc (index) {
      if (this.staging.length === this.compileList.length) return false
      let type = this.lists[index].type
      let obj = this.staging[index]
      let flag = true
      for (let i = 0; i < this.compileList.length; i++) {
        let item = this.compileList[i]
        if (item.type === type) {
          flag = false
          break
        } else {
          flag = true
        }
      }
      if (flag) {
        let data = {
          type: 'item',
          arr: obj
        }
        this.setCompileList(data)
      }
    }
  },
  mounted () {
    this.staging = this.deepClone(this.compileList)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.content
  position: fixed
  top: 10px
  right: 20px
  background: #fff
  box-sizing: border-box
  padding: 17px
  border-radius: 2px
  box-shadow: 2px 2px 5px 2px #bfbfbf
  z-index: 111
  .iconWrap
    position: relative
    font-size: 0
    .listWrap
      width: 320px
      .list
        width: 100%
        box-sizing: border-box
        padding: 18px
        background-color: #F0F0F0
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        .imgWrap
          width: 136px
          height: 72px
          background: #FFFFFF
          border: 1px solid #CCCCCC
          position: relative
          margin-bottom: 8px
          img
            position: absolute
            top: 50%
            left: 0
            width: 100%
            transform: translateY(-50%)
      .intro
        margin: 20px 0
        font-size: 14px
        font-family: Microsoft YaHei
        line-height: 20px
        h5
          font-weight: 400
          color: #000000
          padding-bottom: 10px
        p
          font-weight: 400
          color: #3089DC

    .icon_close
      position: absolute
      right: 0px
      top: 20px
    h4
      font-size: 14px
      font-family: Microsoft YaHei
      font-weight: 400
      color: #000000
      line-height: 53px
      border-bottom: 2px solid #CCCCCC
</style>
