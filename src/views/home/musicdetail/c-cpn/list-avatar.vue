<template>
  <div class="list-avatar animate__animated animate__backInLeft">
    <swiper 
      :effect="'cards'" 
      :grabCursor="true" 
      :modules="modules" 
      class="swiper"
      :preload-images="true"
      :lazy="true"
      :slides-per-view="1"
      :space-between="0"
      :initial-slide="0"
    >
      <swiper-slide>
        <img 
          class="img" 
          :src="getOptimizedImageUrl(playList.coverImgUrl)" 
          alt="图片信息" 
          loading="eager"
        />
      </swiper-slide>
      <template v-for="item in visibleTracks" :key="item.id">
        <swiper-slide>
          <img 
            :src="getOptimizedImageUrl(item.al.picUrl)" 
            :alt="item.name" 
            loading="lazy"
          />
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { EffectCards } from 'swiper'
// swiper
const modules = ref([EffectCards])

interface Props {
  playList: {
    coverImgUrl: string
    tracks: Array<{
      id: number
      name: string
      al: {
        picUrl: string
      }
    }>
  }
}

const props = defineProps<Props>()

// 优化图片URL，添加尺寸参数，减少图片大小
const getOptimizedImageUrl = (url: string | undefined): string => {
  if (!url) return ''
  // 检查是否已经有尺寸参数
  if (url.includes('?param=')) return url
  // 添加合适的尺寸参数，根据组件大小调整
  return `${url}?param=200y200`
}

// 只显示前10首歌曲的图片，避免一次性加载过多图片
const visibleTracks = computed(() => {
  return props.playList.tracks?.slice(0, 10) || []
})
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
