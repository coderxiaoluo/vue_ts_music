<template>
  <div class="aside">
    <!-- 左侧顶部 logo 以及 标题 -->
    <Logo></Logo>
    <!-- menu -->
    <el-menu
      :collapse="isFold"
      router
      :default-active="defaultRoute"
      class="menu"
      @select="onChangeClick"
    >
      <el-menu-item index="/findmusic/recommend">
        <el-icon><User /></el-icon>
        <span>发现音乐</span>
      </el-menu-item>
      <el-menu-item index="/findmusic/video">
        <el-icon><VideoPlay /></el-icon>
        <span>视频</span>
      </el-menu-item>
      <el-sub-menu index="/findmusic/recommend">
        <template #title>
          <el-icon><location /></el-icon>
          <span>创建的歌单</span>
        </template>
        <el-menu-item index="3-1">item one</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import Logo from './c-cpn/logo.vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { localCache } from '@/utils/localCache'

const settingStore = useSettingStore()
// 折叠变量
const { isFold } = storeToRefs(settingStore)

const onChangeClick = (v: any) => {
  // console.log(v)
}

// router持久化
const defaultRoute = ref(localCache.getCache('menuPath') ?? '/findmusic/recommend')
const route = useRoute()
watch(route, (newVal) => {
  localCache.setCache('menuPath', newVal.path)
  defaultRoute.value = newVal.path
})
</script>

<style lang="less" scoped>
.aside {
  height: 100%;
}
.el-menu {
  --el-menu-bg-color: #ffffff;
  --el-menu-text-color: #000000;
  height: calc(100vh - 60px);
  --el-menu-border-color: none;
  color: var(--music-search-color);
}

.el-menu-item {
  &:hover {
    background-color: #a59a9a;
  }
}
// /选中时的背景颜色
:deep(.el-menu-item.is-active) {
  background-color: #e9e6e6;
  // color: var(--music-aside-active-text);
  color: #000000;
  border-left: 3px solid #4d84fe;
}
</style>
