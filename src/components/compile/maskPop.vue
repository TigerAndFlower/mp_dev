<template>
  <!-- 弹窗 -->
  <div class="maskWrap">
    <div class="mask">
      <img src="../../assets/images/icon/icon_close.png"
           class="close"
           @click="isMaskFunc">
      <h4 class="title">{{isType}}</h4>
      <p class="tips">{{tips}}</p>
      <!-- 数据内容 -->
      <div class="wrap">
        <div class="upImgWrap"
             v-if="isType === '企业图片'">
          111
        </div>
        <table v-else
               class="infinite-list"
               v-infinite-scroll="load"
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
import { getPageVideoList, getPageNewsList, findLiveRoomListByid, getProductList, documentList } from '@/api'
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
      member_id: 864, // 视频最多 864  文章最多 1151
      itemModule: [],
      itemArr: [],
      itemIdArr: []
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
  computed: {
    ...mapGetters(['isMask', 'compileList'])

  },
  methods: {
    ...mapMutations(['setIsMask', 'setCompileList']),
    isMaskFunc: function () {
      this.setIsMask(!this.isMask)
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
        if (this.itemIdArr.length === maxLength) {
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
      console.log(this.itemIdArr)
    },
    load () {
      let data = {
        page: this.page,
        page_size: this.page_size,
        member_id: this.member_id
      }
      switch (this.isType) {
        case '企业图片':
          break
        case '企业动态':
          this.getMessage(getPageNewsList, data, 'dynamicList')
          break
        case '精彩视频':
          this.getMessage(getPageVideoList, data, 'videoList')
          break
        case '直播':
          data = { account: 'P14cd2a1d17fc7d011d67809d4c756153' }
          this.getMessage(findLiveRoomListByid, data, 'liveList')
          break
        case '文档下载':
          // https://wenku.ofweek.com/api/ofweek_mp.php?
          data = { username: 'Pa8db91c3faca302fcd9d854891542cf9' }
          this.getMessage(documentList, data, 'documentList')
          break
        case '产品介绍':
          data = { account: 'P14cd2a1d17fc7d011d67809d4c756153' }
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
                // 遍历修改数据格式然后插入
                // 找出需要遍历对象
                obj.forEach((item, index) => {
                  // 获取当前id
                  let id = item.id
                  // 找出当前比对的板块
                  if (objData.length > 0) {
                    for (let i = 0; i < objData.length; i++) {
                      if (objData[i].id === id) {
                        item.isChecked = true
                        console.log(that.itemArr)
                        console.log(that.itemIdArr)
                        console.log(objData[i].id)
                        // debugger
                        that.itemArr.push(objData[i])
                        that.itemIdArr.push(objData[i].id)
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
                this.$message({
                  showClose: true,
                  message: '已加载全部'
                })
              }
              // this.itemModule = this.itemModule.concat(this.deepClone(obj))
            } else {
              this.$message({
                showClose: true,
                message: '已加载全部'
              })
            }
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: '已加载全部'
            })
          })
      })
    }
  },
  mounted () {
    // debugger
    switch (this.isType) {
      case '企业图片':
        this.setMaskText('备注：建议图片尺寸444 * 320px，图片格式支持jpg、png图片数量不超过3张')
        break
      case '企业动态':
        this.setMaskText('备注：最多只能添加5篇文章', '文章标题')
        break
      case '精彩视频':
        this.setMaskText('备注：最多只能添加4个视频', '视频标题', '封面图')
        break
      case '直播':
        this.setMaskText('备注：最多只能添加1个直播', '活动名称', '封面图')
        break
      case '文档下载':
        this.setMaskText('备注：最多只能添加4个文档', '文档标题')
        break
      case '产品介绍':
        this.setMaskText('备注：最多只能添加6个产品', '产品标题', '产品图')
        break
      default:
        break
    }
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
  .el-button
    display: block
    margin: 20px auto
  // .el-checkbox__inner
  //   width: 20px
  //   height: 20px
  //   border: 1px solid #ccc
  .mask
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%,-50%)
    width: 900px
    height: 750px
    overflow: hidden
    background: #FCFCFC
    box-sizing: border-box
    padding: 40px 50px
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
  .wrap
    width: 100%
    height: 530px
    overflow: auto
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
</style>
