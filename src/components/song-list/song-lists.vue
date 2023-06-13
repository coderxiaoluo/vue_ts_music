<template>
  <div class="song-list">
    <div v-if="isTitle" class="title">
      <p @click="handleRouteCLick">推荐歌单</p>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <template v-if="isRender">
      <div class="content">
        <el-row :gutter="40">
          <template v-for="item in songList" :key="item.id">
            <el-col :xs="24" :sm="24" :md="8" :lg="6">
              <div class="img-box">
                <img :src="item.picUrl" alt="" loading="lazy" />
                <p class="playcount">{{ formatePayCount(item.playCount) }}</p>
              </div>
              <p class="desc">{{ item.name }}</p>
            </el-col>
          </template>
        </el-row>
      </div>
    </template>

    <template v-else>
      <div class="content">
        <el-row :gutter="40">
          <template v-for="item in songList" :key="item.id">
            <el-col :xs="24" :sm="24" :md="8" :lg="6">
              <div class="img-box">
                <img :src="item.coverImgUrl" alt="" loading="lazy" />
                <p class="playcount">{{ formatePayCount(item.playCount) }}</p>
                <p class="nickname">{{ item.creator.nickname }}</p>
              </div>
              <p class="desc">{{ item.name }}</p>
            </el-col>
          </template>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatePayCount } from '@/utils/formatplay'

defineProps({
  songList: {
    type: Object,
    default: () => {
      return []
    }
  },
  isTitle: {
    type: Boolean,
    default: () => {
      return false
    }
  },
  isRender: {
    type: Boolean,
    default: () => {
      return false
    }
  }
})

// 跳转更多
const router = useRouter()
const handleRouteCLick = () => {
  router.push('/findmusic/musiclist')
}
</script>

<style lang="less" scoped>
.song-list {
  margin-top: 20px;
  .title {
    display: flex;
    align-items: center;
    p {
      font-size: 20px;
      font-weight: 900;
      color: var(--music-recommend-song-text);
      cursor: pointer;
    }
  }

  .content {
    margin-top: 20px;
    .el-row {
      justify-content: flex-start;
      .el-col {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .img-box {
        position: relative;
        margin-top: 20px;
        width: 75%;
        color: var(--music-recommend-song-text);
        overflow: hidden;
        &:hover img {
          transform: scale(1.1);
        }
        img {
          width: 100%;
          height: 215px;
          cursor: pointer;
          transition: transform 0.5s;
        }
        .playcount {
          position: absolute;
          top: 10px;
          right: 10px;
          color: #ffffff;
          font-size: 12px;
        }
        .nickname {
          position: absolute;
          bottom: 10px;
          left: 10px;
          color: #ffffff;
          font-size: 12px;
        }
      }
      .desc {
        margin-top: 10px;
        width: 77%;
        color: var(--music-recommend-song-text);
      }
    }
  }
}
</style>
