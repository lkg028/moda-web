<template>
  <div>
    <h3>{{(id || model._id) ? '编辑' : '新建'}}英雄</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :headers="mixin_GetAuthHeader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => $set(model, 'avatar', res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner大图">
            <el-upload
              class="banner-uploader"
              :headers="mixin_GetAuthHeader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner', res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="banner" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" clearable multiple placeholder="请选择">
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate class="scores-stars" v-model="model.scores.difficult" show-score :max="10" show-text></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate class="scores-stars" v-model="model.scores.skills" show-score :max="10" show-text></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate class="scores-stars" v-model="model.scores.attack" show-score :max="10" show-text></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate class="scores-stars" v-model="model.scores.survive" show-score :max="10" show-text></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装" v-if="model.items1">
            <el-select v-model="model.items1.items" clearable multiple placeholder="请选择">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
            <el-form-item label="出装提示" label-width="80px" style="margin-top: 1rem;">
              <el-input v-model="model.items1.tip" style="width:300px;"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="逆风出装"  v-if="model.items2">
            <el-select v-model="model.items2.items" clearable multiple placeholder="请选择">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
            <el-form-item label="出装提示" label-width="80px" style="margin-top: 1rem;">
              <el-input v-model="model.items2.tip" style="width: 300px;"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :headers="mixin_GetAuthHeader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值（delay）">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗（cost）">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档">
          <el-button size="small" @click="model.partners.push({})"><i class="el-icon-plus"></i>添加搭档</el-button>
          <el-row v-for="(partner, i) in model.partners" :key="i">
            <el-form-item  label="英雄">
              <el-select filterable v-model="partner.hero">
                <el-option v-for="item in partners" :key="item._id" :label="item.name" :value="item._id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="搭档描述">
              <el-input v-model="partner.description" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="model.partners.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-row>
        </el-tab-pane>
      </el-tabs>

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
        avatar: "",
        scores: {},
        skills: [],
        partners: [],
        items1: {
          items: []
        },
        items2: {
          items: []
        },
      },
      categories: [],
      items: [],
      partners: []
    }
  },
  methods: {
    async save() {
      let id = this.id || this.model._id
      let model = this.model
      if (!model.name) return
      for (const p in model) {
        if (!model[p]) model[p] = undefined
      }
      if (id) {
        await this.$http.put(`/rest/heroes/${id}`, model)
      } else {
        let res = await this.$http.post("/rest/heroes", model)
        console.log(res)
      }
      this.$router.push("/heroes/list")
      this.$message({
        type: "success",
        message: `保存成功!`
      })
    },
    async getHero() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    async getCategories() {
      const res = await this.$http.get(`/rest/categories`)
      this.categories = res.data
    },
    async getItems() {
      let res = await this.$http.get("/rest/items")
      this.items = res.data
    },
    async getHeroes () {
      const res = await this.$http.get('/rest/heroes')
      this.partners = res.data
    }
  },
  created() {
    this.getCategories()
    this.getItems()
    this.getHeroes()
    this.id && this.getHero()
  }
}
</script>

<style lang="stylus" scoped>
  .scores-stars 
    margin-top: 0.6rem
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

  .banner-uploader >>> .el-upload
    border 1px dashed #d9d9d9
    width 15rem
    height 8rem
    line-height 8rem
    border-radius 0.5rem
    overflow hidden
    text-align center
  .banner 
    width: 80%
    line-height 8rem
    vertical-align middle
</style>