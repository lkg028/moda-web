const Router = require('koa-router')
const router = new Router()

// 路由统一出口
// admin页面
router.use('/admin', require('./admin/index.js'))

module.exports = router