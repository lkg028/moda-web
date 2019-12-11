import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http.js'
import '@/assets/css/main.css'
Vue.config.productionTip = false

// mixin
Vue.mixin({
  computed: {
    mixin_GetAuthHeader () {
       return {Authorization: localStorage.token && 'Bearer ' + localStorage.token}
    }
  }
})

Vue.prototype.$http = http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
