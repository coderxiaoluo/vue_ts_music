import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/services/modules/user'
import { localCache } from '@/utils/localCache'
// const userid = localCache.getCache('account')
// 存储用户相关的
export const useUserStore = defineStore('user', () => {
  const userProfile = ref<any>({})
  const getUserInfoAction = async (id: number) => {
    const result = await getUserInfo(id)
    userProfile.value = result.profile
  }

  return { userProfile, getUserInfoAction }
})
