<template>
  <div>
    <m-cart :title="title" :icon="icon">
      <div class="nav jc-between mb-1">
        <div class="nav-item" :class="{active: active === i}"
          v-for="(category, i) in categories" :key="i"
        >
          <div class="link" @click="$refs.list.swiper.slideTo(i)">{{category.name}}</div>
        </div>
      </div>
      <swiper 
       :options="swiperOption"
       ref="list"
      >
        <swiper-slide
          v-for="(category, i) in categories" :key="i"
        >
          <slot name="items" v-bind="category"/>
        </swiper-slide>
      </swiper>
    </m-cart>
  </div>
</template>

<script>
  export default {
    props: {
      title: {type: String, required: true},
      icon: {type: String, required: true},
      categories: {type: Array, required: true}
    },
    data () {
      return {
        active: 0,
        swiperOption: {
          autoHeight: true,
          onSlideChangeEnd: (swiper) => {
            this.active = swiper.realIndex
          }
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.list.swiper
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>