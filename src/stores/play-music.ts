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
  // 音乐url 缓存池，支持预加载
  const musicUrl = ref<Map<number, MusicUrlItem>>(new Map())
  // 新版音乐 url
  const newMusicUrl = ref<Map<number, MusicUrlItem>>(new Map())

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
    const urlItem = musicUrl.value.get(currentMusic.value.id)
    return urlItem?.url || ''
  })

  // 计算属性：当前播放的高品质音乐URL
  const currentNewMusicUrl = computed(() => {
    if (!currentMusic.value.id) return ''
    const urlItem = newMusicUrl.value.get(currentMusic.value.id)
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
  const getSongUrlAction = async (id: number, preload = false) => {
    // 如果已经有缓存，直接返回
    if (musicUrl.value.has(id)) {
      if (!preload) {
        isShowPlay.value = true
      }
      return
    }

    if (isLoading.value && !preload) return // 防止重复请求，预加载除外

    if (!preload) {
      isLoading.value = true
      error.value = null
    }

    try {
      const cookie = localCache.getCache('cookie') || ''
      const result = await getSongUrl(id, cookie, {
        cache: true,
        cacheKey: `song_url_${id}`
      })

      if (result.code === 200 && result.data) {
          // 存储到Map中
          result.data.forEach((item: MusicUrlItem) => {
            musicUrl.value.set(item.id, item)
          })

          if (!preload) {
            isShowPlay.value = true
            // 只有非预加载时才预取下一首，避免无限递归
            preloadNextSong(id)
          }
        }
    } catch (err) {
      if (!preload) {
        error.value = '获取音乐地址失败'
        console.error('获取音乐地址失败:', err)
      }
    } finally {
      if (!preload) {
        isLoading.value = false
      }
    }
  }

  // 拿到新版音乐url
  const getNewSongUrlLevelAction = async (id: string, preload = false) => {
    const musicId = Number(id)
    // 如果已经有缓存，直接返回
    if (newMusicUrl.value.has(musicId)) {
      return
    }

    if (isNewUrlLoading.value && !preload) return // 防止重复请求，预加载除外

    if (!preload) {
      isNewUrlLoading.value = true
      newUrlError.value = null
    }

    try {
      const result = await newSongUrlLevel(id, 'jymaster', {
        cache: true,
        cacheKey: `new_song_url_${id}`
      })

      if (result.code === 200 && result.data) {
        // 存储到Map中
        result.data.forEach((item: MusicUrlItem) => {
          newMusicUrl.value.set(item.id, item)
        })
      }
    } catch (err) {
      if (!preload) {
        newUrlError.value = '获取高品质音乐地址失败'
        console.error('获取高品质音乐地址失败:', err)
      }
    } finally {
      if (!preload) {
        isNewUrlLoading.value = false
      }
    }
  }

  // 预加载下一首歌曲
  const preloadNextSong = (currentId: number) => {
    const currentIndex = playMusicData.value.findIndex(item => item.id === currentId)
    if (currentIndex === -1 || currentIndex >= playMusicData.value.length - 1) {
      return // 已经是最后一首，不需要预加载
    }

    const nextIndex = currentIndex + 1
    const nextSong = playMusicData.value[nextIndex]

    // 预加载下一首歌曲的普通音质和高品质音质
    getSongUrlAction(nextSong.id, true)
    getNewSongUrlLevelAction(String(nextSong.id), true)
  }

  // 清空播放列表
  function clearPlayList() {
    currentMusic.value = {} as MusicItem
    playMusicData.value = []
    musicUrl.value.clear()
    newMusicUrl.value.clear()
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
    currentNewMusicUrl,
    savePlayMusicFn,
    setCurrentMusic,
    getSongUrlAction,
    getNewSongUrlLevelAction,
    clearPlayList,
    nextMusic,
    prevMusic,
    preloadNextSong
  }
})
