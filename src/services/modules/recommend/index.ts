import lRequest from '../../'
import type { LRequestConfig } from '../../request'

// 获取个性推荐轮播图
export function getBannerData(config?: LRequestConfig) {
  return lRequest.get({
    url: '/banner?type=0',
    ...config
  })
}

// 推荐歌单
export function getRelatedDataList(limit: number = 20, config?: LRequestConfig) {
  return lRequest.get({
    url: `/personalized?limit=${limit}`,
    ...config
  })
}
