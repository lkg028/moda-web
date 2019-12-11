<template>
  <div class="fs-md">
    <div class="top-bar bg-black py-2 px-5 d-flex ai-center jc-between">
      <img src="@/assets/images/logo.jpg" alt="" srcset="" height="30">
      <div class="pl-3 flex-grow-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-4 pb-2">
      <div class="nav nav-inverse jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="span" to='/'>首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="span" to='/'>攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="span" to='/'>赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .top-bar {
    position: sticky;
    top: 0;
    z-index: 999;
    img {
      border-radius: 0.1rem;
    }
  }
</style>