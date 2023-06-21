import lRequest from '../../'
// 获取音乐URL
export function getSongUrl(id: string, cookie: string) {
  if (!id) return
  return lRequest.get({
    url: `/song/url?id=${id}`,
    params: {
      timestamp: new Date().getTime(),
      withCredentials: true,
      cookie
    }
  })
}
// 获取音乐URL 新版
/* 
standard => 标准
higher => 较高,
exhigh=>极高, 
lossless=>无损, 
hires=>Hi-Res, 
jyeffect => 
高清环绕声, 
sky => 沉浸环绕声, 
jymaster => 超清母带
*/
export function newSongUrlLevel(id: string, level?: string = 'jymaster') {
  return lRequest.get({
    url: `song/url/v1?id=${id}&level=jymaster`,
    data: {
      withCredentials: true
    }
  })
}

// 心动模式/智能播放 /playmode/intelligence/list?id=33894312&pid=24381616
/* 
  必填：id : 歌曲 id
  pid : 歌单 id
*/
// export function getIntelligenceUrl(id: string, cookie: string) {
//   return lRequest.get({
//     url: `/playmode/intelligence/list?id=${id}&pid=${2434468518}`,
//     data: {
//       withCredentials: true,
//       cookie
//     }
//   })
// }

export function getCheckMusic(id: string) {
  return lRequest.get({
    url: `/check/music?id=${id}`,
    withCredentials: true
  })
}
