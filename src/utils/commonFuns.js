import Qs from 'qs';
import {getToken} from "@/utils/auth";
import localforage from "@/libs/localforage.nopromises.min";

/**
 * 根据当前请求的信息生成key
 * @param config
 * @returns {string}
 */
export function generateReqKey(config) {
  // 请求方式，参数，请求地址，
  let {method, url, params, data} = config;
  // 获取token
  let token = getToken()
  let cacheKeyConfig = [method, url, Qs.stringify(params), Qs.stringify(data), token]

  // 返回拼接key
  return cacheKeyConfig.join('&')
}

/**
 * 获取当前时间戳
 * @returns {number}
 */
export function getNowTime() {
  return new Date().getTime()
}

/**
 * 获取缓存数据
 * @param {string} key
 * @returns {Promise<*>}
 */
export async function getCacheItem(key) {
  return await localforage.getItem(key)
}

/**
 * 设置缓存数据
 * @param {string} key
 * @param {any} value
 * @returns {Promise<void>}
 */
export async function setCacheItem(key, value) {
  return await localforage.setItem(key, value)
}

/**
 * 清除非当前用户的相同接口数据缓存
 * @param {Object} config
 * @returns {Promise<void>}
 */
export async function cleanCacheItem(config) {
  // 获取缓存中所有的key
  let keys = await localforage.keys()
  // 请求方式，参数，请求地址，
  let {method, url, params, data} = config
  let token = getToken()
  // 截取token的存储key
  let apiKey = [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
  if (!keys || !keys.length) return
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let tokenKey = `${apiKey}${token}`
    if (key.startsWith(apiKey) && key !== tokenKey) {
      localforage.removeItem(key)
    }
  }
}
