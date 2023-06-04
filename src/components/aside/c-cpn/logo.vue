<template>
  <div class="logo">
    <img :src="logo.logoimg" alt="" />
    <h1>{{ logo.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import logo from '@/logo'
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  height: 60px;
  background-color: var(--music-bgc-primary);
  img {
    width: 50px;
    height: 50px;
  }
  h1 {
    font-size: 20px;
    color: #ffffff;
    font-weight: 900;
  }
}
</style>
