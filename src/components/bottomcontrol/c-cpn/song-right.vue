<template>
  <div class="right">
    <div class="right-content">
      <!-- 音量控制 -->
      <div class="volume-control">
        <!-- 音量图标 -->
        <div class="volume-icon" @click="toggleMute">
          <svg v-if="isVolume" class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinliang"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-shengyinjingyin"></use>
          </svg>
        </div>
        <!-- 音量滑块 -->
        <el-slider class="volume-slider" :max="100" :min="0" v-model="volume" size="small"
          @input="handleVolumeChange" />
      </div>

      <!-- 播放列表按钮 -->
      <div class="playlist-btn" @click="handlePlayListClick">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </div>

    <!-- 备案信息 -->
    <div class="filings">渝ICP备20230613号</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['emit-volume', 'emit-play-list', 'on-mute-volume'])

// 音量状态
const volume = ref(70) // 默认音量调整为70，增大初始音量
const isVolume = ref(true)
let previousVolume = ref(70) // 保存之前的音量值，用于恢复

// 切换静音状态
const toggleMute = () => {
  if (isVolume.value) {
    // 静音时保存当前音量
    previousVolume.value = volume.value
    volume.value = 0
    isVolume.value = false
  } else {
    // 取消静音时恢复之前的音量
    volume.value = previousVolume.value
    isVolume.value = true
  }
  // 传递当前音量值，而不是布尔值
  emits('emit-volume', volume.value / 100)
}

// 处理音量变化
const handleVolumeChange = (value: number) => {
  isVolume.value = value !== 0
  if (value > 0) {
    previousVolume.value = value // 更新之前的音量值
  }
  // 直接传递数字，不转换为字符串
  emits('emit-volume', value / 100)
}

// 打开播放列表
const handlePlayListClick = () => {
  emits('emit-play-list')
}
</script>

<style lang="less" scoped>
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;

  .right-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }

  .volume-control {
    display: flex;
    align-items: center;
    gap: 6px;

    .volume-icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }

      .icon {
        width: 18px;
        height: 18px;
        color: #666;
      }
    }

    .volume-slider {
      width: 70px;
      flex-shrink: 0;

      :deep(.el-slider__button-wrapper) {
        --el-slider-button-size: 10px;
      }
    }
  }

  .playlist-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }

    .icon {
      width: 18px;
      height: 18px;
      color: #666;
    }
  }

  .filings {
    font-size: 10px;
    color: #999;
    margin-top: 2px;
    margin-right: 3px;
  }
}
</style>
