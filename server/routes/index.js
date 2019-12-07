const combineRoutes = require('koa-combine-routers')
const admin = require('./admin/index.js')  // 导入admin页面路由


// 合并导出
module.exports = combineRoutes(...admin)