import { ref } from 'vue'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/localCache'

import { getSongSheetComment, likeCommentIsShow, sendComments } from '@/services/modules/comment'

// 评论store
export const useCommentStore = defineStore('comment', () => {
  const isRefreshComment = ref(true)
  // 评论
  const commentList = ref<any[]>([])
  // 精彩评论
  const hotComments = ref<any[]>([])
  // 点赞变量
  const isLike = ref<boolean>(false)
  // 歌曲评论仓库
  const getSongSheetCommentAction = async (id: number | string) => {
    const result = await getSongSheetComment(id)
    commentList.value = result.comments
    hotComments.value = result.hotComments
  }

  // 点赞
  const likeCommentIsShowAction = async (cid: number | string, id: any, likeCount: number) => {
    const cookie = localCache.getCache('cookie')
    const result = await likeCommentIsShow(cid, id, likeCount, cookie)
    if (result.code === 200) {
      isLike.value = true
      return true
    } else {
      return false
    }
  }
  // 发送评论
  const sendCommentsAction = async (t: number, id: any, content: string, commentId?: number) => {
    const cookie = localCache.getCache('cookie')
    const result = await sendComments(t, id, content, cookie, commentId)
  }

  // 修改变量
  function setIsRefreshComment() {
    isRefreshComment.value = !isRefreshComment.value
  }
  return {
    isRefreshComment,
    commentList,
    hotComments,
    isLike,
    setIsRefreshComment,
    getSongSheetCommentAction,
    likeCommentIsShowAction,
    sendCommentsAction
  }
})
