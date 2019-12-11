<template>
  <div v-if="article">
    <div class="d-flex p-3 ai-center fs-lg article">
      <router-link tag="span" to="/" class="iconfont text-info mr-1 text-info">&#xe640;</router-link>
      <span class="flex-1 text-info text-cut">{{article.title}}</span>
      <span class="text-grey pl-2">{{article.createdAt | date}}</span>
    </div>
    <div v-html="article.body" class="m-4 article-body px-1"></div>
    <div class="relate mx-4 my-5 px-1">
      <div class="">
        <span class="iconfont">&#xe616;</span>
        <span class="ml-2 fs-lg text-info">相关资讯</span>
      </div>
      <router-link
        v-for="item in article.related" :key="item._id"
        :to="`/article/${item._id}`" tag="div"
        class="d-flex ai-center jc-around"
      >
        <span class="my-2 text-cut flex-1 pr-4">{{item.title}}</span>
        <span>{{item.createdAt | date}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
  export default {
    props: {
      id: { type: String, required: true}
    }, 
    data () {
      return {
        article: null
      }
    },
    watch: {
      id () {
        this.fetchArticle()
      }
    },
    methods: {
      async fetchArticle () {
        let res = await this.$http.get(`/news/?id=${this.id}`)
        this.article = res.data
      }
    },
    created () {
      this.fetchArticle()
    },
    filters: {
      date (val) {
        return dayjs(val).format('MM/DD')
      }
    }
  }
</script>

<style lang="scss">
// import scss var
@import '@/assets/css/_var.scss';
 .article {
   border-bottom: 1px solid map-get($colors, 'light-1' )
 }
 .article-body {
   img {
      width: 100%;
    height: auto;
   }
   iframe {
     width: 100%;
     height: auto;
   }
 } 
</style>