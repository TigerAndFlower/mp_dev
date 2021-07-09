import Vue from 'vue'
import Vuex from 'vuex'
import compile from './compile'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    compile
  }
})
