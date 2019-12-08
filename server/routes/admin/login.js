const Router = require('koa-router')
const router = new Router({mergeParams: true})

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminUserModel = require('../../models/AdminUser')

// 接收登录表单接口
router.post('/', async (ctx, next) => {
  const { username, password} = ctx.request.body
  // 1.找用户
  const user = await AdminUserModel.findOne({username}).select('+password')
  if (!user) { return ctx.handleErr(422, '用户名不存在') }
  // 2.校验
  const isValid = bcrypt.compareSync(password, user.password)
  if (!isValid) { return ctx.handleErr(422, '密码错误') }
  // 3.验证成功后返回token
  const token = jwt.sign({id: user._id}, ctx.jwt.Secret)
  ctx.body = {token}
})

module.exports = router.routes()