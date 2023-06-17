import { defineStore } from 'pinia'
import { ref } from 'vue'
import { topRankingList } from '@/services/modules/ranking/index'

export const useRankingStore = defineStore('ranking', () => {
  // 前四条
  const mapItem = ref<any>([])
  // 后面数据
  const mapEndItem = ref<any>([])
  // 发送请求 排行榜
  const topRankingListAction = async () => {
    const result = await topRankingList()
    // 拿到前面四条数据
    mapItem.value = result.list.map((item: any) => item).splice(0, 4)
    // 拿到后面数据
    mapEndItem.value = result.list.map((item: any) => item).splice(4, result.list.length - 1)
  }

  return { mapItem, mapEndItem, topRankingListAction }
})
