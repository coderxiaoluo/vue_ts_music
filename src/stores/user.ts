import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo, userPlaylist } from '@/services/modules/user'
// import { localCache } from '@/utils/localCache'
// const userid = localCache.getCache('account')
// 存储用户相关的
export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userProfile = ref<any>({})

  // 用户歌单
  const userPlayList = ref<any[]>([])

  const getUserInfoAction = async (id: number) => {
    const result = await getUserInfo(id)
    userProfile.value = result.profile
  }

  // 获取用户歌单
  const userPlaylistAction = async (id: number) => {
    const result = await userPlaylist(id)
    userPlayList.value = result.playlist
  }

  return { userProfile, userPlayList, getUserInfoAction, userPlaylistAction }
})
