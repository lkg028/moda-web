const Router = require('koa-router')
const router = new Router()
const Category = require('../../models/Category')
const Hero = require('../../models/Hero')

// /rest/heroes/?id=xxxx查询某个英雄
router.get('/', async (ctx, next) => {
  const id = ctx.query.id
  if (!id) return await next()
  const data = await Hero.findById(id)
              .populate('categories partners.hero items1.items items2.items')
              .lean()

  ctx.body = data
})


// /rest/heroes/list 查询英雄列表
router.get('/list', async (ctx, next) => {
  const parent = await Category.findOne({
    name: '英雄分类'
  })
  // 聚合查询，接收管道参数，层层加工出结果
  const cats = await Category.aggregate([
    { $match: { parent: parent._id } },  // 找到所有的新闻分类的子类
    { 
      $lookup: {
        from: 'heroes',             // 从articles集合中，找到
        localField: '_id',            // parents中的_id键  
        foreignField: 'categories',   // articles中的categories键
        as: 'heroesList'                 // 找到取出对应的文档，作为结果中的newList键
      }
    }
  ])

  // 生成热门分类
  const subCats = cats.map(v => v._id)
  cats.unshift({
    name: '热门',
    // 从集合heroes中找新闻分类的五条数据
    heroesList: await Hero.find().where({
      categories: {$in: subCats}
    }).populate('categories').limit(10).lean()
  })

  cats.map(cat => {
    cat.heroesList.map(hero => {
      hero.categoryName = cat.name === '热门' ? hero.categories[0].name : cat.name
      return hero
    })
    return cat
  })
  ctx.body = cats
})



module.exports = router.routes()