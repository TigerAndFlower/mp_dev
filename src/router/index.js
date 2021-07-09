import Vue from 'vue'
import Router from 'vue-router'
import Compile from '@/components/compile/compile'
import Preview from '@/components/preview/preview'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Compile',
      component: Compile
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    }
  ]
})
