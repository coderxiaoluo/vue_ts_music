<template>
  <div class="find-music">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="/findmusic/recommend"></el-tab-pane>
      <el-tab-pane label="歌单" name="/findmusic/musiclist"></el-tab-pane>
      <el-tab-pane label="排行榜" name="/findmusic/ranking"></el-tab-pane>
      <el-tab-pane label="歌手" name="/findmusic/singer"></el-tab-pane>
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
import { useRouter } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import { localCache } from '@/utils/localCache'

const activeName = ref(localCache.getCache('tabPath') ?? '/findmusic/recommend')

// 切换路由
const router = useRouter()
const handleClick = (tab: any, event: Event) => {
  const path = tab.props.name
  localCache.setCache('tabPath', path)
  router.push({ path })
}
// 路由持久化
</script>

<style lang="less" scoped>
.find-music {
}
:deep(.el-tabs__nav-wrap::after) {
  height: 0;
}

.context {
  width: 100%;
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
</style>
