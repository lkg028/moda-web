const Router = require('koa-router')
// const Category = require('../../models/Category')
const router = new Router({mergeParams: true});
router.prefix('/admin/api/rest/:resource')

// 在所有路由之前
router.use('/', async (ctx, next) => {
  const modelName = require('inflection').classify(ctx.params.resource)
  ctx.Model = require(`../../models/${modelName}`)
  await next()
})

// 新增
router.post('/', async ctx => {
  const model = await ctx.Model.create(ctx.request.body)
  ctx.body = model
})
// 修改
router.put('/:id', async ctx => {
  const model = await ctx.Model.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  ctx.body = model
})

// 删除
router.delete('/:id', async ctx => {
  const model = await ctx.Model.findByIdAndDelete(ctx.params.id)
  ctx.body = {success: true}
})

// 获取整个列表
router.get('/', async ctx => {
  const options = {}
  if (ctx.Model.modelName === 'Category') {
    options.populate = 'parent'
  }
  const model = await ctx.Model.find().setOptions(options).limit(10)
  ctx.body = model
})

// 获取单个数据
router.get('/:id', async ctx => {
  const model = await ctx.Model.findById(ctx.params.id)
  ctx.body = model
})

module.exports = router;