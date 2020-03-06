<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 11:19:46
 * @LastEditTime: 2019-09-16 16:19:59
 * @LastEditors: sueRimn
 -->
# vue-admin project

## 1. init project

```shell script
    #【main】checkout git origin upstream
    # Instruction:
    git branch --set-upstream-to=origin/study study
    #description:
    # origin/study -- origin upstream
    # study        -- local upstream
```
    
## 2. 环境变量配置
```js
    // vue-cli3的环境变量配置
    /* 1. 在最外层项目目录下新建.env.[environment] 
      (environment表示不同的开发环境，一般情况有development开发/staging测试/production生产)
    */
    /* 2. 在.env.[environment]文件中定义环境变量
    */
    ENV = 'development';
    /* 3. 在项目全局文件中可以通过process.env.NODE_ENV获取环境变量;
    */
    const ENVIRONMENT = process.env.NODE_ENV;// 输出为当前环境所配置的环境变量，如development环境输出development
    /* 4. 分环境打包：在package.json中scripts中配置
    */
    let a = {
      "scripts": {
                "serve": "vue-cli-service serve",
                "build:prod": "vue-cli-service build",
                "build:stage": "vue-cli-service build --mode staging",
                "lint": "vue-cli-service lint",
                "svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml",
                "start": "npm run serve"
          }
    }
```

## 3. vuex配置

### 3.1 下载vuex插件

```shell script
  npm i vuex
```

### 3.2 配置vuex模块化

```js
/* vuex配置 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
Vue.use(Vuex);
/*
* require.context()函数创建自己的上下文，允许传递要搜索的目录，指示是否也应搜索子目录的标志以及用于匹配文件的正则表达式
require.context()在构建时，webpack 在代码中进行解析
* */
const modulesFiles = require.context('./modules', true, /\.js$/);
// 自动引入vuex模块
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules
}, {});
const store = new Vuex.Store({
  modules,
  getters
});
export default store
```

### 3.3 配置vuex的modules

```text
  store
        + modules       vuex的modules配置(包含各种业务模块)
        + getters.js    vuex的getters配置
        + index.js      vuex入口配置
```

### 3.4 main.js引入

```js
  import store from './store'
  new Vue({
    store,
    render: h => h(App)
  }).$mount('#app')
```

## 4. vue.config.js配置

```js
module.exports = {
   // 用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，
   // 所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath。
   publicPath: '/',
   // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
   // 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
   // 始终使用 outputDir 而不要修改 webpack 的 output.path
   outputDir: 'dist',
   // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
   // 从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
   assetsDir: '',
   // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
   indexPath: 'index.html',
   // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
   // 然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
   //如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
   filenameHashing: true,
   // 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
   //其值应该是一个对象，对象的 key 是入口的名字，value 是：
   //  - 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
   // - 或一个指定其 entry 的字符串。
   pages: {
     index: {
       // page 的入口
       entry: 'src/index/main.js',
       // 模板来源
       template: 'public/index.html',
       // 在 dist/index.html 的输出
       filename: 'index.html',
       // 当使用 title 选项时，
       // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
       title: 'Index Page',
       // 在这个页面中包含的块，默认情况下会包含
       // 提取出来的通用 chunk 和 vendor chunk。
       chunks: ['chunk-vendors', 'chunk-common', 'index']
     },
     // 当使用只有入口的字符串格式时，
     // 模板会被推导为 `public/subpage.html`
     // 并且如果找不到的话，就回退到 `public/index.html`。
     // 输出文件名会被推导为 `subpage.html`。
     subpage: 'src/subpage/main.js'
   },
   // eslint如何显示
   lintOnsave: true,
   // 是否在客户端编译模版
   runtimeComplier: false,
   // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
   //如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
   transpileDependencies: [],
   // 如果不需要生产环境的source map, 可以将其设置为false以加速生产环境构建
   productionSOurceMap: true,
   // 设置生成的URL中<link rel="stylesheet">和<script>标签的crossorigin属性
   crossorigin: undefined,
   // 在生成的HTML中的<link rel="stylesheet">和<script>标签上启用Subresource Integrity
   integrity: false,
  
   // 如果是一个对象，会通过webpack-merge 合并到最终的配置中
   //如果是一个函数，会接受被解析的配置作为参数，可以修改或返回配置
   configureWebpack: {} || funtion,
   // 接收一个基于webpack-chain的ChainableConfig实例。允许对webpack配置进行更粒度的修改
   //CSS Modules的配置
   css: {
     // 是否默认*.module.[ext]结尾未见作为CSS Modules模块
     modules: false,
     // 是否将组件中CSS提取到一个独立的CSS中。生产环境：true，开发环境： false
     extract: boolean || object,
     // 是否为CSS开启source map
     sourceMap: false,
     // CSS 相关 loadedr 配置
     loderOptions: {
       // css-loader
       css: {},
       // postcss-loader
       postcss: {},
       // sass-loader
       sass: {},
       // less-loader
       less: {},
       // stylus-loader
       stylus: {}
     }
   },
   // webpack-dev-server 的选项配置
   devServer: {
     // 代理转发
     proxy: string || object,
 },
 // 是否为Babel或Typescript使用thread-loader
 parallel: boolean,
 // 向PWA插件传递选项
 pwa: {},
 // 不用进行任何schema验证的对象，可以用来传递第三方插件
 pluginOptions: {}
}
```

## 5. mockjs配置

## 6. elementui配置

### 6.1 下载element-ui

```shell script
    # 下载element-ui
    npm i element-ui -S
```

### 6.2 main.js引入element-ui

```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // 支持element国际化
// set ElementUI lang to EN
Vue.use(ElementUI, {locale})

```

## 7. axios接口请求配置

## 8. vuex中处理登录功能

## 9. permission配置（路由导航）

## 10. router配置

## 11.登录和登出功能完成

## 12. node-sass安装失败处理方法

```shell script
    npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```

## 13. git取消对某个文件的跟踪

> 参考链接：https://blog.csdn.net/hello5orld/article/details/81457971?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task

```shell script
git rm --cached somefile
git commit -m "remove somefile added by mistake"
```

测试：dev分支新建
