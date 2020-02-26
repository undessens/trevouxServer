import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Config from '../views/Config.vue'
// import Manual from '../views/Manual.vue'
// import Auto from '../views/Auto.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/config',
    name: 'Config',
    component: Config,//() => import(/* webpackChunkName: "about" */ '../views/Config.vue')
  }
  
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
