import Vue from 'vue'
import Router from 'vue-router'
import Compile from '@/components/compile/compile'
import Preview from '@/components/preview/preview'
import complete from '@/components/complete/complete'
import completeWap from '@/components/completeWap/completeWap'

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
    },
    {
      path: '/completeWap',
      name: 'completeWap',
      component: completeWap
    },
    {
      path: '/complete',
      name: 'complete',
      component: complete
    }
  ]
})
