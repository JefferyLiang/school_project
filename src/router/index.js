import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import welcome from '@/bin/welcome/router'
import index from '@/bin/index/router'

Vue.use(Router)
//配置路由信息
const reRouter = { path: '*', redirect: '/' }

const routes = [welcome,index,reRouter]

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: routes
})
