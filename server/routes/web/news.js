const Router = require('koa-router')
const router = new Router()
const Category = require('../../models/Category')
const Article = require('../../models/Article')

// /rest/news/?id=xxxx
router.get('/', async (ctx, next) => {
  const id = ctx.query.id
  if (!id) return await next()
  const data = await Article.findById(id).lean()
  data.related = await Article.find().where({
    categories: {$in: data.categories},
    _id: { $ne: id }     // 排除同一篇文章
  }).limit(2)
  ctx.body = data
})


// /rest/news/list
router.get('/list', async (ctx, next) => {
  const parent = await Category.findOne({
    name: '新闻分类'
  })
  // 聚合查询，接收管道参数，层层加工出结果
  const cats = await Category.aggregate([
    { $match: { parent: parent._id } },  // 找到所有的新闻分类的子类
    { 
      $lookup: {
        from: 'articles',             // 从articles集合中，找到
        localField: '_id',            // parents中的_id键  
        foreignField: 'categories',   // articles中的categories键
        as: 'newsList'                 // 找到取出对应的文档，作为结果中的newList键
      }
    },
    {
      $addFields: {
        newsList: { $slice: ['$newsList', 5]  } // 之找出5个结果
      }
    }
  ])

  // 生成热门分类
  const subCats = cats.map(v => v._id)
  cats.unshift({
    name: '热门',
    // 从集合articles中找新闻分类的五条数据
    newsList: await Article.find().where({
      categories: {$in: subCats}
    }).populate('categories').limit(5).lean()
  })

  cats.map(cat => {
    cat.newsList.map(news => {
      news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
      return news
    })
    return cat
  })
  ctx.body = cats
})



module.exports = router.routes()