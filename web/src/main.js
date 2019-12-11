import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
// swiper样式
import 'swiper/dist/css/swiper.css'
// 字体图标
import '@/assets/css/iconfont.css'
Vue.config.productionTip = false

// 重置默认样式
import '@/assets/css/main.scss'

// 路由
import router from './router'

// 组件
import Cart from '@/components/Cart'
Vue.component('m-cart', Cart)
import ListCart from '@/components/ListCart'
Vue.component('m-list-cart', ListCart)

// axios请求
import http from './http.js'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
