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

export function getBoutiqueDataList(
  cat: string = '全部',
  limit: string | number = 100,
  offset: number = 100
) {
  return lRequest.get({
    url: `/top/playlist?limit=${limit}&order=cat&cat=${cat}&offset=${offset}`
  })
}
