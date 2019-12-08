const Router = require('koa-router')
const router = new Router({mergeParams: true})

// 接收登录表单接口
router.post('/', async (ctx, next) => {
  const { username, password} = ctx.request.body
  // 1.找用户
  const AdminUser = require('../../models/AdminUser')
  const user = await AdminUser.findOne({username}).select('+password')
  if (!user) { return ctx.handleErr(422, '用户名不存在') }
  // 2.校验
  const isValid = require('bcrypt').compareSync(password, user.password)
  if (!isValid) { return ctx.handleErr(422, '密码错误') }
  // 3.验证成功后返回token
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({id: user._id}, ctx.jwt.Secret)
  ctx.body = {token}
})

module.exports = router.routes()