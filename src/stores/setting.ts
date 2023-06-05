import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  // 判断折叠变量
  const isFold = ref(false)

  // 修改折叠变量
  function setiSFold() {
    isFold.value = !isFold.value
  }

  return { isFold, setiSFold }
})
