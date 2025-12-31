<template>
  <div class="song-left">
    <div v-if="currentMusic.al" class="left">
      <div class="img" @click="handleRecordClick">
        <img :src="getOptimizedImageUrl(currentMusic.al?.picUrl)" alt="" loading="eager" />
        <i v-if="!isRecordPage" class="arrow-icon">
          <el-icon>
            <ArrowUpBold />
          </el-icon>
        </i>
        <i v-else class="arrow-icon">
          <el-icon>
            <ArrowDownBold />
          </el-icon>
        </i>
      </div>
      <div class="music-info">
        <div class="music-name marquee-container" @mouseenter="handleMouseEnter(musicNameRef)"
          @mouseleave="handleMouseLeave(musicNameRef)">
          <div ref="musicNameRef" class="marquee-text">{{ currentMusic.name }}</div>
        </div>
        <div class="singer marquee-container" @mouseenter="handleMouseEnter(singerRef)"
          @mouseleave="handleMouseLeave(singerRef)">
          <div ref="singerRef" class="marquee-text">
            <template v-for="(item, index) in currentMusic?.ar" :key="item.id">
              <span>{{ item.name }}{{ index < currentMusic.ar.length - 1 ? ' / ' : '' }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 没有歌曲时的提示 -->
    <div v-else class="no-music">人之所以孤独,是因为不敢迈出第一步</div>
  </div>
</template>

<script setup lang="ts">
import { useRecordStore } from '@/stores/record'
import { storeToRefs } from 'pinia'
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'

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
  return `${url}?param=120y120`
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

  // 如果文字宽度小于容器宽度，居中显示
  if (textWidth <= containerWidth) {
    element.style.transform = 'translateX(0)'
    return
  }

  let offset = 0
  const speed = 0.8 // 滚动速度，更平滑
  const padding = 60 // 滚动时文字之间的间距
  const pauseDuration = 2000 // 滚动结束后暂停的时间（毫秒）
  let shouldPause = false

  // 创建一个克隆元素，用于无缝滚动
  const cloneElement = element.cloneNode(true) as HTMLElement
  cloneElement.style.position = 'absolute'
  cloneElement.style.left = `${textWidth + padding}px`
  element.parentElement?.appendChild(cloneElement)

  const animate = () => {
    if (shouldPause) {
      // 暂停一段时间后继续滚动
      setTimeout(() => {
        shouldPause = false
        offset = 0 // 重置偏移量
        animate()
      }, pauseDuration)
      return
    }

    offset -= speed

    // 当原始元素完全移出容器时，暂停一段时间
    if (offset <= -(textWidth + padding)) {
      shouldPause = true
    }

    element.style.transform = `translateX(${offset}px)`
    cloneElement.style.transform = `translateX(${offset}px)`

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

  // 移除克隆元素
  if (element?.parentElement) {
    const children = Array.from(element.parentElement.children)
    children.forEach(child => {
      if (child !== element) {
        child.remove()
      }
    })
  }
}

// 重置文字位置
const resetMarquee = (element: HTMLElement | undefined) => {
  if (element) {
    element.style.transform = 'translateX(0)'
  }
}

// 鼠标悬停暂停滚动
const handleMouseEnter = (element: HTMLElement | undefined) => {
  stopMarquee(element)
}

// 鼠标离开继续滚动
const handleMouseLeave = async (element: HTMLElement | undefined) => {
  await nextTick()
  startMarquee(element)
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
.song-left {
  display: flex;
  align-items: center;
  height: 100%;
  width: 280px;
  flex-shrink: 0;
}

.no-music {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
  padding: 0 10px;
}

.left {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 12px;
  padding: 0 10px;
  width: 100%;

  .img {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .arrow-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.3s ease;

      .el-icon {
        font-size: 20px;
        color: #ffffff;
      }
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

      img {
        transform: scale(1.1);
      }

      .arrow-icon {
        opacity: 1;
      }
    }
  }

  .music-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    flex: 1;
    min-width: 0;

    // 文字滚动容器样式
    .marquee-container {
      overflow: hidden;
      position: relative;
      white-space: nowrap;
      margin-bottom: 6px;
      padding: 2px 0;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 4px;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      .marquee-text {
        display: inline-block;
        white-space: nowrap;
        transition: transform 0.1s linear;
        position: relative;
      }
    }

    .music-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      line-height: 1.4;
    }

    .singer {
      font-size: 13px;
      color: #666;
      line-height: 1.4;
    }
  }
}
</style>
