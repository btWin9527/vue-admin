/* user store */
import {getToken, setToken, removeToken} from '@/utils/auth'
import {login, getInfo, logout} from "../../api/user";
import router, {resetRouter} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

// 通过mutations修改state的值
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
}

const actions = {
  /*
   登录模块
   作用：
   1. 通过用户名和密码获取token,本地存储token
   2. 通过promise可以实现在其它文件处理登录成功的其它操作
   */
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password}).then(response => {
        const {data} = response
        commit('SET_TOKEN', data.token)// vuex临时存储
        setToken(data.token)// cookie永久存储
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  /*
   拉去用户信息 -- 使用token 拉取用户信息
   【注意】：本地只存储token,不存储用户信息,用户信息在state中存储,当用户刷新页面时，由于state的数据非永久存储，会通过token重新拉去用户信息
   【重新拉去用户信息操作】:
   -- 路由导航处处理是否重新拉去用户信息
   具体逻辑参考src/permission.js中33行
   */
  getInfo({commit, state}) {// 不需要传参数时,可直接传入{commit,state}
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response
        // 用户信息拉取失败
        if (!data) reject('Verification failed, please Login again.')
        const {name, avatar, roles, introduction} = data
        if (!roles || roles.length <= 0) reject('getInfo: roles must be a non-null array!')
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 重置token
   */
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },
  // 登出模块
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改权限
  changeRoles({commit, dispatch}, role) {
    return new Promise(async resolve => {
      const token = role + '-token';
      commit('SET_TOKEN', token);
      setToken(token);
      const {roles} = await dispatch('getInfo');
      resetRouter();
      // 通过权限生成路由
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true});
      // 添加路由
      router.addRoutes(accessRoutes);
      // 重置页面顶部tab
      // dispatch('tagsView/delAllViews', null, {root: true})
      resolve();
    })
  }
}

export default {
  namespaced: true,//用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  mutations,
  actions
}
