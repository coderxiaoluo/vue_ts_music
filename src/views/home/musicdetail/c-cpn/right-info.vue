<template>
  <div class="right animate__animated animate__backInRight">
    <!-- 标题 -->
    <div class="title">
      <div class="titleContent">{{ playList.name }}</div>
    </div>
    <!-- 用户信息 -->
    <div class="user">
      <div class="userAvatar" @click="onUserInfoClick">
        <img :src="playList?.creator?.avatarUrl" alt="头像" />
      </div>
      <div class="userName">{{ playList?.creator?.nickname }}</div>
      <div class="createTime">{{ formatMonthDay(playList?.createTime, 'YYYY-MM-DD') }}创建</div>
    </div>
    <!-- 按钮 -->
    <div class="buttons">
      <el-button type="danger" @click="onPlayAllClick">
        <template #default>
          <svg class="icon playIcon" aria-hidden="true">
            <use xlink:href="#icon-bofang3"></use>
          </svg>
          <span>播放全部</span>
        </template>
      </el-button>
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePlayMusicStore } from '@/stores/play-music'
import { useMusicDetailStore } from '@/stores/music-detail'

import { formatePayCount, formatMonthDay } from '@/utils/formatplay'
// 歌词
import { useRecordStore } from '@/stores/record'

interface Props {
  playList: any
}

const props = defineProps<Props>()

// 点击进入用户详情
const router = useRouter()
const onUserInfoClick = () => {
  router.push({
    path: `/user/${props.playList.userId}`
  })
}
//
// 仓库
const playMusicStore = usePlayMusicStore()
// 歌词仓库
const recordStore = useRecordStore()

// musicDetailStore仓库
const musicDetailStore = useMusicDetailStore()

// 展示信息
const { songsAll } = storeToRefs(musicDetailStore)

// 播放全部按钮
const onPlayAllClick = () => {
  // 拿到 第一个歌曲 id
  const firstMusic = songsAll.value[0]
  //  v:当前这首  props.musicList:全部
  playMusicStore.savePlayMusicFn(firstMusic, songsAll.value)
  // 发送请求拿到音乐url
  playMusicStore.getSongUrlAction(firstMusic.id)
  // 发送请求拿到音乐url 新版
  // playMusicStore.getNewSongUrlLevelAction(id)
  // 拿到歌词
  recordStore.getLyricDataAction(firstMusic.id)
}
</script>

<style lang="less" scoped>
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
        cursor: pointer;
      }
    }
    .userName {
      margin: 0 5px;
      font-size: 14px;
    }
  }

  .buttons {
    .playIcon {
      width: 25px;
      height: 25px;
      margin-left: -10px;
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
</style>
