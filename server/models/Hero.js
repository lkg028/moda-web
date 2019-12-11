const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {type: String, unique: true},  // 设置这个name字段唯一
  title: {type: String},
  avatar: {type: String},
  banner: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  scores: {
    difficult: {type: Number},
    skills: {type: Number},
    attack: {type: Number},
    survive: {type: Number}
  },
  skills: [{
    icon: {type: String},
    name: {type: String},
    description: {type: String},
    tips: {type: String},
    delay: {type: String},
    cost: {type:String}
  }],
  items1: {
    items: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    tip: {type: String}
  },
  items2: {
    items: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    tip: {type: String}
  },
  usageTips: {type: String},
  battleTips: {type: String},
  teamTips: {type: String},
  partners: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: {type: String}
  }],
})

module.exports = mongoose.model('Hero', schema, 'heroes')