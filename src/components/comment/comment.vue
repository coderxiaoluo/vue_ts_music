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
        :autofocus="isReply"
        :focus="isReply"
      />
      <div class="commentBtn">
        <el-button type="danger" v-if="isReply" @click="handleIsReplyClick">回复</el-button>
        <el-button type="danger" v-else @click="handleCommentClick">评论</el-button>
      </div>
    </div>
    <CommentList
      :commentList="hotComments"
      :title="'精彩评论'"
      @textareaEmits="EmitTextAreaClick"
    />
    <CommentList
      :commentList="commentList"
      v-if="isRefreshComment"
      :title="'最新评论'"
      @textareaEmits="EmitTextAreaClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useCommentStore } from '@/stores/comment'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '@/stores/login'
import CommentList from './c-cpn/comment-list.vue'
import { ElMessage } from 'element-plus'

// route
const route = useRoute()

const loginStore = useLoginStore()
// 拿到歌单id
const musicId = ref<any>(route.params.id)
const commentStore = useCommentStore()
// 发送评论
commentStore.getSongSheetCommentAction(musicId.value)
// 获取是否登录
const { isStatus } = storeToRefs(loginStore)
// 获取评论
const { isRefreshComment, commentList, hotComments } = storeToRefs(commentStore)
// 评论
const textarea = ref('')

const handleCommentClick = async () => {
  if (!isStatus.value) return ElMessage.error('未登录')
  if (textarea.value !== '') {
    // 发送请求
    await commentStore.sendCommentsAction(1, musicId.value, textarea.value)
    // 清空输入的内容
    textarea.value = ''
    // 发送评论
    commentStore.getSongSheetCommentAction(musicId.value)
    // 重写刷新
    commentStore.setIsRefreshComment()
    //
    ElMessage.success('评论成功!')
  } else {
    ElMessage.error('写点东西吧，不要错过!')
  }
}

// 刷新
watch(isRefreshComment, () => {
  nextTick(() => {
    isRefreshComment.value = true
  })
})

const isAutoFocus = ref(true)

// 显示回复按钮
const isReply = ref(false)
const EmitTextAreaClick = async (v: any) => {
  // 回复
  isReply.value = true
  textarea.value = '回复' + v.nickname + ':'
}

const handleIsReplyClick = async (v: any) => {
  console.log('评论')
  await commentStore.sendCommentsAction(0, musicId.value, textarea.value, v.userId)
  ElMessage.success('回复成功!')
}
</script>

<style lang="less" scoped>
.el-button {
  float: right;
  color: #ffffff;
}

//
</style>
