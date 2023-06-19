import { ref } from 'vue'

import { defineStore } from 'pinia'

import { getSongUrl } from '@/services/modules/play-song'

// 播放仓库
export const usePlayMusicStore = defineStore('playMusic', () => {
  // 双击拿到当前这首
  const currentMusic = ref<any>({})
  // 双击拿到的全部播放列表
  const playMusicData = ref<any[]>([])
  // 音乐url
  const musicUrl = ref<any>([])

  // 当前是否播放
  const isShowPlay = ref<boolean>(false)

  // 拿到音乐url
  const getSongUrlAction = async (id: any) => {
    const result = await getSongUrl(id)
    musicUrl.value = result.data
    // 当成功返回就将isShowPlay 改为 true
    if (result.code === 200) isShowPlay.value = true
  }

  // 存储双击拿到的播放列表
  function savePlayMusicFn(current: any, data: any) {
    //  current:当前这首
    currentMusic.value = current
    // data:全部列表
    playMusicData.value = data
  }

  // 改变正在播放的这首
  function setCurrentMusic(dbMusic: any) {
    currentMusic.value = dbMusic
  }

  return {
    currentMusic,
    musicUrl,
    isShowPlay,
    playMusicData,
    savePlayMusicFn,
    getSongUrlAction,
    setCurrentMusic
  }
})
