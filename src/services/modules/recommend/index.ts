import lRequest from '../../'

// 获取个性推荐轮播图
export function getBannerData() {
  return lRequest.get({
    url: '/banner?type=0'
  })
}
