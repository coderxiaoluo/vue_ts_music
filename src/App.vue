<template>
  <div class="app">
    <!-- 路由展示  -->
    <router-view> </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import WOW from 'wow.js'
onMounted(() => {
  new WOW().init()
})
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
