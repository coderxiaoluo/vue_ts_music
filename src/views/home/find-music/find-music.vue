<template>
  <div class="find-music">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" :lazy="true" tab-position="top">
      <el-tab-pane name="/findmusic/recommend">
        <template #label>
          <span class="custom-tabs-label">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-feiji"></use>
            </svg>
            <span class="text">个性推荐</span>
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="/findmusic/musiclist">
        <template #label>
          <span class="custom-tabs-label">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-duolaameng-"></use>
            </svg>
            <span class="text">歌单</span>
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="/findmusic/ranking">
        <template #label>
          <span class="custom-tabs-label">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pikachu-"></use>
            </svg>
            <span class="text">排行榜</span>
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="/findmusic/singer">
        <template #label>
          <span class="custom-tabs-label">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-feiji1"></use>
            </svg>
            <span class="text">歌手</span>
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
import { useRouter } from 'vue-router'
// import type { TabsPaneContext } from 'element-plus'
import { localCache } from '@/utils/localCache'

const activeName = ref(localCache.getCache('tabPaths')) ?? ref('/findmusic/recommend')

// 切换路由
const router = useRouter()
const handleClick = (tab: any, event: Event) => {
  const path = tab.props.name
  // 路由持久化
  localCache.setCache('tabPaths', path)
  router.push({ path })
}
</script>

<style lang="less" scoped>
:deep(.el-tabs__nav-wrap::after) {
  height: 0;
}

.context {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f8f5f5;
  padding: 20px;
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
