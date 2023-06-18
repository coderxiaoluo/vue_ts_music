<template>
  <div class="logo" @click="onHomeClick">
    <img v-if="isFold" :src="logo.logoimg" alt="logo" />
    <img class="img2" v-else :src="logo.logoimg2" alt="logo" />
    <h1 v-if="!isFold">{{ logo.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import logo from '@/logo'
import { storeToRefs } from 'pinia'
import { formatMonthDay } from '@/utils/formatplay'

import { useSettingStore } from '@/stores/setting'
// ele信息组件
import { ElMessage } from 'element-plus'

const settingStore = useSettingStore()
const { isFold } = storeToRefs(settingStore)

// logo点击
const onHomeClick = () => {
  // ElMessage({
  //   message: '生活不是电影!',
  //   type: 'success'
  // })
  ElMessage({
    message: h('div', null, [
      h('span', { style: 'color: #0a90e3' }, '当前时间: '),
      h('i', { style: 'color: teal' }, formatMonthDay(new Date().getTime(), 'YYYY年MM月-HH:mm'))
    ])
  })
}
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: var(--music-logo-bgc);
  box-sizing: border-box;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    margin-left: 10px;
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
