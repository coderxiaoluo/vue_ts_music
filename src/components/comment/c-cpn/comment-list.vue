<template>
  <div class="wonderful">
    <h3>{{ title }}</h3>
    <template v-for="item in commentList" :key="item.commentId">
      <div class="hot-comment">
        <!-- 左侧头像 -->
        <div class="avatar-img">
          <img :src="item.user.avatarUrl" alt="" />
        </div>
        <!-- 右侧信息
         -->
        <div class="right-info">
          <div class="commentContent">
            <span class="commentUserNickName">{{ item.user.nickname }}:</span>
            <img
              v-if="item.user?.vipRights?.associator?.iconUrl"
              class="vip-icon"
              :src="item.user?.vipRights?.associator?.iconUrl"
              alt=""
            />
            <span class="comment-content">{{ item.content }}</span>
          </div>
          <div class="comment-bottom">
            <div class="time_address">
              <span>{{ item.timeStr }}</span>
              <span class="ip">IP:{{ item.ipLocation.location }}</span>
            </div>
            <div class="buttons">
              <!-- 点赞 -->
              <div @click="handleLikeClick(item)" class="like item">
                <svg ref="svgLike" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-dianzan"></use>
                  <!-- <use xlink:href="#icon-dianzan1"></use> -->
                </svg>
              </div>
              <div class="item like-num">
                {{ item.likedCount }}
              </div>
              <div class="share item">
                <svg class="icon icon_share" aria-hidden="true">
                  <use xlink:href="#icon-fenxiang"></use>
                </svg>
              </div>
              <div @click="handleShareClick(item)" class="reply item">
                <svg class="icon icon_share" aria-hidden="true">
                  <use xlink:href="#icon-huifu"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/login'
import { useRoute } from 'vue-router'
import { useCommentStore } from '@/stores/comment'
import { ElMessage } from 'element-plus'

defineProps({
  commentList: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: '评论'
  }
})
const emits = defineEmits(['textareaEmits'])

const loginStore = useLoginStore()
const commentStore = useCommentStore()
// 获取是否登录
const { isStatus } = storeToRefs(loginStore)

const { isLike } = storeToRefs(commentStore)

const route = useRoute()
const musicId = ref<any>(route.params.id)

// 点赞   必须要用户登录才能点赞
const handleLikeClick = async (v: any) => {
  if (isStatus.value) {
    // 登录了
    const res = await commentStore.likeCommentIsShowAction(v.commentId, musicId.value, 1)
    ElMessage({
      message: '点赞成功',
      type: 'success'
    })
  } else {
    // 未登录
  }
}

// 回复
const handleShareClick = async (v: any) => {
  emits('textareaEmits', v.user)
}
</script>

<style lang="less" scoped>
// 精彩评论
.wonderful {
  box-sizing: border-box;
  font-size: 14px;
  font-size: 17px;
  h3 {
    margin-top: 30px;
    font-weight: 900;
  }
  .hot-comment {
    display: flex;
    margin-top: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #d6d4d4;

    .avatar-img {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .right-info {
      margin-left: 10px;
      flex: 1;
      .commentContent {
        .commentUserNickName {
          font-size: 14px;
          color: rgb(63, 66, 230);
        }
        .vip-icon {
          width: 40px;
          height: 15px;
          margin: 0 5px;
        }
        .comment-content {
          font-size: 12px;
          color: rgb(33, 33, 33);
        }
      }
      // 回复
      .be-replied {
        background-color: #f5f5f5;
        padding: 5px;
        margin: 5px 0;
        font-size: 13px;
        .et-nickName {
          color: rgb(63, 66, 230);
        }
      }
      .comment-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;

        .time_address {
          font-size: 14px;
          color: #737373;

          .ip {
            margin: 0 5px;
          }
        }
        .buttons {
          display: flex;
          .icon {
            width: 100%;
            height: 100%;
          }
          .iconLike {
            background-color: red;
          }
          .like-num {
            font-size: 12px;
            padding-top: 2px;
          }

          .item {
            width: 15px;
            height: 15px;
            margin: 0 5px;
          }
        }
      }
    }
  }
}
</style>
