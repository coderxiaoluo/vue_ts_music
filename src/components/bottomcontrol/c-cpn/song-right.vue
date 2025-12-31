<template>
  <div class="right">
    <!-- icon-bofangliebiao -->
    <div class="volumeControl">
      <!-- 音量 -->
      <svg @click="onVolumeClick(true)" v-if="isVolume" class="icon volumeicon" aria-hidden="true">
        <use xlink:href="#icon-yinliang"></use>
      </svg>
      <svg @click="onVolumeClick(false)" v-else class="icon volumeicon" aria-hidden="true">
        <use xlink:href="#icon-shengyinjingyin"></use>
      </svg>
      <!-- 音量 滑块-->
      <el-slider @input="onInputVolume" class="slider" :max="100" :min="0" v-model="volume" size="small" />
      <!-- 列表 -->
      <div class="playList">
        <svg @click="handlePLayListClick" class="icon playicon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </div>
    <!-- 备案 -->
    <div class="filings">渝ICP备20230613号</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['emit-volume', 'emit-play-list', 'on-mute-volume'])

// 音量
const isVolume = ref(true)
const volume = ref(50)
const onInputVolume = (v: any) => {
  if (v !== 0) isVolume.value = true
  if (v == 0) isVolume.value = false
  emits('emit-volume', (v / 100).toFixed(1))
}
// 是否静音
const onVolumeClick = (v: boolean) => {
  if (v) {
    volume.value = 0
    isVolume.value = false
  } else {
    volume.value = 50
    isVolume.value = true
  }
  emits('on-mute-volume', v)
}

// 点击展开右侧列表
const handlePLayListClick = () => {
  emits('emit-play-list')
}
</script>

<style lang="less" scoped>
.right {
  width: 280px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20px;

  .volumeControl {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    width: 200px;

    .volumeicon {
      margin: 0 5px;
      width: 20px;
      height: 20px;
    }

    .slider {
      margin: 0 10px;
      width: 90px;
    }

    .playList {
      width: 18px;
      height: 18px;
      margin: 0 5px;

      .playicon {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }

  .filings {
    font-size: 10px;
    margin-right: 30px;
  }
}
</style>
