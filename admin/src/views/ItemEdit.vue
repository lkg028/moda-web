<template>
  <div>
    <h3>{{(id || model._id) ? '编辑' : '新建'}}物品</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :headers="uploadHeaders"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        model: {
          icon: ''
        }
      }
    },
    computed: {
      uploadHeaders () {
        return {Authorization: localStorage.token && 'Bearer ' + localStorage.token}
      }
    },
    methods: {
      afterUpload (res) {
        this.model.icon = res.url
      },
      async save () {
        let id = this.id || this.model._id
        let model = this.model
        if (!model.name) return
        for (const p in model) {
          if (!model[p]) model[p] = undefined 
        }
        if (id) {
          await this.$http.put(`/rest/items/${id}`, model)
        } else {
          await this.$http.post('/rest/items', model)
        }
        this.$router.push('/items/list')
        this.$message({
          type: 'success',
          message: `保存成功!`
        })
      },
      async getItem () {
        const res = await this.$http.get(`/rest/items/${this.id}`)
        this.model = {...res.data}
        console.log(this.model)
      }
    },
    created () {
      this.id && this.getItem()
    }
  }
</script>

<style lang="stylus" scoped>
  .avatar-uploader-icon 
    font-size: 28px
    color: #8c939d
    width: 5rem
    height: 5rem
    line-height: 5rem
    text-align: center
  .avatar 
    width: 5rem
    height: 5rem
    display: block
</style>