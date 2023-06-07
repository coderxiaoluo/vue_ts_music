import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBannerData } from '@/services/modules/recommend'
export const useRecommendStore = defineStore('recommend', () => {
  // banner轮播图
  const bannerList = ref<any>([])

  // 发送banner轮播图请求
  async function getBannerDataAction() {
    const result = await getBannerData()
    bannerList.value = result.banners
  }

  return { bannerList, getBannerDataAction }
})
