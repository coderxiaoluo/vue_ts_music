<template>
  <div class="header">
    <div class="left">
      <!-- 是否展开侧边栏 -->
      <el-icon><Expand /></el-icon>
      <!-- 搜索框 -->
      <el-input
        v-model="searchValue"
        class="w-50 m-2"
        placeholder="搜索音乐"
        prefix-icon="Search"
      />
    </div>
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
      <!-- 用户信息 -->
      <div class="user-info">
        <template v-if="false">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <!-- 登录后展示 -->
          <el-dropdown class="dropdown">
            <span class="el-dropdown-link">
              小罗
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <!-- 登录 -->
        <template v-else>
          <el-button plain class="loginBtn" round>登录</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 搜索文本
const searchValue = ref('')
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  // background-color: red;
  box-sizing: border-box;

  .left {
    display: flex;
    align-items: center;
    width: 200px;
    height: 100%;
    .el-icon {
      font-size: 20px;
      color: #ffffff;
      margin: 0 10px;
    }
    .el-input {
      --el-input-bg-color: transparent;
      --el-border-color: transparent;
      --el-input-focus-border-color: transparent;
    }
    :deep(.el-input__prefix-inner) {
      font-size: 20px;
    }
    :deep(.el-input__inner) {
      color: #ffffff;
    }
  }
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
    .user-info {
      display: flex;
      align-items: center;

      .el-avatar {
        width: 30px;
        height: 30px;
        margin-right: 10px;

        .dropdown {
          color: #ffffff;
        }
      }
      .loginBtn {
        width: 100px;
      }
    }
  }
}
</style>
