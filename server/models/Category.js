const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {type: String},
  // 关联分类
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})
// 这里省略了第三参数：集合名字，默认会设置为复数形式，即categories
module.exports = mongoose.model('Category', schema)  