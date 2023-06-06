import lRequest from '..'

// 获取用户详情
export function getUserAccount() {
  return lRequest.get({
    url: '/user/account'
  })
}

// 获取账号信息
export function getUserInfo(id: number) {
  return lRequest.get({
    url: `/user/binding?uid=${id}`
  })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
