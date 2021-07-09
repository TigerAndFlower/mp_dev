<template>
  <div class="">
    <!-- 编辑首页模块 -->
    <h3 class="title">定制模板内容编辑</h3>
    <!-- 编辑页面内容区 -->
    <show />
    <!-- 编辑页面右侧 -->
    <compileRight />
  </div>
</template>

<script>
import show from './show'
import compileRight from './compileRight'
export default {
  name: 'compile',
  data () {
    return {

    }
  },
  components: { show, compileRight }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.title
  font-size: 16px
  font-family: Microsoft YaHei
  font-weight: bold
  color: #00467E
  line-height: 53px
  text-align: left
</style>
