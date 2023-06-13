// interface InterTagAll {
//   name: string
//   resourceCount: number
//   imgId: number
//   imgUrl: any
//   type: number
//   category: number
//   resourceType: number
//   hot: boolean
//   activity: boolean
// }
// export type tagAll = Array<InterTagAll>

export type InterTagAll = {
  name: string
  resourceCount: number
  imgId: number
  imgUrl: any
  type: number
  category: number
  resourceType: number
  hot: boolean
  activity: boolean
}

export interface PlaylistTag {
  id: number
  name: string
  category: number
  usedCount: number
  type: number
  position: number
  createTime: number
  highQuality: number
  highQualityPos: number
  officialPos: number
}

export interface InterRightTag {
  playlistTag: PlaylistTag
  activity: boolean
  createTime: number
  position: number
  category: number
  hot: boolean
  usedCount: number
  name: string
  id: number
  type: number
}
