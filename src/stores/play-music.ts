import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getSongUrl, newSongUrlLevel } from '@/services/modules/play-song'
import { localCache } from '@/utils/localCache'

// 类型定义
export interface MusicItem {
  id: number
  name: string
  ar: Array<{
    id: number
    name: string
  }>
  al: {
    id: number
    name: string
    picUrl: string
  }
  dt: number
  index?: number
}

export interface MusicUrlItem {
  id: number
  url: string
  br: number
  size: number
  type: string
}

// 播放仓库
export const usePlayMusicStore = defineStore('playMusic', () => {
  // 双击拿到当前这首
  const currentMusic = ref<MusicItem>({} as MusicItem)
  // 双击拿到的全部播放列表
  const playMusicData = ref<MusicItem[]>([])
  // 音乐url
  const musicUrl = ref<MusicUrlItem[]>([])
  // 新版音乐 url
  const newMusicUrl = ref<MusicUrlItem[]>([])

  // 当前是否播放
  const isShowPlay = ref<boolean>(false)

  // 加载状态
  const isLoading = ref(false)
  const isNewUrlLoading = ref(false)

  // 错误状态
  const error = ref<string | null>(null)
  const newUrlError = ref<string | null>(null)

  // 计算属性：当前播放的音乐URL
  const currentMusicUrl = computed(() => {
    if (!currentMusic.value.id) return ''
    const urlItem = musicUrl.value.find(item => item.id === currentMusic.value.id)
    return urlItem?.url || ''
  })

  // 存储双击拿到的播放列表
  function savePlayMusicFn(current: MusicItem, data: MusicItem[]) {
    // 为每首歌添加索引
    const musicDataWithIndex = data.map((item, index) => ({
      ...item,
      index
    }))

    // current:当前这首
    currentMusic.value = { ...current, index: data.findIndex(item => item.id === current.id) }
    // data:全部列表
    playMusicData.value = musicDataWithIndex
  }

  // 改变正在播放的这首
  function setCurrentMusic(dbMusic: MusicItem) {
    currentMusic.value = dbMusic
  }

  // 拿到音乐url
  const getSongUrlAction = async (id: number) => {
    if (isLoading.value) return // 防止重复请求

    isLoading.value = true
    error.value = null

    try {
      const cookie = localCache.getCache('cookie') || ''
      const result = await getSongUrl(id, cookie, {
        cache: true,
        cacheKey: `song_url_${id}`
      })

      if (result.code === 200) {
        musicUrl.value = result.data || []
        isShowPlay.value = true
      }
    } catch (err) {
      error.value = '获取音乐地址失败'
      console.error('获取音乐地址失败:', err)
    } finally {
      isLoading.value = false
    }
  }

  // 拿到新版音乐url
  const getNewSongUrlLevelAction = async (id: string) => {
    if (isNewUrlLoading.value) return // 防止重复请求

    isNewUrlLoading.value = true
    newUrlError.value = null

    try {
      const result = await newSongUrlLevel(id, 'jymaster', {
        cache: true,
        cacheKey: `new_song_url_${id}`
      })
      newMusicUrl.value = result.data || []
    } catch (err) {
      newUrlError.value = '获取高品质音乐地址失败'
      console.error('获取高品质音乐地址失败:', err)
    } finally {
      isNewUrlLoading.value = false
    }
  }

  // 清空播放列表
  function clearPlayList() {
    currentMusic.value = {} as MusicItem
    playMusicData.value = []
    musicUrl.value = []
    newMusicUrl.value = []
    isShowPlay.value = false
  }

  // 下一首
  function nextMusic() {
    if (playMusicData.value.length === 0) return

    const currentIndex = currentMusic.value.index || 0
    const nextIndex = (currentIndex + 1) % playMusicData.value.length
    const nextMusic = playMusicData.value[nextIndex]

    setCurrentMusic(nextMusic)
    getSongUrlAction(nextMusic.id)
  }

  // 上一首
  function prevMusic() {
    if (playMusicData.value.length === 0) return

    const currentIndex = currentMusic.value.index || 0
    const prevIndex = (currentIndex - 1 + playMusicData.value.length) % playMusicData.value.length
    const prevMusic = playMusicData.value[prevIndex]

    setCurrentMusic(prevMusic)
    getSongUrlAction(prevMusic.id)
  }

  return {
    currentMusic,
    playMusicData,
    musicUrl,
    newMusicUrl,
    isShowPlay,
    isLoading,
    isNewUrlLoading,
    error,
    newUrlError,
    currentMusicUrl,
    savePlayMusicFn,
    setCurrentMusic,
    getSongUrlAction,
    getNewSongUrlLevelAction,
    clearPlayList,
    nextMusic,
    prevMusic
  }
})
