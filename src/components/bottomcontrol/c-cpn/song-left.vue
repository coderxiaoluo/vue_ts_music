<template>
  <div class="song-left">
    <div v-if="currentMusic.al" class="left">
      <div class="img" @click="handleRecordClick">
        <img :src="getOptimizedImageUrl(currentMusic.al?.picUrl)" alt="" loading="eager" />
        <i v-if="!isRecordPage"
          ><el-icon><ArrowUpBold /></el-icon
        ></i>
        <i v-else
          ><el-icon><ArrowDownBold /></el-icon
        ></i>
      </div>
      <div class="music-info">
        <div class="music-name">
          <el-text truncated>{{ currentMusic.al?.name }}</el-text>
        </div>
        <div class="singer">
          <template v-for="item in currentMusic?.ar" :key="item.id">
            <span>{{ item.name }} /</span>
          </template>
        </div>
      </div>
    </div>
    <!-- 没有展示 -->
    <div v-else class="noLeft">人之所以孤独,是因为不敢迈出第一步</div>
  </div>
</template>

<script setup lang="ts">
import { useRecordStore } from '@/stores/record'

import { storeToRefs } from 'pinia'
interface Props {
  currentMusic: any
}
defineProps<Props>()

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
  // background-color: red;

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
    .music-name {
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
