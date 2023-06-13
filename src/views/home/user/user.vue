<template>
  <div class="user">
    <img :src="profile.backgroundUrl" alt="" style="width: 100px" />
    {{ profile.lastLoginIP }}
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'
// import { getUserLoginIP } from '@/services/modules/user'

// import { ref } from 'vue'
// 获取store
const loginStore = useLoginStore()

const { profile } = storeToRefs(loginStore)
// const res = getUserLoginIP(profile.value.lastLoginIP)
// console.log(res)
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 100vh;
  background: url('@/assets/img/dm2.png') no-repeat 20% 100%/ 100% 100%;
}
</style>
