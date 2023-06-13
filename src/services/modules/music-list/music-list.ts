import lRequest from '../../'

// 歌单分类  调用此接口,可获取歌单分类,包含 category 信息  左侧全部歌单tag
export function getCatListData() {
  return lRequest.get({
    url: '/playlist/catlist'
  })
}

// 热门歌单分类  右侧十个 tag
export function getHotPlayListData() {
  return lRequest.get({
    url: '/playlist/hot'
  })
}

// //  精品歌单标签列表
// export function getHighQualityData() {
//   return lRequest.get({
//     url: '/playlist/highquality/tags'
//   })
// }

export function getBoutiqueDataList(
  cat: string = '全部',
  limit: string | number = 100,
  offset: number = 100
) {
  console.log(offset)

  return lRequest.get({
    url: `/top/playlist?limit=${limit}&order=cat&cat=${cat}&offset=${offset}`
  })
}
