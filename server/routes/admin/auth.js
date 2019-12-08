const AdminUser = require('../../models/AdminUser')
const jwt = require('jsonwebtoken')

// 验证登录方法
module.exports = async (ctx, next) => {
  const token = ctx.jwt.token
  const handleErr = ctx.handleErr
  const jwtSecret = ctx.jwt.Secret
  // 没有token
  if(!token) return handleErr(401, '请先登录')
  // 没有_id
  const { id } = jwt.verify(token, jwtSecret)
  if(!id) return handleErr(401, '请先登录')
  // 没有找到用户
  ctx.user = await AdminUser.findById(id)
  if(!ctx.user) return handleErr(401, '请先登录')
  await next()
}