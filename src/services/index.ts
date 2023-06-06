import LRequest from './request'
import { BASE_URL, TIME_OUT1 } from './config'

const lRequest = new LRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT1
})

export default lRequest
