import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main,
    children: [
      // 分类管理
      {
        path: '/categories/create',
        component: () => import('../views/CategoryEdit')
      },
      {
        path: '/categories/edit/:id',
        component: () => import('../views/CategoryEdit'),
        props: true
      },
      {
        path: '/categories/list',
        component: () => import('../views/CategoryList')
      },
      // 物品管理
      {
        path: '/items/create',
        component: () => import('../views/ItemEdit')
      },
      {
        path: '/items/edit/:id',
        component: () => import('../views/ItemEdit'),
        props: true
      },
      {
        path: '/items/list',
        component: () => import('../views/ItemList')
      },
      // 英雄管理
      {
        path: '/heroes/create',
        component: () => import('../views/HeroEdit')
      },
      {
        path: '/heroes/edit/:id',
        component: () => import('../views/HeroEdit'),
        props: true
      },
      {
        path: '/heroes/list',
        component: () => import('../views/HeroList')
      },
      // 文章管理
      {
        path: '/heroes/create',
        component: () => import('../views/HeroEdit')
      },
      {
        path: '/heroes/edit/:id',
        component: () => import('../views/HeroEdit'),
        props: true
      },
      {
        path: '/heroes/list',
        component: () => import('../views/HeroList')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
