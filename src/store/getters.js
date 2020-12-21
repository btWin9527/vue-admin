const getters = {
  // 侧边栏状态
  sidebar: state => state.app.sidebar,
  // // 设备区分
  device: state => state.app.device,
  /* 用户相关数据 */
  // 用户token
  token: state => state.user.token,
  // 用户头像
  avatar: state => state.user.avatar,
  // 用户姓名
  name: state => state.user.name,
  // 用户权限
  roles: state => state.user.roles,
  // 权限路由 -- 侧边栏遍历的路由应该为权限路由
  permission_routes: state => state.permission.routes,
  // test测试
  test: state => state.testVuexAlong.test
};
export default getters
