const Router = require('koa-router')
const router = new Router()

// /rest/news
router.use('/news', require('./news'))

// /rest/heroes
router.use('/heroes', require('./heroes'))

module.exports = router.routes()