<template>
  <div class="data-list">
    <TableList v-if="isStatus" :LOADING="LOADING" :musicList="songsAll" />
    <TableList v-else :LOADING="LOADING" :musicList="tracksList" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useMusicDetailStore } from '@/stores/music-detail'
import TableList from './c-cpn/table-list.vue'

// musicDetailStore仓库
const musicDetailStore = useMusicDetailStore()
// loginStore仓库
const loginStore = useLoginStore()
// 展示信息
const { playList, tracksList, songsAll, LOADING } = storeToRefs(musicDetailStore)
console.log(playList)
console.log(songsAll)
// isStatus ：判断是否登录的变量
const { isStatus } = storeToRefs(loginStore)
</script>

<style lang="less" scoped>
.data-list {
  width: 100%;
}
</style>
