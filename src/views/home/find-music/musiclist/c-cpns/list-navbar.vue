<template>
  <div class="nav-bar">
    <div class="header-top">
      <div class="left">
        <el-popover
          :show-arrow="false"
          placement="bottom-start"
          :width="400"
          trigger="hover"
          :hide-after="0"
          class="popover"
          :teleported="false"
        >
          <template #reference>
            <el-button type="danger" round>
              {{ currentName }}<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </template>
          <template #default>
            <div class="tagAll">
              <p class="all-text" @click="ontagAllClick" :class="{ active: currentName == '全部' }">
                全部
              </p>
              <template v-for="item in tagAll" :key="item.name">
                <!-- class="active" -->
                <p @click="onTagChangeClick(item)" :class="{ active: currentName == item.name }">
                  {{ item.name }}
                </p>
              </template>
            </div>
          </template>
        </el-popover>
      </div>
      <div class="right">
        <template v-for="item in rightTag" :key="item.id">
          <p @click="onTagChangeClick(item)" :class="{ active: currentName == item.name }">
            {{ item.name }}
          </p>
        </template>
      </div>
    </div>

    <songLists class="songLists" :songList="playLists" />

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        target="nav-bar"
        @current-change="currentChangeClick"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { InterTagAll, InterRightTag } from '@/types'
import { useMusicListStore } from '@/stores/music-list'

import songLists from '@/components/song-list/song-lists.vue'

// 父传子
defineProps({
  tagAll: {
    type: Array<InterTagAll>,
    default: () => {
      return []
    }
  },
  rightTag: {
    type: Array<InterRightTag>,
    default: () => {
      return []
    }
  }
})

const currentName = ref('全部')
// 请求数量
const limit = ref(100)
// 偏移
const offset = ref(1)
// 发送请求
const musiclistStore = useMusicListStore()
// 默认获取全部 歌单
musiclistStore.getBoutiqueDataListAction(currentName.value, limit.value)

// 获取歌单
const { playLists, total } = storeToRefs(musiclistStore)

// 全部按钮
const ontagAllClick = () => {
  currentName.value = '全部'
}
// 点击不同tag发送请求
const onTagChangeClick = (v: any) => {
  if (v.playlistTag) {
    musiclistStore.getBoutiqueDataListAction(v.name, limit.value)
    currentName.value = v.name
    // 每次请求都回到1
    offset.value = 1
  } else {
    musiclistStore.getBoutiqueDataListAction(v.name, limit.value)
    currentName.value = v.name
    offset.value = 1
  }
}
// 分页请求
const currentChangeClick = (v: number) => {
  musiclistStore.getBoutiqueDataListAction(currentName.value, limit.value, v * limit.value)
}
</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  height: 100%;
  .header-top {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    .left {
      :deep(.el-popper) {
        display: flex;
        .tagAll {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          width: 100%;
          height: 300px;
          padding: 10px;
          overflow-y: scroll;
          p {
            text-align: center;
            width: 85px;
            margin: 20px 5px;
            padding: 5px;
            cursor: pointer;
          }
          p.active {
            color: red;
            background-color: #fcebeb;
          }

          .all-text.active {
            color: red;
            background-color: #fcebeb;
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      p {
        font-size: 13px;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 5px;
        margin: 0 5px;
      }
      p.active {
        color: red;
        background-color: #fcebeb;
      }
    }
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    :deep(.el-pagination) {
      margin: 20px 0;

      .is-active {
        --el-color-primary: var(--music-bgc-primary);
      }
    }
  }
}
</style>
