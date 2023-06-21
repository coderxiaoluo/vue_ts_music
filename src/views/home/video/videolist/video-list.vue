<template>
  <div class="video-list">
    <div class="video-top">
      <vue3VideoPlay class="videoPlay" v-bind="videoOption" :poster="posterImg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import video1 from '@/assets/video/video1.mp4'
import posterImg from '@/assets/img/dm14.jpg'
const videoOption = reactive({
  width: '80%', //播放器高度
  height: '350px', //播放器高度
  color: '#409eff', //主题色
  title: 'xiaoluo', //视频名称
  src: video1, //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: true, //镜像画面
  ligthOff: true, //关灯模式
  volume: 0.5, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    'audioTrack',
    'quality',
    'speedRate',
    'volume',
    'setting',
    'pip',
    'pageFullScreen',
    'fullScreen'
  ] //显示所有按钮,
})
</script>

<style lang="less" scoped>
.video-list {
  padding: 20px;
  box-sizing: border-box;
}
.video-top {
  display: flex;
  align-items: center;
  justify-content: center;

  .videoPlay {
    text-align: center;
  }
}
</style>
