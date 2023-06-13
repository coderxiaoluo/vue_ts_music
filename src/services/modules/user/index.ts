import lRequest from '../../'
import { baiduQuery } from '../../'
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

//   https://api.map.baidu.com/location/ip?ak=您的AK&ip=您的IP&coor=bd09ll
export function getUserLoginIP(ip: number) {
  baiduQuery.get({
    url: `/reverse_geocoding/v3/?ak=7ejPjXA5vblz2PFSv3fRXTEGlvLN32sy&ip=${ip}&coor=bd09ll`
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
