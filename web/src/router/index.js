import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'
import Home from '@/views/Home'
import Article from '@/views/Article'
import Hero from '@/views/Hero'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component: Main,
    children: [
      { path: '/', component: Home },
      { path: '/article/:id', component: Article , props: true}
    ]
  },
  {
    path: '/hero/:id',
    component: Hero,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
