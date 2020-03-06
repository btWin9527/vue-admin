<template>
  <div>
    生命周期
    钩子函数：回调函数的一种
    function fun(callback){
    callback()
    }
  </div>
</template>

<script>
  /*
  * 1. 切换相同path，传参不同时不刷新页面
  * 解决方案：
  * App.vue
  *
   <template>
      <div id="app">
          <router-view v-if="isRouterAlive" />
      </div>
   </template>

    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true// 首页刷新
      }
    },
    methods: {
      //首页刷新
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
        });
      },
    }
   需要刷新页面
   inject:['reload'],
   beforeRouteUpdate(to, from, next) {
    // 刷新页面
    this.reload();
    next();
  }
  *
  * 2. props通讯的配置
  // 数组:不建议使用
props:[]

// 对象
props:{
 inpVal:{
  type:Number, //传入值限定类型
  // type 值可为String,Number,Boolean,Array,Object,Date,Function,Symbol
  // type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认
  required: true, //是否必传
  default:200,  //默认值,对象或数组默认值必须从一个工厂函数获取如 default:()=>[]
  validator:(value) {
    // 这个值必须匹配下列字符串中的一个
    return ['success', 'warning', 'danger'].indexOf(value) !== -1
  }
 }
}
*

3. npm 的使用
npm install moduleName # 安装模块到项目目录下

npm install -g moduleName # -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。

npm install -save moduleName # -save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。

npm install -save-dev moduleName # -save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。

  * */
  export default {
    data() {
      return {
        msg: 'abc'
      }
    },
    name:'lifeCycle',
    //钩子函数：钩子函数，严格算起来，也算是回调函数的一种。但钩子函数是针对的截取的，当你使用了钩子之后，每当触发到相对应的消息，系统就会先“执行你写的回调函数”。
    //钩子的概念源于Windows的消息处理机制，通过设置钩子，应用程序可以对所有的消息事件进行拦截，然后执行钩子函数，对消息进行想要的处理方式。
    //1.钩子函数与回调函数都是事件处理函数
    //2.钩子函数是指windows的消息处理机制下，捕获消息的时候立即执行
    //beforecreate：el 和 data 并未初始化
    //created:完成了 data 数据的初始化，el没有
    //beforeMount：完成了 el 和 data 初始化
    //mounted ：完成挂载
    //具体怎么用呢，通俗一些
    //beforecreate : 举个栗子：可以在这加个loading事件
    //created ：在这结束loading，还做一些初始化，实现函数自执行
    //mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
    //beforeDestroy： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容
    //扩展
    //created()：在创建vue对象时，当html渲染之前就触发；但是注意，全局vue.js不强制刷新或者重启时只创建一次，也就是说，created()只会触发一次；
    //activated()：在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
    beforeCreate() { //beforeCreate:刚刚new Vue()之后，这个时候，数据还没有挂载呢，只是一个空壳
      console.log('创建前的状态', 'el:' + this.$el);   //undefined
      console.log('创建前的状态', 'data:' + this.$data); //undefined
      console.log('创建前的状态', 'msg:' + this.msg) //undefined
    },
    created() { //created:这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发updated函数,一般可以在这里做初始数据的获取
      console.log('创建完的状态', 'el:' + this.$el);  //undefined
      console.log('创建完的状态', 'data:' + this.$data);  //初始化
      console.log('创建完的状态', 'msg:' + this.msg)  //初始化
    },
    beforeMount() { //beforeMount：虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated  接下来开始render，渲染出真实dom
      console.log('挂载前的状态', 'el:' + this.$el);  //undefined 虚拟DOM创建完成  ，并没有渲染
      console.log('挂载前的状态', 'data:' + this.$data);  //初始化
      console.log('挂载前的状态', 'msg:' + this.msg)  //初始化
    },
    mounted() {  //mounted：此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了
      console.log('挂载完的状态', 'el:' + this.$el); //dom渲染
      console.log('挂载完的状态', 'data:' + this.$data);  //初始化
      console.log('挂载完的状态', 'msg:' + this.msg)  //初始化
    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {//beforeDestory:销毁前执行（$destroy方法被调用的时候就会执行）,一般在这里善后:清除计时器、清除非指令绑定的事件等等...

    },
    destroyed() { //destroyed:组件的数据绑定、监听...都去掉了,只剩下dom空壳，这里也可以善后

    },
    activated() {   //在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等

    }
  }
</script>

<style scoped>

</style>
