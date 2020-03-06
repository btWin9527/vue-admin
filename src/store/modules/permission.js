// 权限控制
import {asyncRoutes, constantRoutes} from "@/router";

/**
 * @method hasPermission    判断是否有权限
 * @description    使用meta.role去判断当前用户是否有权限
 * @param roles   权限
 * @param route   路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // Array.some()方法用于检测数组中的元素是否返祖指定条件,
    // 若有一个元素满足条件则表达式返回true,剩余的元素不再执行检测,
    // 若没有满足条件的元素，则返回false
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * @method filterAsyncRoutes    通过权限过滤路由
 * @param routes                路由
 * @param roles                 权限
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        // 递归判断权限
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({commit}, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      if (roles.includes('admin')) {// 超级管理员权限
        accessedRoutes = asyncRoutes || [];
      } else {// 二级管理者权限
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
