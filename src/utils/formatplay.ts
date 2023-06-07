import dayjs from 'dayjs'

export function formatePayCount(count: any) {
  const counter = parseInt(count)
  if (counter > 100000000) {
    return (counter / 100000000).toFixed(1) + '亿'
  }
  if (counter > 10000) {
    return (counter / 10000).toFixed(1) + '万'
  }
  return counter + ''
}

// 播放时间处理
function padLeftZore(time: any) {
  time = time + ''
  return ('00' + time).slice(time.length)
}
export function formatDuration(duration: any) {
  duration = duration / 1000
  const minute = Math.floor(duration / 60)
  const second = Math.floor(duration) % 60
  return padLeftZore(minute) + ':' + padLeftZore(second)
}

export function currentDuration(duration: any) {
  const minute = Math.floor(duration / 60)
  const second = Math.floor(duration) % 60
  return padLeftZore(minute) + ':' + padLeftZore(second)
}

//  时间格式化处理
export function formatMonthDay(date: any, initialize: any) {
  return dayjs(date).locale('zh-cn').format(initialize)
}

// 时间之差
export function getDiffDays(startDate: any, endDate: any) {
  return dayjs(endDate).diff(startDate, 'day')
}
