<template>
  <div class="right">
    <!-- 按钮 -->
    <div class="buttons">
      <el-badge is-dot class="badge">
        <el-button icon="BellFilled" circle />
      </el-badge>
      <el-button icon="RefreshLeft" circle @click="onRefreshClick" />
      <el-button icon="FullScreen" circle @click="onChangeFullScreen" />
      <el-button icon="Setting" circle />
    </div>
    <!-- 用户信息组件 -->
    <userInfo />
  </div>
</template>

<script setup lang="ts">
// 引入用户信息组件
import { storeToRefs } from 'pinia'
import userInfo from '../user-info/user-info.vue'
import { useSettingStore } from '@/stores/setting'

const seetingStore = useSettingStore()

const { isRefresh } = storeToRefs(seetingStore)
// 刷新按钮
const onRefreshClick = () => {
  isRefresh.value = false
}

// 全屏按钮
const onChangeFullScreen = () => {
  // document.fullscreenEnabled 浏览器是否支持全屏
  // DOM属性 ：用于判断当前是否处于全屏模式 返回值boolean
  const full = document.fullscreenElement
  // 不是全屏模式
  if (!full) {
    // 进入全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
</script>

<style lang="less" scoped>
.right {
  display: flex;
  align-items: center;
  margin-right: 20px;
  .buttons {
    .badge {
      margin-right: 10px;
    }
    .el-button {
      background-color: transparent;
      border: transparent;
      font-size: 18px;
      color: #ffffff;
    }
  }
}
</style>
