<template>
  <div>
    <h3>{{(id || model._id) ? '编辑' : '新建'}}广告位</h3>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告项">
          <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告相</el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="50" class="ad-item-edit">
            <el-col :md="12" v-for="(item, i) in model.items" :key="i">
              <p style="text-align: center;margin: 0;font-weight: bold;">第{{i + 1}}个广告项</p>
              <el-form-item label="广告图片"  label-width="8rem">
                <el-upload
                  class="avatar-uploader"
                  :headers="mixin_GetAuthHeader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'image', res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接到（URL）"  label-width="8rem">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label-width="8rem">
                <el-button type="danger" @click="model.items.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form-item>
      <el-form-item style="margin-top: 1rem;">
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
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let id = this.id || this.model._id;
      let model = this.model;
      if (!model.name) return;
      for (const p in model) {
        if (!model[p]) model[p] = undefined;
      }
      if (id) {
        await this.$http.put(`/rest/ads/${id}`, model);
      } else {
        let res = await this.$http.post("/rest/ads", model);
        console.log(res);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: `保存成功!`
      });
    },
    async getAd() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.getAd();
  }
};
</script>

<style lang="stylus" scoped>
  .ad-item-edit >>> .el-col 
    margin-top 2rem
  .ad-item-edit >>> .el-form-item
    margin-bottom 1rem
  .scores-stars 
    margin-top: 0.6rem
  .avatar-uploader-icon 
    font-size: 28px
    color: #8c939d
    // min-width: 5rem
    height: 5rem
    line-height: 5rem
    text-align: center
  .avatar 
    // min-width: 5rem
    height: 5rem
    display: block
</style>