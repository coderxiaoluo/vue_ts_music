<template>
  <div class="aside">
    <!-- 左侧顶部 logo 以及 标题 -->
    <Logo></Logo>
    <!-- menu -->
    <el-scrollbar>
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        :collapse="isFold"
        router
        :default-active="defaultRoute"
        class="menu"
      >
        <el-menu-item index="/findmusic/recommend">
          <el-icon>
            <svg class="icon aside_video_icon" aria-hidden="true">
              <use xlink:href="#icon-yinle"></use>
            </svg>
          </el-icon>

          <span> 发现音乐</span>
        </el-menu-item>
        <el-menu-item index="/video">
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
            <template v-for="item in userplaylist" :key="item.id">
              <el-menu-item
                @click="onHandleClick"
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

            <template v-for="item in userplaylist" :key="item.id">
              <el-menu-item
                @click="onHandleClick"
                :index="'/musicdetail/' + String(item.id)"
                v-if="item.creator.djStatus === 10"
                ><el-text class="w-100px" truncated>{{ item.name }}</el-text>
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
import { ref, watch } from 'vue'
import { localCache } from '@/utils/localCache'
import { useMusicDetailStore } from '@/stores/music-detail'

// 获取store
const loginStore = useLoginStore()

// 判断是否登录了  / 歌单列表
const { isStatus, userplaylist } = storeToRefs(loginStore)
const settingStore = useSettingStore()
// 折叠变量
const { isFold } = storeToRefs(settingStore)
// console.log(userplaylist)

// router持久化
const defaultRoute = ref(localCache.getCache('menuPath') ?? '/findmusic')
const route = useRoute()
watch(route, (newVal) => {
  localCache.setCache('menuPath', newVal.path)
  defaultRoute.value = newVal.path
})

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const musicId = ref<any>(route.params.id)

const musicDetailStore = useMusicDetailStore()
const { isRefresh } = storeToRefs(settingStore)
const onHandleClick = () => {
  // 刷新按钮
  // isRefresh.value = false
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
