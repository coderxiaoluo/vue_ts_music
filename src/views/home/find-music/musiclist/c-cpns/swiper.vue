<template>
  <div class="swiper">
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
      <swiper-slide>
        <img src="@/assets/img/dm1.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/dm2.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/dm3.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/dm4.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/dm5.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/dm6.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/dm7.jpg" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCreative, Autoplay, Navigation } from 'swiper'
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
