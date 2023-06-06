import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getLoginQrKey,
  getCreateQr,
  inspectQr,
  getStatus,
  getCaptchaSent,
  getCaptchaVerify,
  getExitLogout
} from '@/services/login/login'
import { getUserAccount, getUserInfo } from '@/services/user/index'
import { localCache } from '@/utils/localCache'
import { ElMessage } from 'element-plus'
export const useLoginStore = defineStore('login', () => {
  // 二维码
  const qrimg = ref<string>('')
  // 停止检测二维码
  const stopTimer = ref<number | undefined>()
  // 获取检测状态 扫码中
  const inspect = ref<boolean>(false)
  // 获取检测状态 二维码过期了
  const expireQr = ref<boolean>(false)
  //  cookie
  const cookie = ref<string>('')
  // 窗口
  const isDialogTableVisible = ref(true)
  //当前是否登录
  const isStatus = ref(false)
  // 用户信息
  const account = ref<any>(localCache.getCache('account') ?? {})
  // 二维码 key 生成接口
  async function getLoginQrKeyAction() {
    const result = await getLoginQrKey()
    //成功拿到key
    if (result.code === 200) {
      const key = result.data.unikey
      // 二维码生成
      getCreateQrAction(key)
      // 调用二维码检测扫码状态
      stopTimer.value = setInterval(() => {
        inspectQrAction(key)
      }, 2500)
    }
  }
  // 二维码生成
  async function getCreateQrAction(key: string) {
    const result = await getCreateQr(key)
    // 将二维码图存储store中
    qrimg.value = result.data.qrimg
  }

  // 二维码检测扫码状态
  async function inspectQrAction(key: string) {
    const result = await inspectQr(key)
    console.log(result)
    // 待确认
    if (result.code === 802) {
      inspect.value = true
      return true
    }
    // 登录成功
    if (result.code === 803) {
      // 存储cookie
      localCache.setCache('cookie', result.cookie)
      cookie.value = result.cookie
      console.log(result)
      // 获取当前登录状态
      getStatusAction(result.cookie)
      // 停止监听
      clearInterval(stopTimer.value)
      inspect.value = false
      // 关闭窗口
      isDialogTableVisible.value = false
      // 登录成功
      ElMessage({
        message: '登录成功',
        type: 'success'
      })
    }
    // 二维码过期了
    if (result.code === 800) {
      console.log('二维码过期了')
      // 停止发送请求
      clearInterval(stopTimer.value)
      expireQr.value = true
    }
  }

  // 获取当前登录状态 当前是登录的还是没有登录
  async function getStatusAction(cookie: string) {
    const result = await getStatus(cookie)
    console.log(result)
    getUserAccountAction(result.data.account.id)
    // 用户已经登录过了
    if (result.data.account.id == 8023474819) {
      isStatus.value = false
      localCache.clearCache()
    } else {
      // 用户退出了
      isStatus.value = true
    }
  }
  // 获取用户信息
  async function getUserAccountAction(id: number) {
    const result = await getUserAccount()
    localCache.setCache('account', result.account)
    // 用户详细信息
    const result2 = await getUserInfo(id)
    console.log(result2)
  }

  // 发送验证码
  async function getCaptchaSentAction(phone: number) {
    const reult = getCaptchaSent(phone)
    console.log(reult)
  }

  // 验证验证码
  async function getCaptchaVerifyAction(phone: number, verify: number) {
    const result = await getCaptchaVerify(phone, verify)
    console.log(result.data)
    // 手机号登录成功
    if (result.data) {
      console.log(result)
      // getStatusAction()
      console.log('登录成功')
    }
  }
  // 退出登录
  async function getExitLogoutAction() {
    const result = await getExitLogout()
    // 退出成功
    if (result.code === 200) {
      console.log('退出登录成功!')
      isStatus.value = false
      localCache.clearCache()
    }
  }
  return {
    qrimg,
    stopTimer,
    inspect,
    expireQr,
    isStatus,
    isDialogTableVisible,
    getLoginQrKeyAction,
    getStatusAction,
    getCaptchaSentAction,
    getCaptchaVerifyAction,
    getExitLogoutAction
  }
})
