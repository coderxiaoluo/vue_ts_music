<template>
  <div class="user">
    <!-- 背景 three.js 效果 -->
    <div class="bg-container">
      <FloatingLines :enabled-waves="['top', 'middle', 'bottom']" :line-count="[8, 8, 10]"
        :line-distance="[100, 80, 90]" :bend-radius="5.0" :bend-strength="-5.0" :interactive="true" :parallax="true" />
    </div>

    <!-- 前景内容 -->
    <div class="info-message animate__animated animate__flip">
      <div class="left animate__animated animate__bounceInDown">
        <h2 class="username">{{ userProfile.nickname || '测试用户' }}</h2>
        <div class="avatar">
          <img :src="userProfile.avatarUrl || 'https://picsum.photos/200/200'" alt="" />
        </div>
        <div class="user-info">
          <div class="statistics">
            <div class="item trends">
              <p>{{ userProfile.sCount || 0 }}</p>
              <p>动态</p>
            </div>
            <div class="item follow">
              <p>{{ userProfile.followeds || 0 }}</p>
              <p>关注</p>
            </div>
            <div class="item fans">
              <p>{{ userProfile.follows || 0 }}</p>
              <p>粉丝</p>
            </div>
          </div>
        </div>
        <div class="address">地区:{{ userProfile.city || '未知' }}</div>
      </div>
    </div>

    <div class="musiclist">
      <!-- 收藏歌单 -->
      <h2>全部的歌单</h2>
      <div class="collect">
        <ul>
          <template v-for="(item, index) in userPlayList" :key="item.id || index">
            <li @click="handleMusicDetailClick(item)">
              <img :src="item.coverImgUrl || 'https://picsum.photos/200/200'" alt="" />
              <p>{{ item.name || '未知歌单' }}</p>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
// 随机数
import { randomMusic } from '@/utils/random'
// img
import { imgURL } from '@/utils/img-url'
// 引入three.js效果组件
import FloatingLines from '@/three/user-bg/FloatingLines.vue'

//  TODO:  动态展示图片 有bug  可以换成判断性别切换动态背景  userProfile.value.gender
// const bgImage = imgURL(swiperList[randomMusic(1, swiperList.length)].url)

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
  position: relative;
  // padding: 20px;

  // three.js背景容器
  .bg-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 85px);
    z-index: 0; // 设置为0，让它能接收鼠标事件但不会遮挡内容
    overflow: hidden;
    pointer-events: auto; // 确保能接收鼠标事件
  }

  .info-message {
    width: 100%;
    height: calc(100vh - 85px);
    display: flex;
    justify-content: center;
    // background: rgba(0, 0, 0, 0.3);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    z-index: 2; // 设置为2，确保内容显示在背景之上
    // backdrop-filter: blur(5px);
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
      color: #f9f9f9;
    }
  }
}

.musiclist {
  margin-top: 30px;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 2; // 设置为2，确保歌单列表显示在背景之上
  background-color: #f8f5f5; // 添加背景色，确保内容清晰可见
  padding: 20px;
  box-sizing: border-box;

  h2 {
    font-size: 20px;
    font-weight: 800;
    color: #060606;
  }

  .collect {
    display: flex;
    height: calc(100% - 40px);
    flex: 1;

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
        background-color: white; // 添加背景色，确保歌单项清晰可见
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 添加阴影，增强视觉效果
        transition: all 0.3s ease; // 添加过渡效果，提升交互体验

        img {
          width: 100%;
          height: 200px;
          margin-bottom: 10px;
          border-radius: 10px 10px 0 0; // 调整圆角，使图片与容器更匹配
        }

        p {
          font-size: 16px;
          padding: 0 10px 10px;
          margin: 0;
        }

        &:hover {
          transform: translateY(-5px); // 鼠标悬停时上移，增强交互体验
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15); // 增强阴影效果
        }
      }
    }
  }
}
</style>
