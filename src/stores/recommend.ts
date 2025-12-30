import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getBannerData, getRelatedDataList } from '@/services/modules/recommend'

// 类型定义
export interface BannerItem {
  imageUrl: string
  targetId: number
  adid?: string
  targetType: number
  titleColor: string
  typeTitle: string
  url?: string
}

export interface SongListItem {
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  copywriter?: string
  creator?: {
    nickname: string
  }
}

export const useRecommendStore = defineStore('recommend', () => {
  // banner轮播图
  const bannerList = ref<BannerItem[]>([])
  // 推荐歌单数据
  const songList = ref<SongListItem[]>([])

  // 加载状态
  const isBannerLoading = ref(false)
  const isSongListLoading = ref(false)

  // 错误状态
  const bannerError = ref<string | null>(null)
  const songListError = ref<string | null>(null)

  // 计算属性：是否所有数据都已加载完成
  const isAllLoaded = computed(() => {
    return !isBannerLoading.value && !isSongListLoading.value
  })

  // 发送banner轮播图请求
  async function getBannerDataAction() {
    if (bannerList.value.length > 0) return // 数据已存在，不再请求

    isBannerLoading.value = true
    bannerError.value = null

    try {
      const result = await getBannerData({
        cache: true,
        cacheKey: 'banner_data'
      })
      bannerList.value = result.banners || []
    } catch (error) {
      bannerError.value = '获取轮播图失败'
      console.error('获取轮播图失败:', error)
    } finally {
      isBannerLoading.value = false
    }
  }

  // 推荐歌单
  async function getRelatedDataListAction() {
    if (songList.value.length > 0) return // 数据已存在，不再请求

    isSongListLoading.value = true
    songListError.value = null

    try {
      const results = await getRelatedDataList(20, {
        cache: true,
        cacheKey: 'related_song_list'
      })
      songList.value = results.result || []
    } catch (error) {
      songListError.value = '获取推荐歌单失败'
      console.error('获取推荐歌单失败:', error)
    } finally {
      isSongListLoading.value = false
    }
  }

  // 刷新数据
  async function refreshData() {
    // 清除缓存
    await Promise.all([
      getBannerDataAction(),
      getRelatedDataListAction()
    ])
  }

  return {
    bannerList,
    songList,
    isBannerLoading,
    isSongListLoading,
    bannerError,
    songListError,
    isAllLoaded,
    getBannerDataAction,
    getRelatedDataListAction,
    refreshData
  }
})
