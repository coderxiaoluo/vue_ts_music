<template>
  <div class="main">
    <!-- 路由 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="isRefresh" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue'
// 拿到store
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

// 判断侧边栏展开
const settingStore = useSettingStore()
const { isRefresh } = storeToRefs(settingStore)
// 刷新
watch(isRefresh, () => {
  nextTick(() => {
    isRefresh.value = true
  })
})
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // background-color: #e8e0e0;
  padding: 20px;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
