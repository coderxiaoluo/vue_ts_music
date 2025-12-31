<template>
  <div class="find-music">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" :lazy="true">
      <el-tab-pane v-for="item in tabList" :key="item.path" :name="item.path" :lazy="true">
        <template #label>
          <span class="custom-tabs-label">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span class="text">{{ item.label }}</span>
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
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import { localCache } from '@/utils/localCache'

// 定义tab列表数据
const tabList = [
  { label: '个性推荐', path: '/findmusic/recommend', icon: '#icon-feiji' },
  { label: '歌单', path: '/findmusic/musiclist', icon: '#icon-duolaameng-' },
  { label: '排行榜', path: '/findmusic/ranking', icon: '#icon-pikachu-' },
  { label: '歌手', path: '/findmusic/singer', icon: '#icon-feiji1' }
]

const router = useRouter()
const route = useRoute()

// 初始化activeName，优先使用当前路由路径，其次使用缓存，最后使用默认值
const activeName = ref(route.path || localCache.getCache('tabPaths') || '/findmusic/recommend')

// 监听路由变化，自动更新activeName
watch(
  () => route.path,
  (newPath) => {
    activeName.value = newPath
    localCache.setCache('tabPaths', newPath)
  }
)

// 处理tab点击事件
const handleClick = (tab: TabsPaneContext, event: Event) => {
  const path = tab.props.name as string
  // 路由持久化
  localCache.setCache('tabPaths', path)
  // 如果当前路由与目标路由不同，才进行跳转
  if (route.path !== path) {
    router.push({ path })
  }
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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.demo-tabs {
  :deep(.el-tab-pane) {
    padding: 0;
  }

  :deep(.el-tabs__nav-wrap.is-top) {
    // 可以在这里添加自定义样式
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

  // 激活状态样式
  :deep(.el-tabs__item.is-active) {
    .text {
      color: #1890ff;
      font-weight: 500;
    }
  }
}
</style>
