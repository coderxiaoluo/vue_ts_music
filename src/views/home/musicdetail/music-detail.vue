<template>
  <div class="music-detail">
    <!-- 歌单信息 -->
    <div class="listInfo">
      <!-- 左侧图片 -->
      <div class="listAvatar">
        <swiper :effect="'cards'" :grabCursor="true" :modules="modules" class="swiper">
          <swiper-slide>
            <img class="img" :src="playList.coverImgUrl" alt="图片信息"
          /></swiper-slide>
          <template v-for="item in playList.tracks" :key="item.id">
            <swiper-slide>
              <img :src="item.al.picUrl" :alt="item.name" />
            </swiper-slide>
          </template>
        </swiper>
      </div>
      <!-- 右侧信息 -->
      <div class="right">
        <!-- 标题 -->
        <div class="title">
          <div class="titleContent">{{ playList.name }}</div>
        </div>
        <!-- 用户信息 -->
        <div class="user">
          <div class="userAvatar">
            <img :src="playList?.creator?.avatarUrl" alt="头像" />
          </div>
          <div class="userName">{{ playList?.creator?.nickname }}</div>
          <div class="createTime">{{ formatMonthDay(playList?.createTime, 'YYYY-MM-DD') }}</div>
        </div>
        <!-- 按钮 -->
        <div class="buttons">
          <el-button type="danger">播放全部</el-button>
          <el-button>收藏</el-button>
          <el-button>分享</el-button>
        </div>
        <!-- 标签 -->
        <div class="tags">
          <div class="tag-title">
            标签:
            <p v-if="playList.tags">
              <template v-for="(item, index) in playList.tags" :key="index">
                {{ item }}
              </template>
            </p>
            <div class="tag-content" v-else>暂无标签</div>
          </div>
        </div>
        <!-- 歌曲 -->
        <div class="otherInfo">
          <div class="musicNum">
            歌曲: <span>{{ playList.trackCount }}</span>
          </div>
          <div class="playCount">播放:{{ formatePayCount(playList.playCount) }}</div>
        </div>
        <!-- 简介 -->
        <div class="desc">
          <p>简介:</p>
          <el-text class="w-100px" truncated>{{ playList.description }}</el-text>
        </div>
      </div>
    </div>

    <!-- 歌曲列表展示 -->
    <div class="content">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'
import { useMusicDetailStore } from '@/stores/music-detail'
import { formatePayCount, formatMonthDay } from '@/utils/formatplay'
// 歌曲列表
import DateList from '@/components/date-list/date-list.vue'
// 评论组件
import Comment from '@/components/comment/comment.vue'
// 收藏组件
import Collect from '@/components/collect/collect.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { EffectCards } from 'swiper'
// swiper
const modules = ref([EffectCards])
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
// 展示信息
const { playList } = storeToRefs(musicDetailStore)
console.log(playList)
// 歌曲列表
const activeName = ref('first')
const handleClick = (v: any) => {
  console.log(v)
}
</script>

<style lang="less" scoped>
.music-detail {
  width: 100%;
  .listInfo {
    width: 77%;
    height: 200px;
    display: flex;
    .listAvatar {
      width: 200px;
      height: 200px;
      .swiper {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right {
      width: 100%;
      margin-left: 50px;
      display: flex;
      flex-direction: column;
      .title {
        .titleContent {
          font-size: 20px;
          font-weight: 900;
        }
      }
      .user {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .userAvatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .userName {
          margin: 0 5px;
          font-size: 14px;
        }
      }
      .tags {
        display: flex;
        margin: 10px 0;
        font-size: 14px;
        color: #4d4c4c;
        .tag-title {
          display: flex;
          p {
            margin: 0 10px;
          }
        }
      }

      .otherInfo {
        display: flex;
        font-size: 14px;
        color: #4d4c4c;

        .playCount {
          margin: 0 10px;
        }
      }
      .desc {
        margin: 10px 0;
        font-size: 14px;
        color: #4d4c4c;
      }
    }
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
