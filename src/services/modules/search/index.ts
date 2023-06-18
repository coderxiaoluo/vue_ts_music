import lRequest from '../../'

// 默认搜索关键词
export function getSearchDefault() {
  return lRequest.get({
    url: '/search/default'
  })
}

// 热搜列表(简略)
export function getSearchHot() {
  return lRequest.get({
    url: '/search/hot'
  })
}
// 热搜列表(详细) 

export function getSearchHotDefault() {
  return lRequest.get({
    url: '/search/hot/detail'
  })
}
