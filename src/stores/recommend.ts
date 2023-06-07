import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBannerData, getRelatedDataList } from '@/services/modules/recommend'
export const useRecommendStore = defineStore('recommend', () => {
  // banner轮播图
  const bannerList = ref<any>([])

  // 推荐歌单数据
  const songList = ref<any>([])

  // 发送banner轮播图请求
  async function getBannerDataAction() {
    const result = await getBannerData()
    bannerList.value = result.banners
  }
  // 推荐歌单
  async function getRelatedDataListAction() {
    const results = await getRelatedDataList()
    songList.value = results.result
  }
  return { bannerList, songList, getBannerDataAction, getRelatedDataListAction }
})
