<template>
  <div class="bottom-control">
    <audio
      ref="audioEl"
      v-show="false"
      src=""
      controls
      @play="onPlay"
      @pause="onPause"
      @ended="overAudio"
      @canplay="canplayLoad"
      @timeupdate="onTimeupDateMusic"
    ></audio>

    <!-- 音乐 -->
    <div class="left">
      <div class="img">
        <img
          class=""
          src="http://p1.music.126.net/8ad0ywcK7Ti_2_Q3Xrehmg==/109951168631980291.jpg "
          alt=""
        />
      </div>
      <div class="music-info">
        <div class="music-name">
          <el-text truncated>Self elemSelf elemSelf elemSelf elem</el-text>
        </div>
        <div class="singer">miaoshu1</div>
      </div>
    </div>
    <div class="center">
      <!-- 按钮相关 -->
      <div class="buttons">
        <span>
          <svg class="icon playicon1" aria-hidden="true">
            <use xlink:href="#icon-shunxubofang"></use>
          </svg>
        </span>
        <span>
          <svg class="icon playicon" aria-hidden="true">
            <use xlink:href="#icon-shangyishou1"></use>
          </svg>
        </span>
        <span>
          <svg class="icon playicon" aria-hidden="true">
            <use xlink:href="#icon-bofang4"></use>
          </svg>
        </span>
        <span>
          <svg class="icon playicon" aria-hidden="true">
            <use xlink:href="#icon-xiayishou1"></use>
          </svg>
        </span>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <!-- 开始时间 -->
        <div class="currentTime">
          <span>00:00</span>
        </div>
        <!-- 滑块 -->
        <div class="slider-demo-block">
          <el-slider @input="onInputTime" v-model="sliderbar" :show-tooltip="false" size="small" />
        </div>
        <!-- 结束时间 -->
        <div class="endTime"><span>00:00</span></div>
      </div>
    </div>

    <div class="right">
      <!-- icon-bofangliebiao -->
      <div class="volumeControl">
        <!-- 音量 -->
        <svg class="icon volumeicon" aria-hidden="true">
          <use xlink:href="#icon-yinliang"></use>
        </svg>
        <!-- 音量 滑块-->
        <el-slider class="slider" :max="100" :min="0" v-model="volume" size="small" />
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
    <!-- 抽屉 -->
    <el-drawer
      v-model="table"
      :modal="true"
      :lock-scroll="true"
      :z-index="7"
      :with-header="false"
      :show-close="false"
      :append-to-body="true"
      direction="rtl"
      size="25%"
      height="83%"
    >
      <el-table :data="gridData"> </el-table>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ElDrawer } from 'element-plus'

const table = ref(false)
const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City'
  }
]
// 音频准备就绪了
function canplayLoad() {}
// 开始播放
function onPlay() {}
// 当音频暂停
function onPause() {}
// 播放结束触发
function overAudio() {}
// 当时间改变时触发
function onTimeupDateMusic() {}

// 滑块进度
const sliderbar = ref(0)

// 音量
const volume = ref(50)

// 滑块事件
const onInputTime = (v: any) => {
  console.log(v)
}

// 点击展开左侧列表
const handlePLayListClick = () => {
  table.value = !table.value
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
  .left {
    width: 250px;
    height: 100%;
    display: flex;
    // background-color: red;

    .img {
      width: 55px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .music-info {
      width: 180px;
      padding-top: 10px;
      margin-left: 10px;
      .music-name {
        font-size: 12px;
        color: #fff;
      }
    }
  }

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
}
</style>
