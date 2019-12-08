import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/login' , name: 'login', component: () => import('../views/Login.vue')},
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
        path: '/articles/create',
        component: () => import('../views/ArticleEdit')
      },
      {
        path: '/articles/edit/:id',
        component: () => import('../views/ArticleEdit'),
        props: true
      },
      {
        path: '/articles/list',
        component: () => import('../views/ArticleList')
      },
      // 广告位管理
      {
        path: '/ads/create',
        component: () => import('../views/AdEdit')
      },
      {
        path: '/ads/edit/:id',
        component: () => import('../views/AdEdit'),
        props: true
      },
      {
        path: '/ads/list',
        component: () => import('../views/AdList')
      },
      // 管理员管理
      {
        path: '/admin_users/create',
        component: () => import('../views/AdminUserEdit')
      },
      {
        path: '/admin_users/edit/:id',
        component: () => import('../views/AdminUserEdit'),
        props: true
      },
      {
        path: '/admin_users/list',
        component: () => import('../views/AdminUserList')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log('to:',to)
  console.log('form:',from)
  next()
})
export default router
