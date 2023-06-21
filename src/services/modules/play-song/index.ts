import lRequest from '../../'
// 获取音乐URL
export function getSongUrl(id: string, cookie: string) {
  if (!id) return
  return lRequest.get({
    url: `/song/url?id=${id}`,
    params: {
      timestamp: new Date().getTime(),
      withCredentials: true,
      cookie: cookie
    }
  })
}

export function getCheckMusic(id: string) {
  return lRequest.get({
    url: `/check/music?id=${id}`,
    withCredentials: true
  })
}
