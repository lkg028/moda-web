<template>
  <div>
    <h3>{{(id || model._id) ? '编辑' : '新建'}}文章</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" clearable placeholder="请选择" multiple="">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor
          id="editor"
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor"
  export default {
    components: {VueEditor},
    props: {
      id: {
        type: String
      }
    },
    data () {
      return {
        model: {
          icon: ''
        },
        categories: []
      }
    },
    methods: {
      afterUpload (res) {
        this.model.icon = res.url
      },
      async save () {
        let id = this.id || this.model._id
        let model = this.model
        if (!model.title) return
        for (const p in model) {
          if (!model[p]) model[p] = undefined 
        }
        if (id) {
          await this.$http.put(`/rest/articles/${id}`, model)
        } else {
          await this.$http.post('/rest/articles', model)
        }
        this.$router.push('/articles/list')
        this.$message({
          type: 'success',
          message: `保存成功!`
        })
      },
      async getArticle () {
        const res = await this.$http.get(`/rest/articles/${this.id}`)
        this.model = {...res.data}
      },
      async getCategories () {
        const res = await this.$http.get('/rest/categories')
        this.categories.push(...res.data)
      },
      // 富文本编辑器上传图片
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        formData.append("file", file);
        
        let res = await this.$http.post('/upload', formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader()
      }
    },
    created () {
      this.getCategories()
      this.id && this.getArticle()
    }
  }
</script>

<style>

</style>