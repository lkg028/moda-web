<template>
  <div>
    <h3>英雄列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="英雄名称" width="200"></el-table-column>
      <el-table-column prop="title" label="英雄称号" width="200"></el-table-column>
      <el-table-column label="头像">
        <template v-slot="scope">
          <img :src="scope.row.avatar" alt="" width="180">
        </template>
      </el-table-column>
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
      async getItems () {
        const res = await this.$http.get('/rest/heroes')
        this.items.push(...res.data)
      },
      editBtn(id) {
        this.$router.push(`/heroes/edit/${id}`)
      },
      async remove (row) {
        const {_id: id, name} = row
        console.log(row)
        this.$confirm(`是否确定要删除分类：${name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`/rest/heroes/${id}`)
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
      this.getItems()
    }
  }
</script>

<style lang="scss" scoped>

</style>