<template>
  <el-table
    class="table"
    :data="musicList"
    highlight-current-row
    stripe
    lazy
    v-loading="LOADING"
    element-loading-text="加载中..."
    style="width: 100%"
    @row-dblclick="onplaydbClick"
  >
    <el-table-column type="index" :index="indexMethod" />
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
import { formatDuration } from '@/utils/formatplay'

defineProps({
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
const onplaydbClick = (v: any) => {
  console.log(v)
}
</script>

<style lang="less" scoped>
.table {
  --el-mask-color: rgba(0, 0, 0, 0.5);

  .el-table__cell {
    padding: 20px 0 !important;
    cursor: pointer;
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
