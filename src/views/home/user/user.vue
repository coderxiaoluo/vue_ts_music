<template>
  <div class="user">
    <div
      class="info-message animate__animated animate__flip"
      :style="{
        backgroundImage: `url(${bgImage}) `
      }"
    >
      <div class="left animate__animated animate__bounceInDown">
        <h2 class="username">{{ userProfile.nickname }}</h2>
        <div class="avatar">
          <img :src="userProfile.avatarUrl" alt="" />
        </div>
        <div class="user-info">
          <div class="statistics">
            <div class="item trends">
              <p>{{ userProfile.sCount }}</p>
              <p>动态</p>
            </div>
            <div class="item follow">
              <p>{{ userProfile.followeds }}</p>
              <p>关注</p>
            </div>
            <div class="item fans">
              <p>{{ userProfile.follows }}</p>
              <p>粉丝</p>
            </div>
          </div>
        </div>
        <div class="address">地区:{{ userProfile.city }}</div>
      </div>
    </div>

    <div class="musiclist">
      <!-- 收藏歌单 -->
      <h2>全部的歌单</h2>
      <div class="collect">
        <ul>
          <template v-for="item in userPlayList" :key="item.userId">
            <li @click="handleMusicDetailClick(item)">
              <img :src="item.coverImgUrl" alt="" />
              <p>{{ item.name }}</p>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
// 随机数
import { randomMusic } from '@/utils/random'
// 引入图片
import { swiperList } from '@/assets/data/user-bg'
// img
import { imgURL } from '@/utils/img-url'

//  TODO:  动态展示图片 有bug  可以换成判断性别切换动态背景  userProfile.value.gender
const bgImage = imgURL(swiperList[randomMusic(1, swiperList.length)].url)

const userStore = useUserStore()
const route = useRoute()

// 获取用户id
const userId = ref<any>(route.params.id)
userStore.getUserInfoAction(userId.value)
userStore.userPlaylistAction(userId.value)

const { userProfile, userPlayList } = storeToRefs(userStore)

// 跳转
const router = useRouter()
const handleMusicDetailClick = (v: any) => {
  router.push({
    path: `/musicdetail/${v.id}`
  })
}
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // padding: 20px;

  .info-message {
    width: 100%;
    height: calc(100vh - 85px);
    display: flex;
    justify-content: center;
    // background: url('@/assets/img/bg3.jpg') no-repeat 100% 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
  // @keyframes bigname {
  //   // infinite
  //   0% {
  //     background-size: 100%;
  //   }
  //   100% {
  //     background-size: 140% 140%;
  //   }
  // }
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 500px;
    .username {
      font-size: 25px;
      font-weight: 900;
      color: #ffffff;
      margin-top: 20px;
    }
    .avatar {
      cursor: pointer;
      border: 2px solid #413f3f;
      width: 150px;
      height: 150px;
      overflow: hidden;
      border-radius: 50%;
      margin: 20px 0;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.4s linear;
      }
      &:hover img {
        transform: rotate(10deg);
      }
    }

    .user-info {
      width: 100%;
      overflow: hidden;
      color: #ffffff;
    }
    .statistics {
      display: flex;
      width: 100%;
      justify-content: space-around;
      margin: 10px 0;
      color: #ffffff;

      .item {
        text-align: center;

        p {
          margin: 5px 0;
        }
      }
    }
    .address {
      font-size: 14px;
      color: #3d3c3c;
    }
  }
}

.musiclist {
  margin-top: 30px;
  width: 100%;
  height: 100vh;

  h2 {
    font-size: 20px;
    font-weight: 800;
    color: #060606;
  }
  .collect {
    display: flex;
    height: 100%;
    float: 1;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        position: relative;
        width: 200px;
        height: 250px;
        margin: 20px 20px;
        border-radius: 10px;
        border: 1px solid transparent;
        overflow: hidden;
        cursor: pointer;
        color: #060606;

        img {
          width: 100%;
          height: 200px;
          margin-bottom: 10px;
          border-radius: 10px;
        }
        p {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
