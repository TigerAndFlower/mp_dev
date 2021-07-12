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
                 alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'show',
  data () {
    return {
      isShow: false,
      lists: [
        { type: 1, img: require('../../assets/images/compileRightList01.png'), isShow: false },
        { type: 2, img: require('../../assets/images/compileRightList02.png'), isShow: false },
        { type: 3, img: require('../../assets/images/compileRightList03.png'), isShow: false },
        { type: 4, img: require('../../assets/images/compileRightList04.png'), isShow: false },
        { type: 5, img: require('../../assets/images/compileRightList05.png'), isShow: false }
      ]
    }
  },
  methods: {
    isShowClick () {
      this.isShow = !this.isShow
    },

    addItemFunc (index) {
      this.lists[index].isShow = !this.lists[index].isShow
      console.log(this.lists)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.content
  position: fixed
  top: 60px
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
