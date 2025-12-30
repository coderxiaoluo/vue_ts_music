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
} from '@/services/modules/login/login'
import { getUserAccount, getUserInfo, getUserPlayList } from '@/services/modules/user'
import { localCache } from '@/utils/localCache'
import { ElMessage } from 'element-plus'
export const useLoginStore = defineStore('login', () => {
  // 判断是否登录
  // const isLogin = ref<boolean>(localCache.getCache('isLogin') ?? false)
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
  const isStatus = ref<boolean>(localCache.getCache('isStatus') ?? false)
  // 用户信息
  const account = ref<any>(localCache.getCache('account') ?? {})
  const profile = ref<any>(localCache.getCache('profile') ?? {})

  //  歌单
  const userplaylist = ref(localCache.getCache('userplaylist') ?? [])
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
      // 停止发送请求
      clearInterval(stopTimer.value)
      expireQr.value = true
    }
  }

  // 获取当前登录状态 当前是登录的还是没有登录
  async function getStatusAction(cookie: string) {
    const result = await getStatus(cookie)
    const data = result.data
    // =++++++++
    // 存储用户信息
    account.value = data.account
    profile.value = data.profile
    localCache.setCache('account', data.account)
    localCache.setCache('profile', data.profile)

    // 登录后拿到用户信息
    getUserAccountAction(data.account.id, cookie)
    // 用户已经登录过了
    if (data.code == 200) {
      // 用户歌单列表
      const res = await getUserPlayList(data.account.id)
      userplaylist.value = res.playlist
      localCache.setCache('userplaylist', res.playlist)

      isStatus.value = true
      localCache.setCache('isStatus', true)
    } else {
      // 用户退出了
      // isStatus.value = false
      // localCache.clearCache()
    }
  }
  // 获取用户信息
  async function getUserAccountAction(id: number, cookie: string) {
    // const result = await getUserAccount(cookie)
    // // 用户信息
    // localCache.setCache('account', result.account)
    // account.value = result.account
    // // 用户详细信息
    // const result2 = await getUserInfo(id)
    // localCache.setCache('profile', result.profile)
    // profile.value = result2.profile
  }

  // 发送验证码
  async function getCaptchaSentAction(phone: number) {
    await getCaptchaSent(phone)
  }

  // 验证验证码
  async function getCaptchaVerifyAction(phone: number, verify: number) {
    const result = await getCaptchaVerify(phone, verify)
    // 手机号登录成功
    if (result.data) {
      // getStatusAction()
      ElMessage.success('登录成功')
    }
  }
  // 退出登录
  async function getExitLogoutAction() {
    const result = await getExitLogout()
    // 退出成功
    if (result.code === 200) {
      ElMessage.success('退出登录成功!')
      isStatus.value = false
      localCache.clearCache()
    }
  }

  function changeIsStatus() {
    isStatus.value = false
  }
  return {
    qrimg,
    stopTimer,
    account,
    profile,
    inspect,
    expireQr,
    isStatus,
    userplaylist,
    isDialogTableVisible,
    changeIsStatus,
    getLoginQrKeyAction,
    getStatusAction,
    getCaptchaSentAction,
    getCaptchaVerifyAction,
    getExitLogoutAction
  }
})
