const Koa = require('koa')
const koaBody = require('koa-body')
const koaCors = require('@koa/cors')
const helmet = require('koa-helmet')
const koaStatic = require('koa-static')  // 处理静态资源中间件
const routes = require('./routes')  // 导入合并的路由
const path = require('path')

const PORT = 3000
// 实例化一个koa应用
const app = new Koa()

// 设置一个全局的jwt加密密钥
// 如果请求有token就写到ctx里面
// 增加一个全局错误处理函数到ctx上
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

// 把路由添加进koa中间件
app.use(routes())  

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
