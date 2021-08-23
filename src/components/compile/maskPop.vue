<template>
  <!-- 弹窗 -->
  <div class="maskWrap">
    <div class="masks">
      <img src="../../assets/images/icon/icon_close.png"
           class="maskClose"
           @click="isMaskFunc">
      <h4 class="title"
          v-html="isType"></h4>
      <p class="tips"
         v-html="tips"></p>
      <!-- 数据内容 -->
      <div class="wrap">
        <div class="upImgWrap"
             v-if="isType === '企业图片'">
          <!-- 上传图片 -->
          <div class="upImgView">
            <span><i>*</i>上传图片:</span>
            <ul>
              <li @click="setImgFunc(index)"
                  v-for="(item,index) in upImgList"
                  :key="index">
                <ImgCutter ref="imgCutterModal"
                           :cross-origin="true"
                           :is-modal="true"
                           :show-choose-btn="true"
                           :lock-scroll="true"
                           :box-width="600"
                           :box-height="400"
                           :cut-width="444"
                           :cut-height="320"
                           :size-change="true"
                           :move-able="true"
                           @cutDown="xztpCutDown">
                  <el-button slot="open"
                             type="primary">
                    <img src="../../assets/images/icon/icon_upImg.png"
                         alt=""
                         v-if="!item">
                    <img v-else
                         :src="item"
                         alt="">
                  </el-button>
                </ImgCutter>
              </li>
            </ul>
          </div>
          <div class="upImgView">
            <span>跳转链接:</span>
            <input type="text"
                   v-model="target_link">
          </div>
        </div>
        <table v-else
               class="infinite-list"
               v-infinite-scroll="load"
               infinite-scroll-disabled="disabled"
               style="overflow:auto"
               width="780"
               border="0"
               cellspacing="0"
               cellpadding="0"
               align="center">
          <thead>
            <tr>
              <td width="50"></td>
              <td width="215"
                  v-show="tableImgName"
                  v-html="tableImgName"></td>
              <td width="500"
                  v-html="tableName"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in itemModule"
                :key="index">
              <td class="infinite-list-item">
                <template>
                  <el-checkbox v-model="item.isChecked"
                               @change="addItemFunc(item)"></el-checkbox>
                </template>
              </td>
              <td class="infinite-list-item"
                  v-show="isType === '精彩视频' || isType === '直播' || isType === '产品介绍'">
                <img :src="isType === '产品介绍'?item.imageUrl:(isType === '直播'?item.coverUrl:('http://mp.ofweek.com'+ item.images))"
                     alt="">
              </td>
              <td class="
                     infinite-list-item">
                {{isType === '产品介绍'?item.productName:(isType === '直播'?item.name:item.title)}}
              </td>
            </tr>
            <tr>
              <td style="border: 0px"></td>
              <td style="border: 0px;text-align: center"
                  :colspan="2">
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 提交 -->
      <el-button type="primary"
                 @click="subList()">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getPageVideoList, getPageNewsList, findLiveRoomListByid, getProductList, documentList, upload } from '@/api'
import ImgCutter from 'vue-img-cutter'
// import axios from 'axios'
export default {
  name: 'show',
  data () {
    return {
      title: '',
      tableName: '',
      tableImgName: '',
      tips: '',
      page: 1,
      page_size: 15,
      itemModule: [],
      itemArr: [],
      itemIdArr: [],
      loading: false,
      noMoreStart: true,
      upImgList: [],
      imgIndex: 0,
      target_link: ''
    }
  },
  props: {
    isType: {
      type: String,
      required: false,
      default: () => true
    },
    ind: {
      type: Number,
      required: false,
      default: () => true
    }
  },
  components: {
    ImgCutter
  },
  computed: {
    ...mapGetters(['isMask', 'compileList']),
    noMore () {
      return !this.noMoreStart
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    ...mapMutations(['setIsMask', 'setCompileList']),
    isMaskFunc: function () {
      this.setIsMask(!this.isMask)
    },
    setImgFunc (index) {
      this.imgIndex = index
    },
    // 上传图片
    xztpCutDown (files) {
      let obj = { images: files.dataURL }

      upload(obj)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              message: res.info,
              type: 'success'
            })
            let newImg = `https://mp.ofweek.com${res.data}`
            if (this.imgIndex <= 3) {
              if (this.upImgList.length === 3) {
                this.$set(this.upImgList, this.imgIndex, newImg)
                // debugger
              } else {
                this.$set(this.upImgList, this.imgIndex, newImg)
                this.upImgList.push('')
                // debugger
              }
            }
          } else {
            this.$message({
              message: res.info,
              type: 'error'
            })
          }
        })
        .catch((err) => {
          this.$message({
            message: err.info,
            type: 'error'
          })
        })
      // const imgData = new FormData()
      // imgData.append('file', files.file)
      // axios.post('/api/home/news/ajax_upload_img', imgData, { headers: { 'Content-Type': 'multipart/form-data' } })
      //   .then((res) => {
      //     if (res.status === 200) {
      //       this.$message({
      //         message: res.info,
      //         type: 'error'
      //       })
      //     } else {
      //       this.$message({
      //         message: res.info,
      //         type: 'error'
      //       })
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message({
      //       message: err.info,
      //       type: 'error'
      //     })
      //   })
    },
    setMaskText: function (tips, name, imgName) {
      this.tips = tips
      this.tableName = name
      this.tableImgName = imgName
    },
    subList: function (item) {
      let data = { arr: this.deepClone(this.itemArr) }
      switch (this.isType) {
        case '企业图片':
          for (let i = 0; i < this.compileList.length; i++) {
            let item = this.compileList[i]
            if (item.type === 1) {
              let obj = item
              obj.imgList = this.deepClone(this.upImgList)
              // debugger
              obj.target_link = this.target_link
              data.arr = this.deepClone(obj)
              data.type = 1
              data.setName = 'imgList'
              break
            }
          }
          // debugger
          // console.log(data)
          this.setCompileList(data)
          // console.log(this.compileList)
          // debugger
          break
        case '企业动态':
          data.type = 2
          data.setName = 'dynamicList'
          // debugger
          this.setCompileList(data)
          break
        case '精彩视频':
          data.type = 2
          data.setName = 'videoList'
          // debugger
          this.setCompileList(data)
          break
        case '直播':
          data.type = 3
          data.setName = 'liveList'
          // debugger
          this.setCompileList(data)
          break
        case '文档下载':
          data.type = 4
          data.setName = 'documentList'
          // debugger
          this.setCompileList(data)
          break
        case '产品介绍':
          data.type = 5
          data.setName = 'productList'
          // debugger
          this.setCompileList(data)
          break
        default:
          break
      }
      // this.$parent.upDom()
      this.setIsMask(!this.isMask)
    },
    addItemFunc: function (item) {
      let id = item.id || item.roomId || item.productId
      let index = this.itemIdArr.indexOf(id)
      let maxLength, message
      switch (this.isType) {
        case '企业动态':
          maxLength = 5
          message = `最多显示${maxLength}篇文章`
          break
        case '精彩视频':
          maxLength = 4
          message = `最多显示${maxLength}个视频`
          break
        case '直播':
          maxLength = 1
          message = `最多显示${maxLength}个直播`
          break
        case '文档下载':
          maxLength = 4
          message = `前端显示数量不得超过${maxLength}个`
          break
        case '产品介绍':
          maxLength = 6
          message = `前端显示数量不得超过${maxLength}个`
          break
        default:
          break
      }
      if (index === -1) {
        // 不存在,则添加
        // debugger
        if (this.itemIdArr.length >= maxLength) {
          this.$message({
            showClose: true,
            message: message
          })
          item.isChecked = false
        } else {
          this.itemIdArr.push(id)
          this.itemArr.push(item)
        }
      } else {
        // 存在,则删除
        this.itemIdArr.splice(index, 1)
        this.itemArr.splice(index, 1)
      }
    },
    load () {
      this.loading = true
      let data = {
        page: this.page,
        page_size: this.page_size,
        member_id: this.$getMemberId
      }
      switch (this.isType) {
        case '企业动态':
          this.setMaskText('备注：最多只能添加5篇文章', '文章标题')
          this.getMessage(getPageNewsList, data, 'dynamicList')
          break
        case '精彩视频':
          this.setMaskText('备注：最多只能添加4个视频', '视频标题', '封面图')
          this.getMessage(getPageVideoList, data, 'videoList')
          break
        case '直播':
          this.setMaskText('备注：最多只能添加1个直播', '活动名称', '封面图')
          data = { account: this.$getAccount }
          // data = { account: 'P14cd2a1d17fc7d011d67809d4c756153' }
          this.getMessage(findLiveRoomListByid, data, 'liveList')
          break
        case '文档下载':
          this.setMaskText('备注：最多只能添加4个文档', '文档标题')
          data = { username: this.$getAccount } // 没数据
          // data = { username: 'Pa8db91c3faca302fcd9d854891542cf9' }
          this.getMessage(documentList, data, 'documentList')
          break
        case '产品介绍':
          this.setMaskText('备注：最多只能添加6个产品', '产品标题', '产品图')
          data = { account: this.$getAccount }
          // data = { account: 'P14cd2a1d17fc7d011d67809d4c756153' }
          this.getMessage(getProductList, data, 'productList')
          break
        default:
          break
      }
    },
    getMessage: function (axiosName, obj, arrName) {
      // 第一个参数为接口名，第二个参数为需要被遍历被选中的数组名
      // debugger

      let objData
      this.compileList.forEach(item => {
        if (arrName in item) {
          objData = item[arrName]
        }
      })
      let that = this

      return new Promise((resolve, reject) => {
        this.page++
        // debugger
        axiosName(obj)
          .then((res) => {
            let obj
            if (arrName === 'liveList' || arrName === 'productList') {
              obj = res.data
            } else if (arrName === 'documentList') {
              obj = res
            } else {
              obj = res.data.list
            }
            if ((Array.isArray(res)) || res.status === 200 || res.code === 0) {
              if (obj.length > 0) {
                if (arrName === 'liveList' || arrName === 'productList' || arrName === 'documentList') {
                  // 这俩货不分页，下次请求还有一模一样的数据，所以发一次直接禁了
                  this.noMoreStart = false
                }
                this.loading = false
                // 遍历修改数据格式然后插入
                // 找出需要遍历对象
                obj.forEach((item, index) => {
                  // 获取当前id
                  // console.log(item)
                  // debugger
                  let id = arrName === 'liveList' ? item.roomId : (arrName === 'productList' ? item.productId : item.id)
                  // 找出当前比对的板块
                  if (objData.length > 0) {
                    for (let i = 0; i < objData.length; i++) {
                      let objId = arrName === 'liveList' ? objData[i].roomId : (arrName === 'productList' ? objData[i].productId : objData[i].id)
                      if (objId === id) {
                        item.isChecked = true
                        // debugger
                        that.itemArr.push(objData[i])
                        // debugger
                        that.itemIdArr.push(objId)
                        break
                      } else {
                        item.isChecked = false
                      }
                    }
                    // debugger
                    this.itemModule.push(item)
                  } else {
                    item.isChecked = false
                    this.itemModule.push(item)
                  }
                })
              } else {
                this.count = false
                this.loading = false
                this.noMoreStart = false
                this.$message({
                  showClose: true,
                  message: '已加载全部'
                })
              }
              // this.itemModule = this.itemModule.concat(this.deepClone(obj))
            } else {
              this.noMoreStart = false
              this.loading = false
              this.$message({
                showClose: true,
                message: '已加载全部'
              })
            }
          })
          .catch(() => {
            this.noMoreStart = false
            this.loading = false
            this.$message({
              showClose: true,
              message: '已加载全部'
            })
          })
      })
    },
    upImgFunc (index) {
      // 上传图片

    },
    getUploadImg () {
      // 上传图片

    }
  },
  mounted () {
    // debugger
    if (this.isType === '企业图片') {
      this.setMaskText('备注：建议图片尺寸444 * 320px，图片格式支持jpg、png。图片数量不超过3张')
      // 获取全局的上传的图片
      this.compileList.forEach(item => {
        if (item.type === 1) {
          this.upImgList = item.imgList.length > 0 ? this.deepClone(item.imgList) : ['']
          this.target_link = item.target_link
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
// @mixin sm_masks()
//   .masks
//     transform: translate(-50%,-50%) scale(.7) !important
.maskWrap
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100%
  background-color: rgba(0,0 ,0,.7)
  z-index: 111
  .el-button
    display: block
    margin: 20px auto
  // .el-checkbox__inner
  //   width: 20px
  //   height: 20px
  //   border: 1px solid #ccc

  @media screen and (max-width: 1500px)
    .masks
      transform: translate(-50%,-50%) scale(.6) !important

  .masks
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)
    width: 960px
    height: 750px
    overflow: hidden
    background: #FCFCFC
    box-sizing: border-box
    padding: 40px 50px
    .maskClose
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
  .wrap
    width: 100%
    height: 530px
    overflow: auto
    .upImgWrap
      width: 100%
      .upImgView
        span
          display: inline-block
          width: 80px
          margin-right: 20px
          text-align: right
          font-size: 14px
          color: #808080
          line-height: 40px
          vertical-align: top
          i
            color: #FF1919
        ul
          display: inline-block
          margin-bottom: 40px
          width: 660px
          white-space: nowrap
          overflow: hidden
          li
            position: relative
            display: inline-block
            width: 200px
            height: 144px
            border-radius: 2px
            margin-right: 20px

            .closeImg
              position: absolute
              right: 10px
              top: 10px
              width: 12px
              height: 15px
              background: url(../../assets/images/icon/icon_recycle.png) no-repeat center
            .el-button--primary
              background-color:
              display: block
              width: 200px
              height: 144px
              margin: 0px
              padding: 0
              border: 0px
              background-color: rgba(220,38,38,0)
            img
              display: block
              width: 100%
              height: 100%
        input
          width: 500px
          height: 36px
          background: #FCFCFC
          border: 1px solid #CCCCCC
    table
      text-align: center
      thead
        height: 60px
        line-height: 60px
        background: #EAEAEA
        td
          font-size: 16px
          font-weight: bold
          color: #000000
          border: 1px solid #CCCCCC
      tbody
        td
          padding: 20px
          font-size: 14px
          color: #333333
          border: 1px solid #CCCCCC
          &:last-of-type
            text-align: left
          img
            display: block
            width: 140px
            margin: 0 auto
  .mask
    width: 100%
</style>
