const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {type: String},
  // 关联分类
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)