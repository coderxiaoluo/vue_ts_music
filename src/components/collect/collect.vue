<template>
  <div class="collect">
    <ul class="userItemContainer">
      <template v-for="item in subScriber" :key="item.userId">
        <li @click="onUserClick(item)">
          <div class="avatar">
            <img :src="item.avatarUrl" alt="" />
          </div>
          <div class="username">
            {{ item.nickname }}
            <svg v-if="item.gender == 1" class="icon icon-comment" aria-hidden="true">
              <use xlink:href="#icon-nan"></use>
            </svg>
            <svg v-else class="icon icon-comment" aria-hidden="true">
              <use xlink:href="#icon-nv"></use>
            </svg>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMusicDetailStore } from '@/stores/music-detail'

const commentStore = useMusicDetailStore()

const userStore = useUserStore()

//  收藏者
const { subScriber } = storeToRefs(commentStore)

const router = useRouter()
const onUserClick = (v: any) => {
  // userStore.getUserInfoAction(v.userId)
  router.push({
    path: `/user/${v.userId}`
  })
}
</script>

<style lang="less" scoped>
.userItemContainer {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;

  li {
    width: 420px;
    height: 150px;
    display: flex;
    align-items: center;
    .avatar {
      width: 80px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid var(--color-tags);
      }
    }
    .username {
      display: flex;
      align-items: center;
      margin-left: 10px;
      flex: 1;
      .icon-comment {
        width: 20px;
      }
    }
  }
}
</style>
