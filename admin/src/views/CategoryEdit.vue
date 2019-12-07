<template>
  <div>
    <h3>{{(id || model._id) ? '编辑' : '新建'}}分类</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" clearable placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        model: {},
        parents: []
      }
    },
    methods: {
      async save () {
        let id = this.id || this.model._id
        let model = this.model
        if (!model.name) return
        for (const p in model) {
          if (!model[p]) model[p] = undefined 
        }
        if (id) {
          await this.$http.put(`/rest/categories/${id}`, model)
        } else {
          await this.$http.post('/rest/categories', model)
        }
        this.$router.push('/categories/list')
        this.$message({
          type: 'success',
          message: `保存成功!`
        })
      },
      async getCategory () {
        const res = await this.$http.get(`/rest/categories/${this.id}`)
        this.model = {...res.data}
      },
      async getParents () {
        const res = await this.$http.get('/rest/categories')
        this.parents = res.data
      }
    },
    created () {
      this.getParents ()
      this.id && this.getCategory()
    }
  }
</script>

<style lang="scss" scoped>

</style>