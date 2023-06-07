import lRequest from '../../'
// 获取用户详情
export function getUserAccount(cookie: string) {
  return lRequest.get({
    url: '/user/account',
    params: {
      cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

// 获取用户详情
export function getUserInfo(id: number) {
  return lRequest.get({
    url: `/user/detail?uid=${id}`
  })
}

// 获取用户歌单
export function getUserPlayList(id: number) {
  return lRequest.get({
    url: `/user/playlist?uid=${id}`
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
