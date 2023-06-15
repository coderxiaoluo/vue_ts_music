<template>
  <div class="user">
    <img :src="userProfile?.backgroundUrl" style="width: 100%; height: 300px" alt="" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const route = useRoute()

// 获取用户id
const userId = ref<any>(route.params.id)
userStore.getUserInfoAction(userId.value)
watch(route, (newValue) => {
  const newUserId: any = newValue.params.id
  // 获取用户详情信息
  userStore.getUserInfoAction(newUserId)
})

const { userProfile } = storeToRefs(userStore)
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 100vh;
}
</style>
