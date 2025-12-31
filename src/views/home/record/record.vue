<template>
  <div class="record">
    <div :class="{ 'bgc-filer': isBgcColor }" :style="{
      'background-image': `url(${currentMusic.al?.picUrl}) `
    }"></div>
    <el-container>
      <el-main class="main" ref="mainRef">
        <div class="header">
          <el-icon @click="downBoldClick" class="downboldicon">
            <ArrowDownBold />
          </el-icon>
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
              <img :class="{ 'descbgc-img': true, discAnimation: isShowPlay }" :src="currentMusic?.al?.picUrl" alt="" />
            </div>
          </div>
          <!-- 右边歌词 -->
          <div class="right-lyric">
            <!-- 标题相关 -->
            <div class="title">
              <div class="marquee-container">
                <p ref="musicNameRef" class="musicName marquee-text">{{ currentMusic.name }}</p>
              </div>
              <div class="marquee-container">
                <p ref="albumNameRef" class="album marquee-text">专辑:{{ currentMusic.al?.name }}</p>
              </div>
              <template v-for="(t, index) in currentMusic.ar" :key="t.name">
                <div class="marquee-container">
                  <p :ref="el => singerRefs[index] = el" class="album marquee-text">歌手: {{ t.name }}</p>
                </div>
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

    <!-- <div class="click" ontouchstart="toucuPlayColor(event)" onclick="playColor(event)">
        <h1>五颜六色的点击特效</h1>
      </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { localCache } from '@/utils/localCache'
import { useRecordStore } from '@/stores/record'
import { currentDuration } from '@/utils/formatplay'
import { parseLyric } from '@/utils/parse_lyric'
import { ArrowDownBold } from '@element-plus/icons-vue'
// import '@/utils/click'

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

// 文字滚动相关
const musicNameRef = ref<HTMLElement>()
const albumNameRef = ref<HTMLElement>()
const singerRefs = ref<(HTMLElement | undefined)[]>([])
let animations: number[] = []

// 实现文字滚动效果
const startMarquee = (element: HTMLElement | undefined) => {
  if (!element) return

  const container = element.parentElement
  if (!container) return

  const containerWidth = container.clientWidth
  const textWidth = element.scrollWidth

  // 如果文字宽度小于容器宽度，不需要滚动
  if (textWidth <= containerWidth) {
    // 确保文字居中
    element.style.transform = 'translateX(0)'
    return
  }

  let offset = 0
  const speed = 0.8 // 滚动速度
  const padding = 50 // 滚动时文字之间的间距

  const animate = () => {
    offset -= speed
    // 当文字完全滚出容器后，重新开始滚动，添加间距
    if (offset <= -(textWidth + padding)) {
      offset = containerWidth
    }
    element.style.transform = `translateX(${offset}px)`

    const animationId = requestAnimationFrame(animate)
    animations.push(animationId)
  }

  animate()
}

// 停止文字滚动
const stopMarquee = () => {
  animations.forEach(id => cancelAnimationFrame(id))
  animations = []
}

// 重置文字位置
const resetMarquee = (element: HTMLElement | undefined) => {
  if (element) {
    element.style.transform = 'translateX(0)'
  }
}

// 监听歌曲变化，重置并重新开始滚动
watch(() => currentMusic.id, async (newId, oldId) => {
  if (newId !== oldId) {
    // 停止当前动画
    stopMarquee()

    // 重置位置
    resetMarquee(musicNameRef.value)
    resetMarquee(albumNameRef.value)
    singerRefs.value.forEach(ref => resetMarquee(ref))

    // 重置歌手ref数组
    singerRefs.value = []

    // 等待DOM更新后重新开始动画
    await nextTick()
    startMarquee(musicNameRef.value)
    startMarquee(albumNameRef.value)
    singerRefs.value.forEach(ref => startMarquee(ref))
  }
})

onMounted(async () => {
  await nextTick()
  startMarquee(musicNameRef.value)
  startMarquee(albumNameRef.value)
  singerRefs.value.forEach(ref => startMarquee(ref))
})

onUnmounted(() => {
  stopMarquee()
})
</script>

<style lang="less" scoped>
.click {
  width: 100%;
  height: 100%;
}

.record {
  position: fixed;
  width: 100%;
  height: calc(100vh - 60px);
  transform: translateY(0%);
  z-index: 77;
  transition: bottom 0.5s ease;
  overflow-y: hidden;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%);

  .bgc-filer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    filter: blur(99px) brightness(0.8);
    z-index: -10;
    transform: scale(1.3);
    opacity: 0.8;
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
    width: 500px;
    height: 500px;
    margin-left: 50px;
    z-index: 77;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      width: 100%;
      text-align: center;
      margin-bottom: 40px;
      padding: 20px 0;

      // 文字滚动容器样式
      .marquee-container {
        overflow: hidden;
        position: relative;
        white-space: nowrap;
        margin: 15px 0;
        padding: 0 20px;
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        .marquee-text {
          display: inline-block;
          white-space: nowrap;
          transition: transform 0.1s linear;
          line-height: 1.6;
        }
      }

      .musicName {
        font-size: 36px;
        margin: 0;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        letter-spacing: 0.5px;
      }

      .album {
        margin: 0;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        letter-spacing: 0.3px;
      }

      .singer {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .lyrics {
      position: relative;
      width: 100%;
      height: 350px;
      overflow-y: scroll;
      overflow-x: hidden;
      /* 隐藏滚动条 */
      scrollbar-width: none;

      /* firefox */
      &::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
      }

      ul {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0 20px;
        z-index: 88;

        li {
          height: 60px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 60px;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
          margin: 8px 0;
          border-radius: 30px;
          padding: 0 30px;
          cursor: pointer;
          user-select: none;
        }

        li:hover {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(10px);
        }

        li.active {
          color: #fff;
          font-weight: 700;
          font-size: 24px;
          transform: scale(1.05);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
      }

      ul.top {
        top: 30px;
        transform: translate(-50%, 0);
      }
    }
  }
}
</style>
