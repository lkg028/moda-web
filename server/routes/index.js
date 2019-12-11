const Router = require('koa-router')
const router = new Router()

// 路由统一出口
// admin页面
router.use('/admin', require('./admin/index.js'))

// 前端接口，提供给web端使用
router.use('/rest', require('./web/index.js'))

// 测试接口，初始化数据
// router.use('/init', require('./init.js'))




module.exports = router