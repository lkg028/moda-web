<template>
  <div>
    <h3>文章列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作">
      <template v-slot="scope">
        <el-button type="primary" size="small" @click.native="editBtn(scope.row._id)">编辑</el-button>
        <el-button type="danger" size="small" @click.native="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: []
      }
    },
    methods: {
      async getArticles () {
        const res = await this.$http.get('/rest/articles')
        this.items.push(...res.data)
      },
      editBtn(id) {
        this.$router.push(`/articles/edit/${id}`)
      },
      async remove (row) {
        const {_id: id, title} = row
        console.log(row)
        this.$confirm(`是否确定要删除文章：${title}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`/rest/articles/${id}`)
          this.$message({
            type: 'success',
            message: `删除成功!`
          })
          this.items.forEach((item, idx, arr) => {
            if (item._id === id) arr.splice(idx, 1)
          });
        }, () => {})
      }
    },
    created () {
      this.getArticles()
    }
  }
</script>

<style lang="scss" scoped>

</style>