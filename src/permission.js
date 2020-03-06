/* 路由导航--判断token有无 */
import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // 页面顶部加载进度条
import 'nprogress/nprogress.css' // 页面进度条样式
import {getToken} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
/*
 进度条具体配置参考：
 https://www.npmjs.com/package/nprogress
 */

NProgress.configure({showSpinner: false}) // NProgress Configuration

// whiteList 表示不需要验证token的页面集合
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条

  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  /*
  * token判断逻辑：
  * 1. 判断是否有token
  * 2. 判断进入的页面是否为登录页
  * 3. 判断是否有用户信息，若无需要调用请求，重新拉去用户信息
  * 4. 判断拉取用户信息是否成功，若失败则跳转登录页
  * */

  /*
  * 权限控制参照：
  * https://juejin.im/post/5b5bfd5b6fb9a04fdd7d687a
  * addRoutes
  *
  * */
  /*
  * 缺点：
  * 全局路由守卫里，每次路由跳转都要做判断
菜单信息写死在前端，要改个显示文字或权限信息，需要重新编译
菜单跟路由耦合在一起，定义路由的时候还有添加菜单显示标题，图标之类的信息，而且路由不一定作为菜单显示，还要多加字段进行标识
  *
  *
  * */
  if (hasToken) {
    if (to.path === '/login') {// token存在时,跳转登录页面,重定向到首页
      next({path: '/'})
      NProgress.done()// 结束进度条
    }
    else {
      // 处理用户信息
      /* const hasGetUserInfo = store.getters.name
       if (hasGetUserInfo) {
         next()
       } else {
         try {
           await store.dispatch('user/getInfo')
           next()
         } catch (error) {
           await store.dispatch('user/resetToken')
           Message.error(error || 'Has Error')
           next(`/login?redirect=${to.path}`)// 跳转到登录页,并且记录跳转回来的页面
           NProgress.done()
         }
       }*/
      // 通过权限处理
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next();
      } else {
        try {
          // 获取权限形成路由
          const {roles} = await store.dispatch('user/getInfo');
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          /*
          * addRoutes
          *  描述：动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的【数组】
          * */
          router.addRoutes(accessRoutes);
          next({...to, replace: true});// hack方法 确保addRoutes已完成
        } catch (error) {
          // 删除token跳转登录页面
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 没有token时
    if (whiteList.indexOf(to.path) !== -1) {
      next()// 在白名单内的页面，可以随意跳转
    } else {
      next(`login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

/*
* 补充：如果在非后台管理项目，可以通过下面方法设置登录权限
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("access_token")) { // 判断当前的token是否存在
      next();
    }
    else {
      next({
      path: '/manage',
      query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
    }
  }
  else {
    next();
  }
});
* */
