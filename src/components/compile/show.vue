<template>
  <div class="content">
    <h3 class="title">编辑内容区</h3>
    <!-- 编辑页面详情 -->
    <div class="main">
      <template v-for="(item,index) in compileList">
        <div class="box "
             :class="{borDE: item.type == 1}"
             :key="index"
             v-if="isShow">
          <div class="setBox">
            <p>{{item.name}}</p>
            <i :class="index === 0?'go_top_on':'go_top'"
               @click.stop="goTop(index)"></i>
            <i :class="index === (compileList.length - 1)?'go_bottom_on':'go_bottom'"
               @click.stop="goBottom(index)"></i>
            <i class="setClose"
               @click.stop="close(index)"></i>
          </div>
          <template v-if="item.type== 1">
            <!--
              - 企业介绍
              - 关于XXX企业号名称，“XXX”从后台返回数据；
              - 企业介绍：内容从个人后台添加，字数400字内；
              - 企业图片：图片从个人后台添加，图片自动轮播也可手动点击切换，图片数量不超过3张；
              如企业在个人后台添加了跳转链接，点击图片可跳转到对应的网址。
            -->
            <div class="intro wrap">
              <div class="left">
                <!-- 标题跟文字 -->
                <div class="title">
                  <h3>关于{{item.interName}}</h3>
                </div>
                <div class="text">
                  <textarea name=""
                            maxlength="400"
                            v-model="item.interText"
                            @input="setValueLength(item.interText.length)"
                            placeholder="请填写企业介绍（400字内）"></textarea>
                </div>
                <p class="num">{{valueNum}}/400</p>
              </div>
              <div class="right">
                <!-- 图片 -->
                <div class="addElement"
                     @click="addElementFunc('企业图片',index)">去添加</div>
                <!-- <template v-if="item.target_link"> -->
                <!-- <a :href="item.target_link"
                     target="_blank"> -->

                <template>
                  <template v-if="item.imgList.length === 1 && item.imgList[0] === ''">
                    <div class="live_bg">
                    </div>
                  </template>
                  <el-carousel indicator-position="none">
                    <template v-for="(item, index) in item.imgList">
                      <el-carousel-item :key="index"
                                        v-if="item !== ''">
                        <img v-if="item"
                             :src="item">
                      </el-carousel-item>
                    </template>
                  </el-carousel>
                </template>
              </div>
            </div>
          </template>
          <template v-if="item.type== 2">
            <!--
              - 企业动态
              - 企业动态：数据由企业从个人后台添加（调该企业发布过的文章数据，让企业自己勾选），最多显示5篇文章，
              - 点击跳转到对应的文章详情页，鼠标悬停背景条给0.8的透明度；
              - 精彩视频：数据由企业从个人后台添加（调该企业发布过的视频数据），最多显示4个视频，
              - 点击跳转到对应的视频详情页播放，视频标题显示一行，超出…如果未发布过视频，则隐藏视频模块、
              - 企业动态模块自动调整宽度为1120px；
            -->
            <div class="dynamic wrap">
              <div class="left">
                <div class="addElement"
                     @click="addElementFunc('企业动态',index)">去添加</div>
                <!-- 企业动态 -->
                <div class="boxTitle">
                  <img src="../../assets/images/icon/icon_title1.png"
                       alt=""
                       class="icon">
                  <h4>企业动态</h4>
                </div>
                <ul class="textlist">
                  <template v-if="item.dynamicList.length === 0">
                    <li class="ellipsis">文章标题</li>
                    <li>文章标题</li>
                    <li>文章标题</li>
                    <li>文章标题</li>
                    <li>文章标题</li>
                  </template>
                  <template v-else>
                    <li v-for="(indynamic,indynamicIndex) in item.dynamicList"
                        :key="indynamicIndex"
                        class="ellipsis">
                      {{indynamic.title}}
                    </li>
                  </template>
                </ul>
              </div>
              <div class="right">
                <!-- 图片 -->
                <div class="addElement"
                     @click="addElementFunc('精彩视频',index)">去添加</div>
                <div class="boxTitle">
                  <img src="../../assets/images/icon/icon_title2.png"
                       alt=""
                       class="icon">
                  <h4>精彩视频</h4>
                </div>
                <ul class="videoList">
                  <template v-if="item.videoList.length === 0">
                    <li v-for="video in 4"
                        :key="video">
                      <div class="videoWrap">
                        <img src=""
                             alt="">
                        <img src="../../assets/images/icon/icon_play.png"
                             alt=""
                             class="icon_play">
                      </div>
                      <p>视频标题</p>
                    </li>
                  </template>
                  <template v-else>
                    <li v-for="(video,videoIndex) in item.videoList"
                        :key="videoIndex">
                      <div class="videoWrap">
                        <img :src="'http://mp.ofweek.com'+video.images"
                             alt=""
                             class="bgImg">
                        <img src="../../assets/images/icon/icon_play.png"
                             alt=""
                             class="icon_play">
                      </div>
                      <p class="ellipsis">{{video.title}}</p>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </template>
          <template v-if="item.type== 3">
            <!--
              - 直播
              - 数据由企业从个人后台添加，新直播系统提供接口（显示封面图、活动名称、直播时间、举办单位、直播简介）
              - 直播状态分为三种：
              - 1、直播中，按钮颜色为：#ed3f40，点击进入直播页面观看直播；
              - 2、直播预告，点击按钮去预约；
              - 3、直播回顾，点击进入直播页面看回顾视频。
            -->
            <div class="addElement"
                 @click="addElementFunc('直播',index)">去添加</div>
            <div class="boxTitle">
              <img src="../../assets/images/icon/icon_title3.png"
                   alt=""
                   class="icon">
              <h4>直播</h4>
            </div>
            <div class="live wrap borDE">
              <div class="left">
                <!-- logoUrl  name -->
                <div class="liveBg"
                     v-if="item.liveList.length > 0 ">
                  <img :src="item.liveList[0].coverUrl"
                       alt=""
                       class="liveImg">
                </div>
                <div class="liveBg"
                     v-else>
                  <img src="../../assets/images/icon/icon_img.png"
                       alt=""
                       class="liveImg"
                       style="width: 200px;height:150px">
                </div>
              </div>
              <div class="right">
                <h4>直播标题</h4>
                <p>
                  <span>直播时间：</span>
                  <span class="c">{{item.liveList.length > 0 ?  (formatDate(item.liveList[0].startTime)) +'-'+  (formatDate(item.liveList[0].endTime)) : ''}}</span>
                </p>
                <p>
                  <span>举办单位：</span>
                  <span class="c">{{item.liveList.length > 0 ? item.liveList[0].company : ''}}</span>
                </p>
                <p>
                  <span>直播简介：</span>
                  <span class="c">{{item.liveList.length > 0 ? item.liveList[0].description : ''}}</span>
                </p>
                <a :href="item.liveList[0].roomUrl"
                   v-if="item.liveList.length > 0"
                   class="liveBtn"
                   :style="{background: (item.liveList[0].status === 6?'#E65E50':'linear-gradient(0deg, #2691e9, #2d84ee)')}">{{item.liveList[0].status == 1? '直播中':(item.liveList[0].status == 3? '直播预告':'直播回顾')}}</a>
              </div>
            </div>
          </template>
          <template v-if="item.type== 4">
            <!--
              - 文档下载
              - 数据由企业从个人后台添加（调该企业发布过的文档数据），文库提供接口，
              - 前端显示数量不得超过4个，点击“立即下载”跳转到文库详情页下载，文档标题不超过2行；
              - 如果模块无内容，前端生成页面自动隐藏该模块。
            -->
            <div class="addElement"
                 @click="addElementFunc('文档下载',index)">去添加</div>
            <div class="boxTitle">
              <img src="../../assets/images/icon/icon_title4.png"
                   alt=""
                   class="icon">
              <h4>文档下载</h4>
            </div>
            <div class="downLoad wrap">
              <ul class="list">
                <template v-if="item.documentList.length > 0">
                  <li class="on"
                      v-for="(document) in item.documentList"
                      :key="document.id">
                    <p>{{document.title}}</p>
                    <button>立即下载</button>
                  </li>
                </template>
                <template v-else>
                  <li v-for="(document) in 4"
                      :key="document">
                    <img src="../../assets/images/icon/icon_pdf.png"
                         alt=""
                         class="iconPdf">
                  </li>
                </template>
              </ul>
            </div>
          </template>
          <template v-if="item.type== 5">
            <!--
              - 产品介绍
              - 数据由企业从个人后台添加，新直播系统提供接口（该企业的主播号发布的产品），
              - 前端显示数量不得超过6个，点击产品图或标题可跳转到新直播系统对应的产品详情页
              - 内容数和粉丝数跟现网保持一致。
            -->
            <div class="addElement"
                 @click="addElementFunc('产品介绍',index)">去添加</div>
            <div class="boxTitle">
              <img src="../../assets/images/icon/icon_title5.png"
                   alt=""
                   class="icon">
              <h4>产品介绍</h4>
            </div>
            <div class="product wrap">
              <ul class="list">
                <template v-if="item.productList.length > 0">
                  <li v-for="product in item.productList"
                      :key="product.productId">
                    <img :src="product.imageUrl"
                         alt=""
                         class="liImg">
                    <p class="ellipsis">{{product.productName}}</p>
                  </li>
                </template>
                <template v-else>
                  <li v-for="product in 6"
                      :key="product">
                    <img src="../../assets/images/icon/icon_img.png"
                         alt=""
                         class="liImg">
                    <p class="ellipsis">产品标题</p>
                  </li>
                </template>
              </ul>
            </div>
          </template>
        </div>
      </template>
      <div class="box">
        <el-row>
          <el-button type="primary"
                     @click="submitFunc">提交</el-button>
          <el-button @click="previewFunc">预览</el-button>
        </el-row>
      </div>
    </div>
    <!-- 弹窗 -->
    <maskPop v-if="isMask"
             :isType="isType"
             :ind="ind"
             :key="isType" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { saveHomePage, getHomePage } from '@/api'
import maskPop from './maskPop'
export default {
  name: 'show',
  data () {
    return {
      isType: '',
      ind: 0,
      isShow: true,
      valueNum: 0,
      introTitle: ''
    }
  },
  mounted () {
    let data = {
      // member_id: this.$getMemberId
      member_id: this.$getMemberId
    }
    getHomePage(data)
      .then((res) => {
        if (res.status === 200 && this.isJsonString(res.data)) {
          let arr = JSON.parse(res.data)
          // compileList加入关于XXX  $public_name
          arr.forEach((item, index) => {
            if (item.type === 1) {
              this.setValueLength(item.interText.length)
              arr[index].interName = this.$public_name
            }
          })
          let typeData = {
            type: 'all',
            arr: this.deepClone(arr)
          }
          this.setCompileList(typeData)
        } else {
          // 页面进来没数据，以前没填过或者是长图模式
          // compileList加入关于XXX  $public_name
          var obj = this.compileList[0]
          obj.interName = this.$public_name
          let typeData = {
            type: 1,
            arr: this.deepClone(obj)
          }
          this.setCompileList(typeData)
        }
      })
  },
  methods: {
    ...mapMutations(['setCompileList', 'setIsMask']),
    setValueLength (num) {
      this.valueNum = num
    },
    previewFunc () {
      // 预览不发送请求，更新vuex 跳转路由preview  存入locastore
      // this.compileList
      window.localStorage.setItem('compileList', JSON.stringify(this.compileList))
      let newUrl = this.$router.resolve({
        path: '/preview'
      })
      window.open(newUrl.href, '_blank')
    },
    submitFunc () {
      // 提交发送请求，保存vuex中的数组compileList
      let data = {
        member_id: this.$getMemberId,
        compileList: JSON.stringify(this.compileList)
      }
      saveHomePage(data)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })
            setTimeout(() => {
              location.reload()
            }, 1000)
          } else {
            this.$message.error(res.info)
          }
        })
        .catch((err) => {
          this.$message.error(err.info)
        })
    },
    upDom: function () {
      this.isShow = false
      setTimeout(() => {
        this.$nextTick(() => {
          this.isShow = true
        })
      }, 0)
    },
    addElementFunc: function (type, index) {
      this.isType = type
      this.ind = index
      this.setIsMask(!this.isMask)
    },
    toSite: function (i, type) {
      let index
      let arr = this.compileList
      if (type === 'close') {
        arr.splice(i, 1)
        let typeData = {
          type: 'all',
          arr: this.deepClone(arr)
        }
        this.setCompileList(typeData)
      } else {
        if (type === 'left') {
          index = i - 1
          if (i === 0) {
            this.$message({
              showClose: true,
              message: '已经是第一个了'
            })
            return false
          }
        } else if (type === 'right') {
          index = i + 1
          if (i === this.compileList.length - 1) {
            this.$message({
              showClose: true,
              message: '已经是最后一个了'
            })
            return false
          }
        }
        var tmp = arr[index]
        arr[index] = arr[i]
        arr[i] = tmp
        let typeData = {
          type: 'all',
          arr: this.deepClone(arr)
        }
        this.setCompileList(typeData)
        // this.$forceUpdate()
      }
    },
    goTop: function (i) {
      this.toSite(i, 'left')
    },
    goBottom: function (i) {
      this.toSite(i, 'right')
    },
    close: function (i) {
      this.toSite(i, 'close')
    }
  },
  components: { maskPop },
  computed: {
    ...mapGetters(['compileList', 'isMask'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@mixin ellipsis()
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden

.content
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  width: auto
  background: #fff
  position: absolute
  top: 35px
  left: 0%
  padding: 32px 100px
  padding-left: 0
  overflow: hidden
  overflow-y: auto
  -ms-overflow-style: none
  overflow: -moz-scrollbars-none
  h3
    font-size: 16px

  &::-webkit-scrollbar
    display: none

.main
  width: 1120px
  position: relative
  .el-row
    text-align: center
  .el-but button
    width: 90px
  .addElement
    position: absolute
    right: 0
    top: 10px
    width: 60px
    height: 30px
    background: #000000
    text-align: center
    font-size: 14px
    font-weight: 400
    color: #FFFFFF
    line-height: 30px
    cursor: pointer
  @media screen and (max-width: 1500px)
    .box
      width: 1020px !important
  .box
    position: relative
    width: 1120px
    margin-top: 20px
    .setBox
      position: absolute
      right: -50px
      top: 50%
      transform: translateY(-50%)
      background: #FFFFFF
      border-radius: 16px
      border: 1px solid #efefef
      padding: 12px 4px
      i
        display: block
        margin: 10px auto
        width: 12px
        height: 14px
      .go_top
        background: url(../../assets/images/icon/icon_up.png) no-repeat center
        background-size: contain
      .go_bottom
        background: url(../../assets/images/icon/icon_down.png) no-repeat center
        background-size: contain
      .go_top_on
        background: url(../../assets/images/icon/icon_up_on.png) no-repeat center
        background-size: contain
      .go_bottom_on
        background: url(../../assets/images/icon/icon_down_on.png) no-repeat center
        background-size: contain
      .setClose
        background: url(../../assets/images/icon/icon_recycle.png) no-repeat center
        background-size: contain
      p
        font-size: 14px
        font-weight: 400
        color: #ACACAC
        line-height: 24px
        -webkit-writing-mode: vertical-rl
        -ms-writing-mode: bt-rl
        writing-mode: vertical-rl
        text-align: center
        letter-spacing: 4px
    .product
      ul
        width: 100%
        display: flex
        justify-content: start
        flex-wrap: wrap
        li
          position: relative
          width: 31%
          height: 280px
          border: 1px solid #D1D1D1
          margin-bottom: 20px
          background: #F9F9F9
          margin-left: 30px
          &:nth-of-type(1)
            margin-left: 0px
          &:nth-of-type(4)
            margin-left: 0px
          p
            position: absolute
            bottom: 0%
            left: 0%
            width: 100%
            line-height: 64px
            box-sizing: border-box
            padding: 0 20px
            font-size: 14px
            background-color: #fff
            border-top: 1px solid #D1D1D1
            @include ellipsis
          .liImg
            position: absolute
            top: 39%
            left: 50%
            transform: translate(-50%,-50%)
            max-height: 210px
            max-width: 100%
    .downLoad
      ul
        width: 100%
        display: flex
        justify-content: start
        flex-wrap: wrap
        li
          position: relative
          width: 23%
          height: 130px
          background: #F9F9F9
          border: 1px solid #D1D1D1
          margin: 0px 10px
          &.on
            background: url('../../assets/images/icon/icon_downLoad.png') center left #F9F9F9
            background-size: 100% 100%
            border: 0px
            p
              font-size: 14px
              font-weight: 400
              color: #333333
              line-height: 18px
              padding: 20px 20px 0 60px
            button
              position: absolute
              bottom: 10px
              right: 15px
              width: 74px
              height: 32px
              background: linear-gradient(0deg, #1FB5F3, #1292EB)
              border-radius: 2px
              font-size: 14px
              font-weight: 400
              color: #F9F9F9
              line-height: 32px
              text-align: center
          &:first-of-type
            margin-left: 0
          .iconPdf
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%,-50%)
    .live
      background: #F9F9F9
      height: 390px
      .left
        border-right: 1px solid #dedede
        width: 700px
        .liveImg
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%,-50%)
          width: 100%
          height: 100%
      .right
        width: 420px
        box-sizing: border-box
        padding: 35px
        .liveBtn
          width: 120px
          height: 34px
          line-height: 34px
          background: linear-gradient(0deg, #2691e9, #2d84ee)
          border-radius: 4px
          font-size: 16px
          font-family: PingFang SC
          font-weight: bold
          color: #FFFFFF
          position: absolute
          bottom: 18px
          right: 135px
          text-align: center
        h4
          font-size: 18px
          font-weight: bold
          color: #333333
          line-height: 30px
        p
          font-size: 14px
          font-weight: 400
          color: #333333
          line-height: 24px
          margin-top: 10px
          span
            display: inline-block
            vertical-align: top
          .c
            display: inline-block
            width: 260px
    // 动态
    .dynamic
      .videoList
        width: 400px
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        li
          margin-bottom: 10px
          .videoWrap
            position: relative
            width: 195px
            height: 115px
            box-sizing: border-box
            border: 1px solid #bebebe
            background: #F0F0F0
            .bgImg
              display: block
              width: 100%
              height: 100%
            .icon_play
              position: absolute
              top: 50%
              left: 50%
              width: 32px
              transform: translate(-50%,-50%)
          p
            width: 195px
            font-size: 14px
            font-family: Microsoft YaHei
            font-weight: 400
            color: #333333
            line-height: 18px
            margin: 10px 0
            @include ellipsis
      @media screen and (max-width: 1500px)
        .textlist
          width: 590px !important
      .textlist
        width: 640px
        li
          display: block
          width: 100%
          background-color: #3B82BB
          line-height: 50px
          font-size: 14px
          font-weight: 400
          color: #FFFFFF
          box-sizing: border-box
          padding: 0 25px
          margin-bottom: 15px
          @include ellipsis
    // 介绍板块
    .wrap
      display: flex
      justify-content: space-between
      width: 100%
      &>div
        box-sizing: border-box
    .intro
      .left
        width: 580px
        border-right: 1px solid #dedede
        .num
          line-height: 20px
          padding-right: 20px
          text-align: right
          font-size: 14px
        .title
          height: 100px
          border-bottom: 1px solid #CCCCCC
          text-align: center
          h3
            line-height: 100px
            font-size: 30px
            font-weight: bold
            color: #00467E
            width: 100%
            white-space: nowrap
            @include ellipsis
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
        width: 540px
        padding: 40px 45px
        .live_bg
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%,-50%)
          z-index: 111
          width: 444px
          height: 320px
          background: url('../../assets/images/live_bg.png') no-repeat center
        .imgWrap
          position: relative
          width: 444px
          height: 320px
          background: #F0F0F0
          img
            position: absolute
  .boxTitle
    width: 100%
    display: flex
    justify-content: start
    align-items: center
    img
      width: 25px
      height: 25px
      margin-right: 10px
    h4
      font-size: 16px
      font-weight: bold
      color: #333333
      line-height: 53px
  .left,.right
    position: relative
</style>
