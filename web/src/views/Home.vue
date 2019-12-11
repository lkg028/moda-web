<template>
  <div class="mb-4">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide>
        <img src="@/assets/images/1 (1).jpeg" class="w-100" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/1 (2).jpeg" class="w-100" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/images/1 (3).jpeg" class="w-100" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <template  v-slot:pagination>
        <div class="swiper-pagination px-3 pb-1 text-right"></div>
      </template>
    </swiper>
  <!-- end swiper -->
    <div class="nav-icons text-center bg-white mt-3 pt-3">
      <div class=" d-flex flex-wrap">
        <div class="nav-item w-25 mb-3" v-for="i in 10" :key="i">
          <i class="sprite sptite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="py-2 bg-light fs-xs">
        <i class="sprite sptite-arrow"></i>
        <span class="ml-1">收起</span>
      </div>
    </div>
    <!-- end icons -->

    <!-- news list -->
    <m-list-cart title="新闻资讯" icon="&#xe616;" :categories="newsCats">
      <template v-slot:items="category">
        <router-link v-for="(news, i) in category.newsList" 
        tag="div" :to="`/article/${news._id}`"
        :key="i" class="py-2 fs-sm d-flex jc-around">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-cut">{{news.title}}</span>
          <span class="text-gray-1 pl-1">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-cart>

    <!-- heroes list -->
    <m-list-cart title="英雄列表" icon="&#xe61f;" :categories="heroesCats">
      <template v-slot:items="category" >
        <div style="margin-left:-0.15rem; margin-right: -0.15rem;" >
          <router-link class="hero p-2 text-center" 
            v-for="(hero, i) in category.heroesList" :key="i"
            tag="div" :to="`/hero/${hero._id}`"  
          >
            <img :src="hero.avatar" alt="hero.name" class="w-100">
            <span class="fs-xs pt-1">{{hero.name}}</span>
          </router-link>
        </div>
      </template>
    </m-list-cart>
  </div>
</template>

<script>
import dayjs from 'dayjs'
  export default {
    data () {
      return {
        swiperOption: {
          loop: true,
          pagination: '.swiper-pagination',
          autoplay: 3000
        },
        newsCats: [],
        heroesCats: []
      }
    },
    methods: {
      async fetchNewsCats () {
        const res = await this.$http.get('/news/list')
        this.newsCats = res.data
      },
      async fetchHeroesCats () {
        const res = await this.$http.get('/heroes/list')
        this.heroesCats = res.data
      }
    },
    created () {
      this.fetchNewsCats()
      this.fetchHeroesCats()
    },
    filters: {
      date (val) {
        return dayjs(val).format('MM/DD')
      },
      cut (str) {
        return str.slice(0, 18) + '...'
      }
    }
  }
</script>

<style lang="scss">
// import scss var
@import '@/assets/css/_var.scss';
  .swiper-pagination {
    .swiper-pagination-bullet {
      background-color: map-get($colors, 'white');
      border-radius: 0.04rem;
      opacity: 1;
      &.swiper-pagination-bullet-active {
        background-color: map-get($colors, 'info' );
      }
    } 
  }
  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item {
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
  .hero {
    display: inline-block;
    width: 20%;
  }
  
</style>