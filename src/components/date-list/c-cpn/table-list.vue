<template>
  <el-table
    class="table"
    :data="musicList"
    highlight-current-row
    :row-class-name="rowIndexFn"
    stripe
    lazy
    v-loading="LOADING"
    element-loading-text="加载中..."
    style="width: 100%"
    @row-dblclick="onPlayDbClick"
  >
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
import { ref } from 'vue'
import { formatDuration } from '@/utils/formatplay'

import { usePlayMusicStore } from '@/stores/play-music'
import { storeToRefs } from 'pinia'
// 歌词
import { useRecordStore } from '@/stores/record'

const recordStore = useRecordStore()

const props = defineProps({
  musicList: {
    type: Array,
    default: () => {
      return []
    }
  },
  LOADING: {
    type: Boolean,
    default: false
  }
})
const indexMethod = (index: number) => {
  return index + 1
}

// 双击播放
// 仓库
const playMusicStore = usePlayMusicStore()

// 是否播放
const { isShowPlay, currentMusic } = storeToRefs(playMusicStore)

function rowIndexFn({ row, rowIndex }: { row: any; rowIndex: any }) {
  row.index = rowIndex

  if (row.id === currentMusic.value?.id) {
    return 'color-row-index'
  }
}
const onPlayDbClick = (v: any) => {
  // 双击时将全部的歌曲存储起来  再侧边栏进行展示
  //  v:当前这首  props.musicList:全部
  playMusicStore.savePlayMusicFn(v, props.musicList)
  // 发送请求拿到音乐url
  playMusicStore.getSongUrlAction(v.id)
  // 拿到歌词
  recordStore.getLyricDataAction(v.id)
}
</script>

<style lang="less" scoped>
.table {
  cursor: pointer;

  --el-mask-color: rgba(0, 0, 0, 0.5);
  :deep(.color-row-index) {
    color: rgb(210, 13, 13);
    .el-text {
      color: rgb(211, 17, 17);
    }
  }
  .el-table__cell {
    padding: 20px 0 !important;
    cursor: pointer;
  }
  .index-icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
  }
  .cell {
    --el-table-tr-bg-color: red;
    .singer {
      display: flex;
    }
    .table_icon {
      width: 20px;
      height: 20px;
      margin: 5px;
    }

    &:hover {
      background-color: red;
    }
  }
}
</style>
