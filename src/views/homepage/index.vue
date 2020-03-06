<template>
  <div class="home-container">
    <div class="home-text">用户: {{ name }}</div>
    <h2>第一部分：目录</h2>
    <ul>
      <li v-for="(item,index) in permission_routes" :key="index" class="item-li">
        <span class="item-li-tit">{{item.name | reformatOneTitle(index)}}</span>
        <ul v-if="item.children && item.children.length>0"
            class="item-secondeli">
          <li v-for="(item1,index1) in item.children" :key="index1">
            <span class="item-li-tit"
                  @click="jumpTitle(item1.name)">{{item1.name | reformatTwoTitle(index,index1)}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <h2>第二部分：开发规定</h2>
    <ul>
      <li>
        <h3> 1. data变量名--小驼峰命名</h3>
        <ul>
          <li>
           <h4> 1.1 同一类数据命名使用对象包裹(article:{list:[],state:false,loading:false})</h4>
          </li>
          <li>
           <h4> 1.2 变量初始化明确类型,禁止使用隐式类型转化;减少null初始化变量</h4>
          </li>
        </ul>
      </li>
      <li>
        <h3>2. methods方法命名--(_+小驼峰，目的区分变量名和方法名)</h3>
        <ul>
          <li>
           <h4> 2.1 动词 + 名称 + 描述(最长三个单词)</h4>
          </li>
          <li>
            <h4>2.2 点击事件为_click+doSomething,跳转事件_go+page,表单提交_submit+function</h4>
          </li>
        </ul>
      </li>
      <li>
        <h3>3. class类名 -- (-连接,最长三个单词,最外层为功能代表单词,使用less或scss时，将样式通过功能区分样式块)</h3>
        <ul>
          <li>
            <h4>3.1 样式实例</h4>
            <pre>
          .login {
              &-title {

              }
              &-form {

              }
          }
        </pre>
          </li>
          <li>
            <h4> 3.2 颜色值和字号大小需要提前变量定义,使用时直接调用</h4>
            <pre>
          $text-smallFont: 12px;
          $color-red: #f00;
          $bgc-grey: #ddd;
          .demo {
            background: $bgc-grey;
            $color-red: #f00;
          }
        </pre>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Home',
    computed: {
      ...mapGetters([
        'name',
        // 过滤为权限之后的路由列表
        'permission_routes'
      ]),
    },
    data() {
      return {}
    },
    filters: {
      reformatOneTitle(val, index) {
        let titArr = ['一', '二', '三', '四', '五', '六'];
        return `${titArr[index]}、 ${val}`
      },
      reformatTwoTitle(val, index1, index2) {
        return `${index1 + 1}.${index2 + 1} ${val}`
      }
    },
    methods: {
      jumpTitle(name) {
        this.$router.push({name});
      }
    },
  }
</script>

<style lang="scss" scoped>
  .home-container {
    margin: 30px;
  }

  .home-text {
    font-size: 24px;
    line-height: 46px;
  }

  .item-li {
    line-height: 28px;

    &-tit {
      font-size: 16px;
      cursor: pointer;

      &:hover {
        color: #97a8be;
      }
    }

    .item-secondeli {
      padding-left: 20px;
    }
  }
</style>
