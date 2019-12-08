<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input type="text" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-button type="primary" :loading="btnLoading" native-type="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        model: {},
        btnLoading: false
      }
    },
    methods: {
      async login () {
        this.btnLoading = true
        setTimeout(() => {this.btnLoading = false}, 800)
        let res = await this.$http.post('/login', this.model)  // 错误已经被全局捕获，这里不需要设置错误捕获了
        localStorage.token = res.data.token
        this.$message({
          type: 'success',
          message: '登录成功'
        })
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .login-card
    width 25rem
    margin 6rem auto
    user-select none
</style>