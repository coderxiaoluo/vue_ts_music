import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSongSheetComment } from '@/services/modules/comment'

// 评论store
export const useCommentStore = defineStore('comment', () => {
  // 评论
  const commentList = ref<any[]>([])
  // 精彩评论
  const hotComments = ref<any[]>([])
  // 歌曲评论
  const getSongSheetCommentAction = async (id: number | string) => {
    const result = await getSongSheetComment(id)
    commentList.value = result.comments
    hotComments.value = result.hotComments
  }

  return { commentList, hotComments, getSongSheetCommentAction }
})
