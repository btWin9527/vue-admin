<template>
  <div>
    2. 路由传参
    <!--
       ** 路由传参
       第一种方法：
       + http://localhost:8080/home/info/100         (地址栏显示)
       + <router-link to="/home/100"></router-link>  (页面跳转传参)
       + path: "/home/:id"                           (路由配置)
       + $route.params.id                            (目标页接收参数)
       第二种方法：
        + http://localhost:8080/home/info?id=100        (地址栏显示)
        + <router-link to="/home?id=100"></router-link>  (页面跳转传参)
        + path: "/home/"                           (路由配置不进行操作)
        + $route.query.id                            (目标页接收参数)

       注意：
       1. this.$router.push({path:'/home/',params:{id:1}})  // 报错，需要使用name跳转
     -->
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>
