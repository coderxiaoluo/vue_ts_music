import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/services/modules/user'
import { localCache } from '@/utils/localCache'
const userid = localCache.getCache('account')
// 存储用户相关的
export const useUserStore = defineStore('user', () => {})
