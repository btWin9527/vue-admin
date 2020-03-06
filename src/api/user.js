import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户接口
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {token}
  })
}
// 登出接口
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
