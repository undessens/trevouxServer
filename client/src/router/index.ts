import Vue from 'vue'
import VueRouter from 'vue-router'
import Manual from '../views/Manual.vue'
import Auto from '../views/Auto.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auto',
    component: Auto
  },
  {
    path: '/auto',
    name: 'Auto',
    component: Auto
  },
  {
    path: '/manual',
    name: 'Manual',
    component:Manual
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
