const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: {
    type: String,
    select: false, // 设置密码无法查询出来，只能设置
    set (val) {
      return bcrypt.hashSync(val, 10)
    }// 密码加密，把值改一下再保存
  }
  
})

module.exports = mongoose.model('AdminUser', schema)