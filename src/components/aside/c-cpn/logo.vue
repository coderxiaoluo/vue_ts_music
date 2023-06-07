<template>
  <div class="logo">
    <img v-if="isFold" :src="logo.logoimg" alt="logo" />
    <img class="img2" v-else :src="logo.logoimg2" alt="logo" />

    <h1 v-if="!isFold">{{ logo.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import logo from '@/logo'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
const settingStore = useSettingStore()
const { isFold } = storeToRefs(settingStore)
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: var(--music-logo-bgc);
  box-sizing: border-box;
  img {
    width: 50px;
    height: 50px;
    margin-left: 5px;
  }
  .img2 {
    width: 40px;
    height: 40px;
  }
  h1 {
    font-size: 20px;
    // color: var(--music-aside-bgc);
    color: #ffffff;

    font-weight: 900;
  }
}
</style>
