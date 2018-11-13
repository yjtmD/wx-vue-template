import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/wx/',
  routes: [
    {
      path: '/index',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
