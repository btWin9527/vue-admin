import request from '@/utils/request'

// 获取文章信息接口
export function getArticle(data) {
  return request({
    url: '/article/list',
    method: 'get',
    params:data,
    // cache: true,
    // setExpireTime: 300000
  })
}
// 测试接口(使用www.baidu.com域名)
export function testBaiDu(data) {
  return request({
    url: 'http://www.baidu.com/test',
    method: 'get',
    params:data
  })
}

export function classIdxData() {
  return request({
    url: '/article/classId',
    method: 'get',
  })
}
