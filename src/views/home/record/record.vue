<template>
  <div class="record">
    <div
      :class="{ 'bgc-filer': isBgcColor }"
      :style="{
        'background-image': `url(${currentMusic.al?.picUrl}) `
      }"
    ></div>
    <el-container>
      <el-main class="main">
        <div class="header">
          <el-icon @click="downBoldClick" class="downboldicon"><ArrowDownBold /></el-icon>
          <div class="demo-color-block">
            <svg @click="ChangeBackgroundClick" class="icon playicon" aria-hidden="true">
              <use xlink:href="#icon-pokeball"></use>
            </svg>
            <el-color-picker @active-change="changebgcColor" v-model="bgcColor" />
          </div>
        </div>
        <div class="content">
          <div :class="{ 'left-record': true, discAnimation: isShowPlay }">
            <div :class="{ 'need-box': true, 'need-transform': isShowPlay }">
              <img class="needleImg" src="@/assets/img/MusicDetailCard/needle.png" alt="" />
            </div>

            <div class="record-img">
              <img class="discImg" src="@/assets/img/MusicDetailCard/disc.png" alt="" />
            </div>
            <div class="desc-box">
              <img
                :class="{ 'descbgc-img': true, discAnimation: isShowPlay }"
                :src="currentMusic?.al?.picUrl"
                alt=""
              />
            </div>
          </div>
          <!-- 右边歌词 -->
          <div class="right-lyric">
            <!-- 标题相关 -->
            <div class="title">
              <p class="musicName">{{ currentMusic.name }}</p>
              <p class="album">专辑:{{ currentMusic.al?.name }}</p>
              <template v-for="t in currentMusic.ar" :key="t.name">
                <p class="album">歌手: {{ t.name }}</p>
              </template>
            </div>

            <!-- 歌词 -->
            <div class="lyrics">
              <ul ref="ulEl">
                <template v-for="(item, index) in parseLyric(lyricData.lyric)" :key="index">
                  <li :class="{ active: activeIndex == index }">
                    {{ item.content }}
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { localCache } from '@/utils/localCache'
import { useRecordStore } from '@/stores/record'
import { currentDuration } from '@/utils/formatplay'
import { parseLyric } from '@/utils/parse_lyric'

import { usePlayMusicStore } from '@/stores/play-music'

const playMusicStore = usePlayMusicStore()
const recordStore = useRecordStore()

const ulEl = ref()
// 双击播放拿到
const { currentMusic, isShowPlay } = storeToRefs(playMusicStore)

// 双击播放拿到歌词
const { lyricData, lyricTime } = storeToRefs(recordStore)

// 用户选择颜色
const bgcColor = ref(localCache.getCache('bgcColor') ?? '#fff')
const changebgcColor = (v: any) => {
  localCache.setCache('bgcColor', v)
  bgcColor.value = v
}

//
const isBgcColor = ref(false)
const ChangeBackgroundClick = () => {
  isBgcColor.value = !isBgcColor.value
}

const activeIndex = ref(0)

watch(lyricTime, (newvalue) => {
  const result = parseLyric(lyricData.value.lyric)
  result!.forEach((item, index) => {
    if (currentDuration(item.time / 1000) == currentDuration(newvalue)) {
      activeIndex.value = index
      ulEl.value.style.top = -index * 60 + 180 + 'px'
    }
  })
})

// 关闭唱片
const downBoldClick = () => {
  recordStore.setIsRecordPageFn()
}
</script>

<style lang="less" scoped>
.record {
  position: fixed;
  width: 100%;
  height: calc(100vh - 60px);
  transform: translateY(0%);
  z-index: 77;
  transition: bottom 0.5s ease;
  background-image: linear-gradient(to bottom, rgb(227, 69, 69));
  overflow-y: scroll;

  .bgc-filer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(99px);
    z-index: -10;
    transform: scale(1.3);
  }
}

.main {
  width: 100%;
  margin: 0 auto;
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .downboldicon {
      font-size: 25px;
      cursor: pointer;
    }

    .demo-color-block {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      .playicon {
        font-size: 12px;
        background-color: v-bind(bgcColor);
        cursor: pointer;
        margin-right: 20px;
        width: 20px;
        height: 20px;
      }
      .quanpingicon {
        background-color: v-bind(bgcColor);
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .demo-color-block .demonstration {
      margin-right: 16px;
    }
  }
}
// top
.content {
  display: flex;
  justify-content: center;
  height: 600px;

  .left-record {
    position: relative;
    width: 350px;
    height: 500px;
    margin-right: 30px;

    .need-box {
      position: absolute;
      transition: transform 0.5s 0s linear;
      transform-origin: left top;
      transform: rotate(0deg);
      z-index: 99;
      right: 10px;
      top: 25px;
      width: 150px;
      height: 100px;
      .needleImg {
        width: 100%;
        height: 100%;
      }
    }
    .record-img {
      position: absolute;
      bottom: 50px;
      width: 100%;
      border-radius: 50%;
      box-shadow: 0 0 0 10px #ccc;
      .discImg {
        width: 100%;
        height: 100%;
      }
    }

    .desc-box {
      position: absolute;
      bottom: 105px;
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      height: 49%;
      // background-color: tomato;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;

      .descbgc-img {
        width: 100%;
        border-radius: 50%;
        transition: transform 1s linear 0s;
      }
    }
    .desc-box:hover {
      .descbgcimg {
        transform: scale(1.1);
      }
    }
    /* 碟子设置旋转动画 */
    .discAnimation {
      /* infinite动画无限循环 */
      animation: disc 25s linear infinite;
      /* 动画延迟一秒 */
      animation-delay: 0.8s;
    }

    @keyframes disc {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    // 唱片手柄

    .need-transform {
      transition: transform 0.5s 0s linear;
      transform-origin: left top;
      transform: rotate(22deg);
      z-index: 99;
    }
  }
  .right-lyric {
    width: 400px;
    height: 500px;
    // background-color: rgb(209, 27, 206);
    margin-left: 30px;
    z-index: 77;
    // overflow: hidden;
    .title {
      width: 100%;
      text-align: center;

      .musicName {
        font-size: 30px;
      }

      .album {
        margin: 10px 0;
        font-size: 12px;
      }
      .singer {
        font-size: 12px;
      }
    }

    .lyrics {
      position: relative;
      margin-top: 30px;
      width: 100%;
      height: 400px;
      // background-color: darkcyan;
      overflow-y: scroll;
      overflow-x: auto;
      padding-right: 40px;

      ul {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 180px;
        z-index: 88;
        li {
          height: 60px;
          font-size: 16px;
          color: #343333;
        }
        li.active {
          color: #000;
          font-weight: 900;
          font-size: 20px;
        }
      }

      ul.top {
        top: 30px;
      }
    }
  }
}
</style>
