import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getDetailsDataListAll,
  getTrackAllData
} from '@/services/modules/music-detail'

// 类型定义
export interface MusicDetail {
  id: number
  name: string
  coverImgUrl: string
  trackCount: number
  tracks: any[]
  subscribers: any[]
  creator: {
    nickname: string
    avatarUrl: string
  }
  description: string
  createTime: number
  playCount: number
  tags: string[]
}

export interface MusicItem {
  id: number
  name: string
  ar: Array<{
    id: number
    name: string
  }>
  al: {
    id: number
    name: string
    picUrl: string
  }
  dt: number
}

export const useMusicDetailStore = defineStore('music-detail', () => {
  // 登录的所有歌曲
  const songsAll = ref<MusicItem[]>([])
  // 歌曲详情
  const playList = ref<MusicDetail>({} as MusicDetail)
  // 没有登录展示20的数据
  const tracksList = ref<MusicItem[]>([])
  // 未登录展示的收藏者
  const subScriber = ref<any[]>([])

  // 加载状态分离，避免冲突
  const isDetailsLoading = ref<boolean>(false)
  const isTracksLoading = ref<boolean>(false)

  // 计算属性：总加载状态
  const LOADING = computed(() => {
    return isDetailsLoading.value || isTracksLoading.value
  })

  // 计算属性：当前显示的歌曲列表
  const currentTracks = computed(() => {
    return songsAll.value.length > 0 ? songsAll.value : tracksList.value
  })

  // 没有登录调用这个
  const getDetailsDataListAllAction = async (id: string) => {
    isDetailsLoading.value = true
    try {
      const result = await getDetailsDataListAll(id, {
        cache: true,
        cacheKey: `playlist_detail_${id}`
      })
      // 歌曲详情 以及没有登录的20首音乐
      playList.value = result.playlist
      tracksList.value = result.playlist?.tracks || []
      subScriber.value = result.playlist?.subscribers || []
    } catch (error) {
      console.error('获取歌单详情失败:', error)
    } finally {
      isDetailsLoading.value = false
    }
  }

  // 登录调用这个
  const getTrackAllDataAction = async (id: string | number, trackCount?: any) => {
    // 限制最大获取数量为300，避免请求过大导致卡顿，尤其是"我喜欢的音乐"歌单
    const limit = Math.min(trackCount || 200, 300)

    // 如果已经有数据且ID匹配，不再重复请求
    if (songsAll.value.length > 0 && playList.value.id === Number(id)) return

    isTracksLoading.value = true
    try {
      const result = await getTrackAllData(id, limit, {
        cache: true,
        cacheKey: `playlist_tracks_${id}_${limit}`
      })
      songsAll.value = result.songs || []
    } catch (error) {
      console.error('获取歌单歌曲失败:', error)
      songsAll.value = [] // 确保数据为空，避免显示旧数据
    } finally {
      isTracksLoading.value = false
    }
  }

  // 清空数据，用于路由切换
  const clearData = () => {
    songsAll.value = []
    playList.value = {} as MusicDetail
    tracksList.value = []
    subScriber.value = []
    isDetailsLoading.value = false
    isTracksLoading.value = false
  }

  return {
    playList,
    songsAll,
    tracksList,
    subScriber,
    LOADING,
    currentTracks,
    getDetailsDataListAllAction,
    getTrackAllDataAction,
    clearData
  }
})
