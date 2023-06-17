<template>
  <div class="swiper animate__animated animate__jackInTheBox">
    <swiper
      :grabCursor="true"
      :effect="'creative'"
      :freeMode="true"
      :navigation="true"
      :autoplay="{
        delay: 2800,
        disableOnInteraction: true
      }"
      :creativeEffect="{
        prev: {
          shadow: true,
          origin: 'left center',
          translate: ['-5%', 0, -200],
          rotate: [0, 100, 0]
        },
        next: {
          origin: 'right center',
          translate: ['5%', 0, -200],
          rotate: [0, -100, 0]
        }
      }"
      :modules="modules"
      class="mySwiper3"
    >
      <template v-for="item in swiperList" :key="item.id">
        <swiper-slide>
          <img :src="imgURL(item.url)" :alt="item.desc" />
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCreative, Autoplay, Navigation } from 'swiper'
// 引入图片
import { swiperList } from '@/assets/data/musiclist-swiper'
// img
import { imgURL } from '@/utils/img-url'
// swiper modules
const modules = ref([EffectCreative, Autoplay, Navigation])
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  .swiper-button-next:after,
  .swiper-button-prev:after {
    color: red;
    --swiper-theme-color: red;
    --swiper-navigation-color: red;
  }
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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
