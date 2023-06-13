<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <Swiper />
    <!-- 推荐歌单 -->
    <SongLists :songList="songList" :isRender="true" :isTitle="true" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Swiper from './c-cpn/swiper.vue'
import SongLists from '@/components/song-list/song-lists.vue'
// store仓库
import { useRecommendStore } from '@/stores/recommend'
const recommendStore = useRecommendStore()

const { songList } = storeToRefs(recommendStore)
</script>

<style lang="less" scoped>
.recommend {
  height: 100%;
}
</style>
