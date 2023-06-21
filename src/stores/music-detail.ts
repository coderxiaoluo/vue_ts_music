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
  const songsAll = ref<any>([])
  // 歌曲详情
  const playList = ref<any>({})
  // 没有登录展示20的数据
  const tracksList = ref<any[]>([])
  // 加载中
  const LOADING = ref<boolean>(true)
  // 未登录展示的收藏者
  const subScriber = ref<any[]>([])
  // 没有登录调用这个
  const getDetailsDataListAllAction = async (id: string) => {
    const result = await getDetailsDataListAll(id)
    // 歌曲详情 以及没有登录的20首音乐
    playList.value = result.playlist
    tracksList.value = result.playlist?.tracks
    subScriber.value = result.playlist?.subscribers
    LOADING.value = false
  }

  // 登录调用这个
  const getTrackAllDataAction = async (id: string | number, trackCount?: any) => {
    // 当超过5000条,只发送200条
    if (trackCount > 5000) trackCount = 300
    const result = await getTrackAllData(id, trackCount)
    songsAll.value = result.songs
    LOADING.value = false
  }

  return {
    playList,
    songsAll,
    tracksList,
    subScriber,
    LOADING,
    getDetailsDataListAllAction,
    getTrackAllDataAction
  }
})
