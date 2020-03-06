/* config baseUrl depart of development and production */
const baseUrl = {
  development: {
    // test data
    baseUrl: 'http://www.baidu.com',
    payUrl: 'http://www.weibo.com',
    api: '/dev-api',
  },
  production: {
    // test data
    baseUrl: 'http://www.pro.com',
    payUrl: 'http://www.pay.com',
    api: '/prod-api',
  },
  staging: {
    // test data
    baseUrl: 'http://www.pro.com',
    payUrl: 'http://www.pay.com',
    api: '/stage-api',
  }
}

export default baseUrl
