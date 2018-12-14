import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: '/wx/',
  routes: [
    {
      path: '/index',
      name: 'Home',
      component: () => import('@/pages/home/index'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/video/realMonitor',
      name: 'RealMonitor',
      component: () => import('@/pages/video/realMonitor/index'),
      meta: {
        title: '实时监控'
      }
    },
    {
      path: '/text/textArea',
      name: 'TextArea',
      component: () => import('@/pages/text/textArea/index'),
      meta: {
        title: '限制文字个数输入'
      }
    },
    {
      path: '/select/dateTime',
      name: 'DateTime',
      component: () => import('@/pages/select/dateTime/index'),
      meta: {
        title: '日期时间选择'
      }
    },
    {
      path: '/select/slider',
      name: 'Slider',
      component: () => import('@/pages/select/slider/index'),
      meta: {
        title: '滑块选择'
      }
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

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
