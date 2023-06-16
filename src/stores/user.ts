import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/services/modules/user'
// import { localCache } from '@/utils/localCache'
// const userid = localCache.getCache('account')
// 存储用户相关的
export const useUserStore = defineStore('user', () => {
  // 动态切换变量
  const isShowUserInfo = ref<boolean>(true)

  // 用户信息
  const userProfile = ref<any>({})
  const getUserInfoAction = async (id: number) => {
    const result = await getUserInfo(id)
    userProfile.value = result.profile
  }

  // 切换 isShowUserInfo 变量
  function setIsShowUserInfo() {
    isShowUserInfo.value = !isShowUserInfo.value
  }

  return { isShowUserInfo, userProfile, getUserInfoAction, setIsShowUserInfo }
})
