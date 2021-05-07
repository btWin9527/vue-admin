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
        let titArr = ['一', '二', '三', '四', '五', '六','七','八','九'];
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
