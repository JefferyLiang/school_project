// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
Vue.config.debug = true
Vue.config.productionTip = false
//加载bootstrap
import '@/modules/bootstrap'
//加载vue-svg-icon
import '@/modules/svgConfig'
//加载vue-heighlight
import '@/modules/heighlight'
//加载vuex
import '@/modules/vuex'
import store from '@/store/index'
//加载vue-router
import router from './router'

router.beforeEach((to,from,next)=>{
  store.state.from = from;
  next();
})

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
