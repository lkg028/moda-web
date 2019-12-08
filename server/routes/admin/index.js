const Router = require('koa-router')
const router = new Router({mergeParams: true})
const auth = require('../auth.js')


// login入口
router.use('/api/login', require('./login.js'))

// rest入口，auth验证登录
router.use('/api/rest/:resource', auth(),require('./rest.js'))

// upload入口，auth验证登录
router.use('/api/upload', auth(),require('./upload.js'))

module.exports = router.routes()