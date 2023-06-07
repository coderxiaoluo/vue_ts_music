import lRequest from '../../'

// 获取个性推荐轮播图
export function getBannerData() {
  return lRequest.get({
    url: '/banner?type=0'
  })
}

// 推荐歌单
export function getRelatedDataList(limit: number = 20) {
  return lRequest.get({
    url: `/personalized?limit=${limit}`
  })
}
