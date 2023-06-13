<template>
  <div class="musiclist">
    <!-- 轮播图 -->
    <Swiper />
    <!-- musicListNavBar -->
    <ListNavbar :tagAll="tagAll" :rightTag="rightTag" />
  </div>
</template>

<script setup lang="ts">
import Swiper from './c-cpns/swiper.vue'
import ListNavbar from './c-cpns/list-navbar.vue'
import { useMusicListStore } from '@/stores/music-list'
import { storeToRefs } from 'pinia'

// 发送请求
const musiclistStore = useMusicListStore()
// 获取全部歌单tags 左侧
musiclistStore.getCatListDataAction()
// 获取右侧tags
musiclistStore.getHotPlayListDataAction()

const { tagAll, rightTag } = storeToRefs(musiclistStore)
</script>

<style lang="less" scoped>
.musiclist {
  width: 100%;
  height: 100%;
  // background: url('@/assets/img/dm3.png') no-repeat 20% 100%/ 100% 100%;
}
</style>
