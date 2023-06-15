import lRequest from '../../'

// 获取歌单评论
export function getSongSheetComment(id: number | string) {
  return lRequest.get({
    url: `/comment/playlist?id=${id}&limit50`
  })
}

// 点赞 需要登录
/* 
  cid: 评论id
  id:歌曲id
  likeCount :是否点赞 1为点赞 0为取消点赞

*/
export function likeCommentIsShow(
  cid: number | string,
  id: number | string,
  likeCount = 1,
  cookie: string
) {
  return lRequest.get({
    url: `/comment/like?id=${id}&cid=${cid}&t=${likeCount}&type=2`,
    params: {
      cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

// 发送评论
export function sendComments(
  t: number = 1,
  id: string,
  content: string,
  cookie: string,
  commentId?: number
) {
  return lRequest.get({
    url: `/comment?t=${t}&type=2&id=${id}&content=${content}&commentId=${commentId}`,
    params: {
      cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}
