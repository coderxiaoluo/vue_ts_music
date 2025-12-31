<template>
  <div class="bottom-control">
    <audio ref="audioEl" v-show="false" :src="currentMusicUrl" controls @play="onPlay" @pause="onPause"
      @ended="overAudio" @canplay="canplayLoad" @timeupdate="onTimeupDateMusic">
    </audio>

    <!-- 左侧歌曲信息 -->
    <div class="left-section">
      <songLeft :currentMusic="currentMusic" />
    </div>

    <!-- 中间播放控制 -->
    <div class="center-section">
      <!-- 播放按钮 -->
      <div class="play-controls">
        <span class="control-btn" @click="onchangeMusicList">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="svgArr[svgIndex]"></use>
          </svg>
        </span>
        <span class="control-btn" @click="previousMusicClick">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangyishou1"></use>
          </svg>
        </span>
        <span class="control-btn play-main" @click="playPause">
          <svg v-if="!isShowPlay" class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang4"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </span>
        <span class="control-btn" @click="nextMusicClick">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiayishou1"></use>
          </svg>
        </span>
      </div>
      <!-- 进度条 -->
      <div class="progress-section">
        <!-- 开始时间 -->
        <div class="time-text current">
          <span>{{ currentDuration(currentTimes) }}</span>
        </div>
        <!-- 滑块 -->
        <div class="progress-slider">
          <el-slider @input="onInputTime" v-model="sliderbar" :show-tooltip="false" size="small"
            class="custom-slider" />
        </div>
        <!-- 结束时间 -->
        <div class="time-text">
          <span>{{ currentMusic.dt ? formatDuration(currentMusic.dt) : '00:00' }}</span>
        </div>
      </div>
    </div>

    <!-- 右侧音量和播放列表 -->
    <div class="right-section">
      <SongRight @emit-volume="onVolumeEmitClick" @emit-play-list="handlePLayListEmitClick" />
    </div>

    <!-- 播放列表抽屉 -->
    <el-drawer v-model="table" :modal="true" :lock-scroll="true" :z-index="78" :with-header="false" :show-close="false"
      :append-to-body="true" direction="rtl" size="28%" height="85%" class="playlist-drawer">
      <h2 class="songlist-title">
        <span v-if="playMusicData.length !== 0">{{ playMusicData.length }}首</span>
        <span v-else>暂无歌曲</span>
      </h2>
      <el-table class="playlist-table" :data="playMusicData" highlight-current-row :show-header="false" lazy
        element-loading-text="加载中..." style="width: 100%" :row-class-name="tableRowClassName"
        @row-dblclick="onPlayDbDrawerClick">
        <el-table-column class="music-name-col" width="180">
          <template #default="scope">
            <el-text truncated>{{ scope.row.name }}</el-text>
          </template>
        </el-table-column>
        <el-table-column class="artist-col" width="140">
          <template #default="scope">
            <el-text truncated>
              {{ scope.row.ar[0].name }}
              <span v-if="scope.row.ar[1]"> / {{ scope.row.ar[1].name }}</span>
            </el-text>
          </template>
        </el-table-column>
        <el-table-column class="duration-col" width="100">
          <template #default="scope">
            <span>{{ formatDuration(scope.row.dt) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

import { ElDrawer } from 'element-plus'

import { formatDuration, currentDuration } from '@/utils/formatplay'
import { randomMusic } from '@/utils/random'

import { usePlayMusicStore } from '@/stores/play-music'

import { useRecordStore } from '@/stores/record'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
// 左边
import songLeft from './c-cpn/song-left.vue'
// 右边
import SongRight from './c-cpn/song-right.vue'

const playMusicStore = usePlayMusicStore()

const recordStore = useRecordStore()

const { currentMusic, isShowPlay, playMusicData, currentMusicUrl } = storeToRefs(playMusicStore)
const { lyricTime } = storeToRefs(recordStore)

const table = ref(false)
// 拿到audio
const audioEl = ref()

// 抽取hook
// function songMusicHook(musicUrl: any) {
//   if (musicUrl.value.length == 0) return
// }

// 设置顺序播放  / 循环播放 / 随机播放 / 心动模式
const svgArr = ['#icon-shunxubofang', '#icon-danquxunhuan', '#icon-suijibofang']
let svgIndex = ref(0)

// 当前时间
const currentTime = ref(audioEl.value?.currentTime)
// 总时间
const durationTime = ref(audioEl.value?.duration)
// 百分比时间
const tmpOffsetTime = ref(0)

const onchangeMusicList = () => {
  svgIndex.value++
  if (svgIndex.value == svgArr.length) svgIndex.value = 0
}

// 音频准备就绪了
function canplayLoad() {
  audioEl.value.play()
}

// 优化的播放/暂停函数
const playPause = () => {
  if (!audioEl.value) return

  // 直接操作DOM，减少响应式依赖
  const audio = audioEl.value

  if (isShowPlay.value) {
    // 使用requestAnimationFrame确保DOM更新在浏览器下一次重绘前执行
    requestAnimationFrame(() => {
      audio.pause()
      isShowPlay.value = false
    })
  } else {
    requestAnimationFrame(() => {
      audio.play()
      isShowPlay.value = true
    })
  }
}

// 上一首
const previousMusicClick = () => {
  // 没有歌曲时直接返回
  if (!currentMusic.value.id) return
  // 当等于第一首时直接返回
  if (currentMusic.value.index == 0) {
    ElMessage({
      message: '当前已经是第一首了',
      type: 'warning'
    })
    return
  }
  // 顺序播放时
  if (svgIndex.value == 0) {
    const nextMusicInfo = ref(playMusicData.value[currentMusic.value.index - 1])
    playMusicStore.setCurrentMusic(nextMusicInfo.value)
    playMusicStore.getSongUrlAction(nextMusicInfo.value.id)
    // 拿到歌词
    recordStore.getLyricDataAction(nextMusicInfo.value.id)
  }

  // 2 表示单曲循环
  if (svgIndex.value == 1) {
    const nextMusicInfo = ref(playMusicData.value[currentMusic.value.index])
    // 改变当前播放
    playMusicStore.setCurrentMusic(nextMusicInfo.value)
    // 获取要播放的mp3
    playMusicStore.getSongUrlAction(nextMusicInfo.value.id)
  }
  // 3 表示随机播放
  if (svgIndex.value == 2) {
    let random = randomMusic(0, playMusicData.value.length - 1)
    playMusicStore.getSongUrlAction(playMusicData.value[random].id)
    playMusicStore.setCurrentMusic(playMusicData.value[random])
    // 拿到歌词
    recordStore.getLyricDataAction(playMusicData.value[random].id)
  }
}
// 下一首
const nextMusicClick = () => {
  // 没有歌曲时直接返回
  if (!currentMusic.value.id) return
  // 最后一首直接返回
  if (currentMusic.value.index == playMusicData.value.length - 1) {
    ElMessage({
      message: '当前已经是最后一首了',
      type: 'warning'
    })
    return
  }
  // 1 顺序播放
  if (svgIndex.value == 0) {
    const nextMusicInfo = ref(playMusicData.value[currentMusic.value.index + 1])
    playMusicStore.setCurrentMusic(nextMusicInfo.value)
    playMusicStore.getSongUrlAction(nextMusicInfo.value.id)
    // 拿到歌词
    recordStore.getLyricDataAction(nextMusicInfo.value.id)
  }
  // 2 表示单曲循环
  if (svgIndex.value == 1) {
    const nextMusicInfo = ref(playMusicData.value[currentMusic.value.index])
    // 改变当前播放
    playMusicStore.setCurrentMusic(nextMusicInfo.value)
    // 获取要播放的mp3
    playMusicStore.getSongUrlAction(nextMusicInfo.value.id)
  }
  // 3 表示随机播放
  if (svgIndex.value == 2) {
    let random = randomMusic(0, playMusicData.value.length - 1)
    playMusicStore.getSongUrlAction(playMusicData.value[random].id)
    playMusicStore.setCurrentMusic(playMusicData.value[random])
    // 拿到歌词
    recordStore.getLyricDataAction(playMusicData.value[random].id)
  }
}

// 滑块进度条业务逻辑
// 滑块进度
const sliderbar = ref(0)
let currentTimes = ref(0)
// 滑块事件
const onInputTime = (v: any) => {
  if (!currentMusic.value.id || !audioEl.value) return
  currentTimes.value = Math.floor(durationTime.value * (v / 100))
  audioEl.value.currentTime = Math.floor(durationTime.value * (v / 100))
}

// 当进度条改变了将值存储再store中 ，在唱片页中进行歌词匹配
watch(currentTimes, (newvalue) => {
  lyricTime.value = newvalue
})

// 点击展开右侧列表  emits
const handlePLayListEmitClick = () => {
  table.value = !table.value
}

// 点击侧边栏播放
const onPlayDbDrawerClick = (v: any) => {
  // v:拿到当前双击数据
  // 侧边栏双击这首 等于 播放这首就直接返回
  if (currentMusic.value.al?.id == v.id) return
  // 拿到点击这首发送请求拿到url
  playMusicStore.getSongUrlAction(v.id)
  // 改变播放的这首为点击的这首
  playMusicStore.setCurrentMusic(v)
}

// 给列表添加样式
function tableRowClassName({ row, rowIndex }: { row: any; rowIndex: any }) {
  if (currentMusic.value.id == row.id) {
    return 'back-row-index'
  } else {
    return ''
  }
}

// 开始播放
function onPlay() {
  isShowPlay.value = true
}
// 当音频暂停
function onPause() {
  isShowPlay.value = false
}
// 播放结束触发
function overAudio() {
  // 自动播放下一首
  // 当等于最后一首直接返回
  if (currentMusic.value.index == playMusicData.value.length - 1) return

  if (svgIndex.value == 0) {
    const nextMusicInfo = ref(playMusicData.value[currentMusic.value.index + 1])
    playMusicStore.setCurrentMusic(nextMusicInfo.value)
    playMusicStore.getSongUrlAction(nextMusicInfo.value.id)
    // 拿到歌词
    recordStore.getLyricDataAction(nextMusicInfo.value.id)
  }

  // 2 表示单曲循环
  if (svgIndex.value == 1) {
    const nextMusicInfo = ref(playMusicData.value[currentMusic.value.index])
    // 改变当前播放
    playMusicStore.setCurrentMusic(nextMusicInfo.value)
    // 获取要播放的mp3
    playMusicStore.getSongUrlAction(nextMusicInfo.value.id)
  }
  // 3 表示随机播放
  if (svgIndex.value == 2) {
    let random = randomMusic(0, playMusicData.value.length - 1)
    playMusicStore.getSongUrlAction(playMusicData.value[random].id)
    playMusicStore.setCurrentMusic(playMusicData.value[random])
    // 拿到歌词
    recordStore.getLyricDataAction(playMusicData.value[random].id)
  }
}
// 节流函数，限制函数执行频率
const throttle = (func: Function, delay: number) => {
  let lastCall = 0
  return function (...args: any[]) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func.apply(this, args)
    }
  }
}

// 使用节流优化的时间更新函数
const throttledTimeUpdate = throttle(() => {
  if (!audioEl.value) return

  // 格式化时间
  const currentTime = audioEl.value.currentTime
  const duration = audioEl.value.duration

  // 只有当音频有有效时长时才更新
  if (duration > 0) {
    currentTimes.value = currentTime
    const tmpTime = currentTime / duration
    const newOffset = Math.floor(100 * tmpTime)

    // 只有当值发生变化时才更新，减少不必要的响应式更新
    if (newOffset !== sliderbar.value) {
      sliderbar.value = newOffset
    }
  }
}, 100) // 每100ms执行一次，约10fps

// 当时间改变时触发
function onTimeupDateMusic() {
  throttledTimeUpdate()
}

// 音量
const onVolumeEmitClick = (v: number) => {
  if (audioEl.value) {
    // 确保音量值为数字类型
    audioEl.value.volume = typeof v === 'string' ? parseFloat(v) : v
  }
}
// 是否静音 - 已由右侧组件处理，这里可以保留但不再使用固定值
const onMuteEmitClick = (v: boolean) => {
  // 静音逻辑已由右侧组件通过emit-volume处理，这里可以留空或移除
  // 保留此函数是为了兼容现有的事件绑定
}
</script>

<style lang="less" scoped>
.bottom-control {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: 99;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

// 左侧歌曲信息
.left-section {
  flex: 0 0 auto;
  min-width: 220px;
  max-width: 320px;
  margin-right: auto;
  display: flex;
  align-items: center;
}

// 中间播放控制部分
.center-section {
  flex: 0 1 auto;
  min-width: 280px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  // 播放按钮容器
  .play-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    min-width: 260px;

    // 播放按钮样式
    .control-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.3s ease;
      background: transparent;
      border: none;
      position: relative;

      &:hover {
        background: rgba(0, 0, 0, 0.08);
        transform: scale(1.05);
      }

      // 主播放按钮样式
      &.play-main {
        width: 38px;
        height: 38px;
        background: #ec4141;
        box-shadow: 0 2px 6px rgba(236, 65, 65, 0.3);

        &:hover {
          background: #ff5252;
          transform: scale(1.1);
          box-shadow: 0 3px 10px rgba(236, 65, 65, 0.4);
        }

        .icon {
          color: #fff;
          width: 18px;
          height: 18px;
        }
      }

      // 图标样式
      .icon {
        width: 18px;
        height: 18px;
        color: #333;
        transition: all 0.3s ease;
      }
    }
  }

  // 进度条样式
  .progress-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;

    // 时间显示
    .time-text {
      font-size: 12px;
      color: #999;
      min-width: 42px;
      text-align: center;
      font-weight: 400;

      &.current {
        color: #ec4141;
        font-weight: 500;
      }
    }

    // 滑块容器
    .progress-slider {
      flex: 1;
      display: flex;
      align-items: center;
    }

    // 自定义滑块样式
    :deep(.custom-slider) {
      width: 100%;

      --el-slider-main-bg-color: #ec4141;
      --el-slider-bar-bg-color: #e5e5e5;
      --el-slider-button-size: 12px;
      --el-slider-height: 3px;
    }

    :deep(.el-slider__button-wrapper) {
      --el-slider-main-bg-color: #ec4141;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.3);
        box-shadow: 0 0 0 8px rgba(236, 65, 65, 0.1);
      }
    }
  }
}

// 右侧音量和播放列表控制
.right-section {
  flex: 0 0 auto;
  min-width: 220px;
  max-width: 320px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

// 播放列表抽屉样式
.playlist-drawer {
  :deep(.el-drawer__body) {
    padding: 24px;
    background: #fafafa;
  }
}

.songlist-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.playlist-table {
  :deep(.el-table__row) {
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  :deep(.back-row-index) {
    background: rgba(236, 65, 65, 0.1);

    .el-text {
      color: #ec4141;
      font-weight: 500;
    }
  }

  .el-text {
    cursor: pointer;
    font-size: 13px;
  }

  :deep(.el-table__cell) {
    padding: 12px 0;
    font-size: 13px;
    color: #333;
  }
}
</style>
