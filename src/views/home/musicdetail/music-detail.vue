<template>
  <div class="music-detail"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'
import { useMusicDetailStore } from '@/stores/music-detail'

const loginStore = useLoginStore()

const musicDetailStore = useMusicDetailStore()

const route = useRoute()
// 拿到歌单id
const musicId = ref<any>(route.params.id)
// isStatus ：判断是否登录的变量
const { isStatus } = storeToRefs(loginStore)
// 用户登录才能拿到全部歌单
if (isStatus.value) {
  // 登录了
  musicDetailStore.getTrackAllDataAction(musicId.value)
  musicDetailStore.getDetailsDataListAllAction(musicId.value)
} else {
  // 没有登录
}
</script>

<style lang="less" scoped></style>
