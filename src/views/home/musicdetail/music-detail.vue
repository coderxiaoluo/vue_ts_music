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
        <el-tab-pane label="歌曲列表" name="first"> <DateList /></el-tab-pane>
        <el-tab-pane label="评论" name="second"> <Comment /> </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">
          <Collect />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
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
// 用户登录才能拿到全部歌单
if (isStatus.value) {
  // 登录了
  musicDetailStore.getTrackAllDataAction(musicId.value)
  musicDetailStore.getDetailsDataListAllAction(musicId.value)
} else {
  // 没有登录
  musicDetailStore.getDetailsDataListAllAction(musicId.value)
}

// 点击左侧aside动态展示右边内容
// watch(route, (newValue) => {
//   // 重新拿到动态id 进行请求
//   const id: any = newValue.params.id
//   musicDetailStore.getTrackAllDataAction(id)
//   musicDetailStore.getDetailsDataListAllAction(id)
// })

// 展示信息
const { playList } = storeToRefs(musicDetailStore)
// 歌曲列表
const activeName = ref('first')
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
