import request from "@/utils/request"
import {
  getCacheItem,
  generateReqKey,
  setCacheItem,
  getNowTime,
  cleanCacheItem
} from "../commonFuns"

/**
 * 请求拦截
 * @param config
 * @returns {Promise<*>}
 */
export async function requestInterceptor(config) {
  // 开启缓存则保存请求结果
  if (config.cache) {
    let data = await getCacheItem(generateReqKey(config))
    // 记录缓存时间
    let setExpireTime
    if (config.setExpireTime) {
      setExpireTime = config.setExpireTime
    }

    // 判断缓存数据是否存在 存在的话 是否过期 没过期就返回
    if (data && getNowTime() - data.expire < setExpireTime) {
      return data.data
    }
  }
}

/**
 * 响应拦截
 * @param config
 * @param res
 */
export function responseInterceptor(config, res) {
  // 返回的code === 200 时候才会缓存下来
  if (config && config.cache && res.code === 20000) {
    let data = {expire: getNowTime(), data: res}
    let key = generateReqKey(config)
    setCacheItem(key, data)
    // todo:清除非当前用户的相同接口的数据
    cleanCacheItem(config)
  }
}

/**
 * 生成缓存数据
 * @param {Object} requestConfig 请求数据配置
 * @returns {Promise<unknown>}
 */
export async function generateDataCache(requestConfig) {
  let cacheData = await requestInterceptor(requestConfig)
  // 有缓存数据，且未过期，直接走缓存
  if (cacheData) {
    return cacheData
  }
  let res = await request(requestConfig)
  // 缓存数据
  responseInterceptor(requestConfig, res)
  // 返回接口数据
  return res
}
