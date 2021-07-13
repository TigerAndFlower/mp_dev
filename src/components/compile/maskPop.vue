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
              <td v-html="tableName"></td>
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
                  v-show="isType === '精彩视频' || isType === '直播'">
                <img src="../../assets/images/compileRightList02.png"
                     alt="">
              </td>
              <td class="infinite-list-item">
                {{item.title}}
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
import { getPageVideoList, getPageNewsList } from '@/api'
export default {
  name: 'show',
  data () {
    return {
      title: '',
      tableName: '',
      tableImgName: '',
      tips: '',
      page: 1,
      page_size: 20,
      member_id: 1151, // 视频最多 864  文章最多 1151
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
      switch (this.isType) {
        case '企业图片':
          this.setMaskText('备注：建议图片尺寸444 * 320px，图片格式支持jpg、png图片数量不超过3张')
          break
        case '企业动态':
          let data = {
            type: 2,
            setName: 'dynamicList',
            arr: this.deepClone(this.itemArr)
          }
          // this.compileList[this.ind].dynamicList = this.itemArr
          this.setCompileList(data)

          break
        case '精彩视频':
          this.itemArr = this.compileList[this.ind].videoList

          break
        case '直播':
          this.itemArr = this.compileList[this.ind].list

          break
        case '文档下载':
          this.itemArr = this.compileList[this.ind].list

          break
        case '产品介绍':
          this.itemArr = this.compileList[this.ind].list

          break
        default:
          break
      }
      // this.$parent.upDom()
      this.setIsMask(!this.isMask)
      // vuex解构太复杂   没有渲染视图
      // setTimeout(() => {
      //   this.$forceUpdate()
      // }, 1000)
    },
    addItemFunc: function (item) {
      let id = item.id
      let index = this.itemIdArr.indexOf(id)
      if (index === -1) {
        // 不存在,则添加
        if (this.itemIdArr.length === 5) {
          this.$message({
            showClose: true,
            message: '最多显示5篇文章'
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
      switch (this.isType) {
        case '企业图片':
          break
        case '企业动态':
          this.getMessage(getPageNewsList, 'dynamicList')
          break
        case '精彩视频':
          this.getMessage(getPageVideoList)
          break
        case '直播':
          break
        case '文档下载':
          break
        case '产品介绍':
          break
        default:
          break
      }
    },
    getMessage: function (axiosName, arrName) {
      // 第一个参数为接口名，第二个参数为需要被遍历被选中的数组名
      let data = {
        page: this.page,
        page_size: this.page_size,
        member_id: this.member_id
      }
      let objData
      this.compileList.forEach(item => {
        if (arrName in item) {
          objData = item[arrName]
        }
      })
      let that = this

      return new Promise((resolve, reject) => {
        this.page++
        axiosName(data)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.list.length > 0) {
                // 遍历修改数据格式然后插入
                // 找出需要遍历对象

                res.data.list.forEach((item, index) => {
                  // 获取当前id
                  let id = item.id
                  // 找出当前比对的板块
                  if (objData.length > 0) {
                    for (let i = 0; i < objData.length; i++) {
                      if (objData[i].id === id) {
                        item.isChecked = true
                        that.itemArr.push(objData[i])
                        that.itemIdArr.push(objData[i].id)
                        break
                      } else {
                        item.isChecked = false
                      }
                    }
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
              // this.itemModule = this.itemModule.concat(this.deepClone(res.data.list))
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
    switch (this.isType) {
      case '企业图片':
        this.setMaskText('备注：建议图片尺寸444 * 320px，图片格式支持jpg、png图片数量不超过3张')
        break
      case '企业动态':
        this.itemArr = this.deepClone(this.compileList[this.ind].dynamicList)
        this.setMaskText('备注：最多只能添加5篇文章', '文章标题')
        break
      case '精彩视频':
        this.itemArr = this.deepClone(this.compileList[this.ind].videoList)
        this.setMaskText('备注：最多只能添加4个视频', '视频标题', '封面图')
        break
      case '直播':
        this.itemArr = this.deepClone(this.compileList[this.ind].list)
        this.setMaskText('备注：最多只能添加1个直播', '活动名称', '封面图')
        break
      case '文档下载':
        this.itemArr = this.deepClone(this.compileList[this.ind].list)
        this.setMaskText('备注：最多只能添加4个文档', '文档标题')
        break
      case '产品介绍':
        this.itemArr = this.deepClone(this.compileList[this.ind].list)
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
</style>
