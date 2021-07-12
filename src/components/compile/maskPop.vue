<template>
  <!-- 弹窗 -->
  <div class="maskWrap"
       v-show="isMask">
    <div class="mask">
      <img src="../../assets/images/icon/icon_close.png"
           class="close"
           @click="isMaskFunc">
      <h4 class="title">精彩视频</h4>
      <p class="tips">备注：最多只能添加4个视频</p>
      <!-- 数据内容 -->
      <table>
        <thead>
          <tr>
            <td width="70"></td>
            <td width="215">封面图</td>
            <td>视频标题</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
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
  methods: {
    ...mapMutations(['setIsMask']),
    isMaskFunc: function () {
      this.setIsMask(!this.isMask)
    }
  },
  computed: {
    ...mapGetters(['isMask'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.maskWrap
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(0,0 ,0,.7)
  z-index: 111
  .mask
    position: absolute
    top: 40px
    bottom: 40px
    left: 50%
    transform: translateX(-50%)
    width: 900px
    box-sizing: border-box
    padding: 40px 50px
    background: #FCFCFC
    .close
      position: absolute
      top: 50px
      right: 50px
    .title
      font-weight: bold
      color: #000000
      line-height: 20px
    .tips
      font-size: 14px
      font-weight: 400
      color: #FF1919
      line-height: 20px
      margin: 20px 0 35px
</style>
