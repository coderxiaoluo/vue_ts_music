<template>
  <div class="right">
    <!-- 按钮 -->
    <div class="buttons">
      <el-badge is-dot class="badge">
        <el-button icon="BellFilled" circle />
      </el-badge>
      <el-button icon="RefreshLeft" circle />
      <el-button icon="FullScreen" circle />
      <el-button icon="Setting" circle />
    </div>
    <!-- 用户信息组件 -->
    <userInfo />
  </div>
</template>

<script setup lang="ts">
// 引入用户信息组件
import userInfo from '../user-info/user-info.vue'
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
      color: var(--music-header-right);
    }
  }
}
</style>
