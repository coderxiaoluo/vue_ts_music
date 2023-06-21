<template>
  <div class="bottom-control">
    <audio
      ref="audioEl"
      v-show="false"
      :src="musicUrl[0]?.url"
      controls
      @play="onPlay"
      @pause="onPause"
      @ended="overAudio"
      @canplay="canplayLoad"
      @timeupdate="onTimeupDateMusic"
    ></audio>

    <!-- left部分 音乐 -->
    <songLeft :currentMusic="currentMusic" />
    <div class="center">
      <!-- 按钮相关 -->
      <div class="buttons">
        <span>
          <svg @click="onchangeMusicList" class="icon playicon" aria-hidden="true">
            <use :xlink:href="svgArr[svgIndex]"></use>
          </svg>
        </span>
        <span>
          <svg @click="previousMusicClick" class="icon playicon" aria-hidden="true">
            <use xlink:href="#icon-shangyishou1"></use>
          </svg>
        </span>
        <span>
          <svg v-if="!isShowPlay" @click="playPause" class="icon playicon" aria-hidden="true">
            <use xlink:href="#icon-bofang4"></use>
          </svg>
          <svg v-else @click="playPause" class="icon playicon" aria-hidden="true">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </span>
        <span>
          <svg @click="nextMusicClick" class="icon playicon" aria-hidden="true">
            <use xlink:href="#icon-xiayishou1"></use>
          </svg>
        </span>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <!-- 开始时间 -->
        <div class="currentTime">
          <span v-if="currentTimes !== 0">{{ currentDuration(currentTimes) }}</span>
          <span v-else>00:00</span>
        </div>
        <!-- 滑块 -->
        <div class="slider-demo-block">
          <el-slider @input="onInputTime" v-model="sliderbar" :show-tooltip="false" size="small" />
        </div>
        <!-- 结束时间 -->
        <div class="endTime" v-if="musicUrl[0]">{{ formatDuration(musicUrl[0]?.time) }}</div>
        <div class="endTime" v-else>00:00</div>
      </div>
    </div>

    <!-- right -->
    <SongRight
      @emit-volume="onVolumeEmitClick"
      @on-mute-volume="onMuteEmitClick"
      @emit-play-list="handlePLayListEmitClick"
    />
    <!-- 抽屉 -->
    <el-drawer
      v-model="table"
      :modal="true"
      :lock-scroll="true"
      :z-index="78"
      :with-header="false"
      :show-close="false"
      :append-to-body="true"
      direction="rtl"
      size="25%"
      height="83%"
    >
      <h2 class="songlist">
        <span v-if="playMusicData.length !== 0">{{ playMusicData.length }}首</span>
        <span class="start-text" v-else>忍者时代即将结束</span>
      </h2>
      <el-table
        class="table"
        :data="playMusicData"
        highlight-current-row
        :show-header="false"
        stripe
        lazy
        element-loading-text="加载中..."
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @row-dblclick="onPlayDbDrawerClick"
      >
        <el-table-column class="musicName" property="name" label="name" width="150">
          <template #default="scope">
            <el-text class="w-100px" truncated>{{ scope.row.name }}</el-text>
          </template>
        </el-table-column>
        <el-table-column property="ar" width="120">
          <template #default="scope">
            <el-text class="w-100px" truncated v-if="scope.row.ar[1]"
              >{{ scope.row.ar[0].name }} / {{ scope.row?.ar[1]?.name }}</el-text
            >
            <el-text v-else>{{ scope.row.ar[0].name }} </el-text>
          </template>
        </el-table-column>
        <el-table-column prop="dt" width="100">
          <template #default="scope">
            <span>{{ formatDuration(scope.row.dt) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

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

const { currentMusic, musicUrl, isShowPlay, playMusicData } = storeToRefs(playMusicStore)
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

// 点击开始播放
const playPause = () => {
  if (musicUrl.value.length == 0) return
  if (isShowPlay.value) {
    audioEl.value.pause()
    isShowPlay.value = false
  } else {
    audioEl.value.play()
    isShowPlay.value = true
  }
}

// 上一首
const previousMusicClick = () => {
  // 没有歌曲时直接返回
  if (musicUrl.value.length == 0) return
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
  if (musicUrl.value.length == 0) return
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
  if (musicUrl.value.length == 0) return
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
// 当时间改变时触发
function onTimeupDateMusic() {
  // 格式化时间
  currentTimes.value = audioEl.value?.currentTime
  // 计算当前时间是总时间的百分比   当前时间 / 总时间
  currentTime.value = audioEl.value?.currentTime
  durationTime.value = audioEl.value?.duration
  const tmpTime = currentTime.value / durationTime.value
  tmpOffsetTime.value = Math.floor(100 * tmpTime)
  // 给值赋值给滑块
  sliderbar.value = tmpOffsetTime.value
}

// 音量
const onVolumeEmitClick = (v: any) => {
  audioEl.value.volume = v
}
// 是否静音
const onMuteEmitClick = (v: boolean) => {
  if (v) {
    audioEl.value.volume = 0
  } else {
    audioEl.value.volume = 0.5
  }
}
</script>

<style lang="less" scoped>
.bottom-control {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  border-top: 1px solid #ccc;
  background-color: #ffffff;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;

  // 中间部分
  .center {
    display: flex;
    flex-direction: column;
    width: 400px;
    justify-self: flex-start;

    .buttons {
      display: flex;
      justify-content: space-around;
      margin: 0px 110px 0 100px;
      span {
        width: 25px;
        height: 25px;
        cursor: pointer;
        margin: 0 10px;
        .playicon {
          width: 100%;
          height: 80%;
        }
        .playicon1 {
          width: 100%;
          height: 70%;
        }
      }
    }
    .progressBar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      // 滑块
      .slider-demo-block {
        display: flex;
        flex: 1;
        align-items: center;
      }
      .slider-demo-block .el-slider {
        margin: 0 12px;
      }
      :deep(.el-slider) {
        --el-slider-main-bg-color: #ec4141;
      }
      :deep(.el-slider__button-wrapper) {
        --el-slider-main-bg-color: skyblue;
        --el-slider-button-size: 10px;
      }
    }
  }
}

// 抽屉
.songlist {
  font-size: 14px;
  text-align: center;

  .start-text {
    color: var(--color-black-primary);
  }
}
.el-table {
  :deep(.back-row-index) {
    .el-text {
      color: red;
    }
    color: red;
  }

  .el-text {
    cursor: pointer;

    font-size: 12px;
  }
}
</style>
