import Vue from 'vue'
import VueRouter from 'vue-router'
import Org from '../views/Home.vue'
import User from '../views/User.vue'
import ThreeeD from '../views/threeD.vue'
import jsonEditor from '../views/jsonEditor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/org',
    name: 'Home',
    component: Org
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/3d',
    name: 'threeD',
    component: ThreeeD
  },
  {
    path: '/',
    name: 'jsonEditor',
    component: jsonEditor
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
