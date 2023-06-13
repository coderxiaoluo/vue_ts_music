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
  const getBoutiqueDataListAction = async () => {
    const result = await getBoutiqueDataList()
    console.log(result)
  }

  return {
    tagAll,
    rightTag,
    getCatListDataAction,
    getHotPlayListDataAction,
    getBoutiqueDataListAction
  }
})
