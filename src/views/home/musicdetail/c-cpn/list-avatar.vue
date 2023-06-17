<template>
  <div class="list-avatar">
    <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="swiper">
      <swiper-slide> <img class="img" :src="playList.coverImgUrl" alt="图片信息" /></swiper-slide>
      <template v-for="item in playList.tracks" :key="item.id">
        <swiper-slide>
          <img :src="item.al.picUrl" :alt="item.name" />
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { EffectCards } from 'swiper'
// swiper
const modules = ref([EffectCards])

interface Props {
  playList: any
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.list-avatar {
  width: 200px;
  height: 200px;
  .swiper {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
