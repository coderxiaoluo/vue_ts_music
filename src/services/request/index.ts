// 封装 axios
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import NProgress from 'nprogress'
// 引入对应css样式
import 'nprogress/nprogress.css'

interface LInstanceInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface LRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LInstanceInterceptors<T>
  cache?: boolean
  cacheKey?: string
  debounce?: number
}

// 请求缓存池
const requestCache = new Map<string, any>()
// 防抖定时器Map
const debounceTimers = new Map<string, NodeJS.Timeout>()

class LRequest {
  instance: AxiosInstance
  constructor(config: LRequestConfig) {
    this.instance = axios.create(config)

    // 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        NProgress.start()
        return config
      },
      (err) => {
        NProgress.done()
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        NProgress.done()
        return res.data
      },
      (err) => {
        NProgress.done()
        return Promise.reject(err)
      }
    )

    // 实例的拦截器 - 修复拦截器顺序
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )
  }
  
  // 生成请求缓存key
  private generateCacheKey(config: LRequestConfig): string {
    const { url, method, params, data } = config
    return `${method || 'GET'}:${url || ''}:${JSON.stringify(params || {})}:${JSON.stringify(data || {})}`
  }
  
  // 清除指定缓存
  clearCache(key?: string) {
    if (key) {
      requestCache.delete(key)
    } else {
      requestCache.clear()
    }
  }
  
  // 清除防抖定时器
  clearDebounce(key: string) {
    const timer = debounceTimers.get(key)
    if (timer) {
      clearTimeout(timer)
      debounceTimers.delete(key)
    }
  }

  // request 请求
  request<T = any>(config: LRequestConfig<T>) {
    // 生成缓存key
    const cacheKey = config.cacheKey || this.generateCacheKey(config)
    
    // 检查是否需要缓存且缓存存在
    if (config.cache && requestCache.has(cacheKey)) {
      return Promise.resolve(requestCache.get(cacheKey))
    }
    
    // 检查是否需要防抖
    if (config.debounce) {
      this.clearDebounce(cacheKey)
      return new Promise<T>((resolve, reject) => {
        debounceTimers.set(cacheKey, setTimeout(() => {
          this.sendRequest(config, cacheKey).then(resolve).catch(reject)
        }, config.debounce))
      })
    }
    
    // 正常发送请求
    return this.sendRequest(config, cacheKey)
  }
  
  // 发送请求的实际方法
  private sendRequest<T = any>(config: LRequestConfig<T>, cacheKey: string): Promise<T> {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 缓存请求结果
          if (config.cache) {
            requestCache.set(cacheKey, res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err)
          }
          reject(err)
        })
    })
  }
  
  // get请求
  get<T = any>(config: LRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  
  // post请求
  post<T = any>(config: LRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: LRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: LRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default LRequest
