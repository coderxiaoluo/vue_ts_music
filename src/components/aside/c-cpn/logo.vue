<template>
  <div class="logo" @click="onHomeClick">
    <img v-if="!isFold" :src="logo.logoimg2" alt="logo" />
    <img class="img2" v-else :src="logo.logoimg" alt="logo" />
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
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }

  .img2 {
    width: 50px;
    height: 50px;
  }

  h1 {
    font-size: 20px;
    font-weight: 900;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 10px rgba(102, 126, 234, 0.5),
      0 0 20px rgba(118, 75, 162, 0.3),
      0 0 30px rgba(240, 147, 251, 0.2);
    animation: glow 2s ease-in-out infinite alternate;
    margin-left: 10px;
  }

  @keyframes glow {
    from {
      filter: brightness(1);
      text-shadow: 0 0 10px rgba(102, 126, 234, 0.5),
        0 0 20px rgba(118, 75, 162, 0.3),
        0 0 30px rgba(240, 147, 251, 0.2);
    }

    to {
      filter: brightness(1.2);
      text-shadow: 0 0 20px rgba(102, 126, 234, 0.8),
        0 0 30px rgba(118, 75, 162, 0.5),
        0 0 40px rgba(240, 147, 251, 0.3);
    }
  }
}
</style>
