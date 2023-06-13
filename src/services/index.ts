import LRequest from './request'
import { BASE_URL, TIME_OUT1 } from './config'

const lRequest = new LRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT1
})

export const baiduQuery = new LRequest({
  baseURL: ' http://api.map.baidu.com/reverse_geocoding/v3',
  timeout: TIME_OUT1
})
export default lRequest
