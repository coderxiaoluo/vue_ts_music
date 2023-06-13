<template>
  <div class="nav-bar">
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
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue'
import type { InterTagAll, InterRightTag } from '@/types'

const props = defineProps({
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

const ontagAllClick = () => {
  currentName.value = '全部'
}
const onTagChangeClick = (v: any) => {
  if (v.playlistTag) {
    console.log(v)
    currentName.value = v.name
  } else {
    currentName.value = v.name

    console.log(v)
    console.log(123)
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
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
</style>
