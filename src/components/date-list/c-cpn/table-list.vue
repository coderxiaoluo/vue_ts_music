<template>
  <el-table class="table" :data="LOADING ? [] : musicList" highlight-current-row :row-class-name="rowIndexFn"
    :row-key="(row) => row.id" v-loading="LOADING" element-loading-text="加载中..." style="width: 100%"
    @row-dblclick="onPlayDbClick" fit :max-height="600" :empty-text="LOADING ? '' : '暂无数据'"
    :header-cell-style="{ backgroundColor: '#fafafa', border: 'none' }"
    :cell-style="{ border: 'none', padding: '12px 0' }" :row-style="{ borderBottom: '1px solid #f0f0f0' }"
    stripe="false">
    <el-table-column type="index" :index="indexMethod">
      <template #default="scope">
        <span v-if="currentMusic.id !== scope.row.id">{{ scope.$index + 1 }}</span>
        <svg v-else class="icon index-icon" aria-hidden="true">
          <use xlink:href="#icon-yinle1"></use>
        </svg>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="90">
      <template #default>
        <div>
          <svg class="icon table_icon" aria-hidden="true">
            <use xlink:href="#icon-xihuan1"></use>
          </svg>
          <svg class="icon table_icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="标题" width="600" />
    <el-table-column label="歌手" width="200">
      <template #default="scope">
        <div class="singer">
          <p>{{ scope.row.ar[0].name }}</p>
          <p v-if="scope.row.ar[1]">/ {{ scope.row.ar[1].name }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="专辑" width="200">
      <template #default="scope">
        <el-text class="w-100px" truncated>{{ scope.row.al.name }}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="时间">
      <template #default="scope">
        <span>{{ formatDuration(scope.row.dt) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { formatDuration } from '@/utils/formatplay'

import { usePlayMusicStore } from '@/stores/play-music'
import { storeToRefs } from 'pinia'
// 歌词
import { useRecordStore } from '@/stores/record'

// 定义组件属性，添加类型约束
const props = defineProps<{
  musicList: Array<{
    id: number
    name: string
    ar: Array<{
      id: number
      name: string
    }>
    al: {
      id: number
      name: string
      picUrl: string
    }
    dt: number
    index?: number
  }>
  LOADING: boolean
}>()

// 仓库
const playMusicStore = usePlayMusicStore()
const recordStore = useRecordStore()

// 是否播放
const { isShowPlay, currentMusic } = storeToRefs(playMusicStore)

// 索引方法，使用computed缓存计算结果
const indexMethod = (index: number) => {
  return index + 1
}

// 计算属性：当前播放歌曲ID，避免在模板中频繁访问store
const currentMusicId = computed(() => currentMusic.value?.id)

// 行样式类名计算，使用currentMusicId减少响应式依赖
function rowIndexFn({ row }: { row: any; rowIndex: any }) {
  if (row.id === currentMusicId.value) {
    return 'color-row-index'
  }
  return ''
}

// 双击播放事件处理
const onPlayDbClick = (v: any) => {
  // 使用requestAnimationFrame避免阻塞主线程
  requestAnimationFrame(() => {
    // 保存播放列表和当前歌曲
    playMusicStore.savePlayMusicFn(v, props.musicList)
    // 发送请求拿到音乐url
    playMusicStore.getSongUrlAction(v.id)
    // 拿到歌词
    recordStore.getLyricDataAction(v.id)
  })
}
</script>

<style lang="less" scoped>
.table {
  cursor: pointer;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  --el-mask-color: rgba(0, 0, 0, 0.5);
  --el-table-header-bg-color: #fafafa;
  --el-table-row-hover-bg-color: #f5f7fa;
  --el-table-current-row-bg-color: #ecf5ff;
  --el-table-text-color: #303133;
  --el-table-header-text-color: #606266;

  // 隐藏表格的边框线
  :deep(.el-table__inner-wrapper) {
    border: none;
  }

  :deep(.el-table__header-wrapper) {
    border: none;
    margin-bottom: 0;
  }

  :deep(.el-table__body-wrapper) {
    border: none;
  }

  // 隐藏表头的下边框
  :deep(.el-table__header) {
    border-bottom: none;
  }

  // 隐藏表格的外边框
  :deep(.el-table--border) {
    border: none;
  }

  // 隐藏单元格的边框
  :deep(.el-table__cell) {
    border: none;
    padding: 16px 0 !important;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    color: var(--el-table-text-color);
  }

  // 当前播放行样式
  :deep(.color-row-index) {
    color: #409eff;
    font-weight: 500;

    .el-text {
      color: #409eff;
    }
  }

  // 表头样式
  :deep(.el-table__header-cell) {
    background-color: var(--el-table-header-bg-color);
    font-weight: 500;
    color: var(--el-table-header-text-color);
    font-size: 14px;
    padding: 12px 0 !important;
    border-bottom: 1px solid #ebeef5;
  }

  // 行悬停样式
  :deep(.el-table__row:hover) {
    background-color: var(--el-table-row-hover-bg-color);
  }

  // 当前行样式
  :deep(.el-table__row.current-row) {
    background-color: var(--el-table-current-row-bg-color);
  }

  // 序号和图标样式
  .index-icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
    color: #409eff;
  }

  // 单元格内容样式
  .cell {
    .singer {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #606266;
    }

    .table_icon {
      width: 18px;
      height: 18px;
      margin: 0 8px;
      color: #909399;
      transition: color 0.2s ease;

      &:hover {
        color: #409eff;
      }
    }
  }

  // 空状态样式
  :deep(.el-table__empty-text) {
    color: #909399;
    font-size: 14px;
    padding: 40px 0;
  }

  // 加载中样式
  :deep(.el-loading-spinner) {
    .path {
      stroke: #409eff;
    }
  }
}
</style>
