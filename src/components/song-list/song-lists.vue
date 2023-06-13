<template>
  <div class="song-list">
    <div v-if="isTitle" class="title">
      <p @click="handleRouteCLick">推荐歌单</p>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <template v-if="isRender">
      <div class="content">
        <template v-for="item in songList" :key="item.id">
          <div @click="onMusicDetailClick(item)" class="music-list">
            <div class="img-item">
              <img :src="item.picUrl" alt="" loading="lazy" />
              <svg class="icon play-icon" aria-hidden="true">
                <use xlink:href="#icon-bofang2"></use>
              </svg>
            </div>
            <p class="playcount">{{ formatePayCount(item.playCount) }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </template>
      </div>
    </template>

    <template v-else>
      <div class="content">
        <template v-for="item in songList" :key="item.id">
          <div @click="onMusicDetailClick(item)" class="music-list">
            <div class="img-item">
              <img :src="item.coverImgUrl" alt="" loading="lazy" />
              <svg class="icon play-icon" aria-hidden="true">
                <use xlink:href="#icon-bofang2"></use>
              </svg>
            </div>
            <p class="playcount">{{ formatePayCount(item.playCount) }}</p>
            <p class="nickname">{{ item.creator.nickname }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatePayCount } from '@/utils/formatplay'

const props = defineProps({
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
console.log(props.songList)
// 去到详情页
const router = useRouter()

const onMusicDetailClick = (v: any) => {
  router.push({
    path: `/musicdetail/${v.id}`
  })
}

// 跳转更多
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
    margin-bottom: 20px;
    p {
      font-size: 20px;
      font-weight: 900;
      color: var(--music-recommend-song-text);
      cursor: pointer;
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .music-list {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 200px;
      height: 250px;
      margin: 10px;
      transition: all 0.5s;
      cursor: pointer;
      &:hover.play-icon {
        display: block;
      }

      .img-item {
        width: 100%;
        height: 75%;
        color: var(--music-recommend-song-text);
        overflow: hidden;
        transition: all 0.3s;

        img {
          width: 100%;
          height: 100%;
          transition: all 0.3s;
        }

        .play-icon {
          position: absolute;
          left: 35%;
          top: 25%;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background-color: #ffffff;
          display: none;
          transition: all 0.5s;
        }
        &:hover img {
          transform: scale(1.1);
        }
        &:hover .play-icon {
          display: block;
        }
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
      .desc {
        margin-top: 10px;
        color: var(--music-recommend-song-text);
      }
    }
  }
}
</style>
