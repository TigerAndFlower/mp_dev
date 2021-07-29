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
          <div class="box "
               :class="{borDE: item.type == 1}"
               :key="index">
            <template v-if="item.type== 1">
              <div class="intro wrap">
                <div class="left">
                  <div class="title">
                    <h3>关于{{item.interName}}</h3>
                  </div>
                  <div class="text">
                    <p>{{item.interText}}</p>
                  </div>
                </div>
                <div class="right">
                  <template v-if="item.target_link">
                    <el-carousel indicator-position="none">
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
                <div class="left"
                     v-if="item.dynamicList.length > 0"
                     :style="{width: (item.videoList.length <= 0?'100%':'')}">
                  <!-- style="width: 100%" -->
                  <!-- 企业动态 -->
                  <div class="boxTitle">
                    <img src="../../assets/images/icon/icon_title1.png"
                         alt=""
                         class="icon">
                    <h4>企业动态</h4>
                  </div>
                  <ul class="textlist"
                      :style="{width: (item.videoList.length <= 0?'100%':'')}">
                    <li v-for="(indynamic,indynamicIndex) in item.dynamicList"
                        :key="indynamicIndex"
                        class="ellipsis">
                      <a :href="indynamic.url"
                         target="_parent"
                         rel="noopener noreferrer">{{indynamic.title}}</a>
                    </li>
                  </ul>
                </div>
                <div class="right"
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
                         target="_parent"
                         rel="noopener noreferrer">
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
              <div class="boxTitle">
                <img src="../../assets/images/icon/icon_title3.png"
                     alt=""
                     class="icon">
                <h4>直播</h4>
              </div>
              <div class="live wrap borDE">
                <div class="left">
                  <!-- logoUrl  name -->
                  <div class="liveBg">
                    <img :src="item.liveList.length > 0 && item.liveList[0].coverUrl"
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
                     class="liveBtn"
                     :style="{background: (item.liveList[0].status === 6 ? '#E65E50':'linear-gradient(0deg, #2691e9, #2d84ee)')}">{{item.liveList[0].status == 1? '直播中':(item.liveList[0].status == 3? '直播预告':'直播回顾')}}</a>
                </div>
              </div>
            </template>
            <template v-if="item.type== 4 && item.documentList.length > 0">
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
                    <a :href="document.file_url">
                      <p>{{document.title}}</p>
                      <button>立即下载</button>
                    </a>
                  </li>
                </ul>
              </div>
            </template>
            <template v-if="item.type== 5 && item.productList.length > 0">
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
export default {
  name: 'complete',
  data () {
    return {
      arrList: [],
      imgList: [],
      imgSrc: '',
      isType: ''
    }
  },
  mounted () {
    // http://mp.ofweek.com/Homepage/getHomePage?member_id=1151
    // 上移\
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
/*文本格式化，超出范围，显示省略号*/
@mixin ellipsis()
  white-space: nowrap
  text-overflow: ellipsis
  overflow: hidden

#longImg
  display: block
  max-width: 750px
  margin: 0 auto
.main
  width: 100%
  max-width: 1120px
  position: relative
  margin: 0 auto
  .box
    position: relative
    width: 1120px
    margin-top: 20px
    .product
      ul
        width: 100%
        display: flex
        justify-content: start
        flex-wrap: wrap
        li
          position: relative
          width: 350px
          height: 280px
          border: 1px solid #D1D1D1
          margin-bottom: 20px
          background: #F9F9F9
          margin-left: 30px
          &:nth-of-type(1)
            margin-left: 0px
          &:nth-of-type(4)
            margin-left: 0px
          a
            color: #000
          p
            position: absolute
            bottom: 0%
            left: 0%
            width: 100%
            line-height: 64px
            box-sizing: border-box
            padding: 0 20px
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
          width: 260px
          height: 130px
          background: #F9F9F9
          border: 1px solid #D1D1D1
          margin: 20px 10px
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
          p
            width: 195px
            font-size: 14px
            font-family: Microsoft YaHei
            font-weight: 400
            color: #333333
            line-height: 18px
            margin: 10px 0
            @include ellipsis

      .textlist
        width: 700px
        li
          display: block
          width: 100%
          background-color: #3B82BB

          box-sizing: border-box
          padding: 0 25px
          margin-bottom: 15px
          a
            display: block
            width: 100%
            line-height: 50px
            font-size: 14px
            font-weight: 400
            color: #FFFFFF
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
        .title
          height: 80px
          text-align: center
          h3
            line-height: 80px
            font-size: 30px
            font-weight: bold
            color: #00467E
        .text
          display: block
          box-sizing: border-box
          padding: 0 20px
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
