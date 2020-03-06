/* 优化路由导入
* 访问/xxx时，如果有叫xxx的文件夹，就直接用xxx文件下面的index.vue，如果没有就直接用xxx.vue；
* 访问/xxx/yyy就是使用xxx文件夹下面的yyy.vue；记得改成驼峰命名
* */
import Vue from 'vue'
import Router from 'vue-router'

/* require.context
* 实际上是 webpack 的方法,vue 工程一般基于 webpack,所以可以使用
require.context(directory,useSubdirectories,regExp)
接收三个参数:
directory：说明需要检索的目录
useSubdirectories：是否检索子目录
regExp: 匹配文件的正则表达式,一般是文件名
*
* */
const files = require.context("@/views", true, /^.\/(\w+\/)?\w+.vue$/, 'lazy');
const routerItem = (name, modules = {}) => {
  let [dot, parent, child] = name.split('/');
  parent = parent && parent.replace(/.vue$/, '');
  child = child && child.replace(/.vue$/, '');

  if (!modules[parent]) {
    const finalName = child ? `./${parent}/index.vue` : `./${parent}.vue`;
    modules[parent] = {
      path: '/' + parent,
      name: parent,
      component: () => Vue.component(parent, files(finalName))
    };
  }
  if (child && child !== 'index') {
    const fullName = parent + child.charAt().toUpperCase() + child.slice(1);
    (modules[parent].children || (modules[parent].children = [])).push({
      path: "/" + fullName,
      name: fullName,
      component: () => Vue.component(fullName, files(name))
    });
  }
};

const modules = ((modules) => {
  files.keys().map(file => {
    routerItem(file, modules);
  });
  return Object.keys(modules).map(item => modules[item]);
})({});
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    ...modules,
  ]
});
