<template>
  <div class="aside">
    <!-- 左侧顶部 logo 以及 标题 -->
    <Logo></Logo>
    <!-- menu -->
    <el-scrollbar>
      <el-menu :collapse="isFold" router default-active="/findmusic" class="menu">
        <el-menu-item index="/findmusic/recommend">
          <el-icon>
            <svg class="icon aside_video_icon" aria-hidden="true">
              <use xlink:href="#icon-yinle"></use>
            </svg>
          </el-icon>

          <span> 发现音乐</span>
        </el-menu-item>
        <el-menu-item index="/video/video-list">
          <el-icon>
            <svg class="icon aside_video_icon" aria-hidden="true">
              <use xlink:href="#icon-shipin-"></use>
            </svg>
          </el-icon>
          <span>视频</span>
        </el-menu-item>
        <!-- 登录才显示 -->
        <template v-if="isStatus">
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <svg class="icon aside_video_icon" aria-hidden="true">
                  <use xlink:href="#icon-chuangjianmulu"></use>
                </svg>
              </el-icon>
              <span>我的歌单</span>
            </template>
            <template v-for="(item, index) in userplaylist" :key="index">
              <el-menu-item
                @click="onHandleClick(item)"
                :index="'/musicdetail/' + String(item.id)"
                v-if="item.creator.djStatus === 0"
                ><el-text class="w-100px" truncated>{{ item.name }}</el-text>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <svg class="icon aside_video_icon" aria-hidden="true">
                  <use xlink:href="#icon-shoucang1"></use>
                </svg>
              </el-icon>
              <span>收藏的歌单</span>
            </template>

            <template v-for="(item, index) in userplaylist" :key="index">
              <el-menu-item
                @click="onHandleClick(item)"
                :index="'/musicdetail/' + String(item.id)"
                v-if="item.creator.djStatus === 10"
                ><el-text class="w-100px" truncated>{{
                  index == 0 ? (item.name = '我喜欢的音乐') : item.name
                }}</el-text>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './c-cpn/logo.vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '@/stores/setting'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'
import { useMusicDetailStore } from '@/stores/music-detail'
// 获取store
const loginStore = useLoginStore()

// 判断是否登录了  / 歌单列表
const { isStatus, userplaylist } = storeToRefs(loginStore)
const settingStore = useSettingStore()
// 折叠变量
const { isFold } = storeToRefs(settingStore)

const route = useRoute()

const musicDetailStore = useMusicDetailStore()

// 左侧点击事件
const onHandleClick = (v: any) => {
  // 点击左侧aside动态展示右边内容
  musicDetailStore.getTrackAllDataAction(v.id, v.trackCount)
  musicDetailStore.getDetailsDataListAllAction(v.id)
}
</script>

<style lang="less" scoped>
.aside {
  height: 100%;
}
.el-menu {
  --el-menu-bg-color: #ffffff;
  --el-menu-text-color: #000000;
  height: calc(100vh - 60px);
  --el-menu-border-color: none;
  color: var(--music-search-color);

  .el-menu-item {
    .aside_video_icon {
      width: 25px;
      height: 25px;
    }
    span {
      padding-left: 10px;
    }
  }
  .el-sub-menu {
    .aside_video_icon {
      width: 25px;
      height: 25px;
    }
    span {
      padding-left: 10px;
    }
  }
}

.el-scrollbar {
  height: calc(100vh - 60px);
}

.el-menu-item {
  &:hover {
    background-color: #a59a9a;
  }
}
// /选中时的背景颜色
:deep(.el-menu-item.is-active) {
  background-color: #e9e6e6;
  // color: var(--music-aside-active-text);
  color: #000000;
  border-left: 3px solid #4d84fe;
}
</style>
