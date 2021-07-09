<template>
  <div class="content">
    <h3 class="title">编辑内容区</h3>
    <!-- 编辑页面详情 -->
    <div class="main">
      <!-- 企业介绍 -->
      <div class="box borDE">
        <div class="intro">
          <div class="left">
            <!-- 标题跟文字 -->
            <div class="title">
              <h3>关于欧司朗光电半导体</h3>
            </div>
            <div class="text">
              <textarea name=""
                        maxlength="400"
                        placeholder="请填写企业介绍（400字内）"></textarea>
            </div>
            <p class="num">0/400</p>
          </div>
          <div class="right">
            <!-- 图片 -->
            <div class="upImgBegin.png">

            </div>
          </div>
        </div>
      </div>
      <!-- 企业介绍 -->
      <!-- 企业介绍 -->
      <!-- 企业介绍 -->
      <!-- 企业介绍 -->
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'show',
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['setCompileList'])
  },
  computed: {
    ...mapGetters(['compileList'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.main
  width: 1120px
  position: relative
  .box
    width: 1120px
    overflow: hidden
    margin-top: 20px
    // 介绍板块
    .intro
      width: 100%
      height: 400px
      display: flex
      justify-content: space-between
      &>div
        box-sizing: border-box
      .left
        width: 580px
        border-right: 1px solid #dedede
        .num
          line-height: 20px
          padding-right: 20px
          text-align: right
        .title
          height: 100px
          border-bottom: 1px solid #CCCCCC
          text-align: center
          h3
            line-height: 100px
            font-size: 30px
            font-weight: bold
            color: #00467E
        .text
          display: block
          box-sizing: border-box
          padding: 20px
          height: 280px
          width: 100%
          overflow: hidden
          textarea
            display: block
            height: 100%
            width: 100%
            font-size: 14px
            font-weight: 400
            color: #333
            line-height: 24px
      .right
        width: auto
        padding: 40px 45px
        .imgWrap
          position: relative
          width: 444px
          height: 320px
          background: #F0F0F0
          img
            position: absolute
</style>
