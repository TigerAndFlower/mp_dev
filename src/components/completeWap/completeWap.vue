<template>
  <div class="content">
    <!-- 编辑页面详情 -->
    <div class="main">
      <template v-if="imgSrc">
        <img :src="imgSrc"
             alt=""
             id="longImg"
             style="width:100%">
      </template>
      <template v-else>
        <template v-for="(item,index) in arrList">
          <div class="box"
               :key="index">
            <template v-if="item.type== 1">
              <div class="intro wrap pt2"
                   :class="{ 'boxWrap': arrList.length > index+1 }">
                <div class="left">
                  <div class="title">
                    <h3>关于{{item.interName}}</h3>
                  </div>
                  <div class="text"
                       v-if="item.interText">
                    <p v-html="item.interText.replace(/\n/g,'<br>')"></p>
                  </div>
                </div>
                <div class="right"
                     v-if="item.imgList[0] !== ''">
                  <template v-if="item.target_link">
                    <el-carousel indicator-position="none"
                                 arrow="never">
                      <template v-for="(imgItem, imgIndex) in item.imgList">
                        <el-carousel-item :key="imgIndex"
                                          v-if="imgItem !== ''">
                          <a :href="item.target_link"
                             target="_parent">
                            <img :src="imgItem">
                          </a>
                        </el-carousel-item>
                      </template>
                    </el-carousel>

                  </template>
                  <template v-else>
                    <el-carousel indicator-position="none">
                      <template v-for="(imgItem, imgIndex) in item.imgList">
                        <el-carousel-item :key="imgIndex"
                                          v-if="imgItem !== ''">
                          <img :src="imgItem">
                        </el-carousel-item>
                      </template>
                    </el-carousel>
                  </template>
                </div>
              </div>
            </template>
            <template v-if="item.type== 2">
              <div class="dynamic wrap">
                <div class="left boxWrap pt2"
                     v-if="item.dynamicList.length > 0">
                  <!-- style="width: 100%" -->
                  <!-- 企业动态 -->
                  <div class="boxTitle">
                    <img src="../../assets/images/icon/icon_title1.png"
                         alt=""
                         class="icon">
                    <h4>企业动态</h4>
                  </div>
                  <ul class="textlist">
                    <li v-for="(indynamic,indynamicIndex) in item.dynamicList"
                        :key="indynamicIndex"
                        class="ellipsis">
                      <a :href="indynamic.url"
                         target="_parent">{{indynamic.title}}</a>
                    </li>
                  </ul>
                </div>
                <div class="right pt2"
                     :class="{ 'boxWrap': arrList.length  > index+1 }"
                     v-if="item.videoList.length > 0">
                  <div class="boxTitle">
                    <img src="../../assets/images/icon/icon_title2.png"
                         alt=""
                         class="icon">
                    <h4>精彩视频</h4>
                  </div>
                  <ul class="videoList">
                    <li v-for="(video,videoIndex) in item.videoList"
                        :key="videoIndex">
                      <a :href="video.url"
                         target="_parent">
                        <div class="videoWrap">
                          <img :src="'http://mp.ofweek.com'+video.images"
                               alt=""
                               class="bgImg">
                          <img src="../../assets/images/icon/icon_play.png"
                               alt=""
                               class="icon_play">
                        </div>
                        <p class="ellipsis">{{video.title}}</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <template v-if="item.type== 3 && item.liveList.length > 0">
              <div class="pt2"
                   :class="{ 'boxWrap': arrList.length  > index+1 }">
                <div class="boxTitle">
                  <img src="../../assets/images/icon/icon_title3.png"
                       alt=""
                       class="icon">
                  <h4>直播</h4>
                </div>
                <div class="live wrap ">
                  <div class="left">
                    <!-- logoUrl  name -->
                    <div class="liveBg">
                      <img :src="item.liveList[0].coverUrl"
                           alt=""
                           class="liveImg">
                    </div>
                  </div>
                  <div class="right">
                    <h4>直播标题</h4>
                    <p>
                      <span>直播时间：</span>
                      <span class="c">{{formatDate(item.liveList[0].startTime) +'-'+  formatDate(item.liveList[0].endTime)}}</span>
                    </p>
                    <p>
                      <span>举办单位：</span>
                      <span class="c">{{item.liveList[0].company}}</span>
                    </p>
                    <p>
                      <span>直播简介：</span>
                      <span class="c">{{item.liveList[0].description}}</span>
                    </p>
                    <a :href="item.liveList[0].roomUrl"
                       target="_parent"
                       class="liveBtn"
                       :style="{background: (item.liveList[0].status === 6?'#E65E50':'linear-gradient(0deg, #2691e9, #2d84ee)')}">{{item.liveList[0].status == 1? '直播中':(item.liveList[0].status == 3? '直播预告':'直播回顾')}}</a>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="item.type== 4 && item.documentList.length > 0">
              <div class="pt2"
                   :class="{ 'boxWrap': arrList.length > index+1}">
                <div class="boxTitle">
                  <img src="../../assets/images/icon/icon_title4.png"
                       alt=""
                       class="icon">
                  <h4>文档下载</h4>
                </div>
                <div class="downLoad wrap">
                  <ul class="list">
                    <li class="on"
                        v-for="(document) in item.documentList"
                        :key="document.id">
                      <a :href="document.url"
                         target="_parent"
                         :download="document.url">
                        <p>{{document.title}}</p>
                        <button>立即下载</button>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <template v-if="item.type== 5 && item.productList.length > 0">
              <div class="pt2"
                   :class="{ 'boxWrap': arrList.length > index+1 }">
                <div class="boxTitle">
                  <img src="../../assets/images/icon/icon_title5.png"
                       alt=""
                       class="icon">
                  <h4>产品介绍</h4>
                </div>
                <div class="product wrap">
                  <ul class="list">
                    <li v-for="product in item.productList"
                        :key="product.productId">
                      <a :href="product.productUrl"
                         target="_parent">
                        <img :src="product.imageUrl"
                             alt=""
                             class="liImg">
                        <p class="ellipsis">{{product.productName}}</p>
                      </a>

                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
        </template>
      </template>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getHomePage } from '@/api'
// import '../../assets/js/rem.js'
export default {
  name: 'complete',
  data () {
    return {
      arrList: [],
      imgSrc: '',
      isType: ''
    }
  },
  mounted () {
    fnResize()
    window.onresize = function () {
      fnResize()
    }

    function fnResize () {
      document.documentElement.style.fontSize = 100 / 750 * window.innerWidth + 'px'
    }
    // 禁止双击放大
    document.documentElement.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    }, false)
    var lastTouchEnd = 0
    document.documentElement.addEventListener('touchend', function (event) {
      var now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)

    let data = {
      member_id: this.$getMemberId
    }
    getHomePage(data)
      .then((res) => {
        if (res.status === 200 && this.isJsonString(res.data)) {
          let arr = JSON.parse(res.data)
          this.arrList = this.deepClone(arr)
          this.isType = '编辑模式'
        } else {
          // 长图模式
          this.imgSrc = '//mp.ofweek.com/' + res.data
          this.isType = '长图模式'
        }
        this.$nextTick(() => {
          let callParentFn = function (data) {
            data = JSON.stringify(data)
            if (parent.window) {
              parent.window.postMessage(data, '*')
            } else {
              window.parent.postMessage(data, '*')
            }
          }
          setTimeout(() => {
            let height = document.body.clientHeight
            callParentFn({
              height: height,
              type: this.isType
            })
          }, 500)
        })
      })
  },
  methods: {

  },
  computed: {
    ...mapGetters(['compileList'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@mixin ellipsis()
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden

.main
  width: 100vw
  position: relative
  .pt2
    padding: .2rem .35rem 0
    box-sizing: border-box
  .boxWrap
    position: relative
    border-bottom: .2rem solid #eee
  .box
    position: relative
    width: 100%
    box-sizing: border-box
    .product
      ul
        width: 100%
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        li
          position: relative
          width: 3.25rem
          height: 2rem
          background: #F9F9F9
          border: 1px solid #D1D1D1
          overflow: hidden
          margin: .2rem 0
          a
            color: #000
          p
            position: absolute
            bottom: 0%
            left: 0%
            width: 100%
            line-height: .5rem
            box-sizing: border-box
            padding: 0 .2rem
            font-size: .3rem
            background-color: #fff
            border-top: 1px solid #D1D1D1
            @include ellipsis
          .liImg
            position: absolute
            top: 39%
            left: 50%
            transform: translate(-50%,-50%)
            max-height: 3rem
            max-width: 100%
    .downLoad
      ul
        width: 100%
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        li
          position: relative
          width: 3.25rem
          height: 2rem
          background: #f9f9f9
          border: 1px solid #d1d1d1
          margin: .2rem 0
          &.on
            background: url('../../assets/images/icon/icon_downLoad.png') center left #F9F9F9
            background-size: 100% 100%
            border: 0px
            p
              font-size: .25rem
              font-weight: 400
              color: #333333
              line-height: 1.6
              padding: .2rem .1rem 0 .7rem
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
              overflow: hidden
              max-height: .7ren

            button
              position: absolute
              bottom: .2rem
              right: .15rem
              width: 1.25rem
              height: .45rem
              background: linear-gradient(0deg, #1FB5F3, #1292EB)
              border-radius: 2px
              font-size: .2rem
              font-weight: 400
              color: #F9F9F9
              line-height: .45rem
              text-align: center
          .iconPdf
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%,-50%)
    .live
      .left
        border-right: 1px solid #f9f9f9
        .liveImg
          width: 100%
          // height: 2.75rem
      .right
        box-sizing: border-box
        padding: 0.25rem 0
        .liveBtn
          display: block
          width: 100%
          margin: .2rem auto
          height: .8rem
          background: linear-gradient(0deg, #1FB5F3, #1292EB)
          border-radius: 4px
          font-size: .3rem
          letter-spacing: .1rem
          font-weight: bold
          color: #FFFFFF
          line-height: .8rem
          text-align: center
        h4
          font-size: .35rem
          font-weight: bold
          color: #333333
          line-height: 1.6
        p
          font-size: .3rem
          font-weight: 400
          color: #333333
          line-height: 1.6
          margin-top: .1rem
          span
            display: inline-block
            vertical-align: top
          .c
            display: inline-block
            width: 260px
            color: #808080
    // 动态
    .dynamic
      .videoList
        width: 100%
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        li
          margin-bottom: 10px
          width: 3.25rem
          .videoWrap
            position: relative
            width: 100%
            height: 1.75rem
            background: #F0F0F0
            .bgImg
              display: block
              width: 100%
              height: 100%
            .icon_play
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%,-50%)
              width: .7rem
          p
            width: 100%
            font-size: .3rem
            font-family: Microsoft YaHei
            font-weight: 400
            color: #333333
            line-height: 1.6
            margin: .1rem 0
            @include ellipsis

      .textlist
        width: 100%
        padding-bottom: 0.3rem
        li
          display: block
          width: 100%
          background-color: #3B82BB
          box-sizing: border-box
          padding: 0 .2rem
          margin-bottom: .3rem
          a
            display: block
            width: 100%
            line-height: .8rem
            font-size: .3rem
            font-weight: 400
            color: #FFFFFF
            @include ellipsis
    // 介绍板块
    .wrap
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      width: 100%
      &>div
        box-sizing: border-box
    .intro
      padding-top: .4rem
      .left
        padding-bottom: .4rem
        .title
          text-align: center
          h3
            line-height: .75rem
            font-size: .35rem
            font-weight: bold
            color: #00467E
            position: relative
            &::before
              content: ""
              position: absolute
              bottom: 0rem
              left: 50%
              transform: translateX(-50%)
              width: 1rem
              height: 4px
              background: #00467E
        .text
          display: block
          box-sizing: border-box
          width: 100%
          overflow: hidden
          margin-top: .2rem
          font-size: .3rem
          line-height: 1.6
      .right
        width: 100%
        box-sizing: border-box
        height: 5.75rem !important
        overflow: hidden
        // padding: .2rem
        img
          width: 100%
        .imgWrap
          position: relative
          width: 6rem
          height: 4.5rem
          background: #F0F0F0
          img
            position: absolute
  .boxTitle
    width: 100%
    display: flex
    justify-content: start
    align-items: center
    img
      height: .4rem
      vertical-align: middle
      margin-right: .2rem
    h4
      font-size: .4rem
      vertical-align: middle
      font-weight: bold
      color: #333333
      line-height: 2.5
  .left,.right
    position: relative
    width: 100%
</style>
