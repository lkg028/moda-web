<template>
  <div>
    <h3>广告位列表</h3>
    <el-table :data="ads">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="广告位名称"></el-table-column>
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
        ads: []
      }
    },
    methods: {
      async getAds () {
        const res = await this.$http.get('/rest/ads')
        this.ads.push(...res.data)
      },
      editBtn(id) {
        this.$router.push(`/ads/edit/${id}`)
      },
      async remove (row) {
        const {_id: id, name} = row
        this.$confirm(`是否确定要删除广告位：${name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`/rest/ads/${id}`)
          this.$message({
            type: 'success',
            message: `删除成功!`
          })
          this.ads.forEach((item, idx, arr) => {
            if (item._id === id) arr.splice(idx, 1)
          });
        }, () => {})
      }
    },
    created () {
      this.getAds()
    }
  }
</script>

<style lang="scss" scoped>

</style>