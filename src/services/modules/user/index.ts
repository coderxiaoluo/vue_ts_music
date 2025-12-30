import lRequest from '../../'
import { baiduQuery } from '../../'
import type { UserAccountResponse, UserInfoResponse, UserPlaylistResponse, UserLoginIPResponse, UserDetailId, PlaylistUserId, LoginIP } from '@/types/user'

// 获取用户账户信息
export function getUserAccount(cookie: string): Promise<UserAccountResponse> {
  return lRequest.get({
    url: '/user/account',
    params: {
      cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

// 获取用户详情
export function getUserInfo(id: UserDetailId): Promise<UserInfoResponse> {
  return lRequest.get({
    url: `/user/detail?uid=${id}`
  })
}

// 获取用户歌单
export function getUserPlayList(id: PlaylistUserId): Promise<UserPlaylistResponse> {
  return lRequest.get({
    url: `/user/playlist?uid=${id}`
  })
}

// 获取用户登录IP信息
export function getUserLoginIP(ip: LoginIP): Promise<UserLoginIPResponse> {
  return baiduQuery.get({
    url: `/reverse_geocoding/v3/?ak=7ejPjXA5vblz2PFSv3fRXTEGlvLN32sy&ip=${ip}&coor=bd09ll`
  })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function userPlaylist(uid: PlaylistUserId): Promise<UserPlaylistResponse> {
  return lRequest.get({
    url: `/user/playlist?uid=${uid}`
  })
}
