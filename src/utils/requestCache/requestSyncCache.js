import {generateReqKey} from '../commonFuns';
import request from "@/utils/request";

const options = {
  storage: true, // 是否开启loclastorage缓存
  storageKey: 'apiCache',
  storage_expire: 600000, // localStorage 数据存储时间10min（刷新页面判断是否清除）
  expire: 20000 // 每个接口数据缓存ms 数
};
// 初始化
(function () {
  let cache = window.localStorage.getItem(options.storageKey);
  if (cache) {
    let {storageExpire} = JSON.parse(cache);
    // 未超时不做处理
    if (storageExpire && getNowTime() - storageExpire < options.storage_expire) {
      return;
    }
  }
  window.localStorage.setItem(options.storageKey, JSON.stringify({
    data: {},
    storageExpire: getNowTime()
  }));
})();

function getCacheItem(key) {
  let cache = window.localStorage.getItem(options.storageKey);
  let {data, storageExpire} = JSON.parse(cache);
  return (data && data[key]) || null;
}

function setCacheItem(key, value) {
  let cache = window.localStorage.getItem(options.storageKey);
  let {data, storageExpire} = JSON.parse(cache);
  data[key] = value;
  window.localStorage.setItem(options.storageKey, JSON.stringify({
    data,
    storageExpire
  }));
}

let _CACHES = {};
// 使用Proxy代理
let cacheHandler = {
  get: function (target, key) {
    let value = target[key];
    console.log(`${key} 被读取`, value);
    if (options.storage && !value) {
      value = getCacheItem(key);
    }
    return value;
  },
  set: function (target, key, value) {
    console.log(`${key} 被设置为 ${value}`);
    target[key] = value;
    if (options.storage) {
      setCacheItem(key, value);
    }

    return true;
  }
};
let CACHES = new Proxy(_CACHES, cacheHandler);

export function requestInterceptor(config) {
  // 开启缓存则保存请求结果和cancel 函数
  if (config.cache) {
    console.log(generateReqKey(config), ' key key key')
    let data = CACHES[`${generateReqKey(config)}`];
    // 这里用于存储是默认时间还是用户传递过来的时间
    let setExpireTime;
    config.setExpireTime ? (setExpireTime = config.setExpireTime) : (setExpireTime = options.expire);
    // 判断缓存数据是否存在 存在的话 是否过期 没过期就返回
    if (data && getNowTime() - data.expire < setExpireTime) {
      return data.data
    }
  }
}

export function responseInterceptor(config, res) {
  // 返回的code === 200 时候才会缓存下来
  if (config && config.cache && res.code === 20000) {
    let data = {
      expire: getNowTime(),
      data: res
    };
    CACHES[`${generateReqKey(config)}`] = data;
  }
}

// 获取当前时间戳
function getNowTime() {
  return new Date().getTime();
}

/**
 * 生成缓存数据
 * @param {Object} requestConfig 请求数据配置
 * @returns {Promise<unknown>}
 */
export function generateDataCache(requestConfig) {
  return new Promise((resolve, reject) => {
    let cacheData = requestInterceptor(requestConfig)
    // 有缓存数据，且未过期，直接走缓存
    if (cacheData) {
      resolve(cacheData)
    } else {
      request(requestConfig).then((res) => {
        // 缓存数据
        responseInterceptor(requestConfig, res)
        // 返回接口数据
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    }
  })
}
