<template>
  <div class="aside">
    <!-- 左侧顶部 logo 以及 标题 -->
    <Logo></Logo>
    <!-- menu -->
    <el-menu :collapse="isFold" router default-active="1" class="menu">
      <el-menu-item index="1">
        <el-icon><User /></el-icon>
        <span>发现音乐</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><VideoPlay /></el-icon>
        <span>视频</span>
      </el-menu-item>
      <el-sub-menu index="3">
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
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const settingStore = useSettingStore()
// 折叠变量
const { isFold } = storeToRefs(settingStore)
</script>

<style lang="less" scoped>
.aside {
  height: 100%;
}
.el-menu {
  --el-menu-bg-color: var(--music-bgc-primary);
  --el-menu-text-color:var(--music-logo-bgc)
  height: calc(100vh - 60px);
  --el-menu-border-color:none;
  color: var(--music-search-color);
}
// /选中时的背景颜色
:deep(.el-menu-item.is-active) {
  background-color: #e5eaf3;
  // color: var(--music-aside-active-text);
  border-left: 3px solid var(--music-header-right);
}
</style>
