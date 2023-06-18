<template>
  <div class="left">
    <!-- 是否展开侧边栏 -->
    <el-icon @click="onChangeIconClick" class="Fold">
      <component :is="settingStore.isFold ? 'Fold' : 'Expand'"></component>
    </el-icon>

    <!-- 搜索内容 -->
    <el-popover
      :visible="visible"
      :show-arrow="false"
      placement="bottom"
      :teleported="false"
      :width="350"
      class="popovers"
    >
      <template #reference>
        <!-- 搜索框 -->
        <el-input
          v-model="searchValue"
          @focus="onFocusChange"
          @blur="onBlurChange"
          class="w-50 m-2"
          :placeholder="placeholderWord.showKeyword"
          prefix-icon="Search"
          @keyup.enter="handleRouteSearch"
        />
      </template>

      <template #default>
        <div class="hot-content">
          <div class="title">热搜榜</div>
          <ul>
            <template v-for="(item, index) in searchHotWord" :key="item.searchWord">
              <li @click="handleSearchPageClick(item)">
                <div class="left">{{ index + 1 }}</div>
                <div class="right">
                  <div class="top">
                    <div class="search-word">{{ item.searchWord }}</div>
                    <div class="score">{{ item.score }}</div>
                    <img v-if="item.iconType === 1" :src="item.iconUrl" alt="热榜" />
                  </div>
                  <div class="desc">{{ item?.content }}</div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { storeToRefs } from 'pinia'

// 引入setting仓库
import { useSettingStore } from '@/stores/setting'
// 引入 search仓库
import { useSearchStore } from '@/stores/search'

// 拿到search仓库
const searchStore = useSearchStore()
// 发送请求 获取默认搜索关键词
searchStore.getSearchDefaultAction()

// 拿到setting仓库
const settingStore = useSettingStore()

const { placeholderWord, searchHotWord } = storeToRefs(searchStore)

// 搜索文本
const searchValue = ref('')

// 折叠图标
const onChangeIconClick = () => {
  // 调用setting仓库函数 修改isFold变量
  settingStore.setiSFold()
}

const visible = ref(false)
// 获取焦点时触发
const onFocusChange = async (v: any) => {
  // if (searchValue.value.length !== 0) return
  // 当获取焦点时发送热搜榜数据
  // searchStore.getSearchHotAction()
  const res = await searchStore.getSearchHotDefaultAction()
  // 等到数据返回成功才显示
  if (res === 200) {
    visible.value = true
  }
}
// 失去焦点时触发
const onBlurChange = () => {
  visible.value = false
}

// 点击热搜跳转search页面
const handleSearchPageClick = (v: any) => {
  console.log(v)
}

// input 回车触发
const handleRouteSearch = () => {
  console.log(searchValue.value)
}
</script>

<style lang="less" scoped>
.left {
  display: flex;
  align-items: center;
  width: 200px;
  height: 100%;
  .el-icon {
    font-size: 20px;
    color: var(--music-search-color);
    margin: 0 10px;
    cursor: pointer;
  }
  .el-input {
    --el-input-bg-color: transparent;
    --el-border-color: transparent;
    --el-input-focus-border-color: transparent;
  }
  :deep(.el-input__prefix-inner) {
    font-size: 20px;
    color: var(--music-search-color);
  }
  :deep(.el-input__inner) {
    color: var(--music-search-color);
  }
}
.hot-content {
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  .title {
    font-size: 16px;
    color: #4b4b4b;
    margin: 10px 0;
  }
  ul {
    width: 100%;

    li {
      display: flex;
      align-items: center;
      height: 40px;
      margin: 5px 0;
      padding: 10px;
      cursor: pointer;
      transition: all 0.2s linear 0s;
      &:hover {
        background-color: #e6e3e3;
      }
      .left {
        width: 30px;
      }
      .right {
        display: flex;
        flex-direction: column;

        .top {
          display: flex;
          .search-word {
            color: #000;
            font-weight: 600;
            margin-right: 3px;
          }
          .score {
            font-size: 12px;
            margin: 0 5px;
          }
          img {
            width: 20px;
            height: 10px;
          }
        }
        .desc {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
