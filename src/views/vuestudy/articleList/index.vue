<template>
  <div class="article">
    <h2 class="article-title">文章列表分页</h2>
    <!-- 文章列表 -->
    <articleTableList :articleList="articleList"/>
    <!-- 分页器 -->
    <pagination
      :pageSize="pageSize"
      :totalSize="totalSize"
      :pageNum="pageNum"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"/>
  </div>
</template>

<script>
  /*
  * 【模糊查询处理方式】
  * 1. 后端一次性返回所有数据，分页由前端做或不分页，前端可以实现模糊查询(str.include(data))
  * 2. 后端进行分页返回数据，模糊查询由后端提供接口，前端传递参数
  * */
  /*
  * 【分页功能】
  * -- 思路分析：
  * 1. 后端处理分页，(后端提供总条数和总页数)
  * */

  import {getArticle, testBaiDu} from "@/api/article";
  import {articleTableList, pagination} from "./components";

  export default {
    name: 'vueArticle',
    data() {
      return {
        articleList: [],// 文章列表
        pageNum: 1,// 文章列表默认页码
        pageSize: 10,// 每页条数
        totalSize: 0,// 总条数条数
      }
    },
    components: {
      articleTableList,
      pagination
    },
    methods: {
      async getArticle(pageNum, pageSize) {
        /*
        * try {}catch(error){}
        * 处理接口返回异常时的处理及错误定位
        * 补充：在request.js配置中，只有状态码为20000时，会返回响应体,非20000时会自动进入catch中处理错误
        * */
        /*  try {
            const {data} = await getArticle({
              page: pageNum,
              limit: pageSize,
            });
            if (data) {
              this.articleList = data.items;
              this.totalSize = data.total;
            }
          } catch (error) {
            console.log(error, 'error');
          }*/

        /*
        * 通过async/await处理接口返回异常
        * */
        const [listData, listErr] = await this.$promise(getArticle({
          page: pageNum,
          limit: pageSize,
        }));
        console.log(listData, 'listData')
        if (listData && listData.code == 20000) {
          let {data} = listData;
          this.articleList = data.items;
          this.totalSize = data.total;
        }
        if (listErr) throw new Error('Could not find article list');// 处理请求异常
      },
      // 分页切换
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getArticle(this.pageNum, this.pageSize);
      },
      // 页面显示数量
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNum = 1;
        this.getArticle(this.pageNum, this.pageSize);
      },
      // 测试多域名解耦
      async testBaiDuPort() {
        const res = await testBaiDu();
      }
    },
    beforeMount() {
      this.getArticle(this.pageNum, this.pageSize);
      // this.testBaiDuPort();
    }
  }
</script>

<style scoped lang="scss">
  .article {
    padding-left: 20px;

    &-title {
      color: #303133;
    }
  }
</style>
