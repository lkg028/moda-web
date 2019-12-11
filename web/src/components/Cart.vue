<template>
  <div class="cart bg-white  p-4 mt-3">
    <div class="cart-header d-flex ai-center pb-3" :class="{'border-bottom': !plain}">
      <span class="iconfont" v-html="icon"></span>
      <span class="flex-1 px-2 fs-xl">{{title}}</span>
      <span class="iconfont" v-if="!plain">&#xe604;</span>
    </div>
    <div class="cart-body" :class="{'mt-4': !plain}">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {type: String, required: true},
      icon: {type: String, required: true},
      plain: {type: Boolean}
    }
  }
</script>

<style lang="scss" scoped>
// import scss var
@import '@/assets/css/_var.scss';
  .cart {
    border-bottom: 1px solid $border-color;
    .cart-header {
      font-weight: bold;
    }
  }
</style>