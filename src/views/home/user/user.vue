<template>
  <div class="user">
    <div class="left">123</div>
    <div class="right">123123123</div>
    <img :src="userProfile.avatarUrl" alt="" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const route = useRoute()

// 获取用户id
const userId = ref<any>(route.params.id)
userStore.getUserInfoAction(userId.value)

const { userProfile } = storeToRefs(userStore)
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 100vh;
}

.left {
}

.right {
}
</style>
