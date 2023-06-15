<template>
  <div class="comment">
    <!-- 输入评论 -->
    <div class="textarea-box">
      <el-input
        v-model.trim="textarea"
        :rows="3"
        type="textarea"
        placeholder="留下你精彩的评论吧!"
        maxlength="140"
        resize="none"
      />
      <div class="commentBtn">
        <el-button type="danger" @click="handleCommentClick">评论</el-button>
      </div>
    </div>
    <CommentList :commentList="hotComments" :title="'精彩评论'" />
    <CommentList :commentList="commentList" :title="'最新评论'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCommentStore } from '@/stores/comment'
import { storeToRefs } from 'pinia'
import CommentList from './c-cpn/comment-list.vue'
// route
const route = useRoute()
// 拿到歌单id
const musicId = ref<any>(route.params.id)
const commentStore = useCommentStore()

// 发送评论
commentStore.getSongSheetCommentAction(musicId.value)

// 获取评论
const { commentList, hotComments } = storeToRefs(commentStore)
console.log(hotComments)

// 评论
const textarea = ref('')

const handleCommentClick = () => {
  console.log('')
}
</script>

<style lang="less" scoped>
.el-button {
  float: right;
  color: #ffffff;
}

//
</style>
