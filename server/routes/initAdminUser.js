const Router = require('koa-router')
const router = new Router()

// 初始化一个管理用户
router.get('/', async (ctx) => {
  const AdminUser = require('../models/AdminUser')
  try {
    await await AdminUser.create({
      username: 'admin',
      password: 'admin'
    })
  } catch(e){
    return ctx.body = `<p style="text-align:center; 
                margin-top: 10rem;font-size: 3rem;">服务器出现异常,初始化数据失败。</p>`
  }
  ctx.body = `<p style="text-align:center; margin-top: 10rem;font-size: 3rem;">初始化成功用户名：admin，密码：admin。重复初始化无效。</p>`
})

module.exports = router.routes()