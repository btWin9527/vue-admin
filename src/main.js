// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css' // 引入初始化样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // 支持element国际化
import '@/styles/index.scss' // 全局css样式
import '@/permission' // 权限控制
import './icons' // icon
import * as filters from './filters' // 导入全局过滤器
/* 引入mock模拟接口*/
import {
  mockXHR
} from '../mock'
import moment from 'moment'//导入moment.js
import promiseHandle from "./utils/promise";// 导入promise方法嵌套handle
// import VueSocketIO from 'vue-socket.io';

if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
// 配置socket.io
/*
* VueSocketIO({debug,connection,vuex.store,vuex.actionPrefix,vuex.mutationPrefix})
* debug       bool           开启调试模式(生产模式建议关闭)
* connection  string          websocket连接url 或 socket.io-client实例
* vuex.store  string
* vuex.actionPrefix  string     action前缀
* vuex.mutationPrefix	 string   mutation前缀
* */
// Vue.use(new VueSocketIO({
//   debug: false,
//   connection: "127.0.0.1:9999"
// }));

// set ElementUI lang to EN
Vue.use(ElementUI, {locale})
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));// 注册过滤器
Vue.config.productionTip = false
Vue.prototype.$moment = moment;// 将moment.js赋值到vue实例上
Vue.prototype.$promise = promiseHandle;
// moment.locale('zh-cn');//moment.js汉化
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
