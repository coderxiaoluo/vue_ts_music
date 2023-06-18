import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSearchDefault, getSearchHot, getSearchHotDefault } from '@/services/modules/search'

// 搜索 仓库
export const useSearchStore = defineStore('search', () => {
  // 默认内容
  const placeholderWord = ref<any>({})
  // 热搜榜 20条
  const searchHotWord = ref<any[]>([])

  // 默认内容
  async function getSearchDefaultAction() {
    const result = await getSearchDefault()
    placeholderWord.value = result.data
  }

  // 热搜列表(简略)
  async function getSearchHotAction() {
    const result = await getSearchHot()
    console.log(result)
  }
  // 热搜列表(详细)
  async function getSearchHotDefaultAction() {
    const result = await getSearchHotDefault()
    searchHotWord.value = result.data
    return Promise.resolve(result.code)
  }

  return {
    placeholderWord,
    searchHotWord,
    getSearchDefaultAction,
    getSearchHotAction,
    getSearchHotDefaultAction
  }
})
