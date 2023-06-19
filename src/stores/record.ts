import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLyricData } from '@/services/modules/record'

export const useRecordStore = defineStore('record', () => {
  // 唱片展开与缩放
  const isRecordPage = ref<boolean>(false)
  const lyricTime = ref<number>(0)

  const lyricData = ref<any>({})

  // 获取歌词
  const getLyricDataAction = async (id: any) => {
    const result = await getLyricData(id)
    lyricData.value = result.lrc
  }

  // 修改唱片
  function setIsRecordPageFn() {
    isRecordPage.value = !isRecordPage.value
  }

  return { lyricData, lyricTime, isRecordPage, getLyricDataAction, setIsRecordPageFn }
})
