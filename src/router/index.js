// import Vue from 'vue'
// import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
import vueStudyRouter from './modules/vueStudy'
import nestedRouter from './modules/nested'
import permissionRouter from './modules/permission'

// 解决vue-router相同router跳转bug
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

/*
* 1. 控制是否在侧边栏显示
* hidden: true // 默认false
* 2. 控制该路由在面包屑导航中不可被点击
* redirect: 'noRedirect'
* 3. 判断子路由是否只有1个
*当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
*只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
* 若你想不管路由下面的 children 声明的个数都显示你的根路由
*alwaysShow: true
* 4. 设置路由名称(必填)
* name: 'router-name'
* meta: {
* roles: ['admin','editor']// 设置该路由进入权限，支持多个权限叠加
* title: 'title'  // 设置该路由在侧边栏和面包屑显示的名字
* icon: 'svg-name' // 设置该路由的图标
* noCache: true  // 默认false,设置为true时将不会被缓存
* breadcrumb: false // 若设置为false,则不会在面包屑显示
* }
* */
// 普通路由
export const constantRoutes =
  [
    // 首页
    {
      path: '/',
      component: Layout,
      redirect: '/homepage',
      name:'home',
      children: [{
        path: 'homepage',
        name: 'homepage',
        component: () => import('@/views/homepage/index'),
        meta: {title: 'Homepage', icon: 'dashboard'}
      },
      ]
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/error-page/404'),
      hidden: true
    },
    {
      path: '/401',
      name: '401',
      component: () => import('@/views/error-page/401'),
      hidden: true
    },
    vueStudyRouter,
    nestedRouter,
  ]
// 权限路由
export const asyncRoutes = permissionRouter;


const createRouter = () => new VueRouter({
  /*
  * 后端配置
  * springBoot配置：
  * https://blog.csdn.net/wenmin1987/article/details/81069604
  * node配置
  * https://www.cnblogs.com/wtaog/p/9183702.html
  * iis配置
  * https://www.cnblogs.com/shijunLiu/p/6164449.html
  * */
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
