<template>
  <div class="song-left">
    <div v-if="currentMusic.al" class="left">
      <div class="img" @click="handleRecordClick">
        <img :src="getOptimizedImageUrl(currentMusic.al?.picUrl)" alt="" loading="eager" />
        <i v-if="!isRecordPage"><el-icon>
            <ArrowUpBold />
          </el-icon></i>
        <i v-else><el-icon>
            <ArrowDownBold />
          </el-icon></i>
      </div>
      <div class="music-info">
        <div class="music-name marquee-container">
          <div ref="musicNameRef" class="marquee-text">{{ currentMusic.name }}</div>
        </div>
        <div class="singer marquee-container">
          <div ref="singerRef" class="marquee-text">
            <template v-for="(item, index) in currentMusic?.ar" :key="item.id">
              <span>{{ item.name }}{{ index < currentMusic.ar.length - 1 ? ' / ' : '' }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 没有展示 -->
    <div v-else class="noLeft">人之所以孤独,是因为不敢迈出第一步</div>
  </div>
</template>

<script setup lang="ts">
import { useRecordStore } from '@/stores/record'
import { storeToRefs, watch } from 'pinia'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface Props {
  currentMusic: any
}

const props = defineProps<Props>()

// 优化图片URL，添加尺寸参数，减少图片大小
const getOptimizedImageUrl = (url: string | undefined): string => {
  if (!url) return ''
  // 检查是否已经有尺寸参数
  if (url.includes('?param=')) return url
  // 添加合适的尺寸参数，根据组件大小调整
  return `${url}?param=100y100`
}

const recordStore = useRecordStore()
const { isRecordPage } = storeToRefs(recordStore)

const handleRecordClick = () => {
  recordStore.setIsRecordPageFn()
}

// 文字滚动相关
const musicNameRef = ref<HTMLElement>()
const singerRef = ref<HTMLElement>()
let musicNameAnimation: number | null = null
let singerAnimation: number | null = null

// 实现文字滚动效果
const startMarquee = (element: HTMLElement | undefined) => {
  if (!element) return

  const container = element.parentElement
  if (!container) return

  const containerWidth = container.clientWidth
  const textWidth = element.scrollWidth

  // 如果文字宽度小于容器宽度，不需要滚动
  if (textWidth <= containerWidth) return

  let offset = 0
  const speed = 1 // 滚动速度

  const animate = () => {
    offset -= speed
    if (offset <= -textWidth) {
      offset = containerWidth
    }
    element.style.transform = `translateX(${offset}px)`

    if (element === musicNameRef.value) {
      musicNameAnimation = requestAnimationFrame(animate)
    } else if (element === singerRef.value) {
      singerAnimation = requestAnimationFrame(animate)
    }
  }

  animate()
}

// 停止文字滚动
const stopMarquee = (element: HTMLElement | undefined) => {
  if (element === musicNameRef.value && musicNameAnimation) {
    cancelAnimationFrame(musicNameAnimation)
    musicNameAnimation = null
  } else if (element === singerRef.value && singerAnimation) {
    cancelAnimationFrame(singerAnimation)
    singerAnimation = null
  }
}

// 重置文字位置
const resetMarquee = (element: HTMLElement | undefined) => {
  if (element) {
    element.style.transform = 'translateX(0)'
  }
}

// 监听歌曲变化，重置并重新开始滚动
watch(() => props.currentMusic.id, async (newId, oldId) => {
  if (newId !== oldId) {
    // 停止当前动画
    stopMarquee(musicNameRef.value)
    stopMarquee(singerRef.value)

    // 重置位置
    resetMarquee(musicNameRef.value)
    resetMarquee(singerRef.value)

    // 等待DOM更新后重新开始动画
    await nextTick()
    startMarquee(musicNameRef.value)
    startMarquee(singerRef.value)
  }
})

onMounted(async () => {
  await nextTick()
  startMarquee(musicNameRef.value)
  startMarquee(singerRef.value)
})

onUnmounted(() => {
  stopMarquee(musicNameRef.value)
  stopMarquee(singerRef.value)
})
</script>

<style lang="less" scoped>
.noLeft {
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.left {
  width: 250px;
  height: 100%;
  display: flex;

  .img {
    position: relative;
    width: 50px;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }

    i {
      position: absolute;
      left: 0;
      top: 0;
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.4);
      display: none;

      .el-icon {
        text-align: center;
        line-height: 50px;
        color: #ffffff;
      }
    }
  }

  .img:hover i {
    cursor: pointer;
    display: block;
  }

  .music-info {
    width: 180px;
    padding-top: 10px;
    margin-left: 10px;

    // 文字滚动容器样式
    .marquee-container {
      overflow: hidden;
      position: relative;
      white-space: nowrap;
      margin-bottom: 4px;

      .marquee-text {
        display: inline-block;
        white-space: nowrap;
        transition: transform 0.1s linear;
      }
    }

    .music-name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    .singer {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
