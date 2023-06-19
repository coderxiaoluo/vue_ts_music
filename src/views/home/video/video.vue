<template>
  <div class="video">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane name="/video/video-list">
        <template #label>
          <span class="custom-tabs-label">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shipin"></use>
            </svg>
            <span class="text">视频</span>
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="/video/mv-list">
        <template #label>
          <span class="custom-tabs-label">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-MV"></use>
            </svg>
            <span class="text">MV</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="context">
      <!-- 路由动画 -->
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import type { TabsPaneContext } from 'element-plus'
import { localCache } from '@/utils/localCache'
import router from '@/routes'

const activeName = ref(localCache.getCache('video-router')) ?? '/video/video-list'

const handleClick = (tab: any) => {
  const path = tab.props.name
  // 路由持久化
  localCache.setCache('video-router', path)
  router.push({
    path
  })
}
</script>

<style lang="less" scoped>
:deep(.el-tabs__nav-wrap::after) {
  height: 0;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 2s;
}
.fade-enter-to {
  opacity: 1;
}

.demo-tabs {
  .el-tab-pane {
    padding: none;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin: 0 3px;
  }
  .text {
    font-size: 17px;
    color: #000;
  }
}
</style>
