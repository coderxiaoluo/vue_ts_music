<template>
  <div class="left">
    <!-- 是否展开侧边栏 -->
    <el-icon @click="onChangeIconClick" class="Fold">
      <component :is="settingStore.isFold ? 'Fold' : 'Expand'"></component>
    </el-icon>

    <!-- 搜索框 -->
    <el-input v-model="searchValue" class="w-50 m-2" placeholder="搜索音乐" prefix-icon="Search" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 引入setting仓库
import { useSettingStore } from '@/stores/setting'
// 拿到setting仓库
const settingStore = useSettingStore()

// 搜索文本
const searchValue = ref('')

// 折叠图标
const onChangeIconClick = () => {
  // 调用setting仓库函数 修改isFold变量
  settingStore.setiSFold()
}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  width: 200px;
  height: 100%;
  .el-icon {
    font-size: 20px;
    color: var(--music-search-color);
    margin: 0 10px;
    cursor: pointer;
  }
  .el-input {
    --el-input-bg-color: transparent;
    --el-border-color: transparent;
    --el-input-focus-border-color: transparent;
  }
  :deep(.el-input__prefix-inner) {
    font-size: 20px;
    color: var(--music-search-color);
  }
  :deep(.el-input__inner) {
    color: var(--music-search-color);
  }
}
</style>
