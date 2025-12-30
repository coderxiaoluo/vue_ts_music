import lRequest from '../../'
import type { LRequestConfig } from '../../request'

// 相关歌单推荐
export function getDetailsDataListAll(id: string | number, config?: LRequestConfig) {
  return lRequest.get({
    url: `/playlist/detail?id=${id}`,
    ...config
  })
}
// 登录后使用这个接口 获取歌单所有歌曲
export function getTrackAllData(id: number | string, trackCount: number = 20, config?: LRequestConfig) {
  return lRequest.get({
    url: `/playlist/track/all?id=${id}&limit=${trackCount}`,
    params: {
      withCredentials: true
    },
    ...config
  })
}
// 歌单详情动态  评论数 是否收藏 播放数
export function getDynamicDetailId(id: number | string, config?: LRequestConfig) {
  return lRequest.get({
    url: `/playlist/detail/dynamic?id=${id}`,
    ...config
  })
}
// 歌单评论分页（不需要登录）
export function getCommentId(id: number | string, offset = 0, config?: LRequestConfig) {
  return lRequest.get({
    url: `/comment/playlist?id=${id}&limit=${50}&offset=${offset * 50}`,
    params: {
      timestamp: new Date().getTime()
    },
    ...config
  })
}
// 登录后使用这个接口 获取歌单所有收藏的人
export function getSubscribesAll(id: number | string, config?: LRequestConfig) {
  return lRequest.get({
    url: `/playlist/subscribers?id=${id}&limit=50`,
    params: {
      withCredentials: true
    },
    ...config
  })
}
