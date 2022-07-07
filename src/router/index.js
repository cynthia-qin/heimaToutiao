import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/Qa')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/Article'),
    // 使用props接收路由传递的参数，可以降低代码的耦合性
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
