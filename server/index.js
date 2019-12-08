const Koa = require('koa')
const koaBody = require('koa-body')
const koaCors = require('@koa/cors')
const helmet = require('koa-helmet')
const koaStatic = require('koa-static')  // 处理静态资源中间件
const router = require('./routes')
const path = require('path')

const PORT = 3000
// 实例化一个koa应用
const app = new Koa()

// jwt全局对象
// jwt.token：存储客户端token
// jwt.Secret：设置加密密钥
app.use(async (ctx, next) => {
  ctx.jwt = {Secret: 'asdfflk'}
  if (ctx.request.header.authorization) {
    ctx.jwt.token = String(ctx.request.header.authorization).split(' ').pop()
  }
  ctx.handleErr = function(errCode, message){
    ctx.response.status = errCode
    ctx.body = { message }
  }
  await next()
})

// 加工请求体
app.use(koaBody()) 

// 处理跨域请求
app.use(koaCors())  

// 设置安全响应header
app.use(helmet()) 

// 处理静态资源
// 参数：静态资源绝对路径
app.use(koaStatic(path.join(__dirname, './uploads')))

// 路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 启动数据库
require('./plugins/db.js')(app)


// 添加错误处理
app.on('error', async (err, ctx) => {
  console.log(err)
})

// 设置应用监听端口8848
app.listen(PORT, () => {
  console.log('服务器已经启动在：', PORT, '端口')
})
