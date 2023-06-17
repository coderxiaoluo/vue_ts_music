import lRequest from '../../'

export function topRankingList() {
  return lRequest.get({
    url: '/toplist/detail',
    params: {
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}
