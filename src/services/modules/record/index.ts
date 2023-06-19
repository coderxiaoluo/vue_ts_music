import lRequest from '../../'

// 获取歌词
export function getLyricData(id: any) {
  return lRequest.get({
    url: `/lyric?id=${id}`
  })
}

// 获取逐字歌词
export function getLyricNewData(id: any) {
  return lRequest.get({
    url: `/lyric/new?id=${id}`
  })
}
