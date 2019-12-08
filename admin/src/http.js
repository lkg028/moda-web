import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 添加请求拦截器，每个请求都添加token后再请求
http.interceptors.request.use(config => {
  localStorage.token && (config.headers.Authorization = 'Bearer ' + localStorage.token)  // 添加Bearer是行业规范？
  return config
}, err => {
  return Promise.reject(err)
})

// 添加响应拦截器，处理相应错误
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
  }
  // 如果是401错误，统一跳转登录页面
  if(err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})
export default http