import { localCache } from '@/utils/localCache'
import lRequest from '..'

// 二维码 key 生成接口
export function getLoginQrKey() {
  return lRequest.get({
    url: '/login/qr/key',
    params: {
      // 必须带上时间戳
      timestamp: new Date().getTime()
    }
  })
}

//  二维码生成接口
export function getCreateQr(key: any) {
  return lRequest.get({
    url: `/login/qr/create?key=${key}`,
    params: {
      timestamp: new Date().getTime(),
      qrimg: true
    }
  })
}

// 二维码检测扫码状态接口

export function inspectQr(key: any) {
  return lRequest.get({
    url: `/login/qr/check?key=${key}`,
    params: {
      timestamp: new Date().getTime()
    }
  })
}

// 获取登录状态
export function getStatus() {
  return lRequest.get({
    url: '/login/status'
  })
}

// 发送验证码
export function getCaptchaSent(phone: number) {
  return lRequest.get({
    url: `/captcha/sent?phone=${phone}`
  })
}

// 验证验证码
export function getCaptchaVerify(phone: number, verify: number) {
  return lRequest.get({
    url: `/captcha/verify?phone=${phone}&captcha=${verify}`
  })
}

// 退出登录
export function getExitLogout() {
  return lRequest.get({
    url: '/logout'
  })
}
