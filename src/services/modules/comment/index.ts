import lRequest from '../../'

// 获取歌单评论
export function getSongSheetComment(id: number | string) {
  console.log(id)
  return lRequest.get({
    url: `/comment/playlist?id=${id}&limit50`
  })
}
