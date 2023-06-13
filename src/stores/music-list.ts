import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCatListData,
  getHotPlayListData,
  getBoutiqueDataList
} from '@/services/modules/music-list/music-list'

export const useMusicListStore = defineStore('music-list', () => {
  // 全部歌单tag
  const tagAll = ref([])
  // 右侧十个tag
  const rightTag = ref([])
  // 歌单列表
  const playLists = ref([])
  // 总条数
  const total = ref(0)
  // 左侧全部歌单tag
  const getCatListDataAction = async () => {
    const result = await getCatListData()
    tagAll.value = result.sub
  }
  // 右侧十个tag标签
  const getHotPlayListDataAction = async () => {
    const result = await getHotPlayListData()
    rightTag.value = result.tags
  }
  // // 精品歌单标签列表
  // const getHighQualityDataAction = async () => {
  //   const result = await getHighQualityData()
  //   console.log(result)
  // }
  //  精品歌单标签列表
  const getBoutiqueDataListAction = async (
    cat?: string,
    limit?: string | number,
    offset?: number
  ) => {
    const result = await getBoutiqueDataList(cat, limit, offset)
    // more
    // console.log(result)
    total.value = result.total
    playLists.value = result.playlists
  }

  return {
    tagAll,
    rightTag,
    playLists,
    total,
    getCatListDataAction,
    getHotPlayListDataAction,
    getBoutiqueDataListAction
  }
})
