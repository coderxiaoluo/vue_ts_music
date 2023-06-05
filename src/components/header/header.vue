<template>
  <div class="header">
    <!-- 左边部分 -->
    <HeaderLeft></HeaderLeft>
    <!-- 右边部分 -->
    <HeaderRight></HeaderRight>
  </div>
</template>

<script setup lang="ts">
// 折叠和搜索
import HeaderLeft from './c-cpn/header-left/header-left.vue'
// 设置和用户
import HeaderRight from './c-cpn/header-right/header-right.vue'
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
}
</style>
