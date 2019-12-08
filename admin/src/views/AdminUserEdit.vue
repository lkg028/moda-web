<template>
  <div>
    <h3>{{(id || model._id) ? '编辑' : '新建'}}管理员</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username" style="width: 15rem;"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" type="password" style="width: 15rem;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String
      }
    },
    data () {
      return {
        model: {}
      }
    },
    methods: {
      async save () {
        let id = this.id || this.model._id
        let model = this.model
        if (!model.username) return
        for (const p in model) {
          if (!model[p]) model[p] = undefined 
        }
        if (id) {
          await this.$http.put(`/rest/admin_users/${id}`, model)
        } else {
          await this.$http.post('/rest/admin_users', model)
        }
        this.$router.push('/admin_users/list')
        this.$message({
          type: 'success',
          message: `保存成功!`
        })
      },
      async getAdminUser () {
        const res = await this.$http.get(`/rest/admin_users/${this.id}`)
        this.model = {...res.data}
      }
    },
    created () {
      this.id && this.getAdminUser()
    }
  }
</script>

<style lang="scss" scoped>

</style>