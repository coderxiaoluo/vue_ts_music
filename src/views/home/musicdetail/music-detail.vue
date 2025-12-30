<template>
  <div class="music-detail">
    <!-- 歌单信息 -->
    <div class="listInfo">
      <!-- 左侧图片 -->
      <ListAvatar :playList="playList" />
      <!-- 右侧信息 -->
      <RightInfo :playList="playList" />
    </div>
    <!-- 歌曲列表展示 -->
    <div class="content">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" :lazy="true" tab-position="top" stretch>
        <el-tab-pane label="歌曲列表" name="first">
          <DateList />
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
          <Comment />
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">
          <Collect />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'
import { useMusicDetailStore } from '@/stores/music-detail'
// 左侧图片swiper
import ListAvatar from './c-cpn/list-avatar.vue'
// 右侧信息组件
import RightInfo from './c-cpn/right-info.vue'
// 歌曲列表
import DateList from '@/components/date-list/date-list.vue'
// 评论组件
import Comment from '@/components/comment/comment.vue'
// 收藏组件
import Collect from '@/components/collect/collect.vue'

// loginStore仓库
const loginStore = useLoginStore()
// musicDetailStore仓库
const musicDetailStore = useMusicDetailStore()
// route
const route = useRoute()
// 拿到歌单id
const musicId = ref<any>(route.params.id)
// isStatus ：判断是否登录的变量
const { isStatus } = storeToRefs(loginStore)
// 展示信息
const { playList } = storeToRefs(musicDetailStore)
// 歌曲列表
const activeName = ref('first')

// 发送请求获取歌单数据
const fetchPlaylistData = async () => {
  const id = route.params.id
  if (!id) return

  // 清空之前的数据
  musicDetailStore.clearData()

  try {
    // 先获取歌单详情，包含trackCount信息
    await musicDetailStore.getDetailsDataListAllAction(id)

    // 然后根据登录状态决定是否获取全部歌曲
    if (isStatus.value) {
      // 登录了，获取全部歌曲
      await musicDetailStore.getTrackAllDataAction(id, playList.value.trackCount)
    }
  } catch (error) {
    console.error('获取歌单数据失败:', error)
  }
}

// 监听路由变化
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchPlaylistData()
    }
  },
  { immediate: true }
)

// 监听登录状态变化
watch(isStatus, (newStatus) => {
  fetchPlaylistData()
})

// 组件挂载时初始化数据
onMounted(() => {
  fetchPlaylistData()
})

// 组件卸载时清空数据
onBeforeUnmount(() => {
  musicDetailStore.clearData()
})

const handleClick = (v: any) => {
  // console.log(v)
}
</script>

<style lang="less" scoped>
.music-detail {
  width: 100%;

  .listInfo {
    width: 77%;
    height: 200px;
    display: flex;
  }

  .content {
    margin-top: 30px;

    .demo-tabs {
      --el-color-primary: red;
    }

    :deep(.el-tabs__nav-wrap::after) {
      height: 0 !important;
    }
  }
}
</style>
