<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏组件 -->
      <el-aside :width="isFold ? '60px' : '200px'">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 顶部组件 -->
          <Header></Header>
        </el-header>
        <!-- 主体内容 -->
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// 顶部组件
import Header from '@/components/header/header.vue'
// 侧边栏组件
import Aside from '@/components/aside/aside.vue'
// 主体组件
import Main from '@/components/main/Main.vue'
// 拿到store
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

import { useRecommendStore } from '@/stores/recommend'

// 判断侧边栏展开
const settingStore = useSettingStore()
const { isFold } = storeToRefs(settingStore)

// 发送banner轮播图请求  也可以直接再个性推荐组件中发送，但每次切换都会发送一次，消耗性能
const recommendStore = useRecommendStore()
recommendStore.getBannerDataAction()
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;
  }
  // 顶部
  .el-header {
    padding: 0;
    background-color: var(--music-bgc-primary);
  }
  // 侧边栏
  .el-aside {
    height: 100%;
    background-color: var(--music-aside-bgc);
    transition: all 0.5s;
  }
  // 主体
  .el-main {
    padding: 0;
  }
}
</style>
