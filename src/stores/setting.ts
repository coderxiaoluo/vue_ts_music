import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  // 判断折叠变量
  const isFold = ref(false)
  // 刷新变量
  const isRefresh = ref(true)
  // 修改折叠变量
  function setiSFold() {
    isFold.value = !isFold.value
  }
  // 修改折叠变量
  function setIsRefresh() {
    isRefresh.value = !isRefresh.value
  }
  return { isFold, isRefresh, setiSFold, setIsRefresh }
})
