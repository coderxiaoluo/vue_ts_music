<template>
  <!-- swiper -->
  <div class="swiper">
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :freeMode="true"
      :pagination="{
        clickable: true
      }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true
      }"
      :modules="modules"
      class="mySwiper"
    >
      <template v-for="item in bannerList" :key="item.imageUrl">
        <swiper-slide>
          <img :src="item.imageUrl" alt="" />
          <span :style="{ backgroundColor: item.titleColor }">{{ item.typeTitle }}</span>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { storeToRefs } from 'pinia'
// recommendStroe 仓库
import { useRecommendStore } from '@/stores/recommend'
// 引入swiper组件
import { Autoplay, Pagination, Navigation } from 'swiper'

// swiper modules
const modules = ref([Autoplay, Pagination, Navigation])

const recommendStore = useRecommendStore()
const { bannerList } = storeToRefs(recommendStore)
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  height: 200px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    color: #ffffff;
    padding: 2px;
    border-radius: 5px 0 5px 0;
  }
}
</style>
