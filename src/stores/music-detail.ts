import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getDetailsDataListAll,
  getTrackAllData,
  getDynamicDetailId,
  getCommentId,
  getSubscribesAll
} from '@/services/modules/music-detail'

export const useMusicDetailStore = defineStore('music-detail', () => {
  // 登录的所有歌曲
  const songsAll = ref([])
  // 歌曲详情
  const playList = ref({})
  // 没有登录调用这个
  const getDetailsDataListAllAction = async (id: string) => {
    const result = await getDetailsDataListAll(id)
    console.log(result.playlist)
    playList.value = result.playlist
  }

  // 登录调用这个
  const getTrackAllDataAction = async (id: string | number) => {
    const result = await getTrackAllData(id)
    // console.log(result)
    songsAll.value = result.songs
  }

  return { getDetailsDataListAllAction, getTrackAllDataAction }
})
