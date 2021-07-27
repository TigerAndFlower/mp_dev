// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { deepClone, getQueryString, formatDate, getID, isJsonString } from './assets/js/common'

import './assets/css/base.css'
/* 清除默认样式 */
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.deepClone = deepClone
Vue.prototype.getQueryString = getQueryString
Vue.prototype.formatDate = formatDate
Vue.prototype.isJsonString = isJsonString

Vue.prototype.$getMemberId = getID('id')
Vue.prototype.$getAccount = getID('username')
Vue.prototype.$public_name = getID('public_name')
// 注册时间格式过滤器
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
