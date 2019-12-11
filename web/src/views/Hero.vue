<template>
 <div class="fs-md mb-5" v-if="model">
   <div class="top-bar bg-black py-2 px-5 d-flex ai-center jc-between text-white">
      <img src="@/assets/images/logo.jpg" alt="" srcset="" height="30">
      <span class="px-2">王者荣耀</span>
      <span class="flex-1 px-2">攻略站</span>
      <router-link tag="span" to="/">更多英雄 &gt;</router-link>
   </div>
   <div :style="{'background-image': `url(${model.banner})`}" 
    class="banner  d-flex"
   >
      <div class="info p-4 d-flex jc-between ai-end">
      <div class="scores text-white flex-1">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-1 fs-xl">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(i => i.name).join('/')}}</div>
        <div class="mt-1 d-flex ai-center" v-if="model.scores">
          <span class="mr-2">难度<span class="badge ml-1 bg-brown-1">{{model.scores.difficult}}</span></span>
          <span class="mr-2">技能<span class="badge ml-1 bg-blue-1">{{model.scores.skills}}</span></span>
          <span class="mr-2">攻击<span class="badge ml-1 bg-red-1">{{model.scores.attack}}</span></span>
          <span class="mr-2">生存<span class="badge ml-1 bg-green-1">{{model.scores.survive}}</span></span>
        </div>
      </div>
      <span class="text-grey">皮肤：2&gt;</span>
    </div>     
   </div>
   <!-- banner end -->
   <div>
     <div class="bg-white pt-4 px-4">
      <div class="nav jc-around text-center border-bottom pb-2 fs-sm">
        <div class="nav-item" :class="{active: currentPanel  === 0}" @click="$refs.pane.swiper.slideTo(0)">
          <span>英雄初识</span>
        </div>
        <div class="nav-item" :class="{active: currentPanel === 1}" @click="$refs.pane.swiper.slideTo(1)">
          <span>进阶攻略</span>
        </div>
      </div>
     </div>
     <swiper :options="swiperOption" ref="pane" class="">
       <swiper-slide>
         <div class="d-flex jc-between p-4 bg-white">
           <router-link tag="button" class="btn btn-lg flex-1" to="/">
            <span class="iconfont mr-2">&#xe61f;</span><span>英雄视频介绍</span>
           </router-link>
           <router-link tag="button" class="btn btn-lg flex-1 ml-3" to="/">
            <span class="iconfont mr-2">&#xe603;</span><span>一图识别英雄</span>
           </router-link>
         </div>
         <!-- skills -->
         <div class="skills bg-white p-4" v-if="model.skills">
           <div class="icons py-5 d-flex jc-around">
             <img :src="item.icon" alt="" class="icon" :class="{active: currentSkillIndex === i}"
              v-for="(item, i) in model.skills" :key="item._id" @click="currentSkillIndex = i"
             >
           </div>
           <div v-if="currentSkill">
              <div class="d-flex ai-center py-2">
                <h3 class="m-0">
                  {{ currentSkill.name }}
                </h3>
                <span class="text-grey-1 pl-5">(冷却值：{{ currentSkill.delay }} 消耗：{{ currentSkill.cost }})</span>
              </div>
              <p class="my-2">{{ currentSkill.description }}</p>
              <div class="border-bottom"></div>
              <p class="text-grey my-2">小提示：{{ currentSkill.tips }}</p>
           </div>
           
         </div>

         <m-cart plain icon="&#xe616;" title="出装推荐">
           <div v-if="model.items1">
             <div class="my-2 text-dark-1 fs-xl">逆风出装</div>
             <div class="items d-flex jc-between py-2">
               <div v-for="item in model.items1.items" :key="item._id" class="item text-center fs-xs" >
                 <img :src="item.icon" alt="">
                 <div>{{item.name}}</div>
               </div>
             </div>
             <p class="my-2 text-grey fs-sm">小提示：{{model.items1.tip}}</p>
           </div>
           <div class="border-bottom my-5"></div>
           <div v-if="model.items2">
             <div class="my-2 text-dark-1 fs-xl">逆风出装</div>
             <div class="items d-flex jc-between py-2">
               <div v-for="item in model.items2.items" :key="item._id" class="item text-center fs-xs" >
                 <img :src="item.icon" alt="">
                 <div>{{item.name}}</div>
               </div>
             </div>
             <p class="my-2 text-grey fs-sm">小提示：{{model.items2.tip}}</p>
           </div>
         </m-cart>
         <m-cart plain icon="&#xe616;" title="使用技巧">
           <p class="m-0 text-dark-1">{{model.usageTips}}</p>
         </m-cart>
         <m-cart plain icon="&#xe616;" title="对抗技巧">
           <p class="m-0 text-dark-1">{{model.battleTips}}</p>
         </m-cart>
         <m-cart plain icon="&#xe616;" title="团战思路">
           <p class="m-0 text-dark-1">{{model.teamTips}}</p>
         </m-cart>
       </swiper-slide>
       <swiper-slide>
         另一个页面
       </swiper-slide>
     </swiper>
   </div>
 </div>
</template>

<script>
 export default {
  props: {
    id: {type: String, required: true}
  },
  data () {
    return {
      model: null,
      currentPanel: 0,
      currentSkillIndex: 0,
      swiperOption: {
          autoHeight: false,
          onSlideChangeEnd: (swiper) => {
            this.currentPanel = swiper.realIndex
          }
      }
    }
  },
  methods: {
    async fetchHero () {
      let res = await this.$http.get(`/heroes/?id=${this.id}`)
      this.model = res.data
    }
  },
  computed: {
    currentSkill () {
      return this.model.skills[this.currentSkillIndex]
    },
    swiper () {
      return this.$refs.list.swiper
    }
  },
  created () {
    this.fetchHero()
  }
 }
</script>

<style lang="scss">
// import scss var
@import '@/assets/css/_var.scss';
.top-bar {
  position: sticky;
  top: 0;
  z-index: 999;
  img {
    border-radius: 0.1rem;
  }
}
.banner {
  width: 100%;
  height: 50vw;
  background: #fff no-repeat top center;
  background-size: auto 100%;
  .info {
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
  }
  .scores {
    .badge {
      display: inline-block;
      font-size: 0.24rem;
      line-height: 0.24rem;
      text-align: center;
      vertical-align: middle;
      width: 0.3rem;
      height: 0.3rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 100%;
    }
  }
}
.skills {
  .icons img {
    width: 1.2rem;
    height: 1.2rem;
    border: 2.5px solid transparent;
    border-radius: 45%;
    &.active {
      border-color: map-get($colors, 'primary')
    }
  }
}
.items {
  img {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
  }
}
</style>